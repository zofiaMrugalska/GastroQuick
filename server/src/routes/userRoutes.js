const express = require("express");
const { registerUser, getData } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.get("/get", getData);

module.exports = userRouter;
