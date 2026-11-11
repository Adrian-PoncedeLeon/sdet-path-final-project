import { expect, test } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { loginAsStandardUser } from "../support/authentication";

test("sorts products by price from low to high", async ({ page }) => {
  await loginAsStandardUser(page);

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.sortByPriceAscending();

  await expect.poll(() => inventoryPage.getProductPrices()).toEqual([
    7.99, 9.99, 15.99, 15.99, 29.99, 49.99,
  ]);
});
