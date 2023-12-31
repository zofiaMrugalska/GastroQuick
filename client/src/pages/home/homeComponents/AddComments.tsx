import { useForm, SubmitHandler } from "react-hook-form";
import { AddCommentsProps, CommentRequestInterface } from "../../../interfaces/CommentInterfaces";
import { CommentServices } from "../../../services/CommentServices";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuthCheck from "../../../hooks/useAuthCheck";

const AddComments = ({ getCommentsData }: AddCommentsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentRequestInterface>();

  const params = useParams();
  const isAuthenticated = useAuthCheck();

  const onSubmit: SubmitHandler<CommentRequestInterface> = async (data) => {
    if (!isAuthenticated) {
      toast.error("you must be logged in to add a comment");
    } else {
      try {
        const response = await CommentServices.addComment(data, params.mealId);
        if (response.success === true) {
          toast.success(response.message);
          if (params.mealId) {
            getCommentsData(params.mealId);
          }
        }
      } catch (error: any) {
        const errorMessage: string = error.toString();
        toast.error(errorMessage);
      }
    }

    reset();
  };

  return (
    <div className=" m-[2px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <input
            {...register("comment", {
              required: "comment is required",
              minLength: { value: 1, message: "no less than 1 characters" },
              maxLength: { value: 100, message: "no more than 100 characters" },
            })}
            type="text"
            placeholder="write a comment..."
            className="mt-10 border rounded-tl-lg rounded-tr-lg p-2 py-5 max-w-[800px] w-full"
          />
          <p className="text-red-500 text-sm">{errors.comment?.message}</p>
        </div>
        <button type="submit" className="max-w-[800px] w-full rounded-br-lg rounded-bl-lg mb-10 py-2 bg-[#ff8f34] hover:shadow-shadowInset hover:font-semibold">
          Add comment
        </button>
      </form>
    </div>
  );
};
export default AddComments;
