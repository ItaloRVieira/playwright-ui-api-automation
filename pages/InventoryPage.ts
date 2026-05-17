import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  sortSelect =
    '[data-test="product-sort-container"]';

  inventoryItems =
    '.inventory_item_name';

  inventoryPrices =
    '.inventory_item_price';

  cartButton =
    '.shopping_cart_link';

  cartBadge =
    '.shopping_cart_badge';

  async sortBy(option: string) {

    await this.page.selectOption(
      this.sortSelect,
      option
    );
  }

  async getItemNames(): Promise<string[]> {

    return await this.page
      .locator(this.inventoryItems)
      .allTextContents();
  }

  async getItemPrices(): Promise<number[]> {

    const prices = await this.page
      .locator(this.inventoryPrices)
      .allTextContents();

    return prices.map(price =>
      Number(price.replace('$', ''))
    );
  }

  async addProductToCart(productId: string) {

    await this.page.click(
      `[data-test="add-to-cart-${productId}"]`
    );
  }

  async removeProductFromCart(productId: string) {

    await this.page.click(
      `[data-test="remove-${productId}"]`
    );
  }

  getRemoveButton(productId: string) {

    return this.page.locator(
      `[data-test="remove-${productId}"]`
    );
  }

  getAddToCartButton(productId: string) {

    return this.page.locator(
      `[data-test="add-to-cart-${productId}"]`
    );
  }

  async getCartBadgeCount() {

    return await this.page
      .locator(this.cartBadge)
      .textContent();
  }

  async accessCart() {

    await this.page.click(
      this.cartButton
    );
  }
}