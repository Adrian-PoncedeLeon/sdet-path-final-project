import { expect, test } from "../support/uiFixtures";
import { InventoryPage } from "../pages/InventoryPage";
import { loginAsStandardUser } from "../support/authentication";

test("sorts products by price from low to high", async ({
  page,
  uiCredentials,
}) => {
  await loginAsStandardUser(page, uiCredentials.standardUser);

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.sortByPriceAscending();

  await expect.poll(() => inventoryPage.getProductPrices()).toEqual([
    7.99, 9.99, 15.99, 15.99, 29.99, 49.99,
  ]);
});
