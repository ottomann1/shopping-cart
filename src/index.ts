import { client, db } from "./db";
import { cart, cartproducts } from "./features/cart/index";
import express from "express";
import { eq } from "drizzle-orm";
import { seedData } from "./seed";
import { CartProduct } from "./features/cart/index";
import { debug } from "console";
import { cartRouter } from "./features/cart/index";

debug("Debug message before server starts");

const app = express();
const port = 3000;

app.use(express.json());

async function faker() {
  const products = await db.select().from(product);
  if (!products) {
    console.log("new");

    seedData();
  } else {
    console.log("old");
  }
}
faker();

app.use("/api/carts", cartRouter);

app.post("/api/carts/:cartId/products/", async (req, res) => {
  try {
    const newBody = req.body;
    const { cartId } = req.params;
    const newCartProduct = await db
      .insert(cartproducts)
      .values({
        cartId: cartId,
        productId: newBody.productId,
        quantity: newBody.quantity,
      })
      .returning();
    console.log(newCartProduct);

    res.json(newCartProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/carts/:cartId", async (req, res) => {
  const id = req.params.cartId;
  const deleted = await db.delete(cart).where(eq(cart.cartId, id)).returning();
  res.json(deleted);
});

const server = app.listen(port, () => {
  console.log(`App listening on ${port}`);
  console.log(`Process ID: ${process.pid}`);
});

const gracefulShutdown = (signal) => {
  console.log(`${signal} signal received: closing HTTP server`);
  server.close(() => {
    console.log("HTTP server closed");
    client.end().then(() => {
      console.log("DB connection closed (?)");
    });
  });
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
