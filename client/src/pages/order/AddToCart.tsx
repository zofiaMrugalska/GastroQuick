import { useState } from "react";
import { menuInterface } from "../../interfaces/MenuInterfaces";
import { CartServices } from "../../services/CartServices";

const AddToCart: React.FC<{ oneMeal: menuInterface }> = ({ oneMeal }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const reduceQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className=" text-2xl font-semibold ">{(oneMeal.price * quantity).toFixed(2)}$</h1>

      <div className=" min-w-[250px] min-h-[40px] flex items-center justify-between border rounded-lg">
        <button
          className=" min-h-[40px] bg-[#77767677] border px-4 rounded-lg"
          onClick={reduceQuantity}
        >
          -
        </button>
        <p className=" font-semibold">{quantity}</p>
        <button
          className="  min-h-[40px] bg-[#ff8f34] border px-4 rounded-lg"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>

      <button className="min-w-[250px] mt-2 p-2 bg-[#77767677] text-center rounded-lg" onClick={}>
        Add to cart
      </button>
    </div>
  );
};
export default AddToCart;
