const mongoose = require("mongoose");

const mealSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    jpg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const mealModel = mongoose.model("Meal", mealSchema);

module.exports = mealModel;
