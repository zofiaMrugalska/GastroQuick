export interface OrderInterface {
  id: string | undefined;
  quantity: number;
  price?: number;
  isOrderActiv: boolean;
}
