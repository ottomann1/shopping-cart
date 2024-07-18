import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
export const carts = pgTable("carts", {
  cartid: uuid("cart_id").primaryKey().defaultRandom(),
  totalNumberOfItems: integer("total_number_of_items").default(0),
  totalPrice: numeric("total_price", { precision: 10, scale: 2 }),
});

export const cartsRelations = relations(carts, ({ many }) => ({
  cartsToProducts: many(cartsToProducts),
}));

export const products = pgTable("products", {
  productId: uuid("product_id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
});

export const productRelations = relations(products, ({ many }) => ({
  productsToCarts: many(cartsToProducts),
}));

export const cartsToProducts = pgTable("cartsToProducts", {
  id: uuid("id").primaryKey().defaultRandom(),
  cartID: uuid("cart_id")
    .notNull()
    .references(() => carts.cartid),
  productsId: uuid("products_id")
    .notNull()
    .references(() => products.productId),
  quantity: integer("quantity").notNull(),
});

export const cartsToProductsRelations = relations(
  cartsToProducts,
  ({ one }) => ({
    product: one(products, {
      fields: [cartsToProducts.productsId],
      references: [products.productId],
    }),
    cart: one(carts, {
      fields: [cartsToProducts.cartID],
      references: [carts.cartid],
    }),
  }),
);
