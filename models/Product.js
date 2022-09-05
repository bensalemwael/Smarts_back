var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Product = new Schema(
  {
    reference: {
      type: String, unique: true, required: true, dropDups: true
    },
    name: String,
    size: [{
      type: String
    }],
    photos: [{
      type: String,
      default: undefined
    }],
    price: Number,
    categories: [{ type: Schema.Types.ObjectId, ref: 'categories' }],
    description: String,
    quantity: Number,
  },
  { timestamps: true }
);



module.exports = mongoose.model("products", Product);