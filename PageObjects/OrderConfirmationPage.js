class OrderConfirmationPage {

    constructor(page) {
        this.page = page;
        this.getOrderId = page.locator('.em-spacer-1 .ng-star-inserted');
        this.myOrders = page.locator("[routerlink*='myorders']");
        this.allOrderId = page.locator("tr.ng-star-inserted");

    }

    async verifyOrder() {

        const orderId = await this.getOrderId.textContent();
        const trimmedOrderId = orderId.split(" ")[2];
        console.log(trimmedOrderId);
        await this.myOrders.first().click();
        await this.page.locator(`text = ${trimmedOrderId}`).waitFor();
        const allOrdersLocators = await this.allOrderId.all();
        for (const order of allOrdersLocators) {
            const orderText = await order.locator('th').textContent();
            if (orderText === trimmedOrderId) {
                await order.locator('.btn-primary').click();
                break;
            }
        }

    }

}
module.exports = { OrderConfirmationPage };