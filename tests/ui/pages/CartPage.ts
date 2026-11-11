import type { Locator, Page } from "@playwright/test";

export class CartPage {
  readonly itemCount: Locator;
  private readonly items: Locator;

  constructor(page: Page) {
    this.itemCount = page.getByTestId("shopping-cart-badge");
    this.items = page.getByTestId("cart-contents-container").getByTestId("inventory-item");
  }

  async getItemNames(): Promise<string[]> {
    return this.items.getByTestId("inventory-item-name").allTextContents();
  }
}
