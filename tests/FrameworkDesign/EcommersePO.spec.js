const {test,expect} = require('@playwright/test');
const{POManager} = require('../../PageObjects/POManager');
const{customTest} = require('../../Utils/test-base');
const testData = JSON.parse(JSON.stringify(require('../../Utils/placeOrderTestData.json')));

for(const data of testData){
test(`End to End Automation Test for the product ${data.productName}`, async({page})=>{

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo(data.url);
    await loginPage.validateLogin(data.userName,data.password);

    const productPage = poManager.getProductPage();  
    await productPage.addProductToCart(data.productName);
    await productPage.navigateToCartPage();

    const checkOutPage = poManager.getCheckOutPage();
    await expect(page.locator('.cartSection h3')).toContainText(data.productName);
    await checkOutPage.goToCheckOutPage();
    await expect(page.locator("[style *= 'lightgray']")).toContainText(data.userName);
    const isProductVisible = page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(isProductVisible).toBeTruthy();
    await checkOutPage.completeCheckOut();
    await checkOutPage.submitCheckOut();

    const orderConfirmationPage = poManager.getOrderConfirmationPage();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    await orderConfirmationPage.verifyOrder();

});
}

customTest(`End to End Automation Test for the product with custom Fixture Data`, async({page,testFixtureDataForOrder})=>{

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo(testFixtureDataForOrder.url);
    await loginPage.validateLogin(testFixtureDataForOrder.userName,testFixtureDataForOrder.password);

    const productPage = poManager.getProductPage();  
    await productPage.addProductToCart(testFixtureDataForOrder.productName);
    await productPage.navigateToCartPage();

    const checkOutPage = poManager.getCheckOutPage();
    await expect(page.locator('.cartSection h3')).toContainText(testFixtureDataForOrder.productName);
    await checkOutPage.goToCheckOutPage();
    await expect(page.locator("[style *= 'lightgray']")).toContainText(testFixtureDataForOrder.userName);
    const isProductVisible = page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(isProductVisible).toBeTruthy();
    await checkOutPage.completeCheckOut();
    await checkOutPage.submitCheckOut();

    const orderConfirmationPage = poManager.getOrderConfirmationPage();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    await orderConfirmationPage.verifyOrder();

});