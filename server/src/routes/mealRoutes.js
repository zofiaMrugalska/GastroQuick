const express = require("express");
const { addNewMeal, getMealsData } = require("../controllers/mealController");

const mealRouter = express.Router();

mealRouter.post("/newMeal", addNewMeal);
mealRouter.get("/getMealsData", getMealsData);

module.exports = mealRouter;
