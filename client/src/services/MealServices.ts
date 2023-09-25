import axios from "axios";

export const MealServices = {
  getMealsData: async () => {
    try {
      const response = await axios.get("http://localhost:5000/meals/getMealsData");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  getOneMealData: async (id: string | undefined) => {
    try {
      const response = await axios.get(`http://localhost:5000/meals/getOneMeal/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
};
