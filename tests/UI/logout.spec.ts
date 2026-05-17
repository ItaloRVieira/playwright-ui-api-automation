import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../fixtures/users.json';

test.describe('Logout', () => {

  test.beforeEach(async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    await loginPage.access();

    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );
  });

  test('Logout com sucesso', async ({ page }) => {

    await page.click(
      '#react-burger-menu-btn'
    );

    await expect(
      page.locator('.bm-menu-wrap')
    ).toBeVisible();

    await page.click(
      '#logout_sidebar_link'
    );

    await expect(page)
      .toHaveURL(/saucedemo/);

    await expect(
      page.locator('#login-button')
    ).toBeVisible();

    await expect(
      page.locator('#user-name')
    ).toBeVisible();

    await expect(
      page.locator('#password')
    ).toBeVisible();

    await expect(
      page.locator('.inventory_item')
    ).toHaveCount(0);
  });

  test('Usuário não acessa inventory após logout', async ({ page }) => {

    await page.click(
      '#react-burger-menu-btn'
    );

    await page.click(
      '#logout_sidebar_link'
    );

    await page.goto(
      'https://www.saucedemo.com/inventory.html'
    );

    await expect(page)
      .toHaveURL(/saucedemo/);

    await expect(
      page.locator('#login-button')
    ).toBeVisible();
  });

});