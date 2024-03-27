require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");
const createResponse = require("../services/responseDTO");
const blacklist = require("../services/blacklist");
const { confirmEmail } = require("../utils/emailUtils");
const { generateToken, verifyToken } = require("../utils/tokenUtils");
const { generateVerificationCode } = require("../utils/generateCodeUtils");

//@desc test is it work?
//@route GET /users/get
//@access public

const getData = async (req, res) => {
  try {
    const getResult = await userModel.find({});
    res.status(200).json(createResponse(true, getResult, "success"));
  } catch (error) {
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc test is it work??
//@route GET /users/blacklist
//@access public

const getBlacklist = async (req, res) => {
  try {
    const blacklistStatus = blacklist.getBlacklistStatus();
    res.status(200).json(createResponse(true, blacklistStatus, "success"));
  } catch (error) {
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc register a user
//@route POST /users/register
//@access public

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json(createResponse(false, null, "all fields are mandatory"));
    }

    const userAvailable = await userModel.findOne({
      $or: [{ email }, { name }],
    });

    if (userAvailable) {
      return res.status(409).json(createResponse(false, null, "user already registered"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = generateToken(email);
    const verificationCode = generateVerificationCode();
    const verificationLink = `${process.env.FRONT_APP_URL}/verify?verificationToken=${verificationToken}`;

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      verificationCode,
      verificationToken,
    });

    if (user) {
      confirmEmail(user.email, verificationCode, verificationLink);

      const responseUser = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      return res
        .status(201)
        .json(
          createResponse(
            true,
            responseUser,
            "A verification code for your registered account has been sent to your email."
          )
        );
    } else {
      return res.status(400).json(createResponse(false, null, "user data is not valid"));
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc verify User
//@route POST /users/verify
//@access public
const verifyAccount = async (req, res) => {
  try {
    const { verificationToken } = req.query;
    const { verificationCode } = req.body;

    const payload = verifyToken(verificationToken);
    const user = await userModel.findOne({ email: payload.email });

    if (!user) {
      return res.status(400).json(createResponse(false, null, "User not found"));
    }

    if (user.isVerified) {
      return res.status(400).json(createResponse(false, null, "User already verified"));
    }

    if (user.verificationCode === verificationCode) {
      user.isVerified = true;
      await user.save();

      const responseUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      };

      return res.status(201).json(createResponse(true, responseUser, "Account verified successfully"));
    } else {
      return res.status(400).json(createResponse(false, null, "Invalid verification code"));
    }
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, "Verification failed. Incorrect verification code or code expired."));
  }
};

//@desc resend code to verify
//@route POST /users/resend-verification
//@access public

const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json(createResponse(false, null, "User not found"));
    }

    if (user.isVerified) {
      return res.status(400).json(createResponse(false, null, "User already verified"));
    }

    const verificationToken = generateToken(email);
    const verificationCode = generateVerificationCode();
    const verificationLink = `${process.env.FRONT_APP_URL}/verify?verificationToken=${verificationToken}`;

    await userModel.updateOne(
      { email },
      {
        $set: {
          verificationToken,
          verificationCode,
        },
      }
    );

    confirmEmail(user.email, verificationCode, verificationLink);
    return res.status(201).json(createResponse(true, null, "The verification code has been resent to your email."));
  } catch (error) {
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc login a user
//@route POST /users/login
//@access public

const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json(createResponse(false, null, "all fields are mandatory"));
    }

    const user = await userModel.findOne({ name });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(404).json(createResponse(false, null, "wrong password or name"));
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            name: user.name,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      const responseUser = {
        name: user.name,
        email: user.email,
        id: user.id,
      };

      res.status(200).json(createResponse(true, { accessToken, user: responseUser }, "login successful"));
    }
  } catch (error) {
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc logout a user
//@route POST /users/logout
//@access public

const logoutUser = async (req, res) => {
  try {
    const token = req.token;

    if (!token) {
      return res.status(400).json(createResponse(false, null, "token is missing"));
    }
    blacklist.addToBlacklist(token);

    res.status(200).json(createResponse(true, null, "Logged out successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc test for authorization
//@route GET /users/test
//@access private

const test = async (req, res) => {
  try {
    res.status(200).json(createResponse(true, null, "authorization was successfully"));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = {
  registerUser,
  verifyAccount,
  resendVerificationCode,
  getData,
  loginUser,
  logoutUser,
  getBlacklist,
  test,
};
