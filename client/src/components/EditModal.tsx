import { useForm, SubmitHandler } from "react-hook-form";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface EditModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<null | string>>;
  commentId: string;
  authorName: string;
  commentText: string;
  commentDate: string;
  editComment: (id: string, editedComment: string) => Promise<void>;
}

const EditModal: React.FC<EditModalProps> = ({
  setShowModal,
  commentId,
  authorName,
  commentText,
  commentDate,
  editComment,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ editedComment: string }>();

  const onSubmit: SubmitHandler<{ editedComment: string }> = async (data) => {
    console.log(data);
    editComment(commentId, data.editedComment);
  };

  return (
    <div
      style={{ backgroundColor: " rgba(0, 0, 0, 0.5)" }}
      className=" fixed inset-0 flex justify-center items-center"
    >
      <div className="flex flex-col justify-center items-center mt-20 min-h-[500px] bg-[#161616] p-8  rounded-xl ">
        <button onClick={() => setShowModal(null)} className=" relative left-36 bottom-36">
          <IoIosCloseCircleOutline size={30} color="white" />
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex justify-between mb-4">
              <p className="text-white ">{authorName}</p>
              <p className=" text-white ">{commentDate}</p>
            </div>
            <input
              {...register("editedComment", {
                required: "comment is required",
                minLength: { value: 1, message: "no less than 1 characters" },
                maxLength: { value: 100, message: "no more than 100 characters" },
              })}
              type="text"
              placeholder={commentText}
              className="border rounded-lg p-2 min-w-[300px]"
            />
            <p className="text-red-500 text-sm">{errors.editedComment?.message}</p>
          </div>

          <button
            type="submit"
            className=" mt-4 bg-[#ff8f34] py-2 rounded-lg min-w-[300px] font-semibold hover:bg-[#fc9e52] hover:scale-95"
          >
            Edit comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
