import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CommentRequestInterface,
  ResponseCommentInterafce,
} from "../../../interfaces/CommentInterfaces";
import { CommentServices } from "../../../services/CommentServices";
import AddComments from "./AddComments";

const GetComments = () => {
  const [comments, setComments] = useState<CommentRequestInterface[]>([]);
  const params = useParams();

  const [openSort, setOpenSort] = useState<boolean>(false);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getCommentsData = async (MealId: string) => {
    try {
      const response: ResponseCommentInterafce = await CommentServices.getComments(MealId);

      // const formattedComments: CommentRequestInterface[] = response.data.map((comment) => {
      //   const createdAt = new Date(comment.createdAt);
      //   console.log(createdAt);

      //   const formattedDate = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1)
      //     .toString()
      //     .padStart(2, "0")}-${createdAt.getDate().toString().padStart(2, "0")}`;

      //   return {
      //     ...comment,
      //     createdAt: formattedDate,
      //   };
      // });

      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id !== undefined) {
      getCommentsData(params.id);
    }
  }, []);

  const openCloseSort = (): void => {
    setOpenSort(!openSort);
  };

  const fromTheLatestComments = () => {
    const sortingFromLatest: CommentRequestInterface[] = comments
      .slice()
      .sort((comment1, comment2) => {
        const date1: any = new Date(comment1.createdAt);
        const date2 = new Date(comment2.createdAt);
        return date2.getTime() - date1.getTime();
      });
    console.log(sortingFromLatest, "posortowane");
    setComments(sortingFromLatest);
  };

  const fromTheOldestComments = () => {
    const sortingFromOldest: CommentRequestInterface[] = comments
      .slice()
      .sort((comment1, comment2) => {
        const date1: any = new Date(comment1.createdAt);
        const date2 = new Date(comment2.createdAt);
        return date1.getTime() - date2.getTime();
      });
    console.log(sortingFromOldest, "posortowane");
    setComments(sortingFromOldest);
  };

  return (
    <div>
      <AddComments getCommentsData={getCommentsData} />
      <div className=" mx-auto mt-7 max-w-[1400px] max-h-[500px] overflow-y-auto ">
        <div>
          <button onClick={openCloseSort}>sort</button>
          {openSort && (
            <div>
              <button onClick={fromTheOldestComments}>oldest</button>
              <br />
              <button onClick={fromTheLatestComments}>newest</button>
            </div>
          )}
        </div>

        {comments.map((comment: CommentRequestInterface) => {
          return (
            <div key={comment._id} className=" border-b-2">
              <p>{comment.author.name}</p>
              <p>{comment.comment}</p>
              <p>{formatDate(new Date(comment.createdAt))}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default GetComments;
