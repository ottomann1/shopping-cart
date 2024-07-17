import db from "./db";
import { carts, products, productsInCart } from "./schema";
import express from "express";
import { eq } from "drizzle-orm";

const app = express();
const port = 3000;

app.post("/api/carts/", async (req, res) => {
  console.log("line 9");

  await db
    .insert(carts)
    .values({
      totalPrice: 0,
    })
    .execute();
  res.send("hello world");
});

app.get("/api/carts/:id/", async (req, res) => {
  console.log("line 21");

  const cart = await db
    .select()
    .from(carts)
    .where(eq(carts.cartid, req.params.id))
    .execute();

  res.json(cart);
});

app.post("/api/carts/:cartId/products/", async (req, res) => {
  const { cartId } = req.params;
  const { productId, quantity } = req.body;

  const cart = await db
    .select()
    .from(carts)
    .where(eq(carts.cartid, cartId))
    .execute();

    const product = 
});
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
