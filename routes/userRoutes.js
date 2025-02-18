const express = require("express");
const { createUser, updateUser } = require("../controllers/userController");
const Routes = express.Router();

Routes.route("/").post(createUser);
Routes.route("/:id").patch(updateUser);

module.exports = Routes;
