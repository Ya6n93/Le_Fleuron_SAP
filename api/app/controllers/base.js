const responseManager = require('../managers/response');

class BaseController {
	constructor(model) {
		this._model = model;
	}

	checkPermissions(req, res, permission) {
		if (req.session) {
			return req.session.permissions.indexOf(permission) !== -1;
		} else {
			return false;
		}
	}

	checkData(req, res) {
		if (req._validationErrors.length) {
			let data = { errors: {} };
			req._validationErrors.forEach(error => {
				data.errors[error.param] = error.msg
			});
			responseManager.respondWithError(res, 422, data, 'FORM_ERROR');
			return false;
		}
		return true;
	}

	getMe(req, res, cb) {
		if (!req.session) return responseManager.respondWithError(res, 401, {error: 'Connectez-vous pour effectuer cette action'});

		this._model.find({_id: req.session.userId}).populate('createdBy').exec(cb);
	}

	find(data, fields, cb) {
		this._model.find(data, fields)
			.populate('createdBy')
			.populate('candidatures.createdBy')
			.populate('candidatures.comments.createdBy')
			.exec(cb);
	}

	update(data, cb) {
		this._model.update(data, cb);
	}

	push(data, field, cb) {
		this._model.updateMany(data, field, cb);
	}

	create(data, cb) {
		let model = new this._model(data);

		model.save(cb);
	}

	delete(data, cb) {
		this._model.delete(data, cb);
	}
}

module.exports = BaseController;