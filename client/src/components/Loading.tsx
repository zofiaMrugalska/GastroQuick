import { CgSpinner } from "react-icons/cg";

const Loading = () => {
  return (
    <div className=" min-h-screen flex justify-center items-center flex-col">
      <h1 className=" animate-spin">
        <CgSpinner className="text-[#ff8f34]" size={70} />
      </h1>
    </div>
  );
};

export default Loading;
