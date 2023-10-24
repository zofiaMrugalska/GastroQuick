const express = require("express");

const { addToCart, getMealsFromCart } = require("../controllers/cartController");
const validateToken = require("../middleware/validateTokenHandler");

const cartRouter = express.Router();

cartRouter.get("/getMealsFromCart", validateToken, getMealsFromCart);
cartRouter.post("/addToCart/:id", validateToken, addToCart);

module.exports = cartRouter;
