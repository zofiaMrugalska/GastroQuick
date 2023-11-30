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

//reviewed

export interface SummaryOrderInterface {
  totalQuantity: () => number;
  totalPrice: () => number;
}

export interface PlaceOrderInterface {
  name: string;
  surname: string;
  phoneNumber: string;
  street: string;
  houseNumber: string;
  city: string;
  paymentMethod: "card" | "cash";
  order: OrderInterface;
}
//naprawe typ
