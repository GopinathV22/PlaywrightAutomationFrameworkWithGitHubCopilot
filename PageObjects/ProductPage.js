class ProductPage {

    constructor(page) {

        this.page = page;
        this.productNames = page.locator('.card-body b');
        this.products = page.locator('.card-body');
        this.cartButton = page.locator("[routerlink = '/dashboard/cart']");
    }

    async addProductToCart(productName) {

        await this.productNames.first().waitFor();
        const allProducts = await this.products;
        for (let i = 0; i < await allProducts.count(); i++) {
            if (await allProducts.nth(i).locator('b').textContent() === productName) {
                await allProducts.nth(i).locator('text= Add To Cart').click();
                break;
            }
        }
    }

    async navigateToCartPage() {

        await this.cartButton.click();

    }

}
module.exports={ProductPage};