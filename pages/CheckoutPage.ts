import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  firstNameInput =
    '[data-test="firstName"]';

  lastNameInput =
    '[data-test="lastName"]';

  postalCodeInput =
    '[data-test="postalCode"]';

  continueButton =
    '[data-test="continue"]';

  finishButton =
    '[data-test="finish"]';

  successMessage =
    '.complete-header';

  errorMessage =
    '[data-test="error"]';

  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {

    await this.page.fill(
      this.firstNameInput,
      firstName
    );

    await this.page.fill(
      this.lastNameInput,
      lastName
    );

    await this.page.fill(
      this.postalCodeInput,
      postalCode
    );
  }

  async continueCheckout() {

    await this.page.click(
      this.continueButton
    );
  }

  async finishCheckout() {

    await this.page.click(
      this.finishButton
    );
  }

  async getSuccessMessage() {

    return this.page.locator(
      this.successMessage
    );
  }

  async getErrorMessage() {

    return this.page.locator(
      this.errorMessage
    );
  }
}