const express = require("express");
const { addNewMeal, getMealsData, getOneMeal, deleteOneMeal } = require("../controllers/mealController");

const upload = require("../services/multer");

const mealRouter = express.Router();

mealRouter.post("/newMeal", upload.single("jpg"), addNewMeal); //for testing

mealRouter.get("/getMealsData", getMealsData);

mealRouter.get("/getOneMeal/:id", getOneMeal);

mealRouter.delete("/deleteOne/:mealId", deleteOneMeal); //for testing

module.exports = mealRouter;
