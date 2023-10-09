import { useForm, SubmitHandler } from "react-hook-form";

const Comments = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //dokonczyc dodac  typy do hook forma pobrac id z params i dodac do req.body stowrzyc funckje onSubmit oblsuzyc posta

  return (
    <div>
      <h1 className=" text-xl font-semibold">Comments:</h1>
      <form>
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
        </div>
        <button type="submit" className=" py-2 rounded-lg min-w-[300px] font-semibold ">
          Add comment
        </button>
      </form>
    </div>
  );
};
export default Comments;
