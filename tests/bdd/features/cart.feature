Feature: SauceDemo shopping cart

  Scenario: Add products to the cart and verify its contents
    Given I am on the SauceDemo login page
    When I log in as the standard user
    And I add these products to the cart
      | Sauce Labs Backpack  |
      | Sauce Labs Bike Light |
    And I open the shopping cart
    Then the cart should contain exactly these products
      | Sauce Labs Backpack (intentional failure) |
      | Sauce Labs Bike Light |
