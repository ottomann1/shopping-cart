import db from "./db";
import { carts, products, cartsToProducts } from "./schema";
import { faker } from "@faker-js/faker";

async function seedData() {
  try {
    // Generate and insert fake products
    const productIds: string[] = [];
    for (let i = 0; i < 10; i++) {
      const result = await db
        .insert(products)
        .values({
          name: faker.commerce.productName(),
          price: faker.number.float({ min: 1, max: 100, precision: 0.01 }), // Ensures price is a float
        })
        .returning({ productId: products.productId })
        .execute();

      productIds.push(result[0].productId);
    }

    // Generate and insert fake carts
    const cartIds: string[] = [];
    for (let i = 0; i < 5; i++) {
      const result = await db
        .insert(carts)
        .values({
          totalNumberOfItems: 0,
          totalPrice: 0.0, // Initialize as a float
        })
        .returning({ cartid: carts.cartid })
        .execute();

      cartIds.push(result[0].cartid);
    }

    // Generate and insert fake products in carts
    for (const cartId of cartIds) {
      let totalNumberOfItems = 0;
      let totalPrice = 0.0;

      for (let j = 0; j < 3; j++) {
        const productId = faker.helpers.arrayElement(productIds);
        const quantity = faker.number.int({ min: 1, max: 10 }); // Ensures quantity is an integer

        await db
          .insert(cartsToProducts)
          .values({
            cartID: cartId,
            productsId: productId,
            quantity,
          })
          .execute();

        // Fetch the product price
        const product = await db
          .select()
          .from(products)
          .where(eq(products.productId, productId))
          .execute();

        if (product.length > 0) {
          totalNumberOfItems += quantity;
          totalPrice += product[0].price * quantity;
        }
      }

      // Update the cart with the new totals
      await db
        .update(carts)
        .set({
          totalNumberOfItems,
          totalPrice, // Ensure totalPrice is a float
        })
        .where(eq(carts.cartid, cartId))
        .execute();
    }

    console.log("Seeding completed");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

// Run the seed function
seedData()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seeding error", err);
    process.exit(1);
  });
