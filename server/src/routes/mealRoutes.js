const express = require("express");
const {
  addNewMeal,
  getMealsData,
  getOneMeal,
  deleteOneMeal,
  addNewMealTest,
} = require("../controllers/mealController");

const upload = require("../services/multer");

const mealRouter = express.Router();

mealRouter.post("/newMeal", addNewMeal); //for admin

mealRouter.post("/savePhoto", upload.single("jpg"), addNewMealTest); //for admin

mealRouter.get("/getMealsData", getMealsData);

mealRouter.get("/getOneMeal/:id", getOneMeal);

mealRouter.delete("/deleteOne/:mealId", deleteOneMeal); //for admin

module.exports = mealRouter;
