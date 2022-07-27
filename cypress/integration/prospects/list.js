import { prospect1, prospect2 } from '../../lib/helper.js'

describe('List prospects', () => {
  before(async () => {
    await cy.exec('dotenv -e .env.test -- npx prisma migrate reset --force')
  })

  it('Should not have permissions when not logged in', () => {
    cy.visit('http://localhost:3000/prospects/list')

    cy.contains('Welcome to SalesWell')
  })

  it('Should have permissions when logged in as user', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    cy.contains(prospect1)
    cy.contains(prospect2)
    cy.contains('Welcome to SalesWell').should('not.exist')
    cy.contains('No prospects!').should('not.exist')
  })

  it('Should have permissions when logged in as admin', () => {
    cy.login('admin@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    cy.contains(prospect1)
    cy.contains(prospect2)
    cy.contains('Welcome to SalesWell').should('not.exist')
    cy.contains('No prospects!').should('not.exist')
  })
})