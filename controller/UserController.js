  const User = require('../models/User');
  const bcrypt = require('bcryptjs');
  require("dotenv").config();
  const jwt = require("jsonwebtoken");
  const mailer = require('../utils/mailer');

  const getAll = async (req, res, next) => {
    const users = await User.find({});
    res.send(users);
  }

const signUp = async (req, res, next) => {
  try {
      User.findOne({ email: req.body.email }).then(async (exist) => {
        if (exist) {
          res.status(404).json({ message: "user exist" });
        } else {
          const hash = bcrypt.hashSync(req.body.password, 10); //hashed password
          const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            phone: req.body.phone,
            role: req.body.role,
            birthDate: req.body.birthDate,
            sex: req.body.sex,
            adress: req.body.adress,
          });
          user.save().then((user) => {
            const verificationToken = jwt.sign(
                { ID: user._id },
                process.env.USER_VERIFICATION_TOKEN_SECRET,
                { expiresIn: "7d" }
              );
            // mailer.sendVerifyMail(user.email, verificationToken);
            res.send("user added  "+verificationToken);
          });
        }
      });
  } catch (error) {
    res.status(404).json({ message: "error" });
  }    
  }

  const signIn = (req , res, next) => {
    try {
        User.findOne({ email: req.body.email }).then((user) => {
          if (!user) {
            res.status(400).json({ message: "user not found" });
          } else {
            if (!user.verified) {
              res.status(400).json({ message: "Account not verified" });
            }
            bcrypt.compare(req.body.password, user.password).then((isMatch) => {
              if (!isMatch) {
                res.status(400).json({ message: "incorrect password" });
              } else {
                var token = jwt.sign(
                  {
                    id: user._id,
                    firstName: user.firstName,
                    email: user.email,
                  },
                  process.env.PRIVATE_KEY,
                  { expiresIn: "24h" }
                );
                res.status(200).json({
                  accessToken: token,
                  user: user,
                });
              }
            });
          }
        });
    } catch (error) {
      res.status(404).json(error.message);
    }
  }

  module.exports = {getAll,signUp,signIn}