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
      <h1 className="mb-3 text-3xl font-semibold ">{(oneMeal.price * quantity).toFixed(2)}$</h1>

      <div className=" min-w-[350px] min-h-[40px] flex items-center justify-between border rounded-lg">
        <button
          data-testid="reduceButton"
          className=" min-h-[40px] bg-[#ff8f34]  border px-4 rounded-lg hover:scale-105"
          onClick={reduceQuantity}
        >
          <p className="text-xl">-</p>
        </button>

        <p data-testid="quantityDisplay" className=" text-lg font-semibold ">
          {quantity}
        </p>

        <button
          data-testid="increaseButton"
          className="min-h-[40px] bg-[#ff8f34] border px-4 rounded-lg hover:scale-105 "
          onClick={increaseQuantity}
        >
          <p className="text-xl">+</p>
        </button>
      </div>

      <button
        onClick={() => postMealToCart(mealId, quantity)}
        className="min-w-[350px] mt-4 p-2 bg-[#ff8f34]  text-center rounded-lg hover:shadow-shadowInset hover:translate-y-[1px] hover:font-semibold"
      >
        Add to cart
      </button>
    </div>
  );
};
export default AddToCart;
