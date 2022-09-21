var express = require('express');
var router = express.Router();
var userController = require('../controller/UserController')
const passport = require("passport");

/* GET users listing. */
router.get('/', passport.authenticate("jwt", { session: false }), userController.getAll);
router.delete('/:id', passport.authenticate("jwt", { session: false }), userController.deleteUser);

router.post('/', userController.signUp);
router.post('/login', userController.signIn);
router.post('/updatepassword', userController.updatePassword);
router.post('/passwordcode', userController.passwordCode);
router.post('/verifypassword', userController.verifyPassword);

router.put('/activate', userController.activateCode);

router.put('/updatepass', passport.authenticate("jwt", { session: false }), userController.updatePass);
router.put('/update_profile', passport.authenticate("jwt", { session: false }), userController.updateProfile);
router.get('/me', passport.authenticate("jwt", { session: false }), userController.getUser);
router.put('/becomeadmin', passport.authenticate("jwt", { session: false }), userController.beComeAdmin);




module.exports = router;
