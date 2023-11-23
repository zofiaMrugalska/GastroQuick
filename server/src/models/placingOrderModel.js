const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
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
    isCardPayment: {
      type: Boolean,
      default: false,
      required: true,
    },
    isCashPayment: {
      type: Boolean,
      default: false,
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
