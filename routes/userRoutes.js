const express = require("express");
const { createUser } = require("../controllers/userController");
const Routes = express.Router();

Routes.route("/").post(createUser);

module.exports = Routes;
