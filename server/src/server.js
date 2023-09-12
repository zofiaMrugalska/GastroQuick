require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => console.log("db connected"))
  .catch((er) => console.log(er));

app.listen(process.env.PORT, () => {
  console.log("server runs");
});
