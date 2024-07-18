import { InferModel } from 'drizzle-orm';
import { carts, products, cartsToProducts } from '../features/carts/cart.schema';

export type Cart = InferModel<typeof carts>;
export type Product = InferModel<typeof products>;
export type CartProduct = InferModel<typeof cartsToProducts>;
