const router = require('express').Router();
const { checkSchema } = require('express-validator/check');
const userModel = require('../models/user');
const authController = new (require('../controllers/auth'));

router.post('/signin', checkSchema({
		password: {
			isLength: {
				errorMessage: 'Le mot de passe doit contenir plus de 3 caractères !',
				options: {
					min: 3
				}
			}
		},
		email: {
			errorMessage: 'Le format de l\'email est invalide',
			isEmail: true
		}
	}),
	(req, res) => authController.signin(req, res));

router.post('/signup', checkSchema(userModel.createValidator), (req, res) => authController.signup(req, res));

module.exports = router;