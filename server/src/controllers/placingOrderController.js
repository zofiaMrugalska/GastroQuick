const createResponse = require("../services/responseDTO");
const cartModel = require("../models/cartModel");
const orderModel = require("../models/placingOrderModel");

//@desc sending order
//@route GET /order/viewOrders
//@access for logged in users

const viewOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const sendedOrders = await orderModel.find({ author: userId }).populate({
      path: "order",
      populate: {
        path: "meal",
        model: "Meal",
      },
    });
    res.status(200).json(createResponse(true, sendedOrders, "success"));
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc sending order
//@route POST /order/sendOrder
//@access for logged in users

const sendOrder = async (req, res) => {
  try {
    const author = req.user.id;

    const { name, surname, phoneNumber, street, houseNumber, city, paymentMethod } = req.body;

    if (!name || !surname || !phoneNumber || !street || !houseNumber || !city || !paymentMethod) {
      return res.status(400).json(createResponse(false, null, "all fields are mandatory"));
    }

    const cartOrder = await cartModel.find({ author, isOrderActiv: true });

    if (!cartOrder || cartOrder.length === 0) {
      return res.status(404).json(createResponse(false, null, "Cart with order not found or cart is empty"));
    }

    const order = await orderModel.create({
      author,
      name,
      surname,
      phoneNumber,
      street,
      houseNumber,
      city,
      paymentMethod,
      order: cartOrder,
    });

    await cartModel.updateMany({ _id: { $in: cartOrder.map((item) => item._id) } }, { $set: { isOrderActiv: false } });

    res.status(201).json(createResponse(true, order, "the order has been sended"));
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

//@desc delete
//@route DELETE /order/deleteAll
//@access for all only for testing on postman

const deleteAll = async (req, res) => {
  try {
    const result = await orderModel.deleteMany();
    res.status(201).json(createResponse(true, result, "deleted all"));
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};
module.exports = { sendOrder, viewOrders, deleteAll };
