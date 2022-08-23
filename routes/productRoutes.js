var express = require('express');
var router = express.Router();
var productController = require('../controller/ProductController')
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images");
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


router.get('',productController.getAll)
router.post('', upload.array('uploadedImages', 10),productController.addProduct)
router.delete('',productController.deleteProduct)
router.get('/:reference',productController.getProduct)
router.put('',productController.updateProduct)
router.put('/image', upload.array('uploadedImages', 10),productController.updateImage)
router.delete('/image',productController.deleteImage)
module.exports = router;