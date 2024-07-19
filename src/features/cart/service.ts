import { db } from "../../db";
import {
  cartTable,
  CartProduct,
  cartproductsTable,
  insertCartProduct,
  Cart,
} from "./";
import { Product, productTable } from "../product";
import { eq } from "drizzle-orm";

export async function createCart() {
  const newCart = await db
    .insert(cartTable)
    .values({ totalPrice: 0 })
    .returning();
  console.log(newCart);
  return newCart;
}

export async function getCart(id: string) {
  const newCart = await db
    .select()
    .from(cartTable)
    .where(eq(cartTable.cartId, id))
    .execute();
  return newCart;
}

export async function deleteCart(id: string) {
  const cartToDelete = await db
    .delete(cartTable)
    .where(eq(cartTable.cartId, id))
    .returning();
  return cartToDelete;
}

export async function postProducts(newBody: CartProduct, cartId: string) {
  try {
    const newCartProduct = await db
      .insert(cartproductsTable)
      .values({
        cartId: cartId,
        productId: newBody.productId,
        quantity: newBody.quantity,
      })
      .returning();
    if (newCartProduct == undefined) {
      throw new Error("newCartProduct error");
    }
    return newCartProduct[0];
  } catch (error) {
    console.error(error);
  }
}

export async function updateCart(
  cartId: string,
  newTotalNumberOfItems: number,
  newTotalPrice: number,
) {
  try {
    const newCart = await db
      .update(cartTable)
      .set({
        totalNumberOfItems: newTotalNumberOfItems,
        totalPrice: newTotalPrice,
      })
      .where(eq(cartTable.cartId, cartId));
  } catch (error) {
    console.log(error);
  }
}

export async function calculateCart(newCartProduct: CartProduct) {
  if (!newCartProduct) {
    throw new Error("newCartProduct is undefined");
  }

  console.log("newCartProduct:", newCartProduct);

  const cart = await db
    .select()
    .from(cartTable)
    .where(eq(cartTable.cartId, newCartProduct.cartId))
    .execute();

  console.log("Queried cart:", cart);
  const previousCartProducts = await db
    .select()
    .from(cartproductsTable)
    .where(eq(cartproductsTable.cartId, newCartProduct.cartId));
  console.log("previousCartProducts", previousCartProducts);

  const totalProducts: Product[] = [];

  previousCartProducts.forEach(async (currCartProduct: CartProduct) => {
    const currProduct: Product[] = await db
      .select()
      .from(productTable)
      .where(eq(productTable.productId, currCartProduct.productId));

    for (let i = 0; i < currCartProduct.quantity; i++) {
      totalProducts.push(currProduct[0]);
    }
  });
  let newTotalPrice = 0;
  let newTotalNumberOfItems = 0;
  totalProducts.forEach((product) => {
    newTotalPrice = newTotalPrice + product.price;
    newTotalNumberOfItems = newTotalNumberOfItems + 1;
  });

  const newCart = await db
    .update(cartTable)
    .set({
      totalPrice: newTotalPrice,
      totalNumberOfItems: newTotalNumberOfItems,
    })
    .where(eq(cartTable.cartId, cart[0].cartId))
    .returning();
  return newCart;
}
//skatteverket SL
