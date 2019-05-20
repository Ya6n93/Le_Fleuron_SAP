const router = require('express').Router();
const jobController = new (require('../controllers/job'));
const jobModel = require('../models/job');
const { checkSchema } = require('express-validator/check');
const EmailController = new (require('../controllers/email'));

router.get('/company/me', (req, res) => jobController.getOwnCompany(req, res));

router.post('/postulate', checkSchema(jobModel.createValidator), (req, res) => jobController.postulate(req, res));

router.post('/create', checkSchema(jobModel.createValidator), (req, res) => jobController.createOffer(req, res));

router.post('/candidatures/me', (req, res) => jobController.getOwnCandidatures(req, res));

router.post('/candidatures/status/update', (req, res) => jobController.updateCandidatureStatus(req, res));

router.post('/array/add', (req, res) => jobController.addArray(req, res));

router.post('/candidatures/comment', (req, res) => jobController.comment(req, res));

router.post('/category/delete', (req, res) => jobController.deleteCategory(req, res));

router.get('/all', (req, res) => jobController.getAll(req, res));

router.get('/candidatures/:id', (req, res) => jobController.getCandidatureById(req, res));

router.post('/company/add', (req, res, next) => EmailController.newEmail(req, next), (req, res) => EmailController.sendEmail(res));

module.exports = router;