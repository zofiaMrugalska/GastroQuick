import { useEffect, useState } from "react";
import { ExtendOrderInterface, ResponseOrderMeals } from "../../interfaces/CartInterfaces";
import { CartServices } from "../../services/CartServices";
import useAuthCheck from "../../hooks/useAuthCheck";
import Loading from "../../components/Loading";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import SummaryOrder from "./SummaryOrder";
import { useCartContext } from "../../hooks/useCartContext";

const Cart = () => {
  const [order, setOrder] = useState<ExtendOrderInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [price, setPrice] = useState<number>(0);
  const isAuthenticated = useAuthCheck();
  const { setCartUpdated } = useCartContext();

  const getMealsInOrder = async () => {
    try {
      const response: ResponseOrderMeals = await CartServices.getMealsFromCart();
      setOrder(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMealFromOrder = async (orderId: string | undefined) => {
    if (!isAuthenticated) {
      toast.error("You cannot remove a meal that does not belong to you");
    } else {
      try {
        const response = await CartServices.deleteOneMealFromOrder(orderId);
        if (response.success === true) {
          toast.success(response.message);
          setCartUpdated(true);
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

  const increaseEditQuantity = (orderId: string | undefined): void => {
    if (orderId !== undefined) {
      const orderIndex: number = order.findIndex((order) => order._id === orderId);

      const updatedOrders: ExtendOrderInterface[] = [...order];

      updatedOrders[orderIndex].quantity += 1;

      const sum = (updatedOrders[orderIndex].price + updatedOrders[orderIndex].meal?.price).toFixed(2);

      updatedOrders[orderIndex].price = parseFloat(sum);

      setOrder(updatedOrders);
    }
  };

  const reduceEditQuantity = (orderId: string | undefined): void => {
    const orderIndex: number = order.findIndex((order) => order._id === orderId);
    const updatedOrders: ExtendOrderInterface[] = [...order];
    if (updatedOrders[orderIndex].quantity > 1) {
      updatedOrders[orderIndex].quantity -= 1;
    }

    if (updatedOrders[orderIndex].price > updatedOrders[orderIndex].meal?.price) {
      const sum = (updatedOrders[orderIndex].price - updatedOrders[orderIndex].meal?.price).toFixed(2);

      updatedOrders[orderIndex].price = parseFloat(sum);
    }

    setOrder(updatedOrders);
  };

  const totalQuantity = (): number => {
    let calcualteQuantity = order.reduce((total, meal) => total + meal.quantity, 0);
    return calcualteQuantity;
  };

  useEffect(() => {
    const totalPrice = (): void => {
      let calculatePrice: number = order.reduce((total, meal) => total + meal.price, 0);
      let fixedPrice: number = parseFloat(calculatePrice.toFixed(2));
      setPrice(fixedPrice);
    };
    totalPrice();
  }, [order]);

  return (
    <div className=" max-w-6xl mx-auto">
      {loading ? (
        <Loading />
      ) : (
        <div>
          {order.length > 0 ? (
            <div>
              {order.map((order: ExtendOrderInterface) => {
                return (
                  <div
                    key={order._id}
                    className="  grid grid-cols-5 place-items-center border-b-[1px] border-[#C0BFBF]"
                  >
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}/images/${order.meal?.jpg}`}
                      alt="Delicious meal"
                      className=" m-2 min-h-[70px] min-w-[70px] max-h-[70px] max-w-[70px] md:min-h-[100px] md:min-w-[100px] md:max-h-[100px] md:max-w-[100px] object-cover justify-self-start"
                    />

                    <p className=" md:text-lg lg:text-xl">{order.meal?.name}</p>

                    <div className="flex gap-6 flex-row-reverse">
                      <button onClick={() => increaseEditQuantity(order._id)} className="text-xl hover:font-bold">
                        +tratatat
                        {/* XXXXXXXXXXXXXXXXXXXXX */}
                      </button>
                      <p className="text-lg">{order.quantity}</p>
                      <button onClick={() => reduceEditQuantity(order._id)} className="text-xl hover:font-bold">
                        -
                      </button>
                    </div>

                    <p className="text-lg">{order.price.toFixed(2)}$</p>

                    <button onClick={() => deleteMealFromOrder(order._id)} className="hover:scale-110">
                      <AiOutlineDelete size={20} />
                    </button>
                  </div>
                );
              })}
              <SummaryOrder totalQuantity={totalQuantity} price={price} />
            </div>
          ) : (
            <p className="text-center text-xl ">Your shopping cart is empty.</p>
          )}
        </div>
      )}
    </div>
  );
};
export default Cart;
