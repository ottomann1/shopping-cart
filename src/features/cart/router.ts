import { Router } from "express";
import { getCart, createCart, deleteCart } from "./service";

const cartRouter = Router();

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

cartRouter.delete("/api/carts/:cartId", async (req, res) => {
  const id = req.params.cartId;
  const deletedCart = deleteCart(id);
  res.json(deletedCart);
});

export default cartRouter;
