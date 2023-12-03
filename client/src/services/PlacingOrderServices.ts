import axios from "axios";
import {
  OrderDetailsInterface,
  ResponseOrderDataInterface,
  ResponseSendedOrderInterface,
} from "../interfaces/CartInterfaces";
import { AuthServices } from "./AuthServices";

//reviewed

export const PlacingOrderServices = {
  sendOrder: async (orderData: OrderDetailsInterface): Promise<ResponseSendedOrderInterface> => {
    const token: string | null = AuthServices.getTokenFromLocalStorage();
    console.log(orderData);
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

  //to codereview

  viewOrders: async (): Promise<ResponseSendedOrderInterface> => {
    const token: string | null = AuthServices.getTokenFromLocalStorage();

    try {
      const response = await axios.get("http://localhost:5000/order/viewOrders", {
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
