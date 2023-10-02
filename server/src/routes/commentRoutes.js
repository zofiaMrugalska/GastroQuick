const express = require("express");

const {
  addComment,
  getCommentsForMeal,
  deleteComment,
} = require("../controllers/commentController");
const validateToken = require("../middleware/validateTokenHandler");

const commentRouter = express.Router();

commentRouter.post("/addComment", validateToken, addComment);

commentRouter.get("/:mealId", getCommentsForMeal);

commentRouter.delete("/:commentId", validateToken, deleteComment);

module.exports = commentRouter;
