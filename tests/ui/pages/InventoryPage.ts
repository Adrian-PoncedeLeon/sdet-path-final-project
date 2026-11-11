import type { Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly pageTitle: Locator;
  readonly productSort: Locator;
  readonly shoppingCartLink: Locator;

  constructor(private readonly page: Page) {
    this.pageTitle = page.getByTestId("title");
    this.productSort = page.getByTestId("product-sort-container");
    this.shoppingCartLink = page.getByTestId("shopping-cart-link");
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.page.getByTestId("inventory-item").filter({
      has: this.page.getByRole("button", {
        name: `View details for ${productName}`,
        exact: true,
      }),
    });

    await product.getByRole("button", { name: "Add to cart" }).click();
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async sortByPriceAscending(): Promise<void> {
    await this.productSort.selectOption("lohi");
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.page.getByTestId("inventory-item-price").allTextContents();
    return prices.map((price) => Number(price.replace("$", "")));
  }
}
