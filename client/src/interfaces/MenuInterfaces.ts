export interface menuInterface {
  _id: string;
  name: string;
  price: number;
  description: string;
  jpg: string;
}

export interface responseMealInterface {
  data: menuInterface[];
  message: string;
  success: boolean;
}

export interface responseOneMealInterface {
  data: menuInterface;
  message: string;
  success: boolean;
}
