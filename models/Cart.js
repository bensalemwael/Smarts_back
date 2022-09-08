var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Cart = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'users' },
        items: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'products' },
                quantity: Number,
                size: String
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model("carts", Cart);