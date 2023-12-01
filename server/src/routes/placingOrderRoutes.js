const express = require("express");

const { sendOrder, viewOrders } = require("../controllers/placingOrderController");

const validateToken = require("../middleware/validateTokenHandler");

const placingOrderRouter = express.Router();

placingOrderRouter.get("/viewOrders", validateToken, viewOrders);

placingOrderRouter.post("/sendOrder", validateToken, sendOrder);

module.exports = placingOrderRouter;
