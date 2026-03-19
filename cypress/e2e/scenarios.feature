Feature: Core functionality and checkout flow verification (Post-backend update)

  Background:
    Given the user is on the Knihy Dobrovský homepage
    And the cookie consent banner has been accepted

  # --- SEARCH ---

  # 1)
  Scenario: Search for an existing product
    Given the search field is visible
    When the user enters "Zaklínač" and submits the search
    Then a list of relevant products is displayed
    And the title of the first product contains the word "zaklínač"

  # 2)
  Scenario: Search for a non-existent product
    Given the search field is visible
    When the user enters "neexistujicikniha123" and submits the search
    Then the user is redirected to the search results page
    And the warning message "Zkontrolujte, zda jste napsali vše dobře" is displayed
    And no products are listed

  # 3)
  Scenario: Search auto-suggest (whisperer) functionality
    Given the search field is visible
    When the user types "Harry Pott" into the search field
    Then the auto-suggest box is displayed
    And the suggestions contain the text "Harry Potter"


  # --- SHOPPING CART ---

  # 5)
  Scenario: Add a product to the cart from the product detail page
    Given the user has searched for "Duna"
    And opened the detail page of the first product
    When the user clicks the "Do košíku" button
    And confirms the modal by clicking "Pokračovat do košíku"
    Then the user is redirected to the shopping cart page
    And the page header contains "Košík"

  # 6)
  Scenario: Remove a product from the shopping cart
    Given the user has added the product "Havran" to the shopping cart
    And is currently on the shopping cart page
    When the user clicks the remove icon next to the product
    Then the product is removed from the cart
    And the empty cart message "Váš košík je prázdný" is displayed