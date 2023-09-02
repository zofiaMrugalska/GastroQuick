import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const Auth = () => {
  interface SignIn {
    name: string;
    password: string;
  }
  // fzjsiusjfioueouo
  const commitTest = a;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignIn>();

  const [showPassword, setShowPassword] = useState<boolean>(false); //ustawiamy setera ktory bedzie przechowywal informacje na temat tego czy chemy zbey bylo widac haslo czy nie, domyslnie jest ustawiony ze nie hcemy go widziec

  const onSubmit: SubmitHandler<SignIn> = (data) => {
    console.log(data);

    reset(); // po zasubmitowaniu danych z inputa resetujemy je na puste
  };

  return (
    <div className=" min-h-[60vh] flex flex-col justify-center items-center gap-3">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <input
            {...register("name", { required: "name is required" })}
            type="text"
            placeholder="name"
            className="border rounded-lg p-2"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        <div>
          <input
            {...register("password", { required: "password is required" })}
            type={showPassword ? "text" : "password"} //w zaleznosci od tego czy jest false czy true zmieniamy typ w inpuciee text albo password
            placeholder="password"
            className="border rounded-lg p-2"
          />

          <p className="text-red-500 text-sm">{errors.password?.message}</p>

          <div onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            {/* tutaj ustawiamy swetera na przeciwny do domyslenego po kliknieciu, w zaleznosci od stanu setera ikonka jest przekreslina lub nie */}
          </div>
        </div>

        <button type="submit"> Sign In</button>
      </form>
    </div>
  );
};
export default Auth;
