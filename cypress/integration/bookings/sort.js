import { 
  checkBookingsOrder, 
  createBookingsDataTest, 
  filterBookingsByTeamMembers,
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

  it('Check sorting by "admin user" team member', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')

    const sortById = 0
    let bookingsData = createBookingsDataTest()

    //bookings should be sorted ascending by id
    //(ascending by default)
    cy.get('[id="sort-by-team-member"]').first().click()
    cy.get('[id="admin@example.com"]').first().click()

    let expectedData = filterBookingsByTeamMembers(
      sortBookingsDataTest(bookingsData, sortById, 'asc'), ['admin user'])
    cy.wait(300)
    checkBookingsOrder(expectedData)

    //bookings should be sorted descending by id
    cy.get('body').click(0, 0)
    cy.get('[id="ordering"]').first().click()
    cy.get('[id="sort-desc"]').first().click()
    
    expectedData = filterBookingsByTeamMembers(
      sortBookingsDataTest(bookingsData, sortById, 'desc'), ['admin user'])
    cy.wait(300)
    checkBookingsOrder(expectedData)

    //bookings should be sorted descending by date
    cy.get('[id="sort-by"]').first().click()
    cy.get('[id="sort-by-date"]').first().click()

    const sortByStartsat = 4
    expectedData = filterBookingsByTeamMembers(
      sortBookingsDataTest(bookingsData, sortByStartsat, 'desc'), ['admin user'])
    cy.wait(300)
    checkBookingsOrder(expectedData)

    cy.get('[id="ordering"]').first().click()
    cy.get('[id="sort-asc"]').first().click()

    //bookings should be sorted ascending by date
    expectedData = filterBookingsByTeamMembers(
      sortBookingsDataTest(bookingsData, sortByStartsat, 'asc'), ['admin user'])
    cy.wait(300)
    checkBookingsOrder(expectedData)
  })

  it('Check sorting by "normal user" team member', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')

    const sortById = 0
    let bookingsData = createBookingsDataTest()

    //bookings should be sorted ascending by id
    //(ascending by default)
    cy.get('[id="sort-by-team-member"]').first().click()
    cy.get('[id="normal@example.com"]').first().click()

    let expectedData = filterBookingsByTeamMembers(
      sortBookingsDataTest(bookingsData, sortById, 'asc'), ['normal user'])
    cy.wait(300)
    checkBookingsOrder(expectedData)

    //bookings should be sorted descending by id
    cy.get('body').click(0, 0)
    cy.get('[id="ordering"]').first().click()
    cy.get('[id="sort-desc"]').first().click()
    
    expectedData = filterBookingsByTeamMembers(
      sortBookingsDataTest(bookingsData, sortById, 'desc'), ['normal user'])
    cy.wait(300)
    checkBookingsOrder(expectedData)

    //bookings should be sorted descending by date
    cy.get('[id="sort-by"]').first().click()
    cy.get('[id="sort-by-date"]').first().click()

    const sortByStartsat = 4
    expectedData = filterBookingsByTeamMembers(
      sortBookingsDataTest(bookingsData, sortByStartsat, 'desc'), ['normal user'])
    cy.wait(300)
    checkBookingsOrder(expectedData)

    cy.get('[id="ordering"]').first().click()
    cy.get('[id="sort-asc"]').first().click()

    //bookings should be sorted ascending by date
    expectedData = filterBookingsByTeamMembers(
      sortBookingsDataTest(bookingsData, sortByStartsat, 'asc'), ['normal user'])
    cy.wait(300)
    checkBookingsOrder(expectedData)
  })

  it('Check sorting by "Select All" members filter', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')

    const sortById = 0
    let bookingsData = createBookingsDataTest()

    //bookings should be sorted ascending by id
    //(ascending by default)
    cy.get('[id="sort-by-team-member"]').first().click()
    cy.get('[id="select-all"]').first().click()
    
    let expectedData = filterBookingsByTeamMembers(
      sortBookingsDataTest(bookingsData, sortById, 'asc'), 
      ['admin user', 'normal user'])
    cy.wait(300)
    checkBookingsOrder(expectedData)

    //bookings should be sorted descending by id
    cy.get('body').click(0, 0)
    cy.get('[id="ordering"]').first().click()
    cy.get('[id="sort-desc"]').first().click()
    
    expectedData = filterBookingsByTeamMembers(
      sortBookingsDataTest(bookingsData, sortById, 'desc'),
      ['admin user', 'normal user'])
    cy.wait(300)
    checkBookingsOrder(expectedData)

    //bookings should be sorted descending by date
    cy.get('[id="sort-by"]').first().click()
    cy.get('[id="sort-by-date"]').first().click()

    const sortByStartsat = 4
    expectedData = filterBookingsByTeamMembers(
      sortBookingsDataTest(bookingsData, sortByStartsat, 'desc'),
      ['admin user', 'normal user'])
    cy.wait(300)
    checkBookingsOrder(expectedData)

    cy.get('[id="ordering"]').first().click()
    cy.get('[id="sort-asc"]').first().click()

    //bookings should be sorted ascending by date
    expectedData = filterBookingsByTeamMembers(
      sortBookingsDataTest(bookingsData, sortByStartsat, 'asc'),
      ['admin user', 'normal user'])
    cy.wait(300)
    checkBookingsOrder(expectedData)
  })

  it('Check deselect of members filter', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/booking/list')

    const sortById = 0
    let bookingsData = createBookingsDataTest()

    //bookings should be sorted ascending by id
    //(ascending by default)
    cy.get('[id="sort-by-team-member"]').first().click()
    cy.get('[id="select-all"]').first().click()
    cy.wait(300)
    //deselect 'admin user'
    cy.get('[id="admin@example.com"]').first().click()

    //bookings of 'admin user' should not be listed
    let expectedData = filterBookingsByTeamMembers(
      sortBookingsDataTest(bookingsData, sortById, 'asc'), ['normal user'])
    cy.wait(300)
    checkBookingsOrder(expectedData)

    //deselect 'normal user' and select 'admin user'
    cy.get('[id="normal@example.com"]').first().click()
    cy.wait(300)
    cy.get('[id="admin@example.com"]').first().click()
    bookingsData = createBookingsDataTest()

    //bookings of 'normal user' should not be listed
    expectedData = filterBookingsByTeamMembers(
      sortBookingsDataTest(bookingsData, sortById, 'asc'), ['admin user'])
    cy.wait(300)
    checkBookingsOrder(expectedData)
  })
})