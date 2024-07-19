import { client, db } from "./db";
import { cart, product, cartproducts } from "./schema";
import express from "express";
import { eq } from "drizzle-orm";
import { seedData } from "./seed";
import { CartProduct } from "./types";
import { debug } from "console";
import cartRouter from "./features/cart/router";
import { deleteCart } from "./features/cart/service";

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
