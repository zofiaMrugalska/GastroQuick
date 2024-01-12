import { ExtendOrderInterface } from "./CartInterfaces";

export interface ContextDataInterface {
  cartQuantity: number;
  setCartQuantity: React.Dispatch<React.SetStateAction<number>>;
  order: ExtendOrderInterface[];
  cartUpdated: boolean;
  setCartUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}
