const {test,expect} = require('@playwright/test');

test('End to End Automation Test', async({page})=>{

    const productName = "ADIDAS ORIGINAL";
    const productAddedMessage = "Product Added To Cart";
    const userName = "gopinathv@gmail.com"

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill(userName);
    await page.locator('#userPassword').fill('Gopiecom@123');
    await page.locator('#login').click();   
    await page.locator('.card-body b').first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
    const allProducts = page.locator('.card-body');
    for(let i=0; i< await allProducts.count(); i++){
        if(await allProducts.nth(i).locator('b').textContent() === productName){
            await allProducts.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }
    await page.locator('text = Product Added To Cart').waitFor();
    await expect(page.locator('text = Product Added To Cart')).toContainText(productAddedMessage);
    await page.locator("[routerlink = '/dashboard/cart']").click();
    await expect(page.locator('.cartSection h3')).toContainText(productName);
    await page.locator('text = Checkout').click();
    await expect(page.locator("[style *= 'lightgray']")).toContainText(userName);
    const isProductVisible = page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(isProductVisible).toBeTruthy();
    await page.getByRole('textbox').nth(1).fill("123");
    await page.locator("[name= 'coupon']").fill('rahulshettyacademy');
    await page.locator("button[type='submit']").click();
    await page.locator("[style = 'color: green;']").waitFor();
    const couponText = await page.locator("[style *= 'green']").textContent();
    await expect(page.locator("[style *= 'green']")).toContainText("* Coupon Applied");
    await page.locator("[placeholder *= 'Country']").pressSequentially('ind');
    const listOfCountries = page.locator('.ta-results button');
    await listOfCountries.first().waitFor();
    const count = await listOfCountries.count();
    for(let i=0; i<count; ++i){
        const text = await listOfCountries.nth(i).textContent();
        if(text === " India"){
            await listOfCountries.nth(i).click();
            break;
        }
    }
    await page.locator('.action__submit').click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    const trimmedOrderId = orderId.split(" ")[2];
    console.log(trimmedOrderId);
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator(`text = ${trimmedOrderId}`).waitFor();
    // const allOrders = page.locator("tr.ng-star-inserted");
    // for(let i=0; i< await allOrders.count(); ++i){
    //     if(await allOrders.locator('th').nth(i).textContent() === trimmedOrderId){
    //         await allOrders.locator('.btn-primary').nth(i).click();
    //     }
    // }
    const allOrdersLocators = await page.locator("tr.ng-star-inserted").all();
    for(const order of allOrdersLocators){
        const orderText = await order.locator('th').textContent();
        if(orderText === trimmedOrderId){
            await order.locator('.btn-primary').click();
            break;
        }
    }
    await page.pause();

});