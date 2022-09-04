const Product = require("../models/Product");
var fs = require('fs');
let path = require("path");

const getAll = async (req, res, next) => {
    const products = await Product.find({}).populate('categories');
    res.send(products);
}

const addProduct = async (req, res, next) => {
    console.log(req.body.categories)
    const product = new Product({
        reference: req.body.reference,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        categories: req.body.categories,
        quantity: req.body.quantity,
    })
    product.size = req.body.size
    req.files?.forEach(file => {
        product.photos.push(file.filename)
    });
    product.save().then((prod) => {
        res.send("product added !")
    }).catch((error) => {
        console.log(error)
        res.send(400, "product exist !");

    });
}

const deleteProduct = async (req, res, next) => {
    const product = await Product.findOneAndDelete({ reference: req.body.reference })
    product.photos.forEach(photo => {
        var filePath = path.join(__dirname, `/../public/images/${photo}`);
        fs.unlinkSync(filePath);
    });
    res.send("product removed !")
}

const getProduct = async (req, res, next) => {
    const product = await Product.findOne({ reference: req.params.reference }).populate('categories')
    res.send(product)
}

const updateProduct = async (req, res, next) => {
    const product = req.body;
    await Product.findOneAndUpdate({ reference: req.body.reference }, product)
    res.send('product updated')
}

const updateImage = async (req, res, next) => {
    const product = await Product.findOne({ reference: req.body.reference })
    req.files.forEach(file => {
        product.photos.push(file.filename)

    });
    product.save();
    res.send("image updated!")
}

const deleteImage = async (req, res, next) => {
    const product = await Product.findOne({ reference: req.body.reference })
    req.body.images.forEach(image => {


        var index = product.photos.indexOf(image);
        if (index !== -1) {
            product.photos.splice(index, 1);
            var filePath = path.join(__dirname, `/../public/images/${image}`);

            fs.unlinkSync(filePath);

        }

    });
    product.save()
    res.send("images deleted!")
}


const getProductByCategory = async (req, res, next) => {
    try {
        id_category = req.params.id

        products = await Product.find({ categories: { "$in": id_category } }).populate('categories')
        return res.send(products)
    } catch (e) {
        return res.send([])
    }

}

const searchProducts = async (req, res, next) => {
    query = req.params.query
    //products = await Product.find({ "name": { $regex: query } });
    products = await Product.find({ $or: [{ "name": { $regex: query } }, { "reference": { $regex: query } }] }).populate('categories')
    return res.send(products)
}

const getProductsWishList = async (req, res, next) => {
    let products = []
    let ids = req.body.include
    for (const id of ids) {
        product = await Product.findOne({ _id: id }).populate('categories')
        //console.log(product)
        products.push(product)
    }

    console.log(products)

    return res.send(products)
}




module.exports = { getAll, addProduct, deleteProduct, getProduct, updateProduct, updateImage, deleteImage, getProductByCategory, searchProducts, getProductsWishList }