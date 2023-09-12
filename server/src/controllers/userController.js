const bcrypt = require("bcrypt");

const userModel = require("../models/userModel");

//@desc test is it work??
//@route GET /users/get
//@access public

const getData = async (req, res) => {
  try {
    const getResult = await userModel.find({});
    console.log(getResult);
    res.status(200).json(getResult);
  } catch (error) {
    console.log("error", error);

    res.status(500).json({ message: "something went wrong" });
  }
};

//@desc register a user
//@route POST /users/register
//@access public

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "all fields are mandatory" });
    }

    const userAvailable = await userModel.findOne({ $or: [{ email }, { name }] });

    if (userAvailable) {
      return res.status(400).json({ message: "user already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log(`user created ${user}`);

    if (user) {
      return res.status(201).json({ _id: user.id, email: user.email });
    } else {
      return res.status(400).json({ message: "user data is not valid" });
    }
  } catch (error) {
    console.log("error", error);
    return res.sendStatus(400);
  }
};

//@desc login a user
//@route POST /users/login
//@access public

const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "all fileds are mandatory" });
    }
  } catch (error) {
    console.log("error", error);
    return res.sendStatus(400);
  }
};

module.exports = { registerUser, getData, loginUser };
