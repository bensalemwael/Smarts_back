const Cart = require("../models/Cart");

const getAll = async (req, res, next) => {
    const carts = await Cart.find({});
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
        let product = req.body.product
        let size = req.body.size

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
    let cart = await Cart.findOne({ user: user_id }).populate('items.product')
    if (!cart) {
        return res.send([])
    } else {
        for (const item of cart.items) {
            total += item.product.price * item.quantity
        }
        return res.send({ cart: cart, total: total })
    }
}

module.exports = { getAll, addItemToCart, removeItemCart, getCartByUser }