
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  numeric,
} from "drizzle-orm/pg-core";

export const carts = pgTable("carts", {
  cartid: uuid("cart_id").primaryKey().defaultRandom(),
  totalNumberOfItems: integer("total_number_of_items").default(0),
  totalPrice: numeric("total_price", { precision: 10, scale: 2 }), 
});

export const products = pgTable("products", {
  productId: uuid("product_id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(), 
});


export const productsInCart = pgTable("products_in_cart", {
  id: uuid("id").primaryKey().defaultRandom(),
  cartID: uuid('cart_id').notNull().references(() => carts.cartid),
  productsId: uuid('products_id').notNull().references(() => products.productId),
  quantity: integer("quantity").notNull(),
})