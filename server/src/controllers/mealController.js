const { default: mongoose } = require("mongoose");
const mealModel = require("../models/mealModel");
const createResponse = require("../services/responseDTO");

//@desc adding meal to database
//@route POST /meals/newMeal
//@access private for Admin

const addNewMeal = async (req, res) => {
  try {
    const { name, price, description, jpg } = req.body;

    if (!name || !price || !description || !jpg) {
      return res.status(400).json(createResponse(false, null, "all informations are mandatory"));
    }

    const mealAvailable = await mealModel.findOne({ name });

    if (mealAvailable) {
      return res
        .status(400)
        .json(createResponse(false, null, "meal with this name already exists"));
    }

    const meal = await mealModel.create({
      name,
      price,
      description,
      jpg,
    });

    res.status(201).json(createResponse(true, meal, "the meal has been created"));
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc get meals info from database
//@route GET /meals/getMealsData
//@access public

const getMealsData = async (req, res) => {
  try {
    const getResult = await mealModel.find({});
    res.status(200).json(createResponse(true, getResult, "success"));
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc get info about one meal  from database
//@route GET /meals/getOneMeal/:id
//@access public

const getOneMeal = async (req, res) => {
  try {
    const mealId = req.params.id;

    const validateMealId = mongoose.Types.ObjectId.isValid(mealId);

    if (!validateMealId) {
      return res.status(400).json(createResponse(false, null, "meal Id is not valid"));
    }

    const getResult = await mealModel.findOne({ _id: mealId });

    res.status(200).json(createResponse(true, getResult, "success"));
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

module.exports = { addNewMeal, getMealsData, getOneMeal };
