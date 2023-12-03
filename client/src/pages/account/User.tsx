import { useState, useEffect } from "react";
import useAuthCheck from "../../hooks/useAuthCheck";
import {
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
      {sendedOrders?.map((order: ResponseOrderDataInterface) => {
        return (
          <div key={order._id}>
            <p>{formatDate(new Date(order.createdAt))}</p>
            <p>{order.name}</p>
            <p>{order.surname}</p>
            <p>{order.city}</p>
            <p>{order.street}</p>
            <p>{order.houseNumber}</p>
            <p>{order.phoneNumber}</p>
            <p>{order.paymentMethod}</p>

            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
};
export default User;
