const LoginPage = require('./LoginPage');
const ProductPage = require('./ProductPage');
const CartPage = require('./CartPage');

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.productPage = new ProductPage(this.page);
    this.cartPage = new CartPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getProductPage() {
    return this.productPage;
  }

  getCartPage() {
    return this.cartPage;
  }
}

module.exports = POManager;
