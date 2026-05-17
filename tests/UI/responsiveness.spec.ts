import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import users from '../../fixtures/users.json';

const viewports = [
  {
    name: 'mobile',
    width: 390,
    height: 844
  },
  {
    name: 'tablet',
    width: 768,
    height: 1024
  },
  {
    name: 'desktop',
    width: 1366,
    height: 768
  }
];

test.describe('Responsividade', () => {

  for (const viewport of viewports) {

    test(`Login deve ser exibido corretamente em ${viewport.name}`, async ({ page }) => {

      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height
      });

      const loginPage =
        new LoginPage(page);

      await loginPage.access();

      await expect(
        page.locator('#user-name')
      ).toBeVisible();

      await expect(
        page.locator('#password')
      ).toBeVisible();

      await expect(
        page.locator('#login-button')
      ).toBeVisible();
    });

    test(`Lista de produtos deve ser exibida corretamente em ${viewport.name}`, async ({ page }) => {

      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height
      });

      const loginPage =
        new LoginPage(page);

      await loginPage.access();

      await loginPage.login(
        users.validUser.username,
        users.validUser.password
      );

      await expect(page)
        .toHaveURL(/inventory/);

      await expect(
        page.locator('.title')
      ).toContainText('Products');

      await expect(
        page.locator('.inventory_item')
      ).toHaveCount(6);

      await expect(
        page.locator('[data-test="product-sort-container"]')
      ).toBeVisible();

      await expect(
        page.locator('.shopping_cart_link')
      ).toBeVisible();
    });

    test(`Menu lateral deve abrir e fechar corretamente em ${viewport.name}`, async ({ page }) => {

      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height
      });

      const loginPage =
        new LoginPage(page);

      await loginPage.access();

      await loginPage.login(
        users.validUser.username,
        users.validUser.password
      );

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

      await page.click(
        '#react-burger-cross-btn'
      );

      await expect(
        page.locator('.bm-menu-wrap')
      ).not.toBeVisible();
    });

    test(`Carrinho deve ser acessível em ${viewport.name}`, async ({ page }) => {

      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height
      });

      const loginPage =
        new LoginPage(page);

      const inventoryPage =
        new InventoryPage(page);

      await loginPage.access();

      await loginPage.login(
        users.validUser.username,
        users.validUser.password
      );

      await inventoryPage.accessCart();

      await expect(page)
        .toHaveURL(/cart/);

      await expect(
        page.locator('[data-test="checkout"]')
      ).toBeVisible();

      await expect(
        page.locator('[data-test="continue-shopping"]')
      ).toBeVisible();
    });
  }
});
