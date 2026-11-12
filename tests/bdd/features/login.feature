Feature: SauceDemo login

  Scenario: Standard user logs in successfully
    Given I am on the SauceDemo login page
    When I log in as the standard user
    Then I should see the products page

  Scenario: Locked-out user cannot log in
    Given I am on the SauceDemo login page
    When I log in as the locked-out user
    Then I should see a locked-out error
