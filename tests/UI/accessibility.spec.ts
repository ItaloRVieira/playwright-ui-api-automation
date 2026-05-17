import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import users from '../../fixtures/users.json';
import products from '../../fixtures/products.json';

async function validateAccessibility(page: any) {

  const accessibilityScanResults =
    await new AxeBuilder({ page })
      .withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa'
      ])
      .analyze();

  const seriousOrCriticalViolations =
    accessibilityScanResults.violations.filter(
      violation =>
        violation.impact === 'serious' ||
        violation.impact === 'critical'
    );

  expect(
    seriousOrCriticalViolations,
    JSON.stringify(seriousOrCriticalViolations, null, 2)
  ).toEqual([]);
}

test.describe('Acessibilidade', () => {

  test('Validar acessibilidade da tela de login', async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    await loginPage.access();

    await validateAccessibility(page);
  });

  test('Validar acessibilidade da tela de produtos', async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    await loginPage.access();

    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );

    await expect(page)
      .toHaveURL(/inventory/);

    await validateAccessibility(page);
  });

  test('Validar acessibilidade da tela do carrinho', async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    const inventoryPage =
      new InventoryPage(page);

    await loginPage.access();

    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );

    await inventoryPage.addProductToCart(
      products.backpack.id
    );

    await inventoryPage.accessCart();

    await expect(page)
      .toHaveURL(/cart/);

    await validateAccessibility(page);
  });

  test('Validar acessibilidade da tela de informações do checkout', async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    const inventoryPage =
      new InventoryPage(page);

    const cartPage =
      new CartPage(page);

    await loginPage.access();

    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );

    await inventoryPage.addProductToCart(
      products.backpack.id
    );

    await inventoryPage.accessCart();

    await cartPage.proceedToCheckout();

    await expect(page)
      .toHaveURL(/checkout-step-one/);

    await validateAccessibility(page);
  });

  test('Validar acessibilidade da tela de resumo do checkout', async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    const inventoryPage =
      new InventoryPage(page);

    const cartPage =
      new CartPage(page);

    const checkoutPage =
      new CheckoutPage(page);

    await loginPage.access();

    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );

    await inventoryPage.addProductToCart(
      products.backpack.id
    );

    await inventoryPage.accessCart();

    await cartPage.proceedToCheckout();

    await checkoutPage.fillCheckoutInformation(
      'Italo',
      'Vieira',
      '12345-000'
    );

    await checkoutPage.continueCheckout();

    await expect(page)
      .toHaveURL(/checkout-step-two/);

    await validateAccessibility(page);
  });

  test('Validar acessibilidade da tela de confirmação da compra', async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    const inventoryPage =
      new InventoryPage(page);

    const cartPage =
      new CartPage(page);

    const checkoutPage =
      new CheckoutPage(page);

    await loginPage.access();

    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );

    await inventoryPage.addProductToCart(
      products.backpack.id
    );

    await inventoryPage.accessCart();

    await cartPage.proceedToCheckout();

    await checkoutPage.fillCheckoutInformation(
      'Italo',
      'Vieira',
      '12345-000'
    );

    await checkoutPage.continueCheckout();

    await checkoutPage.finishCheckout();

    await expect(page)
      .toHaveURL(/checkout-complete/);

    await validateAccessibility(page);
  });
});
