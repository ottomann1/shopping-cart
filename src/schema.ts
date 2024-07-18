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



export const cart = pgTable("cart", {
  cartId: uuid("cart_id").primaryKey().defaultRandom(),
  totalNumberOfItems: integer("total_number_of_items").default(0),
  totalPrice: real("total_price").default(0.0),
});

export const cartsRelations = relations(cart, ({ many }) => ({
  cartsToProducts: many(productToCart),
}));

export const product = pgTable("product", {
  productId: uuid("product_id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  price: real("price").notNull(),
});

export const productRelations = relations(product, ({ many }) => ({
  productToCart: many(productToCart),
}));

export const productToCart = pgTable("productToCart", {
  id: uuid("id").primaryKey().defaultRandom(),
  cartId: uuid("cart_id")
    .notNull()
    .references(() => cart.cartId),
  productId: uuid("product_id")
    .notNull()
    .references(() => product.productId),
  quantity: integer("quantity").notNull(),
});

export const productToCartRelations = relations(productToCart, ({ one }) => ({
  product: one(product, {
    fields: [productToCart.productId],
    references: [product.productId],
  }),
  cart: one(cart, {
    fields: [productToCart.cartId],
    references: [cart.cartId],
  }),
}));
