import { activeStatus, canceledStatus} from '../../lib/helper.js'

describe('Booking status', () => {
  before(async () => {
    await cy.exec('dotenv -e .env.test -- npx prisma migrate reset --force')
  })

  it('Should not have permissions when not logged in', () => {
    cy.visit('http://localhost:3000/booking/list')
    
    cy.contains('Welcome to SalesWell')

    cy.contains('No status').should('not.exist')
    cy.contains(activeStatus).should('not.exist')
    cy.contains(canceledStatus).should('not.exist')
  })

  it('Should have permissions when logged in as user', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')
    
    cy.contains('No status')

    cy.contains(activeStatus).should('not.exist')
    cy.contains(canceledStatus).should('not.exist')
    cy.contains('Welcome to SalesWell').should('not.exist')
  })

  it('Should have permissions when logged in as admin', () => {
    cy.login('admin@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')
    
    cy.contains('No status')

    cy.contains(activeStatus).should('not.exist')
    cy.contains(canceledStatus).should('not.exist')
    cy.contains('Welcome to SalesWell').should('not.exist')
  })

  it('Change status when status button is clicked and another status is chosen', 
    () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')
    
    cy.contains('No status')
    cy.contains(activeStatus).should('not.exist')
    cy.contains(canceledStatus).should('not.exist')
    
    cy.get('button[id="status-booking2"]').click()
    cy.get('li[id="active"]').click()

    cy.contains('No status')
    cy.contains(activeStatus)
    cy.contains(canceledStatus).should('not.exist')

    cy.get('button[id="status-booking1"]').click()
    cy.get('li[id="canceled"]').click()

    cy.contains('No status').should('not.exist')
    cy.contains(activeStatus)
    cy.contains(canceledStatus)
  })

  it('Check if the statuses have been updated in the database', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')
    
    cy.contains('No status').should('not.exist')
    cy.contains(activeStatus)
    cy.contains(canceledStatus)
  })
})