import axios from "axios";
import { OrderInterface } from "../interfaces/CartInterfaces";

export const CartServices = {
  addToCart: async (dataFromUser: OrderInterface) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/cart/addToCart/${dataFromUser.id}`,
        {
          quantity: dataFromUser.quantity,
          isOrderActiv: dataFromUser.isOrderActiv,
        },
        {
          headers: {
            Authorization: `Bearer ${dataFromUser.token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  getMealsFromCart: async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart/getMealsFromCart");

      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
};
