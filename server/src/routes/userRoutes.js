const express = require("express");
const { registerUser, getData, loginUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.get("/get", getData);

userRouter.post("/login", loginUser);

module.exports = userRouter;
