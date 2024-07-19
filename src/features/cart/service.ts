import { db } from "../../db";
import { cart, cartproducts } from "../../schema";
import { eq } from "drizzle-orm";

export async function createCart() {
  const newCart = await db.insert(cart).values({ totalPrice: 0 }).returning();
  console.log(newCart);
  return newCart;
}

export async function getCart(id: string) {
  const newCart = await db
    .select()
    .from(cart)
    .where(eq(cart.cartId, id))
    .execute();
  return newCart;
}

export async function deleteCart(id: string) {
  const cartToDelete = await db
    .delete(cart)
    .where(eq(cart.cartId, id))
    .returning();
  return cartToDelete;
}

export async function postProducts(newBody, cartId: string) {
  try {
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
  } catch (error) {
    console.error(error);
  }
}
