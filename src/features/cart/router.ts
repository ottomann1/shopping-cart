import { Router } from "express";
import { getCart, createCart, deleteCart, postProducts } from "./";

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

cartRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedCart = await deleteCart(id);
  res.json(deletedCart);
});

cartRouter.post("/:id/products/", async (req, res) => {
  const newBody = req.body;
  const { id } = req.params;
  const newCartProduct = await postProducts(newBody, id);
  console.log(newCartProduct);
  res.json(newCartProduct);
});
