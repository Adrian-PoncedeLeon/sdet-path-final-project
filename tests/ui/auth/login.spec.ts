import { expect, test } from "../support/uiFixtures";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";

const invalidCredentialsCases = [
  {
    name: "an unknown username",
    username: "invalidUser",
    password: "standardUser",
  },
  {
    name: "an incorrect password",
    username: "standardUser",
    password: "invalidPassword",
  },
] as const;

test("allows a standard user to log in", async ({ page, uiCredentials }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(
    uiCredentials.standardUser.username,
    uiCredentials.standardUser.password,
  );

  const inventoryPage = new InventoryPage(page);
  await expect(page).toHaveURL(/inventory\.html$/);
  await expect(inventoryPage.pageTitle).toHaveText("Products");
});

test("shows an error when a locked-out user attempts to log in", async ({
  page,
  uiCredentials,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(
    uiCredentials.lockedOutUser.username,
    uiCredentials.lockedOutUser.password,
  );

  await expect(loginPage.errorMessage).toContainText(
    "Sorry, this user has been locked out.",
  );
});

for (const credentials of invalidCredentialsCases) {
  test(`rejects invalid credentials with ${credentials.name}`, async ({
    page,
    uiCredentials,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      uiCredentials[credentials.username].username,
      uiCredentials[credentials.password].password,
    );

    await expect(loginPage.errorMessage).toContainText(
      "Username and password do not match any user in this service",
    );
  });
}
