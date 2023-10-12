import axios from "axios";
import { CommentRequestInterface } from "../interfaces/CommentInterfaces";

export const CommentServices = {
  addComment: async (
    commentContent: CommentRequestInterface,
    token: string,
    mealId: string | undefined
  ) => {
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
      console.log(response.data, "response services");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  getComments: async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/comments/${id}`);
      console.log(response.data, "komentarz dla meal");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
};
