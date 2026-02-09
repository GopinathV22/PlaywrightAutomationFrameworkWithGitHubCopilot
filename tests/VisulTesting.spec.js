const {test,expect} = require('@playwright/test');

test('Visual Screenshot comparison', async({page})=>
{
    const userName = "gopinathv@gmail.com";
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill(userName);
    await page.locator('#userPassword').fill('Gopiecom@123');
    await page.locator('#login').click();
    await page.locator('.card-body b').first().waitFor();
    await page.screenshot({path:"screenshot.png"});
    expect(await page.screenshot()).toMatchSnapshot('PlpPage.png');

})