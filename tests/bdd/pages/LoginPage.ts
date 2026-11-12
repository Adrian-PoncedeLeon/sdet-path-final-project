import type { Page } from "playwright";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com");
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator('[data-test="login-button"]').click();
  }

  async getPageTitle(): Promise<string | null> {
    const title = this.page.locator('[data-test="title"]');
    await title.waitFor({ state: "visible" });
    return title.textContent();
  }

  async getErrorMessage(): Promise<string | null> {
    const error = this.page.locator('[data-test="error"]');
    await error.waitFor({ state: "visible" });
    return error.textContent();
  }
}
