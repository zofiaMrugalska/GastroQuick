import { useContext } from "react";
import { ContextDataInterface } from "../interfaces/ContextInterface";
import { CartContext } from "../context/CartContext";

export function useCartContext(): ContextDataInterface {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within an CartProvider");
  }
  return context;
}
