var express = require('express');
var router = express.Router();
var userController = require('../controller/UserController')
const passport = require("passport");

/* GET users listing. */
router.get('/', userController.getAll);
router.post('/', userController.signUp);
router.post('/login', userController.signIn);
router.post('/updatepassword', userController.updatePassword);
router.post('/passwordcode', userController.passwordCode);
router.post('/verifypassword', userController.verifyPassword);

router.put('/activate', userController.activateCode);

router.put('/updatepass', passport.authenticate("jwt", { session: false }), userController.updatePass);
router.put('/update_profile', passport.authenticate("jwt", { session: false }), userController.updateProfile);





module.exports = router;
