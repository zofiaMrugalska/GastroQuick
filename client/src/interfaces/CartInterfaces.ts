import { menuInterface } from "./MenuInterfaces";

export interface OrderInterface {
  _id: string | undefined;
  quantity: number;
  isOrderActiv: boolean;
}

export interface ExtendOrderInterface extends OrderInterface {
  author: string;
  meal: menuInterface;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResponseOrderMeals {
  data: ExtendOrderInterface[];
  message: string;
  success: boolean;
}

export interface SummaryOrderInterface {
  totalQuantity: () => number;
  totalPrice: () => number;
}
