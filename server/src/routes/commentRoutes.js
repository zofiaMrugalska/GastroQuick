const express = require("express");

const {
  addComment,
  getCommentsForMeal,
  deleteComment,
} = require("../controllers/commentController");

const { validateComment } = require("../middleware/validateData");

const validateToken = require("../middleware/validateTokenHandler");

const commentRouter = express.Router();

commentRouter.post("/addComment", validateToken, validateComment, addComment);

commentRouter.get("/:mealId", getCommentsForMeal);

commentRouter.delete("/:commentId", validateToken, deleteComment);

module.exports = commentRouter;
