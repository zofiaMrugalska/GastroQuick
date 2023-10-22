const cartModel = require("../models/cartModel");
const createResponse = require("../services/responseDTO");
const { default: mongoose } = require("mongoose");
const mealModel = require("../models/mealModel");

//@desc adding meal to cart
//@route POST /cart/addToCart/id
//@access for logged in users

const addToCart = async (req, res) => {
  try {
    const author = req.user.id;
    const mealId = req.params.id;
    const { quantity } = req.body;

    const validateMealId = mongoose.Types.ObjectId.isValid(mealId);

    if (!validateMealId) {
      return res.status(400).json(createResponse(false, null, "meal Id is not valid"));
    }

    const isMealExist = await mealModel.findOne({ _id: mealId });
    console.log(isMealExist, "czy istnije");
    console.log(typeof isMealExist);

    if (!isMealExist) {
      return res.status(404).json(createResponse(false, null, "meal not found"));
    }

    const mealInCart = await cartModel.create({
      author,
      meal: mealId,
      quantity,
    });

    res.status(201).json(createResponse(true, mealInCart, "the meal has been added"));
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

module.exports = { addToCart };
