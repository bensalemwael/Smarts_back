var express = require('express');
var router = express.Router();
var categoryController = require('../controller/CategoryController')
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");

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



router.get('', categoryController.getAll)
router.post('', upload.single('image'), categoryController.addCategory)
router.delete('/:id', categoryController.deleteCategory)
router.put('', upload.single('image'), categoryController.updateCategory)


module.exports = router;