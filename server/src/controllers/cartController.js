const cartModel = require("../models/cartModel");
const createResponse = require("../services/responseDTO");
const { default: mongoose } = require("mongoose");
const mealModel = require("../models/mealModel");

//@desc get
//@route GET /cart/getMealsFromCart
//@access for logged in users/order for a given user

const getMealsFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await cartModel.find({ author: userId });

    const activeOrders = orders.filter((item) => item.isOrderActiv === true);
    res.status(200).json(createResponse(true, activeOrders, "success"));
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc adding meal to cart
//@route POST /cart/addToCart/mealId
//@access for logged in users

const addToCart = async (req, res) => {
  try {
    const author = req.user.id;
    const mealId = req.params.mealId;
    const { quantity, isOrderActiv } = req.body;
    console.log(mealId);
    const validateMealId = mongoose.Types.ObjectId.isValid(mealId);

    if (!validateMealId) {
      return res.status(400).json(createResponse(false, null, "meal Id is not valid"));
    }

    const isMealExist = await mealModel.findOne({ _id: mealId });
    console.log(isMealExist.price);

    let price = (isMealExist.price * quantity).toFixed(2);

    if (!isMealExist) {
      return res.status(404).json(createResponse(false, null, "meal not found"));
    }

    const mealInCart = await cartModel.create({
      author,
      meal: mealId,
      quantity,
      isOrderActiv,
      price,
    });

    res.status(201).json(createResponse(true, mealInCart, "the meal has been added"));
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc delete
//@route DELETE /cart/deleteAllOrders
//@access for all only for testing on postman

const deleteAllOrders = async (req, res) => {
  try {
    const result = await cartModel.deleteMany();
    res.status(201).json(createResponse(true, result, "usunioete wszytskie sa"));
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

module.exports = { addToCart, getMealsFromCart, deleteAllOrders };
