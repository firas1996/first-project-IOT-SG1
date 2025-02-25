const express = require("express");
const {
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const Routes = express.Router();

Routes.route("/").post(createUser);
Routes.route("/:id").patch(updateUser);
Routes.route("/:id").delete(deleteUser);

module.exports = Routes;
