const express = require("express");
const { registerUser, getData, loginUser, logoutUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.get("/get", getData); // testowe??

userRouter.post("/login", loginUser);

userRouter.post("/logout", logoutUser);

module.exports = userRouter;
