import { sensitiveHeaders } from "http2";
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
        let order = orderDetails.order;
        const summaryOrder = order.reduce((summary: number, orderItem: ExtendOrderInterface) => {
          let total = summary + (orderItem.price || 0);
          return parseFloat(total.toFixed(2));
        }, 0);

        return (
          <div key={orderDetails._id} className="mt-10 ">
            <p>{formatDate(new Date(orderDetails.createdAt))}</p>

            <div
              className="grid grid-cols-1
          xl:grid-cols-3"
            >
              <div>
                <p>name: {orderDetails.name}</p>
                <p>surname: {orderDetails.surname}</p>
                <p>phone number: {orderDetails.phoneNumber}</p>
              </div>

              <div>
                <p>city: {orderDetails.city}</p>
                <p>street: {orderDetails.street}</p>
                <p>house number: {orderDetails.houseNumber}</p>
                <p>payment method: {orderDetails.paymentMethod}</p>
              </div>

              <div>
                {orderDetails.order?.map((order: ExtendOrderInterface) => {
                  return (
                    <div key={order._id}>
                      <div className="flex gap-5">
                        <p>{order.meal?.name}</p>

                        <div className="flex">
                          <p>{order.quantity}</p>
                          <p>x</p>
                          <p>{order.meal?.price}</p>
                        </div>

                        <p>{order.price}</p>
                      </div>
                    </div>
                  );
                })}
                <p>Total Price: {summaryOrder}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default User;
