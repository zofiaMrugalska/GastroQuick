import axios from "axios";
import { OrderInterface } from "../interfaces/CartInterfaces";
import { AuthServices } from "./AuthServices";

export const CartServices = {
  addToCart: async (dataFromUser: OrderInterface) => {
    const token = AuthServices.getTokenFromLocalStorage();
    try {
      const response = await axios.post(
        `http://localhost:5000/cart/addToCart/${dataFromUser.id}`,
        {
          quantity: dataFromUser.quantity,
          isOrderActiv: dataFromUser.isOrderActiv,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  getMealsFromCart: async () => {
    const token = AuthServices.getTokenFromLocalStorage();

    try {
      const response = await axios.get("http://localhost:5000/cart/getMealsFromCart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
};
