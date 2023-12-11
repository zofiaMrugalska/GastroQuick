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

export interface OrderDetailsInterface {
  name: string;
  surname: string;
  phoneNumber: string;
  street: string;
  houseNumber: string;
  city: string;
  paymentMethod: "card" | "cash";
}

export interface ResponseOrderDataInterface extends OrderDetailsInterface {
  author: string;
  order: ExtendOrderInterface[];
  _id: string;
  createdAt: string;
}

export interface ResponseSendedOrderInterface {
  data: ResponseOrderDataInterface[];
  message: string;
  success: boolean;
}
