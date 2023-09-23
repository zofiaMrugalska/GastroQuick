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
    res.status(400).json(createResponse(false, null, "something went wrong"));
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
    res.status(400).json(createResponse(false, null, "something went wrong"));
  }
};

module.exports = { addNewMeal, getMealsData };
