const express = require("express");

const { sendOrder } = require("../controllers/placingOrderController");

const validateToken = require("../middleware/validateTokenHandler");

const placingOrderRouter = express.Router();

placingOrderRouter.post("/sendOrder", validateToken, sendOrder);

module.exports = placingOrderRouter;
