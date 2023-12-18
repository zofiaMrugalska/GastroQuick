import { GrStatusGood } from "react-icons/gr";
const OrderModal = () => {
  return (
    <div
      style={{ backgroundColor: " rgba(0, 0, 0, 0.5)" }}
      className=" fixed inset-0 flex justify-center items-center"
    >
      <div className=" bg-white p-12 rounded-lg">
        <div className="flex flex-col items-center">
          <h1 className=" text-2xl mb-5 font-semibold">Order placed successfully!</h1>
          <GrStatusGood size={45} />
          <p className=" text-lg mt-5">Thank you</p>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
