const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/country', userController.addCountry);
router.post('/create', userController.validateUser, userController.addUser);

module.exports = router;