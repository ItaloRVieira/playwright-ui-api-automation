import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import users from '../../fixtures/users.json';
import products from '../../fixtures/products.json';

const parsePrice = async (text: string | null) => {
  return Number(
    text
      ?.replace(/[^0-9.]/g, '') ?? 0
  );
};

test.describe('Checkout', () => {

  test.beforeEach(async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    await loginPage.access();

    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );

    await expect(page)
      .toHaveURL(/inventory/);
  });

  test('Fluxo completo de compra com sucesso', async ({ page }) => {

    const inventoryPage =
      new InventoryPage(page);

    const cartPage =
      new CartPage(page);

    const checkoutPage =
      new CheckoutPage(page);

    await inventoryPage.addProductToCart(
      products.backpack.id
    );

    await inventoryPage.addProductToCart(
      products.bikeLight.id
    );

    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('2');

    await inventoryPage.accessCart();

    await expect(page)
      .toHaveURL(/cart/);

    await expect(
      page.locator('.cart_item')
    ).toHaveCount(2);

    const cartItems =
      await cartPage.getCartItemNames();

    expect(cartItems)
      .toContain(products.backpack.name);

    expect(cartItems)
      .toContain(products.bikeLight.name);

    const cartTotal =
      await cartPage.getCartTotal();

    expect(cartTotal).toBe(
      products.backpack.price +
      products.bikeLight.price
    );

    await cartPage.proceedToCheckout();

    await expect(page)
      .toHaveURL(/checkout-step-one/);

    await checkoutPage.fillCheckoutInformation(
      'Italo',
      'Vieira',
      '12345-000'
    );

    await checkoutPage.continueCheckout();

    await expect(page)
      .toHaveURL(/checkout-step-two/);

    await expect(
      page.locator('.title')
    ).toContainText('Checkout: Overview');

    await expect(
      page.locator('.cart_item')
    ).toHaveCount(2);

    await expect(
      page.locator('.inventory_item_name')
        .filter({ hasText: products.backpack.name })
    ).toBeVisible();

    await expect(
      page.locator('.inventory_item_name')
        .filter({ hasText: products.bikeLight.name })
    ).toBeVisible();

    const subtotal =
      await parsePrice(
        await page.locator('.summary_subtotal_label')
          .textContent()
      );

    expect(subtotal).toBe(cartTotal);

    const tax =
      await parsePrice(
        await page.locator('.summary_tax_label')
          .textContent()
      );

    const total =
      await parsePrice(
        await page.locator('.summary_total_label')
          .textContent()
      );

    expect(total).toBeCloseTo(
      subtotal + tax,
      2
    );

    await checkoutPage.finishCheckout();

    await expect(page)
      .toHaveURL(/checkout-complete/);

    await expect(
      await checkoutPage.getSuccessMessage()
    ).toContainText(
      'Thank you for your order!'
    );

    await expect(
      page.locator('.complete-text')
    ).toContainText(
      'Your order has been dispatched'
    );
  });

});