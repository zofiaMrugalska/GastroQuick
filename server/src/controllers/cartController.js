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
    const orders = await cartModel.find({ author: userId }).populate("meal");
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

    const validateMealId = mongoose.Types.ObjectId.isValid(mealId);
    if (!validateMealId) {
      return res.status(400).json(createResponse(false, null, "meal Id is not valid"));
    }

    const isMealExist = await mealModel.findOne({ _id: mealId });
    if (!isMealExist) {
      return res.status(404).json(createResponse(false, null, "meal not found"));
    }

    let price = (isMealExist.price * quantity).toFixed(2);

    const isMealOrderExist = await cartModel.findOne({ meal: mealId, author, isOrderActiv: true });

    if (isMealOrderExist) {
      isMealOrderExist.quantity += quantity;

      isMealOrderExist.price = isMealOrderExist.quantity * isMealExist.price;

      await isMealOrderExist.save();

      res.status(201).json(createResponse(true, isMealOrderExist, "the meal has been added"));
    } else {
      const mealInCart = await cartModel.create({
        author,
        meal: mealId,
        quantity,
        isOrderActiv,
        price,
      });

      res.status(201).json(createResponse(true, mealInCart, "the meal has been added"));
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc updating cart
//@route PUT /cart/updateCart/mealOrderId
//@access for logged in users

const updateCart = async (req, res) => {
  try {
    const mealOrderId = req.params.mealOrderId;
    const loginUserId = req.user.id;
    const updatedCartQuantity = req.body.quantity;
    const isValidOrderId = mongoose.Types.ObjectId.isValid(mealOrderId);

    if (!isValidOrderId) {
      return res.status(400).json(createResponse(false, null, "order meal Id is not valid"));
    }

    const isMealOrderExist = await cartModel.findById(mealOrderId);

    if (!isMealOrderExist) {
      return res.status(404).json(createResponse(false, null, "there is no such meal in the order"));
    }

    if (isMealOrderExist.author.toString() !== loginUserId) {
      return res.status(401).json(createResponse(false, null, "you cannot update a meal that doesn't belong to you"));
    }

    // calculating the price for meals
    const meal = await mealModel.findOne(isMealOrderExist.meal);
    if (!meal) {
      return res.status(404).json(createResponse(false, null, "meal not found"));
    }
    isMealOrderExist.quantity = updatedCartQuantity;
    const newPrice = meal.price * updatedCartQuantity;
    const roundedPrice = newPrice.toFixed(2);

    // updating the price
    isMealOrderExist.price = roundedPrice;
    const updatedQuantity = await isMealOrderExist.save();

    res.status(201).json(createResponse(true, updatedQuantity, "quantity updated successfully"));
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc delete
//@route DELETE /cart/delete/:mealOrderId
//@access for logged in users

const deleteOneMealFromOrder = async (req, res) => {
  try {
    const mealOrderId = req.params.mealOrderId;
    const loginUserId = req.user.id;
    const isValidOrderId = mongoose.Types.ObjectId.isValid(mealOrderId);

    if (!isValidOrderId) {
      return res.status(400).json(createResponse(false, null, "order meal Id is not valid"));
    }

    const isMealOrderExist = await cartModel.findById(mealOrderId);

    if (!isMealOrderExist) {
      return res.status(404).json(createResponse(false, null, "there is no such meal in the order"));
    }

    if (isMealOrderExist.author.toString() !== loginUserId) {
      return res.status(401).json(createResponse(false, null, "you cannot delete a meal that doesn't belong to you"));
    }

    const deletedComment = await cartModel.findByIdAndDelete(mealOrderId);
    if (!deletedComment) {
      return res.status(404).json(createResponse(false, null, "Failed to delete the meal from order"));
    }

    res.status(200).json(createResponse(true, null, "the meal was removed from the order"));
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wong"));
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

module.exports = { addToCart, updateCart, getMealsFromCart, deleteOneMealFromOrder, deleteAllOrders };
