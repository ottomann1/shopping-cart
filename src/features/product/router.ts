import { Router } from "express";
import { postProducts } from "./service";
const router = Router();

router.post("/api/carts/:cartId/products/", async (req, res) => {
  const { cartId } = req.params;
  const newBody = req.body;
  try {
    const postNewProduct = postProducts(newBody, cartId);

    res.json(postNewProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
