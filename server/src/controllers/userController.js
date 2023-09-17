const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");
const createResponse = require("../services/responseDTO");

//@desc test is it work??
//@route GET /users/get
//@access public

const getData = async (req, res) => {
  try {
    const getResult = await userModel.find({});
    res.status(200).json(createResponse(true, getResult, "success"));
  } catch (error) {
    console.log("error", error);
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
      // return res.status(400).json({ message: "all fields are mandatory" });
      return res.status(400).json(createResponse(false, null, "all fields are mandatory"));
    }

    const userAvailable = await userModel.findOne({ $or: [{ email }, { name }] });

    if (userAvailable) {
      return res.status(400).json(createResponse(false, null, "user already registered"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log(`user created ${user}`);

    if (user) {
      return res
        .status(201)
        .json(createResponse(true, user, "registration completed successfully"));
    } else {
      return res.status(400).json(createResponse(false, null, "user data is not valid"));
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json(createResponse(false, null, "something went wrong"));
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
        { expiresIn: "1h" }
      );

      const responseUser = {
        name: user.name,
        email: user.email,
        id: user.id,
      };

      res
        .status(200)
        .json(createResponse(true, { accessToken, user: responseUser }, "the token is generated"));
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc logout a user
//@route POST /users/logout
//@access public

const logoutUser = async (req, res) => {};

module.exports = { registerUser, getData, loginUser, logoutUser };
