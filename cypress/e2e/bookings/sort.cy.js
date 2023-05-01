import { 
  checkBookingsOrder, 
  createBookingsDataTest, 
  sortBookingsDataTest 
} from '../../lib/helper.js'

describe('Sort bookings', () => {
  it('Should be sorted by id by default', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')

    //check if the bookings are sorted by id the first time, taking all of them 
    //and checking their order, which should be ascending
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

    //should be sorted ascending by start date (ascending by default)
    cy.get('[id="sort-by"]').first().click()
    cy.get('[id="sort-by-date"]').first().click()
    
    let expectedData = sortBookingsDataTest(bookingsData, sortByStartsat, 'asc')
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