class CheckOutPage {

    constructor(page) {

        this.page = page;
        this.checkOutButton = page.locator('text = Checkout');
        this.textBox = page.getByRole('textbox').nth(1);
        this.selectCountry = page.locator("[placeholder *= 'Country']");
        this.listOfCountries = page.locator('.ta-results button');
        this.submitButton = page.locator('.action__submit');

    }

    async goToCheckOutPage() {

        await this.checkOutButton.click();

    }

    async completeCheckOut() {

        await this.textBox.fill("123");
        await this.selectCountry.pressSequentially('ind');
        const listOfCountries = this.listOfCountries;
        await listOfCountries.first().waitFor();
        const count = await listOfCountries.count();
        for (let i = 0; i < count; ++i) {
            const text = await listOfCountries.nth(i).textContent();
            if (text === " India") {
                await listOfCountries.nth(i).click();
                break;
            }
        }
    }

    async submitCheckOut(){
        await this.submitButton.click();
    }

}
module.exports = {CheckOutPage};