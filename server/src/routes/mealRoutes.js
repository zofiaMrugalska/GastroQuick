const express = require("express");
const {
  addNewMeal,
  getMealsData,
  getOneMeal,
  deleteOneMeal,
} = require("../controllers/mealController");

const mealRouter = express.Router();

mealRouter.post("/newMeal", addNewMeal); //for admin

mealRouter.get("/getMealsData", getMealsData);

mealRouter.get("/getOneMeal/:id", getOneMeal);

mealRouter.delete("/deleteOne/:mealId", deleteOneMeal); //for admin

module.exports = mealRouter;
