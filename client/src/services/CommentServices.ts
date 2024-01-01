import axios from "axios";
import {
  CommentRequestInterface,
  ResponseCommentInterafce,
} from "../interfaces/CommentInterfaces";
import { AuthServices } from "./AuthServices";

export const CommentServices = {
  addComment: async (
    commentContent: CommentRequestInterface,
    mealId: string | undefined
  ) => {
    const token: string | null = AuthServices.getTokenFromLocalStorage();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/comments/addComment`,
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

  getComments: async (mealId: string): Promise<ResponseCommentInterafce> => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/comments/${mealId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  putComments: async (commentId: string, editedComment: string) => {
    const token: string | null = AuthServices.getTokenFromLocalStorage();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/comments/edit/${commentId}`,
        { editedComment },
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

  deleteComment: async (commentId: string) => {
    const token: string | null = AuthServices.getTokenFromLocalStorage();

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/comments/${commentId}`,
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
};
