const express = require("express");
const { addNewMeal, getMealsData, getOneMeal } = require("../controllers/mealController");

const mealRouter = express.Router();

mealRouter.post("/newMeal", addNewMeal);

mealRouter.get("/getMealsData", getMealsData);

mealRouter.get("/getOneMeal/:id", getOneMeal);

module.exports = mealRouter;
