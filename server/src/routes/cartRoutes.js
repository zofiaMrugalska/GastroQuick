const express = require("express");

const { addToCart } = require("../controllers/cartController");
const validateToken = require("../middleware/validateTokenHandler");

const cartRouter = express.Router();

cartRouter.post("/addToCart/:id", validateToken, addToCart);

module.exports = cartRouter;
