const mongoose = require("mongoose");

//to codereview

const orderSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "please add the name"],
    },
    surname: {
      type: String,
      required: [true, "please add the surname"],
    },
    phoneNumber: {
      type: String,
      required: [true, "please add the phone number"],
    },
    street: {
      type: String,
      required: [true, "please add the street"],
    },
    houseNumber: {
      type: String,
      required: [true, "please add the house number"],
    },
    city: {
      type: String,
      required: [true, "please add the city"],
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cash"],
      default: "card",
      required: true,
    },
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
