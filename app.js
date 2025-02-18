const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./.env" });

const app = express();
const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection secured !!!!");
  })
  .catch((error) => {
    console.log(error);
  });

const port = 1234;

app.listen(port, () => {
  try {
    console.log("The server is running !!!!");
  } catch (error) {
    console.log(error);
  }
});
