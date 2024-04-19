import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthServices } from "../../services/AuthServices";
import { SetNewPasswordFormInterface, SetNewPasswordInterface } from "../../interfaces/AuthInterfaces";
import { useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const SetNewPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const resetPasswordToken = queryParams.get("resetPasswordToken");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SetNewPasswordFormInterface>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit: SubmitHandler<SetNewPasswordFormInterface> = async (data) => {
    const setNewPasswordData: SetNewPasswordInterface = {
      resetPasswordToken: resetPasswordToken || " ",
      resetPasswordVerificationCode: data.resetPasswordVerificationCode,
      newPassword: data.newPassword,
    };

    try {
      const response = await AuthServices.setNewPassword(setNewPasswordData);
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
    <div className=" min-h-[72vh]  flex flex-col justify-center items-center gap-3">
      <h1 className=" text-xl font-semibold">Set new password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <input
            {...register("resetPasswordVerificationCode", {
              required: "code is required",
              minLength: { value: 6, message: "not less than 6 numbers" },
            })}
            type="text"
            placeholder="Enter your reset code here"
            className="border rounded-lg p-2 min-w-[300px]"
          />
          <p className="text-red-500 text-sm">{errors.resetPasswordVerificationCode?.message}</p>
        </div>

        <div className=" relative">
          <input
            {...register("newPassword", {
              required: "new password is required",
              minLength: { value: 8, message: "not less than 8 characters" },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Set your new password"
            className="border rounded-lg p-2 min-w-[300px]"
          />
          <p className="text-red-500 text-sm">{errors.newPassword?.message}</p>

          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[10px] left-[270px] cursor-pointer"
          >
            {showPassword ? <AiOutlineEye size={22} /> : <AiOutlineEyeInvisible size={22} />}
          </div>
        </div>

        <button
          type="submit"
          className=" bg-[#ff8f34] py-2 rounded-lg min-w-[300px] font-semibold hover:bg-[#fc9e52] hover:scale-95"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SetNewPassword;
