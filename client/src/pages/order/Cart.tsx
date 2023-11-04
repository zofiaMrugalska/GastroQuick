import { useEffect, useState } from "react";
import { OrderInterface } from "../../interfaces/CartInterfaces";
import { CartServices } from "../../services/CartServices";
import useAuthCheck from "../../hooks/useAuthCheck";

const Cart = () => {
  /// jesli jesstes zalogowany a nie masz niczego w koszyku, ma sie pokazac ze twoj koszyk jest pusty
  ///jesli jestes zalogowany ma aja sie pokazac twoje posilki w zamolwieniu po czym mozesz przejsc dalej i to kupic, dac adres, wybrac forme platnosci i zaplacic, po czym zamowienie przejdzie do historii zamowien

  const [order, setOrder] = useState<OrderInterface[]>([]);
  const isAuthenticated = useAuthCheck();
  console.log(isAuthenticated, "is AUth");

  const getMealsInOrder = async () => {
    try {
      const response = await CartServices.getMealsFromCart();

      console.log(response);
      setOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getMealsInOrder();
    }
  }, []);

  return (
    <div>
      {order.map((order: OrderInterface) => {
        return (
          <div key={order.id}>
            <p>{order.quantity}</p>
            <p>{order.price}</p>
          </div>
        );
      })}
    </div>
  );
};
export default Cart;
