import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  real,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { cartproducts } from "../cart/schema";

export const product = pgTable("product", {
  productId: uuid("product_id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  price: real("price").notNull().default(0.0),
});

export const productRelations = relations(product, ({ many }) => ({
  cartproducts: many(cartproducts),
}));
