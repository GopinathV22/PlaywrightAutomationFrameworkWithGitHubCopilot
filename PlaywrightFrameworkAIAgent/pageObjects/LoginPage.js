const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'email@example.com' });
    this.passwordInput = page.getByRole('textbox', { name: 'enter your passsword' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async navigateToLogin(loginUrl) {
    await this.page.goto(loginUrl);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
    // Wait for navigation to dashboard
    await this.page.waitForURL('**/dashboard/dash');
  }

  async login(loginUrl, email, password) {
    await this.navigateToLogin(loginUrl);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }
}

module.exports = LoginPage;
