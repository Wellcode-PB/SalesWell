import {
  booking1,
  booking1Details,
  checkBookingsAreVisible,
  checkBookingsOrder, 
  createBookingsDataTest, 
  sortBookingsDataTest 
} from '../lib/helper.js'

describe('Bookings', () => {
  before(() => {
    cy.task('db:seedBookings')
  })

  describe('List bookings', () => {

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

  describe('Sort bookings', () => {
    it('Should be sorted by id by default', () => {
      cy.login('normal@example.com', 'password')
      cy.visit('http://localhost:3000/booking/list')

      //check if the bookings are sorted by id the first time, taking all 
      // of them and checking their order, which should be ascending
      const expectedData = createBookingsDataTest()
      cy.wait(300)
      checkBookingsOrder(expectedData)
    })

    it('Check sorting by booking id', () => {
      cy.login('normal@example.com', 'password')
      cy.visit('http://localhost:3000/booking/list')

      //first field in the booking is "id" (see in createBookingsTest function)
      const sortById = 0
      const bookingsData = createBookingsDataTest()

      //should be sorted ascending by id (ascending by default)
      cy.get('[id="sort-by"]').first().click()
      cy.get('[id="sort-by-id"]').first().click()
      
      let expectedData = sortBookingsDataTest(bookingsData, sortById, 'asc')
      cy.wait(300)
      checkBookingsOrder(expectedData)

      //should be sorted descending by id
      cy.get('[id="sort-by"]').first().click()
      cy.get('[id="sort-by-id"]').first().click()
      cy.get('[id="ordering"]').first().click()
      cy.get('[id="sort-desc"]').first().click()
      
      expectedData = sortBookingsDataTest(bookingsData, sortById, 'desc')
      cy.wait(300)
      checkBookingsOrder(expectedData)
      
      //should be sorted ascending by id (ascending on select)
      cy.get('[id="sort-by"]').first().click()
      cy.get('[id="sort-by-id"]').first().click()
      cy.get('[id="ordering"]').first().click()
      cy.get('[id="sort-asc"]').first().click()

      expectedData = sortBookingsDataTest(bookingsData, sortById, 'asc')
      cy.wait(300)
      checkBookingsOrder(expectedData)
    })

    it('Check sorting by booking start date', () => {
      cy.login('normal@example.com', 'password')
      cy.visit('http://localhost:3000/booking/list')

      //the 5th field in the booking is "startsat" 
      //(see in createBookingsTest function)
      const sortByStartsat = 4
      const bookingsData = createBookingsDataTest()
      let expectedData

      //should be sorted ascending by start date (ascending by default)
      cy.get('[id="sort-by"]').first().click()
      cy.get('[id="sort-by-date"]').first().click()
      
      expectedData = sortBookingsDataTest(bookingsData, sortByStartsat, 'asc')
      cy.wait(300)
      checkBookingsOrder(expectedData)

      //should be sorted descending by start date
      cy.get('[id="sort-by"]').first().click()
      cy.get('[id="sort-by-date"]').first().click()
      cy.get('[id="ordering"]').first().click()
      cy.get('[id="sort-desc"]').first().click()

      expectedData = sortBookingsDataTest(bookingsData, sortByStartsat, 'desc')
      cy.wait(300)
      checkBookingsOrder(expectedData)

      //should be sorted ascending by start date (ascending on select)
      cy.get('[id="sort-by"]').first().click()
      cy.get('[id="sort-by-date"]').first().click()
      cy.get('[id="ordering"]').first().click()
      cy.get('[id="sort-asc"]').first().click()
      
      expectedData = sortBookingsDataTest(bookingsData, sortByStartsat, 'asc')
      cy.wait(300)
      checkBookingsOrder(expectedData)
    })
  })

  describe('Booking status', () => {
    it('Should not have permissions when not logged in', () => {
      cy.visit('http://localhost:3000/booking/list')
      
      cy.contains('Welcome to SalesWell')

      cy.contains('No status').should('not.exist')
      cy.contains('active').should('not.exist')
      cy.contains('canceled').should('not.exist')
    })

    it('Should have permissions when logged in as user', () => {
      cy.login('normal@example.com', 'password')
      cy.visit('http://localhost:3000/booking/list')
      
      cy.contains('No status')

      cy.contains('active').should('not.exist')
      cy.contains('canceled').should('not.exist')
    })

    it('Should have permissions when logged in as admin', () => {
      cy.login('admin@example.com', 'password')
      cy.visit('http://localhost:3000/booking/list')
      
      cy.contains('No status')

      cy.contains('active').should('not.exist')
      cy.contains('canceled').should('not.exist')
    })

    it('Change status when status button is clicked and another status is chosen', 
      () => {
      cy.login('normal@example.com', 'password')
      cy.visit('http://localhost:3000/booking/list')
      
      cy.contains('No status')
      cy.contains('active').should('not.exist')
      cy.contains('canceled').should('not.exist')
      
      cy.get('button[id="status-A-1"]').click()
      cy.get('li[id="active"]').click()

      cy.contains('No status')
      cy.contains('active')
      cy.get('button[id="status-A-1"]')
        .contains('No status').should('not.exist')
      cy.contains('canceled').should('not.exist')

      cy.get('button[id="status-B-2"]').click()
      cy.get('li[id="canceled"]').click()

      cy.contains('No status')
      cy.contains('active')
      cy.contains('canceled')

      cy.get('button[id="status-A-1"]')
        .contains('No status').should('not.exist')
      cy.get('button[id="status-B-2"]')
        .contains('No status').should('not.exist')
    })

    it('Check if the statuses have been updated in the database', () => {
      cy.login('normal@example.com', 'password')
      cy.visit('http://localhost:3000/booking/list')

      cy.contains('No status')
      cy.contains('active')
      cy.contains('canceled')

      cy.get('button[id="status-A-1"]')
        .contains('No status').should('not.exist')
      cy.get('button[id="status-B-2"]')
        .contains('No status').should('not.exist')
    })
  })

  after(() => {
    cy.doneTesting('bookings')
  })
})