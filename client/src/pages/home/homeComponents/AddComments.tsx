import { useForm, SubmitHandler } from "react-hook-form";
import { AddCommentsProps, CommentRequestInterface } from "../../../interfaces/CommentInterfaces";
import { AuthServices } from "../../../services/AuthServices";
import { CommentServices } from "../../../services/CommentServices";
import { useParams } from "react-router-dom";

const AddComments = ({ getCommentsData }: AddCommentsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentRequestInterface>();

  //dokonczyc dodac  typy do hook forma pobrac id z params i dodac do req.body stowrzyc funckje onSubmit oblsuzyc posta

  //na przycisk dodaje sie komenatrza, komentarz moze dac tylko osoba zalogowana wiec musi miec ona token i info o userze, jesli nie ma to alert ze musi sie zalogowac zeby dodac komm
  const params = useParams();

  const onSubmit: SubmitHandler<CommentRequestInterface> = async (data) => {
    const getToken = AuthServices.getTokenFromLocalStorage();
    const getUserInfo = AuthServices.getUserInfoFromLocalStorage();

    console.log(getToken, "token");
    console.log(getUserInfo, "user");

    if (!getToken || !getUserInfo) {
      alert("you must be logged in to add a comment");
    } else {
      try {
        const response = await CommentServices.addComment(data, getToken, params.id);
        if (response.success === true) {
          console.log(response, "odp");
          console.log(response.data.comment, "KOMENTARZ");
          alert(response.message);
          if (params.id) {
            getCommentsData(params.id);
          }
        }
      } catch (error) {
        console.log(error, "error");
        alert(error);
      }
    }

    reset();
  };

  return (
    <div>
      <h1 className=" text-xl font-semibold">Comments:</h1>
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
