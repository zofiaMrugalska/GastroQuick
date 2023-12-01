const express = require("express");

const { sendOrder, viewOrders, deleteAll } = require("../controllers/placingOrderController");

const validateToken = require("../middleware/validateTokenHandler");

const placingOrderRouter = express.Router();

placingOrderRouter.get("/viewOrders", validateToken, viewOrders);

placingOrderRouter.post("/sendOrder", validateToken, sendOrder);

placingOrderRouter.delete("/deleteAll", deleteAll); //to remove all ordered meals, helpful when testing

module.exports = placingOrderRouter;
