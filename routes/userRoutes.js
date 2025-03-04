const express = require("express");
const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  signup,
  signIn,
  protectionMW,
  canDoThis,
} = require("../controllers/userController");
const Routes = express.Router();

Routes.route("/signup").post(signup);
Routes.route("/signin").post(signIn);
Routes.route("/").post(createUser);
Routes.route("/:id").patch(updateUser);
Routes.route("/:id").delete(deleteUser);
Routes.route("/:id").get(getUser);
Routes.route("/").get([protectionMW, canDoThis("admin"), getAllUsers]);

module.exports = Routes;
