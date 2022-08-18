const Category = require("../models/Category");

const getAll = async (req, res, next) => {
    const categories = await Category.find({});
    res.send(categories);
}

const addCategory = (req, res, next) => {
    category = new Category({
        name: req.body.name
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
    await Category.findOneAndUpdate({name : req.body.old_name},{name : req.body.name}) 
    res.send("category updated !")

 }
module.exports = { getAll, addCategory , deleteCategory , updateCategory}