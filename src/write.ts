import { db } from "./db";
import { carts, products, cartProducts } from "./schema";
import { v4 as uuidv4 } from "uuid";

// Function to insert data
async function insertData() {
  // Insert a new product
  const productId = uuidv4();
  await db
    .insert(products)
    .values({
      productId,
      name: "Example Product",
      price: 19.99,
    })
    .execute();

  // Insert a new cart
  const cartId = uuidv4();
  await db
    .insert(carts)
    .values({
      cartId,
      totalNumberOfItems: 2,
      totalPrice: 39.98,
    })
    .execute();

  // Insert into cartProducts
  await db
    .insert(cartProducts)
    .values({
      cartId,
      productId,
      quantity: 2,
    })
    .execute();

  console.log("Data inserted successfully");
}

// Run the insert function
insertData().catch(console.error);
