import { useForm, SubmitHandler } from "react-hook-form";
import { EditedCommentRequestInterface } from "../interfaces/CommentInterfaces";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface EditModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditModal: React.FC<EditModalProps> = ({ setShowModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditedCommentRequestInterface>();

  return (
    <div
      style={{ backgroundColor: " rgba(0, 0, 0, 0.115)" }}
      className=" fixed inset-0 flex justify-center items-center"
    >
      <div className="flex flex-col justify-center items-center mt-20 min-h-[500px] bg-[#1616167d] p-8  rounded-xl ">
        <button onClick={() => setShowModal(false)} className=" relative left-36 bottom-40">
          <IoIosCloseCircleOutline size={30} color="white" />
        </button>
        <form>
          <div>
            <input
              {...register("editedComment", {
                required: "comment is required",
                minLength: { value: 1, message: "no less than 1 characters" },
                maxLength: { value: 100, message: "no more than 100 characters" },
              })}
              type="text"
              placeholder="edit comment..."
              className="border rounded-lg p-2 min-w-[300px]"
            />
            <p className="text-red-500 text-sm">{errors.editedComment?.message}</p>
          </div>
          <button type="submit" className=" py-2 rounded-lg min-w-[300px] font-semibold ">
            Edit comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
