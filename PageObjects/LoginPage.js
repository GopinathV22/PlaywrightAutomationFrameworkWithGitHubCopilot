class LoginPage {

    constructor(page) {
        this.page = page;
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.signInButton = page.locator('#login');

    }

    async validateLogin(userName, password) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInButton.click();

    }

    async goTo(url) {
        await this.page.goto(url);

    }

}
module.exports={LoginPage};