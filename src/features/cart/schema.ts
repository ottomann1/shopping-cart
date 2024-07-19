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
import { product } from "../product/schema";

export const cart = pgTable("cart", {
  cartId: uuid("cart_id").primaryKey().defaultRandom(),
  totalNumberOfItems: integer("total_number_of_items").default(0),
  totalPrice: real("total_price").default(0.0),
});

export const cartsRelations = relations(cart, ({ many }) => ({
  cartsToProducts: many(cartproducts),
}));

export const cartproducts = pgTable("cartproducts", {
  id: uuid("id").primaryKey().defaultRandom(),
  cartId: uuid("cart_id")
    .notNull()
    .references(() => cart.cartId, {onDelete: 'cascade'}),
  productId: uuid("product_id")
    .notNull()
    .references(() => product.productId, {onDelete: 'cascade'}),
  quantity: integer("quantity").notNull(),
});

export const cartproductsRelations = relations(cartproducts, ({ one }) => ({
  product: one(product, {
    fields: [cartproducts.productId],
    references: [product.productId],
  }),
  cart: one(cart, {
    fields: [cartproducts.cartId],
    references: [cart.cartId],
  }),
}));
