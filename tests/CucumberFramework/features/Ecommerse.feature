Feature: Ecommerse Validations

    @Regression
    Scenario: End-to-End Purchase Flow
        Given Login to Ecommerse site "https://rahulshettyacademy.com/client/#/auth/login" with "gopinathv@gmail.com" and "Gopiecom@123"
        When I add "ZARA COAT 3" to the cart
        Then Enter valid details and place the order for "ZARA COAT 3"
        Then Verify the order is present in the Order History page.

    @Validations
    Scenario: Product Search and Cart Validation
        Given Login to Ecommerse site "https://rahulshettyacademy.com/client/#/auth/login" with "gopinathv@gmail.com" and "Gopiecom@123"
        When I add "ZARA COAT 3" to the cart
        Then Verify "ZARA COAT 3" is present in the cart

    @Negative
    Scenario Outline: Invalid Login Attempt
        Given Login to Ecommerse site "https://rahulshettyacademy.com/client/#/auth/login" with "<userName>" and "<password>"
        Then Verify error message "<ErrorMessage>" is displayed
        Examples:
        |userName               |password        |ErrorMessage   |
        |gopinathv@gmail.com    |12mlk2222       |Incorrect      |
        |gopi@gmail.com         |1234            |Incorrect      |