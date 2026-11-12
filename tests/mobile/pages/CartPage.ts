export class CartPage {
  private readonly itemNames = '[data-test="inventory-item-name"]';

  async getItemNames(): Promise<string[]> {
    const items = await $$(this.itemNames);
    return items.map((item) => item.getText());
  }
}
