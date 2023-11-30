import { useState } from "react";
import { SummaryOrderInterface } from "../../interfaces/CartInterfaces";
import PlacingOrderModal from "./PlacingOrderModal";

//to codereview

const SummaryOrder = ({ totalQuantity, totalPrice }: SummaryOrderInterface) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <h1>Summary:</h1>

      <div>
        <h1>Total quantity:</h1>
        <p>{totalQuantity()}</p>
      </div>

      <div>
        <h1>Total price:</h1>
        <p>{totalPrice()}$</p>
      </div>

      <button onClick={() => setShowModal(!showModal)}>Next</button>

      {showModal && <PlacingOrderModal showModal={showModal} setShowModal={setShowModal} />}
    </div>
  );
};
export default SummaryOrder;
