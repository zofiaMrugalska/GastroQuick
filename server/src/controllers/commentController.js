const commentModel = require("../models/commentModel");
const createResponse = require("../services/responseDTO");
const { ObjectId } = require("mongodb");
//@desc adding comment  under the meal
//@route POST /comments/addComment
//@access for logged in users

const addComment = async (req, res) => {
  try {
    const { author, comment, meal } = req.body;

    if (!comment) {
      return res.status(400).json(createResponse(false, null, "add your comment"));
    }

    const newComment = await commentModel.create({
      author,
      comment,
      meal,
    });

    res.status(201).json(createResponse(true, newComment, "the comment has been added"));
  } catch (error) {
    console.log("error", error);
    res.status(400).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc get
//@route GET /comments/:mealId
//@access public

const getCommentsForMeal = async (req, res) => {
  try {
    const mealId = req.params.mealId;

    const comments = await commentModel.find({ meal: mealId }).populate("author", "name");

    if (!comments) {
      return res
        .status(400)
        .json(createResponse(false, null, "there are no comments for this meal"));
    }

    res.status(201).json(createResponse(true, comments, " comments for this meal"));
  } catch (error) {
    console.log("error", error);
    res.status(400).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc delete
//@route DELETE /comments/:commentId
//@access only for author of this comment

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const commentExist = await commentModel.findById(commentId);

    if (!commentExist) {
      return res.status(400).json(createResponse(false, null, "no such comment exists"));
    }

    const loginUserId = req.user.id;

    if (commentExist.author.toString() !== loginUserId) {
      return res
        .status(400)
        .json(
          createResponse(false, null, "you cannot delete a comment that doesn't belong to you")
        );
    }

    const deletedComment = await commentModel.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(400).json(createResponse(false, null, "Failed to delete the comment"));
    }

    res.status(201).json(createResponse(true, null, "the comment has been deleted"));
  } catch (error) {
    console.log("error", error);
    res.status(400).json(createResponse(false, null, "something went wong"));
  }
};

module.exports = { addComment, getCommentsForMeal, deleteComment };
