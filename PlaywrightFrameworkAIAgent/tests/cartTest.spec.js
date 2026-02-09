const { test, expect } = require('@playwright/test');
const POManager = require('../pageObjects/POManager');
const testData = require('../testData/testData.json');

test.describe('E-Commerce Cart Verification - Zara Coat 3', () => {
  let poManager;
  let page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    poManager = new POManager(page);
  });

  test('Verify that Zara Coat 3 product is added to cart and visible in cart page', async () => {
    // Step 1: Login with provided credentials
    const loginPage = poManager.getLoginPage();
    await loginPage.login(
      testData.urls.loginUrl,
      testData.credentials.email,
      testData.credentials.password
    );

    // Verify we are on dashboard
    expect(page.url()).toContain('/dashboard/dash');

    // Step 2: Add product to cart
    const productPage = poManager.getProductPage();
    await productPage.addProductToCart(testData.products.productName);

    // Step 3: Verify product added alert
    await productPage.verifyProductAlertMessage();

    // Step 4: Navigate to cart
    const cartPage = poManager.getCartPage();
    await cartPage.navigateToCart();

    // Step 5: Verify product is visible in cart
    await cartPage.verifyProductInCart(testData.products.productName);

    // Step 6: Verify cart page URL
    expect(page.url()).toContain('/dashboard/cart');

    // Step 7: Verify cart heading
    const cartHeading = page.locator('h1').filter({ hasText: 'My Cart' });
    await expect(cartHeading).toBeVisible();

    console.log(`✓ Successfully verified that ${testData.products.productName} is in the cart`);
  });

  test('Verify cart displays correct product details', async () => {
    // Step 1: Login
    const loginPage = poManager.getLoginPage();
    await loginPage.login(
      testData.urls.loginUrl,
      testData.credentials.email,
      testData.credentials.password
    );

    // Step 2: Add product to cart
    const productPage = poManager.getProductPage();
    await productPage.addProductToCart(testData.products.productName);

    // Step 3: Navigate to cart
    const cartPage = poManager.getCartPage();
    await cartPage.navigateToCart();

    // Step 4: Verify product name and price
    const productHeading = page.locator('h3').filter({ hasText: testData.products.productName });
    await expect(productHeading).toBeVisible();

    // Verify product price is displayed (look for the price anywhere in the cart)
    const priceElements = page.locator('text=11500');
    const priceVisible = await priceElements.count() > 0;
    expect(priceVisible).toBeTruthy();

    console.log(`✓ Product details verified: ${testData.products.productName} - ${testData.products.productPrice}`);
  });
});
