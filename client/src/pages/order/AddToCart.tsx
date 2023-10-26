import { useState } from "react";
import { useParams } from "react-router-dom";
import { menuInterface } from "../../interfaces/MenuInterfaces";
import { AuthServices } from "../../services/AuthServices";
import { CartServices } from "../../services/CartServices";
import { OrderInterface } from "../../interfaces/CartInterfaces";

const AddToCart: React.FC<{ oneMeal: menuInterface }> = ({ oneMeal }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const { id } = useParams<{ id: string | undefined }>();

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const reduceQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const postMealToCart = async (mealId: string | undefined, quantity: number) => {
    const token = AuthServices.getTokenFromLocalStorage();
    const author = AuthServices.getUserInfoFromLocalStorage();

    let dataFromUser: OrderInterface = {
      id: mealId,
      quantity: quantity,
      isOrderActiv: true,
      token: token,
    };

    if (!token || !author) {
      alert("musisz byc zalgoowany a zosia musi zrobic ladneog boxa i dac go wszedzie :)");
    }
    try {
      const response = await CartServices.addToCart(dataFromUser);
      if (response.success === true) {
        alert(response.message);
      }
    } catch (error) {
      alert(error);
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

      <button
        onClick={() => postMealToCart(id, quantity)}
        className="min-w-[250px] mt-2 p-2 bg-[#77767677] text-center rounded-lg"
      >
        Add to cart
      </button>
    </div>
  );
};
export default AddToCart;
