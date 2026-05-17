import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import users from '../../fixtures/users.json';

test.describe('Ordenação', () => {

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

    await expect(
      page.locator('.inventory_item')
    ).toHaveCount(6);
  });

  test('Ordenar produtos A-Z', async ({ page }) => {

    const inventoryPage =
      new InventoryPage(page);

    await inventoryPage.sortBy('az');

    const items =
      await inventoryPage.getItemNames();

    const sortedItems =
      [...items].sort();

    expect(items)
      .toEqual(sortedItems);

    expect(items[0])
      .toBe('Sauce Labs Backpack');
  });

  test('Ordenar produtos Z-A', async ({ page }) => {

    const inventoryPage =
      new InventoryPage(page);

    await inventoryPage.sortBy('za');

    const items =
      await inventoryPage.getItemNames();

    const sortedItems =
      [...items]
        .sort()
        .reverse();

    expect(items)
      .toEqual(sortedItems);

    expect(items[0])
      .toBe('Test.allTheThings() T-Shirt (Red)');
  });

  test('Ordenar menor para maior preço', async ({ page }) => {

    const inventoryPage =
      new InventoryPage(page);

    await inventoryPage.sortBy('lohi');

    const prices =
      await inventoryPage.getItemPrices();

    const sortedPrices =
      [...prices]
        .sort((a, b) => a - b);

    expect(prices)
      .toEqual(sortedPrices);

    expect(prices[0])
      .toBe(Math.min(...prices));
  });

  test('Ordenar maior para menor preço', async ({ page }) => {

    const inventoryPage =
      new InventoryPage(page);

    await inventoryPage.sortBy('hilo');

    const prices =
      await inventoryPage.getItemPrices();

    const sortedPrices =
      [...prices]
        .sort((a, b) => b - a);

    expect(prices)
      .toEqual(sortedPrices);

    expect(prices[0])
      .toBe(Math.max(...prices));
  });

  test('Valida ordenação padrão', async ({ page }) => {

    const selected = await page
      .locator(
        '[data-test="product-sort-container"]'
      )
      .inputValue();

    expect(selected)
      .toBe('az');

    const items = await page
      .locator('.inventory_item_name')
      .allTextContents();

    const sortedItems =
      [...items].sort();

    expect(items)
      .toEqual(sortedItems);
  });

  test('Ordenação não altera quantidade de itens', async ({ page }) => {

    const inventoryPage =
      new InventoryPage(page);

    const before =
      await inventoryPage.getItemNames();

    await inventoryPage.sortBy('hilo');

    const after =
      await inventoryPage.getItemNames();

    expect(after.length)
      .toBe(before.length);

    expect(after.length)
      .toBe(6);
  });

});