var express = require('express');
var router = express.Router();
var cartController = require('../controller/CartController')
const passport = require("passport");

router.get('', cartController.getAll)
router.post('/add_item', passport.authenticate("jwt", { session: false }), cartController.addItemToCart);
router.delete('/delete_item/:product/:size', passport.authenticate("jwt", { session: false }), cartController.removeItemCart);
router.get('/get_cart', passport.authenticate("jwt", { session: false }), cartController.getCartByUser)

module.exports = router;