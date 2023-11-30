import axios from "axios";
import { OrderInterface, ResponseOrderMeals } from "../interfaces/CartInterfaces";
import { AuthServices } from "./AuthServices";

export const CartServices = {
  addToCart: async (dataFromUser: OrderInterface): Promise<ResponseOrderMeals> => {
    const token: string | null = AuthServices.getTokenFromLocalStorage();
    try {
      const response = await axios.post(
        `http://localhost:5000/cart/addToCart/${dataFromUser._id}`,
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

  getMealsFromCart: async (): Promise<ResponseOrderMeals> => {
    const token: string | null = AuthServices.getTokenFromLocalStorage();

    try {
      const response = await axios.get("http://localhost:5000/cart/getMealsFromCart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  //to codereview

  deleteOneMealFromOrder: async (orderId: string | undefined) => {
    const token: string | null = AuthServices.getTokenFromLocalStorage();

    try {
      const response = await axios.delete(`http://localhost:5000/cart/delete/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
};
