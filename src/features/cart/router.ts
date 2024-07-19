import { Router } from "express";
import { getCart, createCart } from "./service";

export const cartRouter = Router();

cartRouter.post("/", async (req, res) => {
  try {
    const newCart = await createCart();
    res.json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

cartRouter.get("/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const newCart = await getCart(id);
    res.json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
