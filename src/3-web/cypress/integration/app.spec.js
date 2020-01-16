// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('App', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  it('renders the app', function () {
    cy.get('.App-link').should('contain', 'Learn React')
  })

  it('repeats the title not', function () {
    cy.get('.App-link').should('contain', 'Learn React')
  })
})
