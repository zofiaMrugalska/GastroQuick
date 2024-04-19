import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthServices } from "../../../services/AuthServices";
import { VerifyFormInterface, VerifyInterface } from "../../../interfaces/AuthInterfaces";
import ResendVerificationModal from "../../../components/ResendVerificationModal";

const AccountVerification = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const verificationToken = queryParams.get("verificationToken");
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VerifyFormInterface>();

  const navigate = useNavigate();

  const navigateToSignIn = (): void => {
    navigate("/signIn");
  };

  const onSubmit: SubmitHandler<VerifyFormInterface> = async (data) => {
    const verificationData: VerifyInterface = {
      verificationCode: data.verificationCode,
      verificationToken: verificationToken || " ",
    };

    try {
      const response = await AuthServices.verifyAccount(verificationData);
      if (response.success === true) {
        toast.success(response.message);
        navigateToSignIn();
      }
    } catch (error: any) {
      const errorMessage: string = error.toString();
      toast.error(errorMessage);
    }
    reset();
  };

  return (
    <div className=" min-h-[72vh]  flex flex-col justify-center items-center gap-3">
      <h1 className=" text-xl font-semibold">Account Verification</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <input
            {...register("verificationCode", {
              required: "code is required",
              minLength: { value: 6, message: "not less than 6 numbers" },
            })}
            type="text"
            placeholder="Enter your verification code here"
            className="border rounded-lg p-2 min-w-[300px]"
          />
          <p className="text-red-500 text-sm">{errors.verificationCode?.message}</p>
        </div>

        <button
          type="submit"
          className=" bg-[#ff8f34] py-2 rounded-lg min-w-[300px] font-semibold hover:bg-[#fc9e52] hover:scale-95"
        >
          Send Code
        </button>
      </form>

      <button
        onClick={() => setShowModal(true)}
        className=" text-[13px] hover:underline hover:scale-95 hover:font-semibold"
      >
        Resend verification email.
      </button>
      {showModal && <ResendVerificationModal setShowModal={setShowModal} />}
    </div>
  );
};

export default AccountVerification;
