import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpInterface } from "../../../interfaces/AuthInterfaces";
import { signUpServices } from "../../../services/authServices/Auth";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<SignUpInterface>();

  const [showPassword, setShowPassword] = useState<boolean>(false); //ustawiamy setera ktory bedzie przechowywal informacje na temat tego czy chemy zbey bylo widac haslo czy nie, domyslnie jest ustawiony ze nie hcemy go widziec

  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate("/signIn");
  };

  const onSubmit: SubmitHandler<SignUpInterface> = async (data) => {
    console.log(data);
    signUpServices(data, navigateToSignIn);
    reset();
  };

  return (
    <div className=" min-h-[72vh]  flex flex-col justify-center items-center gap-3">
      <h1 className=" text-xl font-semibold">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <input
            {...register("name", {
              required: "name is required",
              minLength: { value: 4, message: "no less than 4 characters" },
              maxLength: { value: 20, message: "no more than 20 characters" },
            })}
            type="text"
            placeholder="name"
            className="border rounded-lg p-2 min-w-[300px]"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        <div>
          <input
            {...register("email", { required: "email is required" })}
            type="email"
            placeholder="email"
            className="border rounded-lg p-2 min-w-[300px]"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div className=" relative">
          <input
            {...register("password", {
              required: "password is required",
              minLength: { value: 4, message: "no less than 4 characters" },
              maxLength: { value: 20, message: "no more than 20 characters" },
            })}
            type={showPassword ? "text" : "password"} //w zaleznosci od tego czy jest false czy true zmieniamy typ w inpuciee text albo password
            placeholder="password"
            id="password"
            className="border rounded-lg p-2 min-w-[300px]"
          />

          <p className="text-red-500 text-sm">{errors.password?.message}</p>

          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[10px] left-[270px] cursor-pointer"
          >
            {showPassword ? <AiOutlineEye size={22} /> : <AiOutlineEyeInvisible size={22} />}
            {/* tutaj ustawiamy swetera na przeciwny do domyslenego po kliknieciu, w zaleznosci od stanu setera ikonka jest przekreslina lub nie */}
          </div>
        </div>

        <div className=" relative">
          <input
            {...register("confirmPassword", {
              required: "confirm password is required",
              validate: (value) => value === getValues("password") || "Passwords do not match",
              minLength: { value: 4, message: "no less than 4 characters" },
              maxLength: { value: 20, message: "no more than 20 characters" },
            })}
            type={showConfirmPassword ? "text" : "password"} //w zaleznosci od tego czy jest false czy true zmieniamy typ w inpuciee text albo password
            placeholder="confirm password"
            id="confirmPassword"
            className="border rounded-lg p-2 min-w-[300px]"
          />

          <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>

          <div
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute top-[10px] left-[270px] cursor-pointer"
          >
            {showConfirmPassword ? <AiOutlineEye size={22} /> : <AiOutlineEyeInvisible size={22} />}
            {/* tutaj ustawiamy swetera na przeciwny do domyslenego po kliknieciu, w zaleznosci od stanu setera ikonka jest przekreslina lub nie */}
          </div>
        </div>

        <button
          type="submit"
          className=" bg-[#ff8f34] py-2 rounded-lg min-w-[300px] font-semibold hover:bg-[#fc9e52] hover:scale-95"
        >
          Sign Up
        </button>
      </form>

      <div className=" mt-6 flex flex-col items-center text-sm ">
        <p>Already have an account??</p>
        <Link to={"/signIn"} className=" text-[#ff6e2a] font-bold">
          Sign In!
        </Link>
      </div>
    </div>
  );
};
export default SignUp;
