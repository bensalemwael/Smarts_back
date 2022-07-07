var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: "string",
      trim: true,
      unique: true,
    },
    password: String,
    phone: Number,
    role: String,
    birthDate: Date,
    sex: String,
    adress: String,
    verified: {
      type: Boolean,
      default: false,
    },
    resetpassword: String,
  }
);



module.exports = mongoose.model("users", User);