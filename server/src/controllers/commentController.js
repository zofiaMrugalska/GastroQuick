const commentModel = require("../models/commentModel");
const createResponse = require("../services/responseDTO");

//@desc adding comment  under the meal
//@route POST /comments/addComment
//@access for logged in users

const addComment = async (req, res) => {
  try {
    const { author, comment, meal } = req.body;

    console.log(req.body, "body");

    if (!comment) {
      return res.status(400).json(createResponse(false, null, "add your comment"));
    }

    const newComment = await commentModel.create({
      author,
      comment,
      meal,
    });

    console.log(newComment, "nowy komentarzzrz");

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
    console.log(req.params.mealId);

    console.log(mealId, "id");

    const comments = await commentModel.find({ meal: mealId }).populate("author", "name");

    console.log(comments, "komenatrze");
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

module.exports = { addComment, getCommentsForMeal };
