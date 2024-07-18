import db from "./db";
import { faker } from "@faker-js/faker";
import { CartProduct, Cart, Product } from "./types";

function createRandomCart(): Cart {
  return {
    cartid: faker.string.uuid(),
  };
}
function createRandomproduct(): Product {
  return {
    productId: faker.string.uuid(),
    name: faker.commerce.product(),
    price: faker.commerce.price({ min: 10, max: 250 }),
  };
}

async function seedData() {
  createRandomCart();
  createRandomproduct();
}

seedData();
