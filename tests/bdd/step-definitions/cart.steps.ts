import assert from "node:assert/strict";
import { DataTable, Then, When } from "@cucumber/cucumber";
import { BddWorld } from "../support/world";

function productsPage(world: BddWorld) {
  if (!world.productsPage) {
    throw new Error(
      "BDD ProductsPage is not initialized. Check the scenario hooks.",
    );
  }

  return world.productsPage;
}

function cartPage(world: BddWorld) {
  if (!world.cartPage) {
    throw new Error("BDD CartPage is not initialized. Check the scenario hooks.");
  }

  return world.cartPage;
}

function productNames(table: DataTable): string[] {
  return table.raw().map(([productName]) => productName);
}

When(
  "I add these products to the cart",
  async function (this: BddWorld, table: DataTable) {
    await productsPage(this).addProducts(productNames(table));
  },
);

When("I open the shopping cart", async function (this: BddWorld) {
  await productsPage(this).openCart();
});

Then(
  "the cart should contain exactly these products",
  async function (this: BddWorld, table: DataTable) {
    assert.deepEqual(
      await cartPage(this).getProductNames(),
      productNames(table),
    );
  },
);
