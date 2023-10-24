import { useState } from "react";
import { menuInterface } from "../../interfaces/MenuInterfaces";

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
    <div>
      <h1>{oneMeal.price * quantity}</h1>

      <div className=" max-w-[250px] flex items-center justify-between border">
        <button className="bg-[#77767677] border px-3" onClick={reduceQuantity}>
          -
        </button>
        <p>{quantity}</p>
        <button className=" bg-[#ff8f34] border px-3" onClick={increaseQuantity}>
          +
        </button>
      </div>

      <button>Add to cart</button>
    </div>
  );
};
export default AddToCart;
