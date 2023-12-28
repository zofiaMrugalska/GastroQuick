import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import useAuthCheck from "../../../hooks/useAuthCheck";
import {
  CommentRequestInterface,
  ResponseCommentInterafce,
} from "../../../interfaces/CommentInterfaces";
import { AuthorInterface } from "../../../interfaces/AuthInterfaces";
import { CommentServices } from "../../../services/CommentServices";
import { AuthServices } from "../../../services/AuthServices";
import AddComments from "./AddComments";
import EditModal from "../../../components/EditModal";
import formatDate from "../../../utils/dateUtils";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const GetComments = () => {
  const params = useParams();
  const isAuthenticated = useAuthCheck();
  const [comments, setComments] = useState<CommentRequestInterface[]>([]);
  const [openSort, setOpenSort] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<null | string>(null);

  const userInfo: AuthorInterface | null = AuthServices.getUserInfoFromLocalStorage();

  const getCommentsData = async (MealId: string) => {
    try {
      const response: ResponseCommentInterafce = await CommentServices.getComments(MealId);
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editComment = async (commentId: string, editedComment: string) => {
    if (!isAuthenticated) {
      toast.error("You cannot edit a comment that does not belong to you");
    } else {
      try {
        const response = await CommentServices.putComments(commentId, editedComment);
        if (response.success === true) {
          toast.success(response.message);
        }
        if (params.mealId !== undefined) {
          getCommentsData(params.mealId);
        }
        setShowModal(null);
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
        if (params.mealId !== undefined) {
          getCommentsData(params.mealId);
        }
      } catch (error: any) {
        const errorMessage: string = error.toString();
        toast.error(errorMessage);
      }
    }
  };

  useEffect(() => {
    if (params.mealId !== undefined) {
      getCommentsData(params.mealId);
    }
  }, []);

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
      {comments.length > 0 ? (
        <div className="max-w-6xl mx-auto">
          <AddComments getCommentsData={getCommentsData} />
          <div className=" mx-auto mt-7 max-w-[800px] max-h-[500px] overflow-y-auto ">
            <div className="border w-[75px] rounded-lg flex-col text-center shadow-shadowInset bg-white ">
              <button onClick={toggleSortOption}>
                <div className="flex items-center hover:font-bold">
                  sort
                  <div> {openSort ? <IoMdArrowDropup /> : <IoMdArrowDropdown />} </div>
                </div>
              </button>
              {openSort && (
                <div>
                  <button
                    onClick={fromTheOldestComments}
                    className="border-t w-[70px] hover:font-bold"
                  >
                    oldest
                  </button>
                  <br />
                  <button
                    onClick={fromTheLatestComments}
                    className="border-t w-[70px] hover:font-bold"
                  >
                    newest
                  </button>
                </div>
              )}
            </div>

            {comments.map((comment: CommentRequestInterface, index) => {
              const isCurrentUser = comment?.author?._id === userInfo?.id;
              return (
                <div
                  key={comment?._id}
                  className={`w-1/2 p-1 ${index % 2 === 0 ? "mr-auto" : "ml-auto"}`}
                >
                  <div className=" justify-between w-full p-3 rounded-lg bg-[#C0BFBF]">
                    <div>
                      <div className=" flex justify-between font-bold border-b-[1px] border-black border-w">
                        <p>{comment?.author?.name}</p>
                        <p>{formatDate(new Date(comment.createdAt))}</p>
                      </div>
                      <div className="mt-3">
                        <p className=" break-words text-lg  max-w-[150px] md:max-w-xs">
                          {comment?.comment}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      {isCurrentUser && (
                        <div>
                          <button onClick={() => setShowModal(comment._id)}>
                            <AiOutlineEdit size={18} />
                          </button>

                          <button onClick={() => deleteComment(comment._id)}>
                            <AiOutlineDelete size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {showModal === comment._id && (
                    <EditModal
                      setShowModal={setShowModal}
                      commentId={comment?._id}
                      authorName={comment?.author?.name}
                      commentText={comment?.comment}
                      commentDate={formatDate(new Date(comment.createdAt))}
                      editComment={editComment}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <p>This meal has no comments yet, be the first one to comment!</p>
        </div>
      )}
    </div>
  );
};
export default GetComments;
