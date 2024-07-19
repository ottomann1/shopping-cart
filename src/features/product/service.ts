import { db } from "../../db";
import { cartproducts } from "../../schema";

export async function postProducts(newBody, cartId: string) {
  const newCartProduct = await db
    .insert(cartproducts)
    .values({
      cartId: cartId,
      productId: newBody.productId,
      quantity: newBody.quantity,
    })
    .returning();
  console.log(newCartProduct);
  return newCartProduct;
}
