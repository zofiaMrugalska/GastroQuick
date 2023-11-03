import { useEffect, useState } from "react";
import { isJSDocReturnTag } from "typescript";
import { OrderInterface } from "../../interfaces/CartInterfaces";
import { CartServices } from "../../services/CartServices";

const Cart = () => {
  const [order, setOrder] = useState<OrderInterface[]>([]);

  useEffect(() => {
    const getMealsInOrder = async () => {
      try {
        const response = await CartServices.getMealsFromCart();
        setOrder(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMealsInOrder();
  }, []);

  return (
    <div>
      {order.map((order: any) => {
        return (
          <div key={order._id}>
            <p>{order.quantity}</p>
          </div>
        );
      })}
    </div>
  );
};
export default Cart;
