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

  // save the prospect note
  it('Should save the prospect note', () => {
    // should add some notes in textarea
    cy.get('#create-note').click()
    cy.get('#create-note').should('not.exist')

    cy.get('#prospect-note').click().type('This is a test note')
    cy.contains('This is a test note')

    cy.get('#save').click()

    // the added prospect note should be saved
    cy.contains('This is a test note').should('exist')

    // the created note date should be visible
    cy.contains('Created at:').should('exist')

    // the created note update date should not be visible
    cy.contains('Updated at:').should('not.exist')

    // the delete and update prospect note buttons should be visible
    cy.get('#delete-note').should('exist')
    cy.get('#edit-note').should('exist')
  })

  // update a prospect note
  it('Should update a proctect note', () => {
    // open the textarea note to update it
    cy.get('#edit-note').click()

    // the opened note should be visible
    cy.contains('This is a test note').should('exist')

    // the created note date should be visible
    cy.contains('Created at:').should('exist')

    // the created note update date should not be visible
    cy.contains('Updated at:').should('not.exist')

    cy.get('#save').should('exist')
    cy.get('#cancel').should('exist')

    cy.get('#delete-note').should('not.exist')
    cy.get('#edit-note').should('not.exist')

    // the new note should not be saved
    cy.get('#updated-note').click().clear().type('This is a updated test note')
    cy.get('#cancel').click()

    cy.contains('This is a updated test note').should('not.exist')
    cy.contains('This is a test note').should('exist')
    cy.contains('Created at:').should('exist')
    cy.contains('Updated at:').should('not.exist')

    cy.get('#delete-note').should('exist')
    cy.get('#edit-note').should('exist')

    cy.get('#save').should('not.exist')
    cy.get('#cancel').should('not.exist')

    // the new note should be saved
    cy.get('#edit-note').click()

    cy.get('#updated-note').click().clear().type('This is a updated test note')
    cy.get('#save').click()

    cy.contains('This is a updated test note').should('exist')
    cy.contains('Created at:').should('exist')
    cy.contains('Updated at:').should('exist')

    cy.get('#delete-note').should('exist')
    cy.get('#edit-note').should('exist')
  })

  // delete a prospect note
  it('Should delete a prospect note', () => {
    cy.get('#delete-note').click()
    cy.contains('Are you sure you want to delete this note?').should('exist')

    // the selected note should not be deleted
    cy.get('#cancel-action').click()
    cy.contains('This is a updated test note').should('exist')

    // the selected note should be deleted
    cy.get('#delete-note').click()
    cy.contains('Are you sure you want to delete this note?').should('exist')
    cy.get('#confirm-action').click()
    cy.contains('This is a updated test note').should('not.exist')
    cy.get('#delete-note').should('not.exist')
    cy.get('#edit-note').should('not.exist')
  })
})