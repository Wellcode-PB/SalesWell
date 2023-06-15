import { createProspect } from '../../lib/helper.js'

describe('Create a prospect note', () => {
  before(() => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    createProspect('note@wellcode.com', 'prospect note', '0747070781')
  })

  it('Should be able to open the textarea for adding notes', () => {
    // check the existence of the "Save" and "Cancel" buttons
    cy.get('#save').should('not.exist')
    cy.get('#cancel').should('not.exist')

    // open the textarea
    cy.get('#create-note').click()
    cy.get('#create-note').should('not.exist')

    // if does not exist an added notes, save button should be disabled
    cy.get('#save').should('be.disabled')

    // cancel button must be active when the textarea is opened
    cy.get('#cancel').should('not.be.disabled')
  })

  it('Should not save the prospect note', () => {
    // should add some notes in textarea
    cy.get('#prospect-note').click().type('This is a test note')
    cy.contains('This is a test note')

    cy.get('#save').should('not.be.disabled')
    cy.get('#cancel').should('not.be.disabled').click()

    // the added prospect notes should not be saved
    cy.contains('This is a test note').should('not.exist')

    // the elements should be back to their initial state
    cy.get('#create-note').should('exist')
    cy.get('#prospect-note').should('not.exist')
    cy.get('#save').should('not.exist')
    cy.get('#cancel').should('not.exist')
  })
})