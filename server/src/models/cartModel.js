const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    item: {
      meal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meal",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
