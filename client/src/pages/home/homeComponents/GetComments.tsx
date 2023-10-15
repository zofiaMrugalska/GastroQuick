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

          const formattedComments = response.data.map((comment) => {
            const createdAt = new Date(comment.createdAt);
            console.log(createdAt);

            const formattedDate = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${createdAt.getDate().toString().padStart(2, "0")}`;

            return {
              ...comment,
              createdAt: formattedDate,
            };
          });

          setComments(formattedComments);

          ///// zrobic to formattedComments /////
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
            <p>{comment.author.name}</p>
            <p>{comment.comment}</p>
            <p>{comment.createdAt.toLocaleString()}</p>
          </div>
        );
      })}
    </div>
  );
};
export default GetComments;
