import { db } from "./db";
import { carts, products, cartProducts } from "./schema";

// Function to read data
async function readData() {
  // Fetch all carts
  const allCarts = await db.select().from(carts).execute();
  console.log("Carts:", allCarts);

  // Fetch all products
  const allProducts = await db.select().from(products).execute();
  console.log("Products:", allProducts);

  // Fetch all cart products
  const allCartProducts = await db.select().from(cartProducts).execute();
  console.log("Cart Products:", allCartProducts);

  // Fetch a specific cart with its products
  const cartId = "your-cart-id";
  const cartWithProducts = await db
    .select()
    .from(cartProducts)
    .innerJoin(carts, carts.cartId.eq(cartProducts.cartId))
    .innerJoin(products, products.productId.eq(cartProducts.productId))
    .where(cartProducts.cartId.eq(cartId))
    .execute();

  console.log("Cart with Products:", cartWithProducts);
}

// Run the read function
readData().catch(console.error);
