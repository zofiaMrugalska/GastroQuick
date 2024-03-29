import { useState } from "react";
import { SummaryOrderInterface } from "../../interfaces/CartInterfaces";
import PlacingOrderModal from "./PlacingOrderModal";
import OrderModal from "../../components/OrderModal";

const SummaryOrder = ({ totalQuantity, price }: SummaryOrderInterface) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);

  return (
    <div className=" mt-8 text-center">
      <h1 className="text-2xl font-bold">Summary</h1>

      <div className="flex justify-center gap-4 text-lg">
        <h1>Total quantity:</h1>
        <p className=" font-semibold">{totalQuantity()}</p>
      </div>

      <div className="flex justify-center gap-2 text-lg">
        <h1>Total price:</h1>
        <p className=" font-semibold">{price}$</p>
      </div>

      <button
        onClick={() => setShowModal(!showModal)}
        className=" py-1 px-5 mt-3 rounded-lg shadow-shadowInset w-[150px] hover:scale-95 "
      >
        Next
      </button>

      {showModal && (
        <PlacingOrderModal
          showModal={showModal}
          setShowModal={setShowModal}
          showOrderModal={showOrderModal}
          setShowOrderModal={setShowOrderModal}
          price={price}
        />
      )}
      {showOrderModal && <OrderModal showOrderModal={showOrderModal} setShowOrderModal={setShowOrderModal} />}
    </div>
  );
};
export default SummaryOrder;
