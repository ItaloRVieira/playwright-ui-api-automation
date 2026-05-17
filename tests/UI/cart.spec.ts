import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';

import { InventoryPage } from '../../pages/InventoryPage';

import { CartPage } from '../../pages/CartPage';

import users from '../../fixtures/users.json';

import products from '../../fixtures/products.json';

test.describe('Carrinho', () => {

  test.beforeEach(async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    await loginPage.access();

    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );
  });

  test('Adicionar produto ao carrinho', async ({ page }) => {

    const inventoryPage =
      new InventoryPage(page);

    await inventoryPage.addProductToCart(
      products.backpack.id
    );

    const badge =
      await inventoryPage.getCartBadgeCount();

    expect(badge).toBe('1');

    await expect(
      inventoryPage.getRemoveButton(
        products.backpack.id
      )
    ).toBeVisible();

    await expect(
      inventoryPage.getAddToCartButton(
        products.backpack.id
      )
    ).not.toBeVisible();
  });

  test('Produto correto aparece no carrinho', async ({ page }) => {

    const inventoryPage =
      new InventoryPage(page);

    const cartPage =
      new CartPage(page);

    await inventoryPage.addProductToCart(
      products.backpack.id
    );

    await inventoryPage.accessCart();

    await expect(page)
      .toHaveURL(/cart/);

    const items =
      await cartPage.getCartItemNames();

    expect(items)
      .toContain(products.backpack.name);

    await expect(
      page.locator('.cart_item')
    ).toHaveCount(1);
  });

  test('Preço correto do produto no carrinho', async ({ page }) => {

    const inventoryPage =
      new InventoryPage(page);

    const cartPage =
      new CartPage(page);

    await inventoryPage.addProductToCart(
      products.backpack.id
    );

    await inventoryPage.accessCart();

    const prices =
      await cartPage.getCartItemPrices();

    expect(prices)
      .toContain(products.backpack.price);

    const total =
      await cartPage.getCartTotal();

    expect(total)
      .toBe(products.backpack.price);
  });

  test('Remover produto do carrinho', async ({ page }) => {

    const inventoryPage =
      new InventoryPage(page);

    await inventoryPage.addProductToCart(
      products.backpack.id
    );

    await inventoryPage.removeProductFromCart(
      products.backpack.id
    );

    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveCount(0);

    await expect(
      inventoryPage.getRemoveButton(
        products.backpack.id
      )
    ).not.toBeVisible();

    await expect(
      inventoryPage.getAddToCartButton(
        products.backpack.id
      )
    ).toBeVisible();
  });

  test('Carrinho vazio após remover produto', async ({ page }) => {

    const inventoryPage =
      new InventoryPage(page);

    await inventoryPage.addProductToCart(
      products.backpack.id
    );

    await inventoryPage.accessCart();

    await page.click(
      `[data-test="remove-${products.backpack.id}"]`
    );

    await expect(
      page.locator('.cart_item')
    ).toHaveCount(0);
  });

  test('Adicionar múltiplos produtos', async ({ page }) => {

    const inventoryPage =
      new InventoryPage(page);

    const cartPage =
      new CartPage(page);

    await inventoryPage.addProductToCart(
      products.backpack.id
    );

    await inventoryPage.addProductToCart(
      products.bikeLight.id
    );

    const badge =
      await inventoryPage.getCartBadgeCount();

    expect(badge).toBe('2');

    await inventoryPage.accessCart();

    const itemsCount =
      await cartPage.getCartItemsCount();

    expect(itemsCount).toBe(2);

    const items =
      await cartPage.getCartItemNames();

    expect(items)
      .toContain(products.backpack.name);

    expect(items)
      .toContain(products.bikeLight.name);

    const total =
      await cartPage.getCartTotal();

    expect(total).toBe(
      products.backpack.price +
      products.bikeLight.price
    );

    expect(
      await cartPage.getCartItemCountByName(
        products.backpack.name
      )
    ).toBe(1);

    expect(
      await cartPage.getCartItemCountByName(
        products.bikeLight.name
      )
    ).toBe(1);
  });

  test('Carrinho persiste após reload', async ({ page }) => {

    const inventoryPage =
      new InventoryPage(page);

    const cartPage =
      new CartPage(page);

    await inventoryPage.addProductToCart(
      products.backpack.id
    );

    await page.reload();

    const badge =
      await inventoryPage.getCartBadgeCount();

    expect(badge).toBe('1');

    await inventoryPage.accessCart();

    await expect(page)
      .toHaveURL(/cart/);

    expect(
      await cartPage.isProductVisible(
        products.backpack.name
      )
    ).toBeTruthy();
  });

  test('Carrinho persiste após navegação', async ({ page }) => {

    const inventoryPage =
      new InventoryPage(page);

    const cartPage =
      new CartPage(page);

    await inventoryPage.addProductToCart(
      products.backpack.id
    );

    await inventoryPage.accessCart();

    await page.goBack();

    const badge =
      await inventoryPage.getCartBadgeCount();

    expect(badge).toBe('1');

    await inventoryPage.accessCart();

    expect(
      await cartPage.isProductVisible(
        products.backpack.name
      )
    ).toBeTruthy();
  });

});