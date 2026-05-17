import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) { }

  checkoutButton =
    '[data-test="checkout"]';

  cartItems =
    '.cart_item';

  async proceedToCheckout() {

    await this.page.click(
      this.checkoutButton
    );
  }

  async getCartItemsCount() {

    return await this.page
      .locator(this.cartItems)
      .count();
  }

  async getCartItemNames(): Promise<string[]> {

    return await this.page
      .locator('.inventory_item_name')
      .allTextContents();
  }

  async getCartItemPrices(): Promise<number[]> {

    const prices = await this.page
      .locator('.inventory_item_price')
      .allTextContents();

    return prices.map(price =>
      Number(price.replace('$', ''))
    );
  }

  async getCartTotal() {

    const prices =
      await this.getCartItemPrices();

    return prices.reduce(
      (acc, price) => acc + price,
      0
    );
  }

  async getCartItemCountByName(productName: string) {

    return await this.page
      .locator('.inventory_item_name')
      .filter({ hasText: productName })
      .count();
  }

  async isProductVisible(productName: string) {

    return await this.page
      .locator('.inventory_item_name')
      .filter({ hasText: productName })
      .isVisible();
  }
}