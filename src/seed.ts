import { db } from "./db";
import { faker } from "@faker-js/faker";
import { cart } from "./features/cart/index";
import { product } from "./features/product/index";

async function createRandomCart() {
  await db
    .insert(cart)
    .values({
      totalNumberOfItems: 0,
    })
    .execute();
}

async function createRandomproduct() {
  await db.insert(product).values({
    name: faker.commerce.product(),
    price: Number(faker.commerce.price({ min: 0.5, max: 250 })),
  });
}

export function seedData() {
  for (let i = 0; i < 3; i++) {
    createRandomCart();
  }
  for (let i = 0; i < 10; i++) {
    createRandomproduct();
  }
}

seedData();
