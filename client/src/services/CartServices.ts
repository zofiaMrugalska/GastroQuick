import axios from "axios";
import { OrderInterface, ResponseOrderMeals } from "../interfaces/CartInterfaces";
import { AuthServices } from "./AuthServices";

export const CartServices = {
  addToCart: async (dataFromUser: OrderInterface): Promise<ResponseOrderMeals> => {
    const token: string | null = AuthServices.getTokenFromLocalStorage();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/cart/addToCart/${dataFromUser._id}`,
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

  updateCart: async (editedQuantity: number, orderId: string | undefined) => {
    const token: string | null = AuthServices.getTokenFromLocalStorage();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/cart/updateCart/${orderId}`,
        { quantity: editedQuantity },
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
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/cart/getMealsFromCart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  deleteOneMealFromOrder: async (orderId: string | undefined) => {
    const token: string | null = AuthServices.getTokenFromLocalStorage();

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/cart//delete/${orderId}`, {
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
