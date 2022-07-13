var express = require('express');
var router = express.Router();
var userController =  require('../controller/UserController')

/* GET users listing. */
router.get('/',userController.getAll);
router.post('/',userController.signUp);
router.post('/login',userController.signIn);
router.post('/updatepassword',userController.updatePassword);
router.post('/passwordcode',userController.passwordCode);
router.post('/verifypassword',userController.verifyPassword);

router.put('/activate',userController.activateCode);
router.put('/:id',userController.updateProfile);



module.exports = router;
