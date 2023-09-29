const express = require("express");

const { addComment, getCommentsForMeal } = require("../controllers/commentController");

const commentRouter = express.Router();

commentRouter.post("/addComment", addComment);

commentRouter.get("/:mealId", getCommentsForMeal);

module.exports = commentRouter;
