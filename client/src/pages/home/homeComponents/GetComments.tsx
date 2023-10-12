import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CommentRequestInterface,
  ResponseCommentInterafce,
} from "../../../interfaces/CommentInterfaces";
import { CommentServices } from "../../../services/CommentServices";

const GetComments = () => {
  const [comments, setComments] = useState<CommentRequestInterface[]>([]);
  const params = useParams();

  useEffect(() => {
    if (params.id !== undefined) {
      const getCommentsData = async (MealId: string) => {
        try {
          const response: ResponseCommentInterafce = await CommentServices.getComments(MealId);
          console.log(response.data, "response dla get comments");
          setComments(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getCommentsData(params.id);
    }
  }, []);

  ///skoknczone tu:
  //zrobic zbey sie wyswietlaly wszytskie info o authorze i dacie przy komie
  // zeby sie renderowalo po dodaniu koma

  return (
    <div>
      {comments.map((comment: CommentRequestInterface) => {
        return (
          <div key={comment._id}>
            <p>{comment.comment}</p>
            <p>{comment.name}</p>
          </div>
        );
      })}
    </div>
  );
};
export default GetComments;
