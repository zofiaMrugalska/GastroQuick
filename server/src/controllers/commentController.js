const commentModel = require("../models/commentModel");
const createResponse = require("../services/responseDTO");
const { default: mongoose } = require("mongoose");

//@desc adding comment  under the meal
//@route POST /comments/addComment
//@access for logged in users

const addComment = async (req, res) => {
  try {
    const author = req.user.id;

    const { comment, meal } = req.body;

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
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc get
//@route GET /comments/:mealId
//@access public

const getCommentsForMeal = async (req, res) => {
  try {
    const mealId = req.params.mealId;

    const validMealId = mongoose.Types.ObjectId.isValid(mealId);

    if (!validMealId) {
      return res.status(400).json(createResponse(false, null, "meal Id is not valid"));
    }

    const comments = await commentModel.find({ meal: mealId }).populate("author", "name");

    if (comments.length < 1) {
      return res
        .status(404)
        .json(createResponse(false, null, "there are no comments for this meal"));
    }

    res.status(200).json(createResponse(true, comments, "comments for this meal"));
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc put
//@route PUT /comments/edit/:commentId
//@access only for author of this commen

const editComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const loginUserId = req.user.id;
    const { editedComment } = req.body;

    const validCommentId = mongoose.Types.ObjectId.isValid(commentId);

    if (!editedComment) {
      return res.status(400).json(createResponse(false, null, "comment is a required field"));
    }

    if (!validCommentId) {
      return res.status(400).json(createResponse(false, null, "comment Id is not valid"));
    }

    const commentExist = await commentModel.findById(commentId);

    if (!commentExist) {
      return res.status(404).json(createResponse(false, null, "no such comment exists"));
    }
    //nwm czy jakos moze miderwera czy cos bo czesto tego zuwysaz mozna by zrob ic xzcy ocs ale nwm sam w sumie zalezy
    if (commentExist.author.toString() !== loginUserId) {
      return res
        .status(401)
        .json(createResponse(false, null, "you cannot edit a comment that doesn't belong to you"));
    }

    commentExist.comment = editedComment;

    const updatedComment = await commentExist.save();

    res.status(201).json(createResponse(true, updatedComment, "comment updated successfully"));
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc delete
//@route DELETE /comments/:commentId
//@access only for author of this comment

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const loginUserId = req.user.id;
    const validCommentId = mongoose.Types.ObjectId.isValid(commentId);

    if (!validCommentId) {
      return res.status(400).json(createResponse(false, null, "comment Id is not valid"));
    }

    const commentExist = await commentModel.findById(commentId);

    if (!commentExist) {
      return res.status(404).json(createResponse(false, null, "no such comment exists"));
    }

    if (commentExist.author.toString() !== loginUserId) {
      return res
        .status(401)
        .json(
          createResponse(false, null, "you cannot delete a comment that doesn't belong to you")
        );
    }

    const deletedComment = await commentModel.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json(createResponse(false, null, "Failed to delete the comment"));
    }

    res.status(200).json(createResponse(true, null, "the comment has been deleted"));
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wong"));
  }
};

module.exports = { addComment, getCommentsForMeal, editComment, deleteComment };
