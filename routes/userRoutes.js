const express = require("express");
const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} = require("../controllers/userController");
const Routes = express.Router();

Routes.route("/").post(createUser);
Routes.route("/:id").patch(updateUser);
Routes.route("/:id").delete(deleteUser);
Routes.route("/:id").get(getUser);
Routes.route("/").get(getAllUsers);

module.exports = Routes;
