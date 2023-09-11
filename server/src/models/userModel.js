const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add the name"],
  },
  email: {
    type: String,
    required: [true, "please add the email"],
    unique: [true, "email address already taken"],
  },
  password: {
    type: String,
    required: [true, "plase add the password"],
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
