import { createContext, ReactNode, useState } from "react";
import { ContextDataInterface } from "../interfaces/ContextInterface";

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<ContextDataInterface | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [test, setTest] = useState<string>("test");

  return <CartContext.Provider value={{ test, setTest }}>{children}</CartContext.Provider>;
};
