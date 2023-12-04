import { useState, useEffect } from "react";
import useAuthCheck from "../../hooks/useAuthCheck";
import {
  ExtendOrderInterface,
  ResponseOrderDataInterface,
  ResponseSendedOrderInterface,
} from "../../interfaces/CartInterfaces";
import { PlacingOrderServices } from "../../services/PlacingOrderServices";
import formatDate from "../../utils/dateUtils";

//to codereview

const User = () => {
  const [sendedOrders, setSendedOrder] = useState<ResponseOrderDataInterface[]>();
  const isAuthenticated = useAuthCheck();

  const getOrders = async () => {
    try {
      const response: ResponseSendedOrderInterface = await PlacingOrderServices.viewOrders();
      console.log(response.data);
      setSendedOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getOrders();
    }
  }, []);

  return (
    <div>
      {sendedOrders?.map((orderDetails: ResponseOrderDataInterface) => {
        return (
          <div key={orderDetails._id}>
            <p>{formatDate(new Date(orderDetails.createdAt))}</p>
            <p>{orderDetails.name}</p>
            <p>{orderDetails.surname}</p>
            <p>{orderDetails.city}</p>
            <p>{orderDetails.street}</p>
            <p>{orderDetails.houseNumber}</p>
            <p>{orderDetails.phoneNumber}</p>
            <p>{orderDetails.paymentMethod}</p>

            <div>
              {orderDetails.order?.map((order: ExtendOrderInterface) => {
                console.log(order, "order");
                console.log(order.quantity, "order quantity");
                console.log(order.meal.name, "order meal");
                console.log(order.meal.description);
                return (
                  <div key={order._id}>
                    <div className="flex gap-5">
                      <p>{order.meal?.name}</p>
                      <p>{order.quantity}</p>
                      <p>{order.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
};
export default User;
