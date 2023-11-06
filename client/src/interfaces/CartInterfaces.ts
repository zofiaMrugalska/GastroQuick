import { menuInterface } from "./MenuInterfaces";

export interface OrderInterface {
  id: string | undefined;
  quantity: number;
  meal?: menuInterface;
  price?: number;
  isOrderActiv: boolean;
}
