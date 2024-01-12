import { createContext, ReactNode, useEffect, useState } from "react";
import { ContextDataInterface } from "../interfaces/ContextInterface";
import { CartServices } from "../services/CartServices";
import { ExtendOrderInterface, ResponseOrderMeals } from "../interfaces/CartInterfaces";

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<ContextDataInterface | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartUpdated, setCartUpdated] = useState<boolean>(false);
  const [cartQuantity, setCartQuantity] = useState<number>(0);
  const [order, setOrder] = useState<ExtendOrderInterface[]>([]);

  const getMealsInOrder = async () => {
    try {
      const response: ResponseOrderMeals = await CartServices.getMealsFromCart();
      setOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMealsInOrder();
  }, []);

  useEffect(() => {
    if (cartUpdated) {
      getMealsInOrder();
      setCartUpdated(false);
    }
  }, [cartUpdated]);

  return (
    <CartContext.Provider value={{ cartQuantity, setCartQuantity, order, cartUpdated, setCartUpdated }}>
      {children}
    </CartContext.Provider>
  );
};
