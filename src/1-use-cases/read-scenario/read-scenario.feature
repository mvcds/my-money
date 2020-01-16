Feature: Read Scenario
  In order to control my money
  As a user
  I want to be know my finantial scenario

  Background:
    Given the world's "presenter"
      And the world's "storage"
      And the world's "injection"

  Scenario: Known projection
    Given the scenario the projection "default"
      And a "default" is a known scenario
    When I read the scenario
    Then the world's "presenter.onSuccess" is verified
     And the world's "presenter.onError" is verified
     And the scenario is defined
