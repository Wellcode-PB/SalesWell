import { booking1, booking2, booking2Details} from '../../lib/helper.js'

describe('List bookings', () => {
  before(async () => {
    await cy.exec('dotenv -e .env.test -- npx prisma migrate reset --force')
  })

  it('Should not have permissions when not logged in', () => {
    cy.visit('http://localhost:3000/booking/list')
    
    cy.contains('Welcome to SalesWell')
    cy.contains(booking1).should('not.exist')
    cy.contains(booking2).should('not.exist')
    cy.contains('No bookings!').should('not.exist')
  })

  it('Should have permissions when logged in as user', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')
    
    cy.contains(booking1)
    cy.contains(booking2)
    
    cy.contains('Welcome to SalesWell').should('not.exist')
    cy.contains('No bookings!').should('not.exist')
  })

  it('Should have permissions when logged in as admin', () => {
    cy.login('admin@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')
    
    cy.contains(booking1)
    cy.contains(booking2)

    cy.contains('Welcome to SalesWell').should('not.exist')
    cy.contains('No bookings!').should('not.exist')
    cy.contains(booking2Details).should('not.exist')
  })

  it('Should display details when show more button is clicked', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')
    
    cy.contains(booking1)
    cy.contains(booking2)
    
    cy.contains('Welcome to SalesWell').should('not.exist')
    cy.contains('No bookings!').should('not.exist')
    cy.contains(booking2Details).should('not.exist')
    cy.get('button[id="booking2"]').first().click()
    cy.contains(booking2Details)
  })
})