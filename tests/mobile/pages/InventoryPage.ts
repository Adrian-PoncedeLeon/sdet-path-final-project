export class InventoryPage {
  private readonly title = '[data-test="title"]';
  private readonly cartLink = '[data-test="shopping-cart-link"]';

  async getTitle(): Promise<string> {
    return $(this.title).getText();
  }

  async addToCart(productSlug: string): Promise<void> {
    await $(`[data-test="add-to-cart-${productSlug}"]`).click();
  }

  async openCart(): Promise<void> {
    await $(this.cartLink).click();
  }
}
