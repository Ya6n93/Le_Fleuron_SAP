const BaseController = require('./base');

class UserController extends BaseController {
	constructor() {
		super(require('../models/user').model);
	}
}

module.exports = UserController;