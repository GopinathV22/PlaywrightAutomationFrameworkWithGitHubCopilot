const {test,expect} = require('@playwright/test');

test('@Web open browser test', async ({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle("Google");

});

test.only('@Web open browser using page', async ({page})=> {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator("[type = 'password']").fill('learnssing');
    await page.locator('#signInBtn').click();
    await expect(page.locator("[style*= 'block']")).toContainText('Incorrect');

});

test('@Web Get First Product Name', async({page}) =>{

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('gopinathv@gmail.com');
    await page.locator('#userPassword').fill('Gopiecom@123');
    await page.locator('#login').click();
    await page.locator('.card-body b').first().waitFor();
    console.log(await page.locator('.card-body b').allTextContents());

});

test('Get Email Id from Child Page and Fill in Parent Page', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userRadioBtn = page.locator('.checkmark').last();
    await userRadioBtn.click();
    await page.locator('#okayBtn').click();
    await expect(userRadioBtn).toBeChecked();
    const drop_down = await page.locator('select.form-control');
    await drop_down.selectOption("Teacher");
    const checkbox = await page.locator('#terms');
    await checkbox.click();
    await checkbox.uncheck();
    expect(await checkbox.isChecked()).toBeFalsy();
    const domain_link = page.locator('.blinkingText');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        domain_link.click()
    ])

    const text = await newPage.locator('.red').textContent();    
    const domain_name = text.split('@')[1].split(' ')[0];
    const user_name_field = page.locator('#username');
    await user_name_field.fill(domain_name);
    await page.pause();
    console.log(await user_name_field.inputValue());
    

});