import { expect, test } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";

const standardUser = {
  username: "standard_user",
  password: "secret_sauce",
};

const lockedOutUser = {
  username: "locked_out_user",
  password: "secret_sauce",
};

const invalidCredentialsCases = [
  {
    name: "an unknown username",
    username: "unknown_user",
    password: "secret_sauce",
  },
  {
    name: "an incorrect password",
    username: "standard_user",
    password: "incorrect_password",
  },
];

test("allows a standard user to log in", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(standardUser.username, standardUser.password);

  const inventoryPage = new InventoryPage(page);
  await expect(page).toHaveURL(/inventory\.html$/);
  await expect(inventoryPage.pageTitle).toHaveText("Products");
});

test("shows an error when a locked-out user attempts to log in", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(lockedOutUser.username, lockedOutUser.password);

  await expect(loginPage.errorMessage).toContainText(
    "Sorry, this user has been locked out.",
  );
});

for (const credentials of invalidCredentialsCases) {
  test(`rejects invalid credentials with ${credentials.name}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(credentials.username, credentials.password);

    await expect(loginPage.errorMessage).toContainText(
      "Username and password do not match any user in this service",
    );
  });
}
