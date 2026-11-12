import type { Page } from "playwright";

export class CartPage {
  constructor(private readonly page: Page) {}

  async getProductNames(): Promise<string[]> {
    return this.page
      .locator('[data-test="inventory-item-name"]')
      .allTextContents();
  }
}
