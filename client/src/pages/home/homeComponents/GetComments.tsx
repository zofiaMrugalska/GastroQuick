import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthCheck from "../../../hooks/useAuthCheck";
import {
  CommentRequestInterface,
  ResponseCommentInterafce,
} from "../../../interfaces/CommentInterfaces";
import { CommentServices } from "../../../services/CommentServices";
import AddComments from "./AddComments";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import toast from "react-hot-toast";
import { AuthServices } from "../../../services/AuthServices";
import { AuthorInterface } from "../../../interfaces/AuthInterfaces";
import EditModal from "../../../components/EditModal";

const GetComments = () => {
  const params = useParams();
  const isAuthenticated = useAuthCheck();
  const [comments, setComments] = useState<CommentRequestInterface[]>([]);
  const [openSort, setOpenSort] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const userInfo: AuthorInterface | null = AuthServices.getUserInfoFromLocalStorage();

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getCommentsData = async (MealId: string) => {
    try {
      const response: ResponseCommentInterafce = await CommentServices.getComments(MealId);
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editComment = async (id: string, editedComment: string) => {
    if (!isAuthenticated) {
      toast.error("You cannot edit a comment that does not belong to you");
    } else {
      try {
        const response = await CommentServices.putComments(id, editedComment);
        if (response.success === true) {
          toast.success(response.message);
        }
        if (params.id !== undefined) {
          getCommentsData(params.id);
        }
      } catch (error: any) {
        const errorMessage: string = error.toString();
        toast.error(errorMessage);
      }
    }
  };

  const deleteComment = async (id: string) => {
    if (!isAuthenticated) {
      toast.error("You cannot remove a comment that does not belong to you");
    } else {
      try {
        const response = await CommentServices.deleteComment(id);
        if (response.success === true) {
          toast.success(response.message);
        }
        if (params.id !== undefined) {
          getCommentsData(params.id);
        }
      } catch (error: any) {
        const errorMessage: string = error.toString();
        toast.error(errorMessage);
      }
    }
  };

  useEffect(() => {
    if (params.id !== undefined) {
      getCommentsData(params.id);
    }
  }, []);

  //mozesz sie dowiedziec do czego usecalbak uzyc moze tutaj byly spoko?
  const toggleSortOption = (): void => {
    setOpenSort(!openSort);
  };

  const fromTheLatestComments = (): void => {
    const sortingFromLatest: CommentRequestInterface[] = comments
      .slice()
      .sort((comment1, comment2) => {
        const date1: Date = new Date(comment1.createdAt);
        const date2: Date = new Date(comment2.createdAt);
        return date2.getTime() - date1.getTime();
      });

    setComments(sortingFromLatest);
  };

  const fromTheOldestComments = (): void => {
    const sortingFromOldest: CommentRequestInterface[] = comments
      .slice()
      .sort((comment1, comment2) => {
        const date1: Date = new Date(comment1.createdAt);
        const date2: Date = new Date(comment2.createdAt);
        return date1.getTime() - date2.getTime();
      });

    setComments(sortingFromOldest);
  };

  return (
    <div>
      <AddComments getCommentsData={getCommentsData} />
      <div className=" mx-auto mt-7 max-w-[1400px] max-h-[500px] overflow-y-auto ">
        <div>
          <button onClick={toggleSortOption}>sort</button>
          {openSort && (
            <div>
              <button onClick={fromTheOldestComments}>oldest</button>
              <br />
              <button onClick={fromTheLatestComments}>newest</button>
            </div>
          )}
        </div>

        {comments.map((comment: CommentRequestInterface) => {
          const isCurrentUser = comment?.author?._id === userInfo?.id;
          return (
            <div key={comment?._id} className="flex border-b-2">
              <div>
                <p>{comment?.author?.name}</p>
                <p>{comment?.comment}</p>
                <p>{formatDate(new Date(comment.createdAt))}</p>
              </div>
              <div className="flex gap-2">
                {isCurrentUser && (
                  <div>
                    <button onClick={() => setShowModal(true)}>
                      <AiOutlineEdit />
                    </button>

                    <button onClick={() => deleteComment(comment._id)}>
                      <AiOutlineDelete />
                    </button>
                  </div>
                )}
              </div>

              {showModal && <EditModal setShowModal={setShowModal} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default GetComments;
