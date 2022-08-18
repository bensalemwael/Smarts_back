var express = require('express');
var router = express.Router();
var categoryController =  require('../controller/CategoryController')


router.get('',categoryController.getAll)
router.post('',categoryController.addCategory)
router.delete('/:id',categoryController.deleteCategory)
router.put('',categoryController.updateCategory)


module.exports = router;