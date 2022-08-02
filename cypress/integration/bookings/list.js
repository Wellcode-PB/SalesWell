import {
  booking1,
  booking1Details,
  checkBookingsAreVisible
} from '../../lib/helper.js'

describe('List bookings', () => {
  before(() => {
      cy.exec('dotenv -e .env.test -- npx prisma migrate reset --force')
      cy.task('db:seedBookings')
    }
  )

  it('Should not have permissions when not logged in', () => {
    cy.visit('http://localhost:3000/booking/list')
    
    cy.contains('Welcome to SalesWell')
    cy.contains(booking1).should('not.exist')
  })

  it('Should have permissions when logged in as user', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')
    
    //only bookings 1-10 should be displayed
    checkBookingsAreVisible()
    cy.contains("Booking 11").should('not.exist')
  })

  it('Should have permissions when logged in as admin', () => {
    cy.login('admin@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')
    
    checkBookingsAreVisible()
    cy.contains("Booking 11").should('not.exist')
    cy.contains(booking1Details.id).should('not.exist')
  })

  it('Should display details when show more button is clicked', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')
    
    checkBookingsAreVisible()
    cy.contains("Booking 11").should('not.exist')
    cy.contains(booking1Details.id).should('not.exist')

    cy.get('button[id="A-1"]').first().click()
    for (const key in booking1Details) {
      cy.contains(`${booking1Details[key]}`)
    }
  })

  it('Should display many bookings on scrolling down', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')
    
    checkBookingsAreVisible()
    cy.contains("Booking 11").should('not.exist')
    cy.scrollTo('bottom')
    
    //should be displayed bookings 1-20 on first scroll
    checkBookingsAreVisible()
    cy.contains("Booking 11")
    cy.contains("Booking 20")
    cy.scrollTo('bottom')
    cy.contains('Nothing more to show')
  })
})