import { useForm, SubmitHandler } from "react-hook-form";
import { AddCommentsProps, CommentRequestInterface } from "../../../interfaces/CommentInterfaces";
import { AuthServices } from "../../../services/AuthServices";
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
        const response = await CommentServices.addComment(data, params.id);
        if (response.success === true) {
          toast.success(response.message);
          if (params.id) {
            getCommentsData(params.id);
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
    <div className="flex flex-col justify-center items-center mt-20 ">
      {/* <h1 className=" text-xl font-semibold">Comments:</h1> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("comment", {
              required: "comment is required",
              minLength: { value: 1, message: "no less than 1 characters" },
              maxLength: { value: 100, message: "no more than 100 characters" },
            })}
            type="text"
            placeholder="write a comment..."
            className="border rounded-lg p-2 min-w-[300px]"
          />
          <p className="text-red-500 text-sm">{errors.comment?.message}</p>
        </div>
        <button type="submit" className=" py-2 rounded-lg min-w-[300px] font-semibold ">
          Add comment
        </button>
      </form>
    </div>
  );
};
export default AddComments;
