Feature: Add to cart
  In order to be able to add to cart
  As an anonymous user
  We need to be able to see added to cart product.


  @javascript
  Scenario: Add to cart product
    Given I am an anonymous user
    When  I visit "electronic-cigarette-starter-kits"
    And   I accept I am 18
    And   I agree not shipped
    And   I add to cart
    Then  I should see the item added to the cart
