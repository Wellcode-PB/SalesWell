import { checkProspectsAreVisible, prospect1 } from '../../lib/helper.js'

describe('List prospects', () => {
  before(() => {
      cy.task('db:seedProspects')
    }
  )
  it('Should not have permissions when not logged in', () => {
    cy.visit('http://localhost:3000/prospects/list')

    cy.contains(prospect1).should('not.exist')
    cy.contains('Welcome to SalesWell')
  })

  it('Should have permissions when logged in as user', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    //only prospects 1-10 should be displayed
    checkProspectsAreVisible()
    cy.contains('Prospect 11').should('not.exist')
    cy.contains('Welcome to SalesWell').should('not.exist')
    cy.contains('No prospects!').should('not.exist')
  })

  it('Should have permissions when logged in as admin', () => {
    cy.login('admin@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    //only prospects 1-10 should be displayed
    checkProspectsAreVisible()
    cy.contains('Prospect 11').should('not.exist')
    cy.contains('Welcome to SalesWell').should('not.exist')
    cy.contains('No prospects!').should('not.exist')
  })

  it('Should display many prospects on scrolling down', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')
    
    checkProspectsAreVisible()
    cy.contains('Prospect 11').should('not.exist')
    cy.scrollTo('bottom')
    
    //should be displayed prospects 1-20 on first scroll
    checkProspectsAreVisible()
    cy.contains("Prospect 11")
    cy.contains("Prospect 20")
    cy.scrollTo('bottom')
    cy.contains('Nothing more to show')
  })
})