const express = require("express");

const {
  addToCart,
  getMealsFromCart,
  deleteAllOrders,
  deleteOneMealFromOrder,
} = require("../controllers/cartController");

const validateToken = require("../middleware/validateTokenHandler");

const cartRouter = express.Router();

cartRouter.get("/getMealsFromCart", validateToken, getMealsFromCart);
cartRouter.post("/addToCart/:mealId", validateToken, addToCart);
cartRouter.delete("/:mealOrderId", validateToken, deleteOneMealFromOrder);
cartRouter.delete("/deleteAllOrders", deleteAllOrders); //to remove all ordered meals, helpful when testing

module.exports = cartRouter;
