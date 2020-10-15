const express = require("express");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/Login");
const validateforgotpasswordInput = require("../../validation/forgotpassword");
const router = express.Router();

const mailerKey = require('../../config/keys').transportURI;

console.log("using key" + mailerKey);

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:mailerKey
    }
  })
);

if (!transporter) {
  console.log("couldnt create transporter");
}

router.post("/resetpassword", (req, res) => {
  // create token
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const mailtoken = buffer.toString("hex");
    console.log("Token is "+ mailtoken);
    const email = req.body.email;

    User.findOne({ email })
      .then((User) => {
        if (!User) {
          return res.status(404).json({ email: "User not found" });
        }
          console.log("user found");
        //save token with a expiration time
        User.resettoken = mailtoken;
        User.expiretoken = Date.now() + 3600000; 
        User.save()
          .then((res) => {
            transporter.sendMail({
              to: User.email,
              from: "instadevg@gmail.com",
              subject: " Link to Reset Password",
              html:
                '<p>You are receiving this because you (or someone else)have requested the reset of the password for your account </p> <h5> Click this <a href="http://localhost:3000/forgotpassword/${mailtoken}">link </a>to reset your password</h5>',
            });
            
            console.log("email sent");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
});

//@route  POST/api/users/register
//@desc   registers the user
//@access public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: "Email Already Exists" });
      } else {
        let avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm",
        });

      
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar: avatar,
          password: req.body.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log(err));
});

//@route  POST/api/users/login
//@descr  Logs user in
//@access Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user with email

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ email: "User not Found" });
      }

      //check password
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            //User Matched
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
              email: user.email,
            };

            //sign Token

            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                return res.json({ token: "Bearer " + token });
              }
            );
          } else {
            return res.status(404).json({ password: "Password incorrect" });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

//@route GET /api/users/current
//@desc Return current user info
//@access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json(req.user);
  }
);

//@route POST /api/users/forgotpassword
//@desc resetting password
//@access Public

router.post("/forgotpassword/:token", async (req, res) => {
  const { errors, isValid } = validateforgotpasswordInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  let newpassword = req.body.password;

  console.log("before hash:", newpassword);
   console.log("email:", email);

  //Find user with email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ email: "User not found" });
      }
      let userid = user._id;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newpassword, salt, (err, hash) => {
          if (err) throw err;
          console.log(" hash:", hash);

          newpassword = hash;
          console.log("after hash:", newpassword);

          //update user new password in DataBase

          User.findOneAndUpdate(
            {
              _id: userid,
            },
            {
              password: newpassword,
            }
          )

            .then((user) => res.json({ Msg: "User Password Updated" }))
            .catch((err) => console.log(err));
        });
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
