import { db } from "./db";
import { faker } from "@faker-js/faker";
import { productTable } from "./features/product/index";

async function createRandomproduct() {
  await db.insert(productTable).values({
    name: faker.commerce.product(),
    price: Number(faker.commerce.price({ min: 0.5, max: 250 })),
  });
}

export function seedData() {
  for (let i = 0; i < 10; i++) {
    createRandomproduct();
  }
}

seedData();
