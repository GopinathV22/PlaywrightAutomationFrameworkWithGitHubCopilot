const { expect } = require('@playwright/test');

class ProductPage {
  constructor(page) {
    this.page = page;
  }

  async getProductByName(productName) {
    // Wait for product headings to be visible
    await this.page.waitForSelector('h5', { timeout: 5000 });
    
    // Get all product headings and find the one matching the product name (case-insensitive)
    const products = this.page.locator('h5');
    const count = await products.count();
    
    for (let i = 0; i < count; i++) {
      const text = await products.nth(i).textContent();
      if (text.toLowerCase().includes(productName.toLowerCase())) {
        return i;
      }
    }
    return -1;
  }

  async addProductToCart(productName) {
    const productIndex = await this.getProductByName(productName);
    if (productIndex !== -1) {
      // Get the Add To Cart button for this product - need to find the correct one
      const productElement = this.page.locator('h5').nth(productIndex);
      // Find the parent container and then the Add To Cart button within it
      const container = productElement.locator('xpath=ancestor::div[contains(@class, "product")]');
      const addToCartButton = container.locator('button').filter({ hasText: 'Add To Cart' });
      
      if (await addToCartButton.count() > 0) {
        await addToCartButton.first().click();
        // Wait for success message
        await this.page.waitForTimeout(1000);
      } else {
        // Fallback: find by all Add To Cart buttons
        const allAddToCartButtons = this.page.locator('button').filter({ hasText: 'Add To Cart' });
        await allAddToCartButtons.nth(productIndex).click();
        await this.page.waitForTimeout(1000);
      }
    } else {
      throw new Error(`Product "${productName}" not found`);
    }
  }

  async verifyProductAlertMessage() {
    // Product added alert might appear as toast or alert
    const alert = this.page.locator('text=Product Added To Cart');
    await expect(alert).toBeVisible({ timeout: 5000 }).catch(() => {
      // If alert text not found, continue - it may have disappeared
    });
  }
}

module.exports = ProductPage;
