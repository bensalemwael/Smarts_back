const Category = require("../models/Category");
var fs = require('fs');
let path = require("path");
const getAll = async (req, res, next) => {
    const categories = await Category.find({});
    res.send(categories);
}

const addCategory = (req, res, next) => {
    category = new Category({
        name: req.body.name,
        image: req.file.filename
    })
    category.save().then((cat) => {
        res.send("category added !")
    }).catch((error) => {
        res.send(400, "Category exist !");

    });
}

const deleteCategory = async (req, res, next) => {
    console.log(req.params.id)
    await Category.findByIdAndDelete(req.params.id)
    res.send("category deleted !")

}

const updateCategory = async (req, res, next) => {

    try {
        let category = await Category.findOne({ _id: req.body.id })

        try {
            var filePath = path.join(__dirname, `/../public/images/${category.image}`);
            fs.unlinkSync(filePath);
        } catch (error) {

        }
        category.name = req.body.name
        category.image = req.file.filename
        category.save()
        return res.send("category updated !")

    } catch (error) {

    }








}
module.exports = { getAll, addCategory, deleteCategory, updateCategory }