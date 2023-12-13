import { useState } from "react";
import { SummaryOrderInterface } from "../../interfaces/CartInterfaces";
import PlacingOrderModal from "./PlacingOrderModal";

//reviewed

const SummaryOrder = ({ totalQuantity, totalPrice }: SummaryOrderInterface) => {
  // typ zeby byl jak w inncyh sposob
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className=" mt-8">
      <h1>Summary:</h1>

      <div className="flex gap-2">
        <h1>Total quantity:</h1>
        <p>{totalQuantity()}</p>
      </div>

      <div className="flex gap-2">
        <h1>Total price:</h1>
        <p>{totalPrice()}$</p>
      </div>

      <button
        onClick={() => setShowModal(!showModal)}
        className="  py-1 px-5 rounded-lg shadow-shadowInset"
      >
        Next
      </button>

      {showModal && <PlacingOrderModal showModal={showModal} setShowModal={setShowModal} />}
    </div>
  );
};
export default SummaryOrder;
