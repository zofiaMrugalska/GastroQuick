import axios from "axios";
import { CommentRequestInterface } from "../interfaces/CommentInterfaces";

export const CommentServices = {
  addComment: async (commentContent: CommentRequestInterface, token: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/comments/addComment",
        commentContent,
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
//token
//z formluratza
