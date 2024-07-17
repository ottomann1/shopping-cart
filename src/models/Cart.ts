import { InferModel } from "drizzle-orm";
import { float } from "drizzle-orm/mysql-core";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const carts = pgTable("carts", {
  cartid: uuid("cart_id").primaryKey().defaultRandom(),
  totalNumberOfItems: integer("total_number_of_items").default(0),
  totalPrice: float("total_price"),
});

export const products = pgTable("products", {
  productId: uuid("product_id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  price: float("price").notNull(),
  quantity: integer("quantity").notNull(),
});
