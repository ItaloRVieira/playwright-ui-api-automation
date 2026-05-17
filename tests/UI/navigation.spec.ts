import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import users from '../../fixtures/users.json';

test.describe('Navegação', () => {

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

  test('Navegar para carrinho', async ({ page }) => {

    const inventoryPage =
      new InventoryPage(page);

    await inventoryPage.accessCart();

    await expect(page)
      .toHaveURL(/cart/);

    await expect(
      page.locator('.cart_item')
    ).toHaveCount(0);

    await expect(
      page.locator('[data-test="checkout"]')
    ).toBeVisible();
  });

  test('Voltar do carrinho para produtos', async ({ page }) => {

    const inventoryPage =
      new InventoryPage(page);

    await inventoryPage.accessCart();

    await page.click(
      '[data-test="continue-shopping"]'
    );

    await expect(page)
      .toHaveURL(/inventory/);

    await expect(
      page.locator('.inventory_item')
    ).toHaveCount(6);

    await expect(
      page.locator('.title')
    ).toContainText('Products');
  });

  test('Abrir menu lateral', async ({ page }) => {

    await page.click(
      '#react-burger-menu-btn'
    );

    await expect(
      page.locator('.bm-menu-wrap')
    ).toBeVisible();

    await expect(
      page.locator('#inventory_sidebar_link')
    ).toBeVisible();

    await expect(
      page.locator('#about_sidebar_link')
    ).toBeVisible();

    await expect(
      page.locator('#logout_sidebar_link')
    ).toBeVisible();

    await expect(
      page.locator('#reset_sidebar_link')
    ).toBeVisible();
  });

  test('Fechar menu lateral', async ({ page }) => {

    await page.click(
      '#react-burger-menu-btn'
    );

    await expect(
      page.locator('.bm-menu-wrap')
    ).toBeVisible();

    await page.click(
      '#react-burger-cross-btn'
    );

    await expect(
      page.locator('.bm-menu-wrap')
    ).not.toBeVisible();
  });

  test('Navegar para página About', async ({ page }) => {

    await page.click(
      '#react-burger-menu-btn'
    );

    await page.click(
      '#about_sidebar_link'
    );

    await expect(page)
      .toHaveURL(/saucelabs/);
  });

});