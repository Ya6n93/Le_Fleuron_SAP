const responseManager = require('../managers/response');
const BaseController = require('./base');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../../config');

class AuthController extends BaseController {
	constructor() {
		super(require('../models/user').model);
	}

	signin(req, res) {
		if (this.checkData(req, res)) {
			new Promise((resolve, reject) => {
				this.find({email: req.body.email}, null, (err, entities) => {
					if (entities[0]) {
						bcrypt.compare(req.body.password, entities[0].password, function (err, res) {
							if (res) return resolve(entities[0]);
							return reject({error: {global: "Pseudo ou mot de passe incorrecte !"}});
						});
					} else {
						return reject({error: {global: "Pseudo ou mot de passe incorrecte !"}});
					}
				});
			})
				.then(entity => {
					this._createSession(entity._id, entity.permissions, (err, token) => {
						responseManager.respondWithSuccess(res, 200, {user: entity, session: {token: token}});
					});
				})
				.catch(err => {
					responseManager.respondWithError(res, 403, err);
				});
		}
	}

	signup(req, res) {
		if (this.checkData(req, res)) {
			this.find({email: req.body.email}, null, (err, entities) => {
				if (!entities[0]) {
					let data = {
						profile: {
							firstname: req.body.firstname,
							lastname: req.body.lastname,
							avatar: req.body.avatar,
							phone: req.body.phone,
							birthday: req.body.birthday,
							postalCode: req.body.postalCode,
							address: req.body.address,
							gender: req.body.gender
						},
						company: {
							logo: req.body.logo,
							name: req.body.name
						},
						email: req.body.email,
						password: req.body.password
					};
					this.create(data, (err, entity) => {
						if (err) return responseManager.respondWithError(res, 500, err);
						delete entity.password;
						this._createSession(entity._id, entity.permissions, (err, token) => {
							responseManager.respondWithSuccess(res, 200, {user: entity, session: {token: token}});
						});
					});
				} else {
					return responseManager.respondWithError(res, 403, {error: {email: "l'email est déjà utilisé !"}}, 'FORM_ERROR');
				}
			});
		}
	}

	_createSession(id, permissions, cb) {
		jwt.sign({
			session: {
				userId: id,
				permissions: permissions
			},
		}, config.session.secret, { expiresIn: config.session.expires }, (err, token) => {
			if (err) return cb(err, null);

			return cb(null, token);
		});
	}
}

module.exports = AuthController;