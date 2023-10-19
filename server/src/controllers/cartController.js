const cartModel = require("../models/cartModel");
const createResponse = require("../services/responseDTO");
const { default: mongoose } = require("mongoose");

//@desc adding meal to cart
//@route POST /cart/addToCart
//@access for logged in users

const addToCart = async (req, res) => {
  try {
    const author = req.user.id;

    const { item, quantity } = req.body;

    const mealInCart = await cartModel.create({
      author,
      item,
      quantity,
    });
    res.status(201).json(createResponse(true, mealInCart, "the meal has been added"));
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

module.exports = { addToCart };
