import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthorInterface, LoginResponseInterface, SignInInterface } from "../../../interfaces/AuthInterfaces";
import { AuthServices } from "../../../services/AuthServices";
import toast from "react-hot-toast";
import useAuthCheck from "../../../hooks/useAuthCheck";
import ResendVerificationModal from "../../../components/ResendVerificationModal";

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInInterface>();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showVerificationButton, setShowVerificationButton] = useState<boolean>(false);

  const isAuthenticated = useAuthCheck();

  const navigate = useNavigate();

  const navigateToMainPage = (): void => {
    navigate("/");
  };

  const onSubmit: SubmitHandler<SignInInterface> = async (data) => {
    if (!isAuthenticated) {
      toast.error("You need to log out to log in to another account");
    } else {
      try {
        const response: LoginResponseInterface = await AuthServices.login(data);
        if (response.success === true) {
          toast.success(response.message);
          navigateToMainPage();
        }

        const token: string = response.data.accessToken;
        const userInfo: AuthorInterface = response.data.user;

        AuthServices.saveTokenToLocalStorage(token);
        AuthServices.saveUserInfoToLocalStorage(userInfo);
      } catch (error: any) {
        if (error.response && error.response.status === 403) {
          setShowVerificationButton(true);
          toast.error("Account is not verified. Please verify your account.");
        } else {
          const errorMessage: string = error.response?.data?.message || "Error during login";
          toast.error(errorMessage);
        }
      }
    }

    reset();
  };

  return (
    <div className=" min-h-[60vh]  flex flex-col justify-center items-center gap-3">
      <h1 className=" text-xl font-semibold">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <input
            {...register("name", { required: "name is required" })}
            type="text"
            placeholder="name"
            className="border rounded-lg p-2 min-w-[300px]"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        <div className=" relative">
          <input
            {...register("password", { required: "password is required" })}
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="border rounded-lg p-2 min-w-[300px]"
          />

          <p className="text-red-500 text-sm">{errors.password?.message}</p>

          <div onClick={() => setShowPassword(!showPassword)} className="absolute top-[10px] left-[270px]">
            {showPassword ? <AiOutlineEye size={22} /> : <AiOutlineEyeInvisible size={22} />}
          </div>
        </div>

        <button
          type="submit"
          className=" bg-[#ff8f34] py-2 rounded-lg min-w-[300px] font-semibold hover:bg-[#fc9e52] hover:scale-95"
        >
          Sign In
        </button>
      </form>

      {!showVerificationButton ? (
        <div className=" mt-6 flex flex-col items-center text-sm ">
          <p>You don't have an account yet?</p>
          <Link to={"/signUp"} className=" text-[#ff6e2a] font-bold">
            Sign Up!
          </Link>
        </div>
      ) : (
        <button
          onClick={() => setShowModal(true)}
          className=" text-[13px] hover:underline hover:scale-95 hover:font-semibold"
        >
          Resend verification email.
        </button>
      )}

      {showModal && <ResendVerificationModal setShowModal={setShowModal} />}
    </div>
  );
};
export default SignIn;
