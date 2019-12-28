Feature: Create Entry
  In order to control my money
  As a user
  I want to be able to create entries

  Scenario Outline: Valid values
    Given an enabled entry with value <value>
    When I create this entry
    Then a new <direction> is added to the projection

    Examples:
      | value | direction |
      | 10 |         "incoming" |
      | -10 |         "expenses" |
