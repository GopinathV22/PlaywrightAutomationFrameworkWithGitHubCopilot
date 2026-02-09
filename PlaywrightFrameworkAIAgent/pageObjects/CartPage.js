const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToCart() {
    // Use more specific selector to avoid ambiguity - find Cart button in navigation
    const cartButton = this.page.locator('button[routerlink="/dashboard/cart"]').first();
    await cartButton.click();
    // Wait for cart page to load
    await this.page.waitForURL('**/dashboard/cart');
  }

  async getCartItems() {
    const cartItems = this.page.locator('h3');
    const items = [];
    for (let i = 0; i < await cartItems.count(); i++) {
      const text = await cartItems.nth(i).textContent();
      items.push(text.trim());
    }
    return items;
  }

  async verifyProductInCart(productName) {
    const cartItems = await this.getCartItems();
    const productFound = cartItems.some(item => 
      item.toLowerCase().includes(productName.toLowerCase())
    );
    expect(productFound).toBeTruthy();
  }

  async getProductPriceInCart(productName) {
    const heading = this.page.locator('h3').filter({ hasText: productName });
    if (await heading.count() > 0) {
      // Get the price from the paragraph following the product heading
      const priceElement = heading.locator('..').locator('xpath=./following-sibling::*').first();
      return await priceElement.textContent();
    }
    return null;
  }

  async verifyProductDetails(productName, expectedPrice) {
    await this.verifyProductInCart(productName);
    const price = await this.getProductPriceInCart(productName);
    expect(price).toContain(expectedPrice);
  }
}

module.exports = CartPage;
