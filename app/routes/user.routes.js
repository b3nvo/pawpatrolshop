const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/country', userController.addCountry);
router.get('/country', userController.getCountries);
router.post('/', userController.validateLogin, userController.login);
router.post('/create', userController.validateUser, userController.addUser);
router.put('/:userId', userController.validateUser, userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;