const express = require("express");
const {
  registerUser,
  getData,
  loginUser,
  logoutUser,
  getBlacklist,
  test,
  verifyAccount,
  resendVerificationCode,
  resetPassword,
  setNewPassword,
} = require("../controllers/userController");
const { validateUserData, validateNewPassword } = require("../middleware/validateData");
const validateToken = require("../middleware/validateTokenHandler");

const userRouter = express.Router();

userRouter.get("/get", getData); //for testing

userRouter.get("/blacklist", getBlacklist); //for testing

userRouter.post("/register", validateUserData, registerUser);

userRouter.post("/verify", verifyAccount);

userRouter.post("/resend-verification", resendVerificationCode);

userRouter.post("/login", loginUser);

userRouter.post("/logout", validateToken, logoutUser);

userRouter.post("/reset-password", resetPassword);

userRouter.put("/set-new-password", validateNewPassword, setNewPassword);

userRouter.get("/test", validateToken, test); //for testing

module.exports = userRouter;
