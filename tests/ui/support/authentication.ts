import type { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

const standardUser = {
  username: "standard_user",
  password: "secret_sauce",
};

export async function loginAsStandardUser(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(standardUser.username, standardUser.password);
}
