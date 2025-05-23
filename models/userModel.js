const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Name is required !!! "],
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
  last_password_update: {
    type: Date,
    default: Date.now(),
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 12);
  return next();
});
userSchema.methods.compairPass = async function (password, cPass) {
  return await bcryptjs.compare(password, cPass);
};

userSchema.methods.validToken = function (JWTDate) {
  // console.log(JWTDate);
  // console.log(parseInt(this.last_password_update.getTime() / 1000));
  return JWTDate > parseInt(this.last_password_update.getTime() / 1000);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
