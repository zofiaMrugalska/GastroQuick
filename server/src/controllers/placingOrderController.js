const createResponse = require("../services/responseDTO");
const cartModel = require("../models/cartModel");
const orderModel = require("../models/placingOrderModel");

//@desc sending order
//@route POST /order/sendOrder
//@access for logged in users

const sendOrder = async (req, res) => {
  try {
    const author = req.user.id;

    console.log(author);

    const { name, surname, phoneNumber, street, houseNumber, city, isCardPayment, isCashPayment } =
      req.body;

    console.log(req.body);

    if (
      !name ||
      !surname ||
      !phoneNumber ||
      !street ||
      !houseNumber ||
      !city ||
      (!isCardPayment && !isCashPayment)
    ) {
      return res.status(400).json(createResponse(false, null, "all fields are mandatory"));
    }

    const cartOrder = await cartModel.find({ author, isOrderActiv: true });

    console.log(cartOrder);

    if (!cartOrder) {
      return res.status(404).json(createResponse(false, null, "Cart with order not found"));
    }

    const order = await orderModel.create({
      name,
      surname,
      phoneNumber,
      street,
      houseNumber,
      city,
      isCardPayment,
      isCashPayment,
      order: cartOrder,
    });

    res.status(201).json(createResponse(true, order, "the order has been sended"));
  } catch (error) {
    console.log("error", error);
    res.status(500).json(createResponse(false, null, "something went wrong"));
  }
};

module.exports = { sendOrder };
