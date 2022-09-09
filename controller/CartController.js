const Cart = require("../models/Cart");

const getAll = async (req, res, next) => {
    const carts = await Cart.find({}).populate('items.product').populate({
        path: 'items.product',
        populate: {
            path: 'categories'
        }
    });
    res.send(carts);
}

const addItemToCart = async (req, res, next) => {
    try {
        let user_id = req.user._id
        let item = {
            product: req.body.product,
            quantity: 1,
            size: req.body.size
        }
        let cart = await Cart.findOne({ user: user_id })
        // first time 
        if (!cart) {
            let items = [item]
            cart = new Cart({
                user: user_id,
                items: items
            })
        } else {
            // fetch for product 
            let found = false
            for (let index = 0; index < cart.items.length; index++) {
                if (cart.items[index].product == item.product && cart.items[index].size == item.size) {
                    cart.items[index].quantity += 1
                    found = true
                    break
                }
            }
            if (!found) {
                cart.items.push(item)
            }
        }
        cart.save()
        return res.send("item saved")
    } catch (error) {
        return res.send("error")
    }

}


const removeItemCart = async (req, res, next) => {

    try {
        let user_id = req.user._id
        let product = req.params.product
        let size = req.params.size

        let cart = await Cart.findOne({ user: user_id })
        for (let index = 0; index < cart.items.length; index++) {
            if (cart.items[index].product == product && cart.items[index].size == size) {
                cart.items.splice(index, 1)
                break
            }
        }
        cart.save()
        return res.send("item removed")
    } catch (error) {
        return res.send("error")
    }
}

const getCartByUser = async (req, res, next) => {

    let user_id = req.user._id
    let total = 0
    let cart = await Cart.findOne({ user: user_id }).populate('items.product').populate({
        path: 'items.product',
        populate: {
            path: 'categories'
        }
    });
    if (!cart) {
        return res.send([])
    } else {
        for (const item of cart.items) {
            total += item.product.price * item.quantity
        }
        return res.send({ cart: cart, total: total })
    }
}

const updateQuantityCart = async (req, res, next) => {
    let user_id = req.user._id
    let quantity = req.body.quantity
    let id = req.body.id

    await Cart.findOneAndUpdate({ user: user_id, items: { $elemMatch: { _id: id } } }, { $set: { 'items.$.quantity': quantity } })
    return res.send("item updated")



}

module.exports = { getAll, addItemToCart, removeItemCart, getCartByUser, updateQuantityCart }