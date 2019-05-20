const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userModel = new mongoose.Schema({
	profile: {
		firstname: {
			type: String
		},
		lastname: {
			type: String
		},
		avatar: {
			type: String
		},
		phone: {
			type: Number
		},
		birthday: {
			type: Date
		},
		postalCode: {
			type: Number
		},
		address: {
			type: String
		},
		gender: {
			type: Number
		},
	},
	company: {
		name: {
			type: String
		},
		logo: {
			type: String
		}
	},
	email: {
		type: String, unique: true, required: true
	},
	password: {
		type: String, required: true
	},
	permissions: {
		type: String, default: 'MEMBER'
	},
	recruiter: {
		status: {
			validate: {
				type: Boolean, default: false
			},
			pending: {
				type: Boolean, default: false
			}
		}
	},
	createdAt: {
		type: Date, default: () => new Date()
	}
});

userModel.pre('save', function(next) {
	let user = this;

	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			user.password = hash;
			next();
		});
	});
});

module.exports = {
	model: mongoose.model('user', userModel),
	createValidator: {
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
	}
};