const BaseController = require('./base');
const mailer = require('nodemailer');
const responseManager = require('../managers/response');

class EmailController extends BaseController {
	constructor() {
		super();
		this.email = {};
		this.transport = mailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'lefleuron.etna@gmail.com',
				pass: 'etna-lefleuron'
			}
		});
	}

	sendEmail(res) {
		this.transport.sendMail(this.email, (err, response) => {
			if (err) return responseManager.respondWithError(res, 500, err);

			responseManager.respondWithSuccess(res, 200);
			this.transport.close();
		});
	}

	newEmail(req, next) {
		this.email = {
			from: 'lefleuron.etna@gmail.com',
			to: 'fayoll_a@etna-alternance.net',
			subject: 'Nouvelle entreprise',
			html: "Nom de l\'entreprise: " + req.body.companyName + ", site: <a href=" + req.body.companySite + ">Lien</a>"
		};
		next();
	}
}

module.exports = EmailController;