import { menuInterface } from "./MenuInterfaces";

export interface OrderInterface {
  _id: string | undefined;
  quantity: number;
  meal?: menuInterface;
  price?: number;
  isOrderActiv: boolean;
}
