import { useState, useEffect } from "react";
import useAuthCheck from "../../hooks/useAuthCheck";
import {
  ExtendOrderInterface,
  ResponseOrderDataInterface,
  ResponseSendedOrderInterface,
} from "../../interfaces/CartInterfaces";
import { PlacingOrderServices } from "../../services/PlacingOrderServices";
import formatDate from "../../utils/dateUtils";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import Loading from "../../components/Loading";
import { AuthServices } from "../../services/AuthServices";

import { AuthorInterface } from "../../interfaces/AuthInterfaces";


//to codereview

const User = () => {
  const [sendedOrders, setSendedOrder] = useState<ResponseOrderDataInterface[]>();
  const [openOrder, setOpenOrder] = useState<boolean>(true);
  const [selectedOrder, setSelectedOrder] = useState();
  const [openSort, setOpenSort] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const isAuthenticated = useAuthCheck();

  
const userInfo: AuthorInterface | null = AuthServices.getUserInfoFromLocalStorage();


  const getOrders = async () => {
    try {
      const response: ResponseSendedOrderInterface = await PlacingOrderServices.viewOrders();

      setSendedOrder(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getOrders();
    }
  }, []);

  const toggleOrderInfo = (sendedOrderId: any): void => {
    setOpenOrder(!openOrder);
    setSelectedOrder(sendedOrderId);
  };

  const toggleSortBtn = (): void => {
    setOpenSort(!openSort);
  };

  const fromTheLatestOrder = (): void => {
    if (sendedOrders !== undefined) {
      const sortingFromLatest: ResponseOrderDataInterface[] = sendedOrders
        .slice()
        .sort((sendedOrder1, sendedOrder2) => {
          const date1: Date = new Date(sendedOrder1.createdAt);
          const date2: Date = new Date(sendedOrder2.createdAt);
          return date2.getTime() - date1.getTime();
        });

      setSendedOrder(sortingFromLatest);
    }
  };

  const fromTheOldestOrder = (): void => {
    if (sendedOrders !== undefined) {
      const sortingFromOldest = sendedOrders.slice().sort((sendedOrder1, sendedOrder2) => {
        const date1: Date = new Date(sendedOrder1.createdAt);
        const date2: Date = new Date(sendedOrder2.createdAt);
        return date1.getTime() - date2.getTime();
      });

      setSendedOrder(sortingFromOldest);
    }
  };

  return (
    <div className=" max-w-6xl mx-auto">
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2">
          <div className="border bg-slate-100 max-w-[800px] max-h-[300px]"> 
<h1>User:</h1>
<p>  {isAuthenticated && userInfo &&<p>{userInfo?.name}</p>}</p>
<p>{isAuthenticated && userInfo &&<p>{userInfo?.email}</p>}</p>
          </div>


        <div >
          <div className="border w-[75px] rounded-lg flex-col text-center shadow-shadowInset bg-white">
            <button onClick={toggleSortBtn}>
              <div className="flex items-center hover:font-bold">
                sort
                <div> {openSort ? <IoMdArrowDropup /> : <IoMdArrowDropdown />} </div>
              </div>
            </button>
            {openSort && (
              <div>
                <button onClick={fromTheOldestOrder} className="border-t w-[70px] hover:font-bold">
                  oldest
                </button>
                <br />
                <button onClick={fromTheLatestOrder} className="border-t w-[70px] hover:font-bold">
                  newest
                </button>
              </div>
            )}
          </div>
          
          <div className="max-w-[800px] max-h-[500px] overflow-y-auto ">
          {sendedOrders?.map((orderDetails: ResponseOrderDataInterface) => {
            let order = orderDetails.order;
            const summaryOrder = order.reduce(
              (summary: number, orderItem: ExtendOrderInterface) => {
                let total = summary + (orderItem.price || 0);
                return parseFloat(total.toFixed(2));
              },
              0
            );

            return (
              
              <div key={orderDetails._id} className="mt-5 p-5 rounded-lg shadow-shadowInset bg-white">
                <div className="flex items-center gap-2">
                  <p className=" text-xl font-semibold">
                    {formatDate(new Date(orderDetails.createdAt))}
                  </p>
                  <button onClick={() => toggleOrderInfo(orderDetails._id)}>
                    {openOrder && orderDetails._id === selectedOrder ? (
                      <IoMdArrowDropup size={22} />
                    ) : (
                      <IoMdArrowDropdown size={22} />
                    )}
                  </button>
                </div>

                {openOrder && orderDetails._id === selectedOrder ? (
                  <div
                    className="grid grid-cols-1
          lg:grid-cols-3"
                  >
                    <div className=" mb-3">
                      <p>
                        <span className="font-bold">name:</span> {orderDetails.name}
                      </p>
                      <p>
                        <span className="font-bold">surname:</span> {orderDetails.surname}
                      </p>
                      <p>
                        <span className="font-bold">phone number: </span>
                        {orderDetails.phoneNumber}
                      </p>
                    </div>

                    <div className=" mb-3">
                      <p>
                        <span className="font-bold">city:</span> {orderDetails.city}
                      </p>
                      <p>
                        <span className="font-bold">street:</span> {orderDetails.street}
                      </p>
                      <p>
                        <span className="font-bold">house number:</span> {orderDetails.houseNumber}
                      </p>
                      <p>
                        <span className="font-bold">payment method:</span>{" "}
                        {orderDetails.paymentMethod}
                      </p>
                    </div>

                    <div>
                      {orderDetails.order?.map((order: ExtendOrderInterface) => {
                        return (
                          <div key={order._id}>
                            <div className="grid grid-cols-4 md:flex md:gap-5 lg:grid lg:grid-cols-4">
                              <p className="col-span-2">{order.meal?.name}</p>

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
                      <p className="mt-1 text-lg font-semibold">Total Price: {summaryOrder}$</p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 text-lg font-semibold">Total Price: {summaryOrder}$</p>
                )}
              </div>
            
            );
          })}  
          </div>
        </div>
        </div>
      )}
    </div>
  );
};
export default User;
