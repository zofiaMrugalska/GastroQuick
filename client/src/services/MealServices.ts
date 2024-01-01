import axios from "axios";

export const MealServices = {
  getMealsData: async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/meals/getMealsData`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  getOneMealData: async (id: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/meals/getOneMeal/${id}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
};
