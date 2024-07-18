import db from "./db";
import { cart, product, productToCart } from "./schema";
import express from "express";
import { eq } from "drizzle-orm";
import { seedData } from "./seed";
import { CartProduct } from "./types";

const app = express();
const port = 3000;

seedData();

app.post("/api/carts/", async (req, res) => {
  console.log("line 9");

  const newCart = await db.insert(cart).values({ totalPrice: 0 }).returning();
  console.log(newCart);
  res.json(newCart);
});

app.get("/api/carts/:id/", async (req, res) => {
  console.log("line 21");

  const newCart = await db
    .select()
    .from(cart)
    .where(eq(cart.cartId, req.params.id))
    .execute();

  res.json(cart);
});

app.post("/api/carts/:cartId/products/", async (req, res) => {
  console.log(req);
  
  const { cartId } = req.params;
  const { productId, quantity } = req.body;

  const newCartProduct = await db
    .insert(productToCart)
    .values({ cartId: cartId, productId: productId, quantity: quantity })
    .returning();
  console.log(newCartProduct);
  
    res.json(newCartProduct);
});
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
