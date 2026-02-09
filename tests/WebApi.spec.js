const {test,expect,request} = require('@playwright/test');
const {APIUtils} = require('../Utils/APIUtils');

const loginPayload = {userEmail:"gopinathv@gmail.com",userPassword:"Gopiecom@123"};
const orderPayload = {orders: [{country: "Argentina", productOrderedId: "68a961719320a140fe1ca57c"}]};


test.beforeAll( async()=>{

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});


test('Place the order', async({page})=>{

    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
        },response.token
    );
    
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator(`text = ${response.orderId}`).waitFor();

    const allOrdersLocators = await page.locator("tr.ng-star-inserted").all();
    for(const order of allOrdersLocators){
        const orderText = await order.locator('th').textContent();
        if(orderText === response.orderId){
            await order.locator('.btn-primary').click();
            break;
        }
    }
    const orderIdDetails =await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});