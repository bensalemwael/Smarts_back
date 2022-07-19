const Category = require("../models/Category");

const getAll = async (req, res, next) => {
    const categories = await Category.find({});
    res.send(categories);
}

const addCategory = (req, res, next) => {
    category = new Category({
        name: req.body.name
    })
    category.save().then((category) => {
        console.log("cqdcsdqv")
        res.send("category added !")
    }).catch((error) => {
        res.send(400, "Category exist !");

    });
}

const deleteCategory = async (req, res, next) => { 
   await Category.findOneAndDelete({name : req.body.name})
   res.send("category deleted !")

}

const updateCategory = async (req, res, next) => {
    await Category.findOneAndUpdate({name : req.body.old_name},{name : req.body.name}) 
    res.send("category updated !")

 }
module.exports = { getAll, addCategory , deleteCategory , updateCategory}