# PlaywrightFrameworkAIAgent

A comprehensive Playwright test automation framework for e-commerce application testing, following industry best practices with Page Object Model pattern.

## Project Structure

```
PlaywrightFrameworkAIAgent/
├── pageObjects/
│   ├── LoginPage.js          # Page object for login functionality
│   ├── ProductPage.js        # Page object for product listing and add to cart
│   ├── CartPage.js           # Page object for cart operations
│   └── POManager.js          # Page Object Manager to manage all page objects
├── tests/
│   └── cartTest.spec.js      # Main test file for cart verification
├── testData/
│   └── testData.json         # Test data (credentials, URLs, product info)
├── utils/
│   └── (future utilities)
├── playwright.config.js      # Playwright configuration
├── package.json              # Project dependencies
└── README.md                 # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd PlaywrightFrameworkAIAgent
```

2. Install dependencies:
```bash
npm install
```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run tests in headed mode (see browser):
```bash
npm run test:headed
```

### Run tests in debug mode:
```bash
npm run test:debug
```

### Run tests with UI:
```bash
npm run test:ui
```

### View test report:
```bash
npm run report
```

## Test Scenarios

### 1. Add Product to Cart and Verify in Cart Page
- **Test File**: `tests/cartTest.spec.js`
- **Test Name**: "Verify that Zara Coat 3 product is added to cart and visible in cart page"
- **Steps**:
  1. Login with provided credentials
  2. Navigate to product listing page
  3. Add "ZARA COAT 3" product to cart
  4. Verify product added alert message
  5. Navigate to cart page
  6. Verify product is visible in cart

### 2. Verify Cart Product Details
- **Test Name**: "Verify cart displays correct product details"
- **Steps**:
  1. Login with credentials
  2. Add "ZARA COAT 3" to cart
  3. Navigate to cart
  4. Verify product name and price are displayed correctly

## Test Data

Test data is stored in `testData/testData.json`:
- **Credentials**: Email and password for login
- **URLs**: Base URL, login URL, dashboard URL, and cart URL
- **Product Info**: Product name and price

## Page Objects

### LoginPage
Handles login functionality:
- `navigateToLogin(loginUrl)` - Navigate to login page
- `fillEmail(email)` - Enter email
- `fillPassword(password)` - Enter password
- `clickLoginButton()` - Click login button
- `login(loginUrl, email, password)` - Complete login flow

### ProductPage
Handles product operations:
- `getProductByName(productName)` - Find product by name
- `addProductToCart(productName)` - Add product to cart
- `verifyProductAlertMessage()` - Verify success alert

### CartPage
Handles cart operations:
- `navigateToCart()` - Navigate to cart page
- `getCartItems()` - Get all cart items
- `verifyProductInCart(productName)` - Verify product exists in cart
- `getProductPriceInCart(productName)` - Get product price
- `verifyProductDetails(productName, expectedPrice)` - Verify product details

### POManager
Manages all page objects:
- `getLoginPage()` - Get LoginPage instance
- `getProductPage()` - Get ProductPage instance
- `getCartPage()` - Get CartPage instance

## Configuration

The `playwright.config.js` file includes:
- Test directory: `./tests`
- Reporters: HTML report
- Screenshots: On failure only
- Videos: On failure retention
- Browsers: Chromium, Firefox, and WebKit
- Trace: On first retry

## Notes

- Tests are configured to run sequentially for better stability with shared cart data
- All tests use the same login credentials from `testData.json`
- Screenshots and videos are captured only on test failures
- HTML report is generated after test execution

## Future Enhancements

- Add more test scenarios (checkout, payment, etc.)
- Implement custom reporter
- Add visual testing
- Implement API tests alongside UI tests
- Add performance testing
- Add cross-browser parallel execution
