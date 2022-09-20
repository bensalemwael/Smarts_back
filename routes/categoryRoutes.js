var express = require('express');
var router = express.Router();
var categoryController = require('../controller/CategoryController')
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



router.get('', categoryController.getAll)
router.post('', passport.authenticate("jwt", { session: false }), upload.single('image'), categoryController.addCategory)
router.delete('/:id', passport.authenticate("jwt", { session: false }), categoryController.deleteCategory)
router.put('', passport.authenticate("jwt", { session: false }), upload.single('image'), categoryController.updateCategory)


module.exports = router;