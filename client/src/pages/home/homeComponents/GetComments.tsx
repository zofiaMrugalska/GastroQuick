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

  const [openSort, setOpenSort] = useState<boolean>(false);

  const openCloseSort = (): void => {
    setOpenSort(!openSort);
  };

  useEffect(() => {
    if (params.id !== undefined) {
      const getCommentsData = async (MealId: string) => {
        try {
          const response: ResponseCommentInterafce = await CommentServices.getComments(MealId);

          const formattedComments: CommentRequestInterface[] = response.data.map((comment) => {
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
        } catch (error) {
          console.log(error);
        }
      };
      getCommentsData(params.id);
    }
  }, [comments]);

  return (
    <div className=" mx-auto mt-7 max-w-[1400px] max-h-[500px] overflow-y-auto ">
      <div>
        <button onClick={openCloseSort}>sort</button>
        {openSort && (
          <div>
            <button>oldest</button>
            <br />
            <button>newest</button>
          </div>
        )}
      </div>

      {/* zrobic filtowanie komenatrzy po dacxie */}
      {comments.map((comment: CommentRequestInterface) => {
        return (
          <div key={comment._id} className=" border-b-2">
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
