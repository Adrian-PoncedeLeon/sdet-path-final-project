import assert from "node:assert/strict";
import { CartPage } from "../pages/CartPage";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";
import {
  loadMobileCredentials,
  type MobileCredentials,
} from "../support/credentials";

describe("SauceDemo on Android Chrome", () => {
  let credentials!: MobileCredentials;

  before(() => {
    credentials = loadMobileCredentials();
  });

  it("allows a standard user to log in", async () => {
    const loginPage = new LoginPage();
    await loginPage.open();
    await loginPage.login(credentials.standardUser);

    const inventoryPage = new InventoryPage();
    assert.equal(await inventoryPage.getTitle(), "Products");
  });

  it("shows an error when a locked-out user attempts to log in", async () => {
    const loginPage = new LoginPage();
    await loginPage.open();
    await loginPage.login(credentials.lockedOutUser);

    assert.match(
      await loginPage.getErrorMessage(),
      /Sorry, this user has been locked out\./,
    );
  });

  it("adds products to the cart and verifies its contents", async () => {
    const loginPage = new LoginPage();
    await loginPage.open();
    await loginPage.login(credentials.standardUser);

    const inventoryPage = new InventoryPage();
    await inventoryPage.addToCart("sauce-labs-backpack");
    await inventoryPage.addToCart("sauce-labs-bike-light");
    await inventoryPage.openCart();

    const cartPage = new CartPage();
    assert.deepEqual(await cartPage.getItemNames(), [
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
    ]);
  });
});
