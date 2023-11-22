import { SummaryOrderInterface } from "../../interfaces/CartInterfaces";

const SummaryOrder = ({ totalQuantity, totalPrice }: SummaryOrderInterface) => {
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

      <button>Next</button>
    </div>
  );
};
export default SummaryOrder;
