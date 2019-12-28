Feature: Create Entry
  In order to control my money
  As a user
  I want to be able to create entries

  Scenario: Invalid values
    Given an enabled entry with invalid value of "one"
    When I create this entry
    Then an error for "Invalid entry value" is registered

  Scenario Outline: Valid values
    Given an enabled entry with valid value of <value>
    When I create this entry
    Then a new <direction> is added to the projection
      And the create-entry-presenter was called correctly
      And the projection is associated with entry

    Examples:
      | value | direction |
      | 10 |         "incoming" |
      | -10 |         "expenses" |
