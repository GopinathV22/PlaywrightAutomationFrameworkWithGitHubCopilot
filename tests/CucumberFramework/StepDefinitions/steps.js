const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('@playwright/test');
const { POManager } = require('../../../PageObjects/POManager');

Given('Login to Ecommerse site {string} with {string} and {string}', { timeout: 30 * 1000 }, async function (url, userName, password) {

    const loginPage = await this.poManager.getLoginPage();
    await loginPage.goTo(url);
    await loginPage.validateLogin(userName, password);
});

When('I add {string} to the cart', async function (productName) {

    const productPage = await this.poManager.getProductPage();
    await productPage.addProductToCart(productName);
    await productPage.navigateToCartPage();
});

Then('Enter valid details and place the order for {string}', async function (productName) {

    const checkOutPage = await this.poManager.getCheckOutPage();
    await expect(this.page.locator('.cartSection h3')).toContainText(productName);
    await checkOutPage.goToCheckOutPage();
    const isProductVisible = this.page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(isProductVisible).toBeTruthy();
    await checkOutPage.completeCheckOut();
    await checkOutPage.submitCheckOut();
});

Then('Verify the order is present in the Order History page.', async function () {

    const orderConfirmationPage = await this.poManager.getOrderConfirmationPage();
    await expect(this.page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    await orderConfirmationPage.verifyOrder();
});

// Scenario 2: Product Search and Cart Validation
Then('Verify {string} is present in the cart', async function (productName) {

    const productPage = await this.poManager.getProductPage();
    await productPage.navigateToCartPage();
    const isProductInCart = await this.page.locator(`.cartSection h3:has-text('${productName}')`).isVisible();
    expect(isProductInCart).toBeTruthy();
});

// Scenario 3: Invalid Login Attempt (Scenario Outline)
Then('Verify error message {string} is displayed', { timeout: 30 * 1000 }, async function (expectedErrorMessage) {

    await expect(this.page.locator('.ngx-toastr.toast-error')).toContainText(expectedErrorMessage);
});
