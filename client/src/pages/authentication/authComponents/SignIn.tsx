import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SignInInterface } from "../../../interfaces/AuthInterfaces";
import { signInServices } from "../../../services/authServices/Auth";
import { useGetUserToken } from "../../../hooks/useGetUserToken";
import { useGetUserInfo } from "../../../hooks/useGetUserInfo";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInInterface>();

  const [showPassword, setShowPassword] = useState<boolean>(false); //ustawiamy setera ktory bedzie przechowywal informacje na temat tego czy chemy zbey bylo widac haslo czy nie, domyslnie jest ustawiony ze nie hcemy go widziec

  const getToken = useGetUserToken();
  const getUserInfo = useGetUserInfo();

  const onSubmit: SubmitHandler<SignInInterface> = async (data) => {
    console.log(getToken, " przed przycsikiem token");
    console.log(getUserInfo, "przed przyciskiem INFO USEr");

    if (getToken || getUserInfo) {
      alert("you need to log out to log in to another account");
    } else {
      await signInServices(data);
    }
    console.log("++++++++++++++++++");
    console.log(getToken, " POOO przycsikiem token");
    console.log(getUserInfo, "POOO przyciskiem INFO USEr");

    reset(); // po zasubmitowaniu danych z inputa resetujemy je na puste
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
            type={showPassword ? "text" : "password"} //w zaleznosci od tego czy jest false czy true zmieniamy typ w inpuciee text albo password
            placeholder="password"
            className="border rounded-lg p-2 min-w-[300px]"
          />

          <p className="text-red-500 text-sm">{errors.password?.message}</p>

          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[10px] left-[270px]"
          >
            {showPassword ? <AiOutlineEye size={22} /> : <AiOutlineEyeInvisible size={22} />}
            {/* tutaj ustawiamy swetera na przeciwny do domyslenego po kliknieciu, w zaleznosci od stanu setera ikonka jest przekreslina lub nie */}
          </div>
        </div>

        <button
          type="submit"
          className=" bg-[#ff8f34] py-2 rounded-lg min-w-[300px] font-semibold hover:bg-[#fc9e52] hover:scale-95"
        >
          Sign In
        </button>
      </form>

      <div className=" mt-6 flex flex-col items-center text-sm ">
        <p>You don't have an account yet?</p>
        <Link to={"/signUp"} className=" text-[#ff6e2a] font-bold">
          Sign Up!
        </Link>
      </div>
    </div>
  );
};
export default SignIn;
