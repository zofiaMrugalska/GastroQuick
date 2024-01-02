import axios from "axios";
import { OrderDetailsInterface, ResponseSendedOrderInterface } from "../interfaces/CartInterfaces";
import { AuthServices } from "./AuthServices";

export const PlacingOrderServices = {
  sendOrder: async (orderData: OrderDetailsInterface): Promise<ResponseSendedOrderInterface> => {
    const token: string | null = AuthServices.getTokenFromLocalStorage();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/order/sendOrder`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  viewOrders: async (): Promise<ResponseSendedOrderInterface> => {
    const token: string | null = AuthServices.getTokenFromLocalStorage();

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/order/viewOrders`, {
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
