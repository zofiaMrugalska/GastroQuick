import { useState } from "react";
import { useParams } from "react-router-dom";
import { menuInterface } from "../../interfaces/MenuInterfaces";
import { CartServices } from "../../services/CartServices";
import { OrderInterface, ResponseOrderMeals } from "../../interfaces/CartInterfaces";
import { toast } from "react-hot-toast";
import useAuthCheck from "../../hooks/useAuthCheck";

const AddToCart: React.FC<{ oneMeal: menuInterface }> = ({ oneMeal }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const isAuthenticated = useAuthCheck();
  const { mealId } = useParams<{ mealId: string | undefined }>();

  //wytestowac te funkcje
  const increaseQuantity = (): void => {
    setQuantity(quantity + 1);
  };

  const reduceQuantity = (): void => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const postMealToCart = async (mealId: string | undefined, quantity: number) => {
    let dataFromUser: OrderInterface = {
      _id: mealId,
      quantity: quantity,
      isOrderActiv: true,
    };

    if (!isAuthenticated) {
      toast.error("You must be logged in to add meals to your cart");
    }
    try {
      const response: ResponseOrderMeals = await CartServices.addToCart(dataFromUser);
      if (response.success === true) {
        toast.success(response.message);
      }
    } catch (error: any) {
      const errorMessage: string = error.toString();
      toast.error(errorMessage);
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
        onClick={() => postMealToCart(mealId, quantity)}
        className="min-w-[250px] mt-2 p-2 bg-[#77767677] text-center rounded-lg"
      >
        Add to cart
      </button>
    </div>
  );
};
export default AddToCart;
