import { useEffect, useState } from "react";
import { OrderInterface } from "../../interfaces/CartInterfaces";
import { CartServices } from "../../services/CartServices";
import useAuthCheck from "../../hooks/useAuthCheck";
import Loading from "../../components/Loading";
import { AiOutlineDelete } from "react-icons/ai";

const Cart = () => {
  /// jesli jesstes zalogowany a nie masz niczego w koszyku, ma sie pokazac ze twoj koszyk jest pusty
  ///jesli jestes zalogowany ma aja sie pokazac twoje posilki w zamolwieniu po czym mozesz przejsc dalej i to kupic, dac adres, wybrac forme platnosci i zaplacic, po czym zamowienie przejdzie do historii zamowien

  const [order, setOrder] = useState<OrderInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isAuthenticated = useAuthCheck();
  console.log(isAuthenticated, "is AUth");
  console.log(order, "zamowienia");

  const getMealsInOrder = async () => {
    try {
      const response = await CartServices.getMealsFromCart();

      console.log(response);
      setOrder(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
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
                // console.log(order.meal?.name);
                // console.log(order.meal?.jpg);
                return (
                  <div key={order.id} className=" mt-9 grid grid-cols-5 place-items-center">
                    <img
                      src={order.meal?.jpg}
                      alt="photo of the meal"
                      className=" mt-2  min-h-[70px] min-w-[70px] max-h-[70px] max-w-[70px] md:min-h-[100px] md:min-w-[100px] md:max-h-[100px] md:max-w-[100px] object-cover"
                    />

                    <p>{order.meal?.name}</p>
                    <p>{order.quantity}</p>
                    <p>{order.price}</p>
                    <button>
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
