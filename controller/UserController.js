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
        const code = Math.random().toString(36).slice(-6);

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
          activateAccount: code,
          role: "client"

        });
        user.save().then((user) => {

          mailer.sendVerifyMail(user.email, code);
          res.send("user added  " + code);
        });
      }
    });
  } catch (error) {
    res.status(404).json({ message: "error" });
  }
}

const signIn = (req, res, next) => {
  try {
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res.status(400).json({ message: "user not found" });
      } else {
        if (!user.verified) {
          return res.status(400).json({ message: "Account not verified" });
        }
        bcrypt.compare(req.body.password, user.password).then((isMatch) => {
          if (!isMatch) {
            return res.status(400).json({ message: "incorrect password" });
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
            return res.status(200).json({
              accessToken: token,
              user: user,
            });
          }
        });
      }
    });
  } catch (error) {
    return res.status(404).json(error.message);
  }
}

const activateCode = async (req, res, next) => {
  try {
    const user = await User.findOne({ activateAccount: req.body.code })
    if (!user) {
      return res.status(400).send("code not exist !")
    }
    user.verified = true;
    user.save();
    return res.status(200).send('Account activated')
  } catch (error) {
    return res.status(400).send("error")
  }

}

const updatePassword = async (req, res, next) => {
  const hash = bcrypt.hashSync(req.body.password, 10); //hashed password
  const user = await User.findOneAndUpdate({ email: req.body.email }, { password: hash })
  if (!user) {
    res.status(400).send("email not existe")
  }
  res.status(200).send("password has changed")
}

const passwordCode = async (req, res, next) => {
  const code = Math.random().toString(36).slice(-6);
  const user = await User.findOneAndUpdate({ email: req.body.email }, { resetpassword: code })
  if (!user) {
    res.status(400).send("user not exist")
  }
  console.log(user)
  mailer.sendVerifyMail(user.email, code);
  res.send("check email")

}

const verifyPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email, resetpassword: req.body.code })
  if (!user) {
    return res.status(400).send("incorrect code")
  }
  const code = Math.random().toString(36).slice(-6);
  user.resetpassword = code;
  user.save()
  return res.send("correct code")
}


const updatePass = async (req, res, next) => {

  let user = req.user
  bcrypt.compare(req.body.password, user.password).then((isMatch) => {
    if (!isMatch)
      return res.status(400).send("check your password")
    const hashed_password = bcrypt.hashSync(req.body.new_password, 10); //hashed password
    user.password = hashed_password
    user.save()
    return res.send("password updated")
  })
}

const updateProfile = (req, res, next) => {
  let user = req.user

  user.firstName = req.body.firstName
  user.lastName = req.body.lastName
  user.adress = req.body.adress
  user.phone = req.body.phone
  user.save()

  return res.send("profile updated")


}

const getUser = (req, res, next) => {
  let user = req.user
  return res.send(user)
}

const deleteUser = async (req, res, next) => {
  try {
    let user_id = req.params.id
    const user = await User.findOne({ _id: user_id })
    user.remove()
    return res.send("user deleted")
  } catch (error) {
    return res.send("error")

  }

}

const beComeAdmin = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate({_id:req.body.id},{role:"admin"})
    return res.send("Role updated !")

  } catch (error) {

    return res.status(400).send("user not found !")

  }

}



module.exports = { getAll, signUp, signIn, activateCode, updatePassword, passwordCode, 
                    verifyPassword, updatePass, updateProfile, getUser, deleteUser , beComeAdmin }