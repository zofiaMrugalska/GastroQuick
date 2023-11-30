import axios from "axios";
import { PlaceOrderInterface } from "../interfaces/CartInterfaces";
import { AuthServices } from "./AuthServices";

//reviewed

export const PlacingOrderServices = {
  sendOrder: async (orderData: PlaceOrderInterface) => {
    const token: string | null = AuthServices.getTokenFromLocalStorage();
    //mozesz dodac typ promise co dostaje sie z bakc endu
    //nie wyslasz order ale DOSTAJESZ ORDER MIAU
    //KAMIENIE MAM SWOJE
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
};
