export interface CreateProduct {
  name: string;
  stock_quantity: number;
  price: number;
  image?: Buffer;
}
