var express = require('express');
var router = express.Router();
var productController = require('../controller/ProductController')
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const passport = require("passport");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
let upload = multer({ storage, fileFilter });


router.get('', productController.getAll)
router.get('/category/:id', productController.getProductByCategory)
router.get('/search/:query', productController.searchProducts)
router.post('/whishlist', productController.getProductsWishList)
router.post('/sort_price', productController.sort_price)
router.get('/sort_latest/:id_category', productController.sort_latest)
router.post('/filter_range', productController.getProductsByRange)

router.post('', passport.authenticate("jwt", { session: false }), upload.array('uploadedImages', 10), productController.addProduct)
router.get('/:reference', productController.getProduct)
router.put('', passport.authenticate("jwt", { session: false }), productController.updateProduct)
router.put('/image', passport.authenticate("jwt", { session: false }), upload.array('uploadedImages', 10), productController.updateImage)
router.put('/delete_image', passport.authenticate("jwt", { session: false }), productController.deleteImage)
router.delete('/:reference', passport.authenticate("jwt", { session: false }), productController.deleteProduct)

module.exports = router;