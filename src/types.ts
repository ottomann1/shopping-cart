export type Cart = {
  cartId: string;
  totalNumberOfItems: number;
  totalPrice: number;
};

export type Product = {
  productId: string;
  name: string;
  price: number;
};

export type CartProduct = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
};
