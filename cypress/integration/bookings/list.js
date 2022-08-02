import { booking1Details, bookingsList } from '../../lib/helper.js'

describe('List bookings', () => {
  it('Should not have permissions when not logged in', () => {
    cy.visit('http://localhost:3000/booking/list')
    
    cy.contains('Welcome to SalesWell')
    cy.contains(bookingsList[0]).should('not.exist')
    cy.contains(bookingsList[1]).should('not.exist')
  })

  it('Should have permissions when logged in as user', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')
    
    cy.contains(bookingsList[0])
    cy.contains(bookingsList[1])
    cy.contains(bookingsList[17])
    cy.contains(bookingsList[18]).should('not.exist')
    
    cy.contains('Welcome to SalesWell').should('not.exist')
  })

  it('Should have permissions when logged in as admin', () => {
    cy.login('admin@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')
    
    cy.contains(bookingsList[0])
    cy.contains(bookingsList[1])
    cy.contains(bookingsList[17])
    cy.contains(bookingsList[18]).should('not.exist')

    cy.contains('Welcome to SalesWell').should('not.exist')
    cy.contains(booking1Details).should('not.exist')
  })

  it('Should display details when show more button is clicked', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')
    
    cy.contains(bookingsList[0])
    cy.contains(bookingsList[1])
    cy.contains(bookingsList[17])
    cy.contains(bookingsList[18]).should('not.exist')
    
    cy.contains('Welcome to SalesWell').should('not.exist')
    cy.contains(booking1Details).should('not.exist')
    cy.get('button[id="booking1"]').first().click()
    cy.contains(booking1Details)
  })

  it('Should display many bookings on scrolling down', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')
    
    cy.contains(bookingsList[0])
    cy.contains(bookingsList[1])
    cy.contains(bookingsList[17])
    cy.contains(bookingsList[18]).should('not.exist')

    cy.scrollTo('bottom')
    cy.contains(bookingsList[0])
    cy.contains(bookingsList[18])
    cy.contains(bookingsList[5]).should('not.exist')

    cy.scrollTo('bottom')
    cy.contains(bookingsList[0])
    cy.contains(bookingsList[18])
    cy.contains(bookingsList[5])
    cy.contains(bookingsList[9])
  })
})