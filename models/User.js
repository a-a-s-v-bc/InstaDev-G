const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  //username: {
  //type: String,
  //required: true,
  //},
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  confirmEmail: {
    type: Boolean,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  resettoken: String,
  expiretoken:Date
});

const User = mongoose.model('users', UserSchema);
module.exports = User;