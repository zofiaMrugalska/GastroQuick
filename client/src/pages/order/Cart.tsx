import { useEffect, useState } from "react";
import { OrderInterface, ResponseOrderMeals } from "../../interfaces/CartInterfaces";
import { CartServices } from "../../services/CartServices";
import useAuthCheck from "../../hooks/useAuthCheck";
import Loading from "../../components/Loading";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";

const Cart = () => {
  /// jesli jesstes zalogowany a nie masz niczego w koszyku, ma sie pokazac ze twoj koszyk jest pusty
  ///jesli jestes zalogowany ma aja sie pokazac twoje posilki w zamolwieniu po czym mozesz przejsc dalej i to kupic, dac adres, wybrac forme platnosci i zaplacic, po czym zamowienie przejdzie do historii zamowien

  const [order, setOrder] = useState<OrderInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isAuthenticated = useAuthCheck();

  const getMealsInOrder = async () => {
    try {
      const response: ResponseOrderMeals = await CartServices.getMealsFromCart();
      setOrder(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMealFromOrder = async (id: string | undefined) => {
    if (!isAuthenticated) {
      toast.error("You cannot remove a meal that does not belong to you");
    } else {
      try {
        const response = await CartServices.deleteOneMealFromOrder(id);
        if (response.success === true) {
          toast.success(response.message);
        }
        getMealsInOrder();
      } catch (error: any) {
        const errorMessage: string = error.toString();
        toast.error(errorMessage);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      getMealsInOrder();
    }
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {order.length > 0 ? (
            <div>
              {order.map((order: OrderInterface) => {
                return (
                  <div key={order._id} className=" mt-9 grid grid-cols-5 place-items-center">
                    <img
                      src={order.meal?.jpg}
                      alt="photo of the meal"
                      className=" mt-2  min-h-[70px] min-w-[70px] max-h-[70px] max-w-[70px] md:min-h-[100px] md:min-w-[100px] md:max-h-[100px] md:max-w-[100px] object-cover"
                    />

                    <p>{order.meal?.name}</p>
                    <p>{order.quantity}</p>
                    <p>{order.price}</p>

                    <button onClick={() => deleteMealFromOrder(order._id)}>
                      <AiOutlineDelete size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Your shopping cart is empty</p>
          )}
        </div>
      )}
    </div>
  );
};
export default Cart;
