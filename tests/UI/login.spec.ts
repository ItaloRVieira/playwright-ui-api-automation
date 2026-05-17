import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../fixtures/users.json';

test.describe('Login', () => {

  test('Login com sucesso', async ({ page }) => {

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
      page.locator('[data-test="error"]')
    ).toHaveCount(0);
  });

  test('Usuário bloqueado', async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    await loginPage.access();

    await loginPage.login(
      users.lockedUser.username,
      users.lockedUser.password
    );

    await expect(
      await loginPage.getErrorMessage()
    ).toContainText(
      'Sorry, this user has been locked out.'
    );

    await expect(page)
      .not.toHaveURL(/inventory/);

    await expect(
      page.locator('#login-button')
    ).toBeVisible();
  });

  test('Login com usuário inválido', async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    await loginPage.access();

    await loginPage.login(
      users.invalidUser.username,
      users.validUser.password
    );

    await expect(
      await loginPage.getErrorMessage()
    ).toContainText(
      'Username and password do not match'
    );

    await expect(page)
      .not.toHaveURL(/inventory/);
  });

  test('Login com senha inválida', async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    await loginPage.access();

    await loginPage.login(
      users.validUser.username,
      users.invalidUser.password
    );

    await expect(
      await loginPage.getErrorMessage()
    ).toContainText(
      'Username and password do not match'
    );

    await expect(page)
      .not.toHaveURL(/inventory/);
  });

  test('Login com usuário e senha inválidos', async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    await loginPage.access();

    await loginPage.login(
      users.invalidUser.username,
      users.invalidUser.password
    );

    await expect(
      await loginPage.getErrorMessage()
    ).toContainText(
      'Username and password do not match'
    );

    await expect(page)
      .not.toHaveURL(/inventory/);
  });

  test('Login sem informar usuário e senha', async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    await loginPage.access();

    await loginPage.login(
      users.emptyCredentials.username,
      users.emptyCredentials.password
    );

    await expect(
      await loginPage.getErrorMessage()
    ).toContainText(
      'Username is required'
    );

    await expect(page)
      .not.toHaveURL(/inventory/);
  });

  test('Login sem informar usuário', async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    await loginPage.access();

    await loginPage.login(
      users.emptyUsername.username,
      users.emptyUsername.password
    );

    await expect(
      await loginPage.getErrorMessage()
    ).toContainText(
      'Username is required'
    );

    await expect(page)
      .not.toHaveURL(/inventory/);
  });

  test('Login sem informar senha', async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    await loginPage.access();

    await loginPage.login(
      users.emptyPassword.username,
      users.emptyPassword.password
    );

    await expect(
      await loginPage.getErrorMessage()
    ).toContainText(
      'Password is required'
    );

    await expect(page)
      .not.toHaveURL(/inventory/);
  });

  test('Login com tentativa de SQL Injection', async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    await loginPage.access();

    await loginPage.login(
      users.sqlInjection.username,
      users.sqlInjection.password
    );

    await expect(
      await loginPage.getErrorMessage()
    ).toContainText(
      'Username and password do not match'
    );

    await expect(page)
      .not.toHaveURL(/inventory/);
  });

  test('Login com caracteres especiais', async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    await loginPage.access();

    await loginPage.login(
      users.specialCharacters.username,
      users.specialCharacters.password
    );

    await expect(
      await loginPage.getErrorMessage()
    ).toContainText(
      'Username and password do not match'
    );

    await expect(page)
      .not.toHaveURL(/inventory/);
  });

  test('Login com usuário problem_user', async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    await loginPage.access();

    await loginPage.login(
      users.problemUser.username,
      users.problemUser.password
    );

    await expect(page)
      .toHaveURL(/inventory/);

    await expect(
      page.locator('.title')
    ).toContainText('Products');

    await expect(
      page.locator('.inventory_item')
    ).toHaveCount(6);
  });

  test('Login com usuário performance_glitch_user', async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    await loginPage.access();

    await loginPage.login(
      users.performanceUser.username,
      users.performanceUser.password
    );

    await expect(page)
      .toHaveURL(/inventory/);

    await expect(
      page.locator('.title')
    ).toContainText('Products');

    await expect(
      page.locator('.inventory_item')
    ).toHaveCount(6);
  });

  test('Fechar mensagem de erro de login', async ({ page }) => {

    const loginPage =
      new LoginPage(page);

    await loginPage.access();

    await loginPage.login(
      users.invalidUser.username,
      users.invalidUser.password
    );

    await expect(
      page.locator('[data-test="error"]')
    ).toBeVisible();

    await page.click('.error-button');

    await expect(
      page.locator('[data-test="error"]')
    ).toHaveCount(0);
  });

  test('Campos da tela de login devem estar visíveis', async ({ page }) => {

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

});