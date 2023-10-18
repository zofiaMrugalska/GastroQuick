import axios from "axios";
import { MealServices } from "../services/MealServices";
jest.mock("axios");

it("should fetch meal data and return success status", async () => {
  const mockResponse = {
    data: {
      success: true,
    },
  };

  axios.get = jest.fn().mockResolvedValue(mockResponse);

  const GetData = await MealServices.getMealsData();

  expect(mockResponse.data.success).toBe(GetData.success);
});
