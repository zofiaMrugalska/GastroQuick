import axios from "axios";
import { MealServices } from "../services/MealServices";
jest.mock("axios");

it("getMealData response test", async () => {
  const mockResponse = {
    data: {
      success: true,
    },
  };

  axios.get = jest.fn().mockResolvedValue(mockResponse);

  const GetData = await MealServices.getMealsData();

  expect(mockResponse.data.success).toBe(GetData.success);
});
