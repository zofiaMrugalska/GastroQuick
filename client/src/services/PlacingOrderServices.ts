import axios from "axios";
import { PlaceOrderInterface } from "../interfaces/CartInterfaces";
import { AuthServices } from "./AuthServices";

//to codereview

export const PlacingOrderServices = {
  sendOrder: async (orderData: PlaceOrderInterface) => {
    const token: string | null = AuthServices.getTokenFromLocalStorage();

    try {
      const response = await axios.post("http://localhost:5000/order/sendOrder", orderData, {
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
