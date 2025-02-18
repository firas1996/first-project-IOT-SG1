const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required !!! "],
  },
  email: {
    type: String,
    required: [true, "E-mail is required !!! "],
    validate: [validator.isEmail, "E-mail is not valid !!!"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
