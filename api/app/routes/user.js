const router = require('express').Router();
const userController = new (require('../controllers/user'));
const responseManager = require('../managers/response');

router.get('/me', (req, res) => userController.getMe(req, res, (err, entities) => {
	if (err) return responseManager.respondWithError(res, 401, err);

	return responseManager.respondWithSuccess(res, 200, entities[0])
}));

module.exports = router;