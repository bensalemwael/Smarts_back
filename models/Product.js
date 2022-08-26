var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Product = new Schema(
  {
    reference: String,
    name: String,
    size: [{
      type: String
    }],
    photos: [{
      type: String,
      default: undefined
    }],
    price: String,
    category: [{ type: Schema.Types.ObjectId, ref: 'categories' }],
    description: String,
    quantity: Number,
  }
);



module.exports = mongoose.model("products", Product);