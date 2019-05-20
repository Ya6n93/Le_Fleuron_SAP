const mongoose = require('mongoose');

const jobModel = new mongoose.Schema({
	createdBy: {
		type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true
	},
	title: {
		type: String, required: true
	},
	contract: {
		type: String, required: true
	},
	description: {
		type: String, required: true
	},
	categories: {
		type: Array
	},
	experience: {
		type: String, required: true
	},
	localisation: {
		type: String, required: true
	},
	startAt: {
		type: Date, required: true
	},
	candidatures: [{
		createdBy: {
			type: mongoose.Schema.Types.ObjectId, ref: 'user'
		},
		cv: {
			type: String,
		},
		portfolio: {
			type: String
		},
		motivationLetter: {
			type: String,
		},
		status: {
			type: String,
		},
		categories: {
			type: String, default: 'En attente'
		},
		stars: {
			1: {
				type: Number, default: 0
			},
			2: {
				type: Number, default: 0
			},
			3: {
				type: Number, default: 0
			},
			4: {
				type: Number, default: 0
			},
			5: {
				type: Number, default: 0
			}
		},
		createdAt: {
			type: Date, default: () => new Date()
 		},
		comments: [{
			createdBy: {
				type: mongoose.Schema.Types.ObjectId, ref: 'user'
			},
			message: {
				type: String
			}
		}]
	}],
	createdAt: {
		type: Date, default: () => new Date()
	}
});

module.exports = {
	model: mongoose.model('job', jobModel),
	createValidator: {
		description: {
			isLength: {
				errorMessage: 'Votre offre est trop courte !',
				options: {
					min: 5
				}
			}
		}
	}
};