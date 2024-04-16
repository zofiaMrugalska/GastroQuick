import { IoIosCloseCircleOutline } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthServices } from "../services/AuthServices";
import { ResendVerificationModalInterface } from "../interfaces/ModalInterface";

const ResendVerificationModal: React.FC<ResendVerificationModalInterface> = ({ setShowModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ email: string }>();

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    try {
      const response = await AuthServices.resendVerificationCode(data.email);
      if (response.success === true) {
        toast.success(response.message);
      }
    } catch (error: any) {
      const errorMessage: string = error.toString();
      toast.error(errorMessage);
    }
    reset();
  };

  return (
    <div style={{ backgroundColor: " rgba(0, 0, 0, 0.5)" }} className=" fixed inset-0 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center mt-20 min-h-[300px] max-w-[400px] bg-[#ffffff]  p-8  rounded-xl ">
        <button onClick={() => setShowModal(false)} className=" relative left-36 bottom-26">
          <IoIosCloseCircleOutline size={30} color="gray" />
        </button>
        <h2 className=" mt-3 text-center font-semibold">
          Please enter your email address to resend the verification email.
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex justify-between mb-4"></div>
            <input
              {...register("email", {
                required: "email is required",
              })}
              type="email"
              placeholder="Email"
              className="border rounded-lg p-2 min-w-[300px]"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <button
            type="submit"
            className=" mt-4 bg-[#ff8f34] py-2 rounded-lg min-w-[300px] font-semibold hover:bg-[#fc9e52] hover:scale-95"
          >
            Resend Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResendVerificationModal;
