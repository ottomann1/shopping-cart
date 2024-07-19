import { client, db } from "./db";
import express from "express";
import { eq } from "drizzle-orm";
import { seedData } from "./seed";
import { debug } from "console";
import { product, productRouter } from "./features/product";
import { cartRouter } from "./features/cart";

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
app.use("/api/products", productRouter);

const server = app.listen(port, () => {
  console.log(`App listening on ${port}`);
  console.log(`Process ID: ${process.pid}`);
});

const gracefulShutdown = (signal: string) => {
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
