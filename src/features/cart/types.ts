import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { cartproductsTable, cartTable } from "./schema";

export type Cart = {
  cartId: string;
  totalNumberOfItems: number;
  totalPrice: number;
};

export type CartProduct = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
};

export type insertCart = typeof cartTable.$inferInsert;
export type selectCart = typeof cartTable.$inferSelect;

export type selectCartProduct = typeof cartproductsTable.$inferSelect;
export type insertCartProduct = typeof cartproductsTable.$inferInsert;
