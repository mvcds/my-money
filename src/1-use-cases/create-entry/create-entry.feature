Feature: Create Entry
  In order to control my money
  As a user
  I want to be able to create entries

  Background:
    Given the world's "presenter"
      And the world's "storage"
      And the world's "injection"

  Scenario: Invalid values
    Given the entry a value of "one"
      And an error when trying to create the entry
    When I create the entry
    Then creating a new entry fails
      And the world's "presenter.onError" is verified

  Scenario Outline: Valid values
    Given the entry a value of <value>
      And no errors when trying to create the entry
    When I create the entry
    Then creating a new entry succeeds
      And the world's "presenter.onError" is verified

    Examples:
      | value | direction |
      | 10 |         "incoming" |
      | -10 |         "expenses" |
