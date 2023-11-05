import axios from "axios";
import { CommentRequestInterface } from "../interfaces/CommentInterfaces";
import { AuthServices } from "./AuthServices";

export const CommentServices = {
  addComment: async (commentContent: CommentRequestInterface, mealId: string | undefined) => {
    const token = AuthServices.getTokenFromLocalStorage();

    try {
      const response = await axios.post(
        "http://localhost:5000/comments/addComment",
        {
          comment: commentContent.comment,
          meal: mealId,
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

  getComments: async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/comments/${id}`);

      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
};
