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
import { productTable } from "../product/";

export const cartTable = pgTable("cart", {
  cartId: uuid("cart_id").primaryKey().defaultRandom(),
  totalNumberOfItems: integer("total_number_of_items").default(0),
  totalPrice: real("total_price").default(0.0),
});

export const cartsRelations = relations(cartTable, ({ many }) => ({
  cartsToProducts: many(cartproductsTable),
}));

export const cartproductsTable = pgTable("cartproducts", {
  id: uuid("id").primaryKey().defaultRandom(),
  cartId: uuid("cart_id")
    .notNull()
    .references(() => cartTable.cartId, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => productTable.productId, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
});

export const cartproductsRelations = relations(cartproductsTable, ({ one }) => ({
  product: one(productTable, {
    fields: [cartproductsTable.productId],
    references: [productTable.productId],
  }),
  cart: one(cartTable, {
    fields: [cartproductsTable.cartId],
    references: [cartTable.cartId],
  }),
}));
