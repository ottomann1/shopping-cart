import db from "./db";
import { cart, product, productToCart } from "./schema";
import express from "express";
import { eq } from "drizzle-orm";
import { seedData } from "./seed";
import { CartProduct } from "./types";

const app = express();
const port = 3000;

app.use(express.json());

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
  try {
    const newBody = req.body
    const { cartId } = req.params;
    const newCartProduct = await db
      .insert(productToCart)
      .values({ cartId: cartId, productId: newBody.productId, quantity: newBody.quantity })
      .returning();
    console.log(newCartProduct);

    res.json(newCartProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
