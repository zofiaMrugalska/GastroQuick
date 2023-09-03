import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  interface SignUpInterface {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<SignUpInterface>();

  const [showPassword, setShowPassword] = useState<boolean>(false); //ustawiamy setera ktory bedzie przechowywal informacje na temat tego czy chemy zbey bylo widac haslo czy nie, domyslnie jest ustawiony ze nie hcemy go widziec

  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const onSubmit: SubmitHandler<SignUpInterface> = (data) => {
    console.log(data);

    reset(); // po zasubmitowaniu danych z inputa resetujemy je na puste
  };

  return (
    <div className=" min-h-[60vh]  flex flex-col justify-center items-center gap-3">
      <h1>Sign Up</h1>
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
            className="absolute top-[15px] left-[275px]"
          >
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
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
            className="absolute top-[15px] left-[275px]"
          >
            {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            {/* tutaj ustawiamy swetera na przeciwny do domyslenego po kliknieciu, w zaleznosci od stanu setera ikonka jest przekreslina lub nie */}
          </div>
        </div>

        <button type="submit" className=" bg-[#ff8f34] py-2 rounded-lg min-w-[300px] ">
          Sign In
        </button>
      </form>

      <div>
        <p>Already have an account??</p>
        <Link to={"/signIn"}>Sign In!</Link>
      </div>
    </div>
  );
};
export default SignUp;
