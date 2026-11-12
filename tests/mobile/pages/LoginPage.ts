import type { MobileCredentials } from "../support/credentials";

export class LoginPage {
  private readonly usernameInput = '[data-test="username"]';
  private readonly passwordInput = '[data-test="password"]';
  private readonly loginButton = '[data-test="login-button"]';
  private readonly errorMessage = '[data-test="error"]';

  async open(): Promise<void> {
    await browser.url("/");
  }

  async login(credentials: MobileCredentials["standardUser"]): Promise<void> {
    await $(this.usernameInput).setValue(credentials.username);
    await $(this.passwordInput).setValue(credentials.password);
    await $(this.loginButton).click();
  }

  async getErrorMessage(): Promise<string> {
    const error = await $(this.errorMessage);
    await error.waitForDisplayed();
    return error.getText();
  }
}
