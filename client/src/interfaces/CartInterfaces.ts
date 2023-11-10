import { menuInterface } from "./MenuInterfaces";

export interface OrderInterface {
  _id: string | undefined;
  quantity: number;
  isOrderActiv: boolean;
  author?: string;
  meal?: menuInterface;
  price?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ResponseOrderMeals {
  data: OrderInterface[];
  message: string;
  success: boolean;
}
