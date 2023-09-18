const express = require("express");
const {
  registerUser,
  getData,
  loginUser,
  logoutUser,
  getBlacklist,
  test,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const userRouter = express.Router();

userRouter.get("/get", getData); // testowe

userRouter.get("/blacklist", getBlacklist); //testowe

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", validateToken, logoutUser);

userRouter.get("/test", validateToken, test); //endpoint do sprawdzania podstawoej autoryzacji validatToken

module.exports = userRouter;
