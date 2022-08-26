var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Category = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    image: String
  }
);



module.exports = mongoose.model("categories", Category);