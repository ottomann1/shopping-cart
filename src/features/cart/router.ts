import { Router } from "express";
import { createCart, getCart } from "./service";
const router = Router();

router.post("/api/carts/", async (req, res) => {
  console.log("line 9");
  const newCart = createCart();
  res.json(newCart);
});

router.get("/api/carts/:id/", async (req, res) => {
  const { id } = req.params;

  const newCart = getCart(id);

  res.json(newCart);
});
