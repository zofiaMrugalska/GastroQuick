const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    meal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
    },
    isOrderActiv: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
