const BaseController = require('./base');
const responseManager = require('../managers/response');

class JobController extends BaseController {
	constructor() {
		super(require('../models/job').model);
	}

	postulate(req, res) {
		if (!req.session) return responseManager.respondWithError(res, 401, {error: 'Connectez-vous pour effectuer cette action'});

		if (this.checkData(req, res)) {
			new Promise((resolve, reject) => {
				this.find({
						_id: req.body.jobId,
						'candidatures.createdBy': req.session.userId
					}, null,
					(err, entities) => {
						if (err) return reject(err);
						if (entities.length) return reject('Vous avez déjà postulé pour cette offre !');
						let data = {
							createdBy: req.session.userId,
						};
						this.push({_id: req.body.jobId}, {$push: {candidatures: data}}, (err, entity) => {
							if (err || entity.nModified === 0) return reject(err || 'Offre introuvable');

							resolve('Votre demande a bien été prise en compte !');
						});
					});
			})
				.then(entity => {
					responseManager.respondWithSuccess(res, 200, entity);
				})
				.catch(err => {
					responseManager.respondWithError(res, 500, err);
				});
		}
	}

	createOffer(req, res) {
		//if (!this.checkPermissions('RECRUITER')) return responseManager.respondWithError(res, 403, {error: 'Vous ne pouvez pas effectuer cette action'});

		if (this.checkData(req, res)) {
			let data = {
				title: req.body.title,
				description: req.body.description,
				createdBy: req.session.userId,
				contract: req.body.contract,
				experience: req.body.experience,
				localisation: req.body.localisation,
				startAt: req.body.startAt,
				categories: [
					'En attente',
					'Accepté',
					'Refusé'
				]
			};
			this.create(data, (err, entity) => {
				if (err) return responseManager.respondWithError(res, 500, err);

				responseManager.respondWithSuccess(res, 200, entity);
			});
		}
	}

	getOwnCandidatures(req, res) {
		if (!req.session) return responseManager.respondWithError(res, 401, {error: 'Connectez-vous pour effectuer cette action'});

		this._model.find({'candidatures.createdBy': req.session.userId}, {'candidatures.$': 1, title: 1, message: 1}, (err, entities) => {
			if (err) return responseManager.respondWithError(res, 500, err);

			responseManager.respondWithSuccess(res, 200, entities)
		});
	}

	getOwnCompany(req, res) {
		if (!req.session) return responseManager.respondWithError(res, 401, {error: 'Connectez-vous pour effectuer cette action'});

		this.find({createdBy: req.session.userId}, null, (err, entities) => {
			if (err) return responseManager.respondWithError(res, 500, err);

			responseManager.respondWithSuccess(res, 200, entities)
		});
	}

	comment(req, res) {
		//if (!this.checkPermissions('RECRUITER')) return responseManager.respondWithError(res, 403, {error: 'Vous ne pouvez pas effectuer cette action'});
		let data = {
			createdBy: req.session.userId,
			message: req.body.message,
		};
		this.push({
				_id: req.body.jobId,
				createdBy: req.session.userId,
				'candidatures._id': req.body.candidatureId,
			},
			{
				$push: {
					'candidatures.$.comments': data
				}
			},
			(err, entities) => {
				if (err) return responseManager.respondWithError(res, 500, err);

				responseManager.respondWithSuccess(res, 200, entities)
			});
	}

	addArray(req, res) {
		//if (!this.checkPermissions('RECRUITER')) return responseManager.respondWithError(res, 403, {error: 'Vous ne pouvez pas effectuer cette action'});
		if (req.body.category ===  'En attente') return responseManager.respondWithError(res, 403, 'Vous ne pouvez pas ajouter cette categorie');

		this.push({
				_id: req.body.jobId,
				createdBy: req.session.userId
			},
			{
				$push: {
					categories: req.body.category
				}
			},
			(err, entities) => {
				if (err) return responseManager.respondWithError(res, 500, err);

				responseManager.respondWithSuccess(res, 200, entities)
			});
	}

	updateCandidatureStatus(req, res) {
		//if (!this.checkPermissions('RECRUITER')) return responseManager.respondWithError(res, 403, {error: 'Vous ne pouvez pas effectuer cette action'});

		this._model.update({
				_id: req.body.jobId,
				createdBy: req.session.userId,
				'candidatures.createdBy': req.body.candidatureId
			},
			{
				$set: {
					'candidatures.$.categories': req.body.newStatus
				}
			}, (err, entities) => {
				if (err) return responseManager.respondWithError(res, 500, err);

				responseManager.respondWithSuccess(res, 200, entities)
			});
	}

	deleteCategory(req, res) {
		//if (!this.checkPermissions('RECRUITER')) return responseManager.respondWithError(res, 403, {error: 'Vous ne pouvez pas effectuer cette action'});
		if (req.body.category ===  'En attente') return responseManager.respondWithError(res, 403, 'Vous ne pouvez pas supprimer cette categorie');

		this._model.update({
				_id: req.body.jobId,
				createdBy: req.session.userId
			},
			{
				$pull: {
					categories: req.body.category
				}
			},
			() => {
				this._model.update({
						_id: req.body.jobId,
						createdBy: req.session.userId,
						'candidatures.categories': req.body.category
					},
					{
						$set: {
							'candidatures.$[].categories': 'En attente'
						}
					},
					(err, entities) => {
						if (err) return responseManager.respondWithError(res, 500, err);

						responseManager.respondWithSuccess(res, 200, entities)
					});
			})
	}

	getAll(req,res) {
		this._model.find({}, {
			'candidatures': 0,
			'categories': 0
		}).populate('createdBy', {password: 0, email: 0, profile: 0, permissions: 0, recruiter: 0}).exec((err, entities) => {
			if (err) return responseManager.respondWithError(res, 500, err);

			responseManager.respondWithSuccess(res, 200, entities);
		});
	}

	getCandidatureById(req, res) {
		this.find({
				createdBy: req.session.userId,
				'candidatures._id': req.params.id
			},
			{
				'candidatures.$': 1
			},
			(err, entities) => {
				if (err) return responseManager.respondWithError(res, 500, err);

				responseManager.respondWithSuccess(res, 200, entities[0]);
			});
	}
}

module.exports = JobController;