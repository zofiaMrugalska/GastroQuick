import axios from "axios";

export const CartServices = {
  addToCart: async (id: string, quantity: number) => {
    try {
      const response = await axios.post(`http://localhost:5000/cart/addToCart/${id}`, {
        quantity: quantity,
        meal: id,
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
};
