import { expect, test } from "../support/uiFixtures";
import { CartPage } from "../pages/CartPage";
import { InventoryPage } from "../pages/InventoryPage";
import { loginAsStandardUser } from "../support/authentication";

test("adds products to the cart and verifies its contents", async ({
  page,
  uiCredentials,
}) => {
  await loginAsStandardUser(page, uiCredentials.standardUser);

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addProductToCart("Sauce Labs Backpack");
  await inventoryPage.addProductToCart("Sauce Labs Bike Light");
  await inventoryPage.openCart();

  const cartPage = new CartPage(page);
  await expect(cartPage.itemCount).toHaveText("2");
  await expect.poll(() => cartPage.getItemNames()).toEqual([
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
  ]);
});
