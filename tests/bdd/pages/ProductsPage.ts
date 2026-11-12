import type { Page } from "playwright";

export class ProductsPage {
  constructor(private readonly page: Page) {}

  async addProducts(productNames: string[]): Promise<void> {
    for (const productName of productNames) {
      const productSlug = productName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      await this.page
        .locator(`[data-test="add-to-cart-${productSlug}"]`)
        .click();
    }
  }

  async openCart(): Promise<void> {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}
