const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");
const mongoose = require("mongoose");
const User = require("../../models/User");
const { ObjectId } = require("mongoose");
const validateProfileInput = require("../../validation/profile");
const validatechangepasswordInput = require("../../validation/changepassword");
const bcrypt = require('bcryptjs');
const isEmpty = require('../../validation/is-empty');


// @route POST /api/profile/
// @desc Create or Edit your Profile
// @access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const profileFields = {};
    const userfields = {};
    profileFields.user = req.user.id;

    if (req.body.avatar) userfields.avatar = req.body.avatar;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.phone) profileFields.phone = req.body.phone;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.name) userfields.name = req.body.name;
    if (req.body.email) userfields.email = req.body.email;
    if (req.body.status) profileFields.status = req.body.status;
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    console.log("profilefields:", profileFields);
    console.log("userfields:", userfields);
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (profile) {
          //update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          )
            .then((profile) => res.json(profile))
            .catch((err) => console.log(err));
          if (!isEmpty(userfields)) {
            User.findOneAndUpdate(
              { _id: req.user.id },
              { $set: userfields },
              { new: true }
            )
              .then((profile) => res.json(profile))
              .catch((err) => console.log(err));
          }
        } else {
          //create
          Profile.findOne({ handle: profileFields.handle })
            .then((profile) => {
              if (profile) {
                return res
                  .status(400)
                  .json({ handle: "That handle already exists!" });
              }
              if (!isEmpty(userfields)) {
                User.findOneAndUpdate(
                  { _id: req.user.id },
                  { $set: userfields },
                  { new: true }
                )
                  .then((profile) => res.json(profile))
                  .catch((err) => console.log(err));
              }
            
              new Profile(profileFields)
              
                .save()
                .then((profile) => res.json(profile));
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }
);

// @route /api/profile/user/follow
// @desc API to update the follower and following
// @access Private

router.put(
  "/follow",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("inside follow user", req.body.user_id);
    Profile.findOneAndUpdate(
      { user: req.body.user_id },
      {
        $addToSet: { followers: req.user.id },
      },
      {
        new: true,
      },
      (err, result) => {
        if (err) {
          return res.status(421).json({ error: err });
        }
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $addToSet: { following: req.body.user_id } },

          {
            new: true,
          }
        )
          .then((profile) => res.json(profile))

          .catch((err) => {
            return res.status(422).json({ error: err });
          });
      }
    );
  }
);

// @route /api/profile/unfollow
// @desc API to update the follower and following
// @access Private

router.put(
  "/unfollow",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("inside unfollow",req.body.user_id);
    Profile.findOneAndUpdate(
      { user: req.body.user_id },
      {
        $pull: { followers: req.user.id },
      },
      {
        new: true,
      },
      (err, result) => {
        if (err) {
          return res.status(421).json({ error: err });
        }
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $pull: { following: req.body.user_id } },

          {
            new: true,
          }
        )
          .then((profile) => res.json(profile))

          .catch((err) => {
            return res.status(422).json({ error: err });
          });
      }
    );
  }
);

// @route /api/profile/removeFollower
// @desc API to update to remove follower 
// @access Private

router.put(
  "/removeFollower",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("inside remove follower",req.body);
    Profile.findOneAndUpdate(
      { user: req.body.user_id },
      {
        $pull: { following: req.user.id },
      },
      {
        new: true,
      },
      (err, result) => {
        if (err) {
          return res.status(421).json({ error: err });
        }
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $pull: { followers: req.body.user_id } },

          {
            new: true,
          }
        )
          .then((profile) => { res.json(profile); console.log("remove user",profile) })

          .catch((err) => {
            return res.status(422).json({ error: err });
          });
      }
    );
  }
);


// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar", "email"])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", passport.authenticate("jwt", { session: false }), (req, res) => {
  const errors = {};
  console.log("inside the api get all profiles");
  Profile.find()
    .populate("user", ["name", "avatar", "email"])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      const ps = profiles.filter(item => item.user.id !== req.user.id);

      res.json(ps);
    })
    .catch((err) => res.status(404).json(err));
});

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  const userid = req.params.user_id;
  console.log(userid);
  Profile.findOne({ user: userid })
    .populate("user", ["name", "avatar", "email"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(403).json(errors);
      }

      res.json(profile);
    })
    .catch((err) => console.log(err));
});

// @route /api/profile/followers
// @desc Get all list of followers of the user
// @access private

router.get(
  "/followers/:user",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const errors = {};
    console.log("inside the api get followers",req.params);
    Profile.findOne({ user: req.params.user })
      .populate("user", ["name", "avatar"])
      .then(async (profile) => {
        if (!profile) {
          errors.nofollower = "No followers for this user";
          return res.status(404).json(errors);
        } else {
          const allfollowers = profile.followers;
          const followersnames = [];
          console.log("allfollowers", profile);
          for (let i = 0; i < allfollowers.length; i++) {
            await Profile.findOne({ user: allfollowers[i] })
            .populate("user", ["name", "avatar"])
              .then((profile) => {
                // // const follower = {
                //   name: user.name,
                //   id: user._id,
                //   avatar: user.avatar,
                //   handle: profile.handle,
                // };
                followersnames.push(profile);
                console.log(profile);
              })
              .catch((err) => console.log(err));
          }
          console.log("after for", followersnames);
          res.json(followersnames);
        }
      })

      .catch((err) => console.log(err));
  }
);

// @route /api/profile/following
// @desc Get all the following members of the user
// @access private

router.get(
  "/following/:user",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const errors = {};
    console.log("inside following,", req.params);
    Profile.findOne({ user: req.params.user })
      .populate("user", ["name", "avatar"])
      .then(async (profile) => {
        if (!profile) {
          errors.nofollower = "No followers for this user";
          return res.status(404).json(errors);
        } else {
          const allfollowing = profile.following;
          console.log("all following:", profile);
          const followingnames = [];

          for (let i = 0; i < allfollowing.length; i++) {
            await Profile.findOne({ user: allfollowing[i] })
            .populate("user", ["name", "avatar"])
              .then((profile) => {
                // const following = {
                //   name: user.name,
                //   id: user._id,
                //   avatar: user.avatar,
                //   handle:profile.handle,
                // };
                followingnames.push(profile);
                console.log(profile);
              })
              .catch((err) => console.log(err));
          }
          console.log("after for", followingnames);
          res.json(followingnames);
        }
      })

      .catch((err) => console.log(err));
  }
);

// @route API /api/profile/changepassword
// @desc Allows user to change the profile login password
// @access private

router.post('/changepassword', passport.authenticate('jwt',{session:false}),
(req,res)=>{

  const { errors, isValid } = validatechangepasswordInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  let newpassword = req.body.password;
  
  console.log("before hash:",newpassword);

  
  //Find user with whose password needs to be changed
  Profile.findOne({ user:req.user.id })
  .then( (profile)=>{
  if(!profile){
  return res.status(404).json({ email: "User not found"});  
  }
  let userid = profile.user;
    bcrypt.genSalt(10, (err, salt) =>{
      if (err) throw err;
      bcrypt.hash(newpassword, salt, (err, hash)=>{
        if (err) throw err;
          console.log(" hash:", hash);
       
          newpassword = hash;
          console.log("after hash:", newpassword);
       
       
          //update user new password in DataBase
       
         User.findOneAndUpdate(
           { 
             _id: userid
             },
            {
               password: newpassword
             })

           .then((user) => res.json({Msg:'User Password Updated'}))
           .catch((err) => console.log(err));
      });
      
    })
 
  })
  .catch((err)=>console.log(err));



});


// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get("/handle/:handle", passport.authenticate('jwt',{session:false}),(req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
