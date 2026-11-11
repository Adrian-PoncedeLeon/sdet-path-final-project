import type { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import type { LoginCredentials } from "./uiFixtures";

export async function loginAsStandardUser(
  page: Page,
  credentials: LoginCredentials,
): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);
}
