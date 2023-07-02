export const booking1 = `Name: Booking 1\
Phone: 0123456789\
Mail: booking1@gmail.com\
Starts at: 10.02.2019, 01:00:00\
Ends at: 10.02.2020, 21:00:00`

export const booking1Details = {
  id: "ID: A-1",
  utm_source: "UTM SOURCE: utm source",
  utm_medium: "UTM MEDIUM: utm medium",
  utm_campaign: "UTM CAMPAIGN: utm campaign",
  fb: "FB: fb",
  timezone: "Timezone: ",
  createdat: "Created at: 10.02.2018, 20:00:00",
  tentative: "Tentative: ",
  cancelled: "Cancelled: ",
  accountid: "Account ID: ",
  profileid: "Profile ID: ",
  team_member: "Team member: ionut",
  statusid: "Status ID: "
}

//check if the first 10 bookings are displayed
export function checkBookingsAreVisible() {
  cy.contains(booking1)
  cy.contains("Booking 2")
  cy.contains("Booking 10")
}

export const prospect1 = `Prospect 1\
booking1@gmail.com`

//check if the first 10 prospects are displayed
export function checkProspectsAreVisible() {
  cy.contains(prospect1)
  cy.contains("Prospect 2")
  cy.contains("Prospect 10")
}

export function checkBookingsOrder(expectedData) {
  let fieldInPage = 0
  //first page contains only 10 bookings so we need only half of the data length
  for (let booking = 0; booking < expectedData.length / 2; ++booking) {
    for (let fieldInBooking = 1; fieldInBooking <= 5; ++fieldInBooking) {
      cy.get('p').eq(fieldInPage).contains(expectedData[booking][fieldInBooking])
      ++fieldInPage
    }
  }
}

export function createBookingsDataTest() {
  const bookingsDataTest = []
  for (let i = 1; i <= 20; ++i) {
    bookingsDataTest[i - 1] = [
      String.fromCharCode(i + 64) + '-' + i, //id
      "Booking " + i,                        //name
      "0123456789",                          //phone
      "booking" + i + "@gmail.com",          //mail
      "10.02.2019, 0" + i + ":00:00",        //startsat
      "10.02.2020, 21:00:00"                 //endsat
    ]
    //we have to get rid of "0" if the hour is bigger than 9
    if (i > 9) {
      bookingsDataTest[i - 1][4] = "10.02.2019, " + i + ":00:00"
    }
  }

  return bookingsDataTest
}

export function sortBookingsDataTest(bookingsDataTest, sortBy, sortOrder) {
  //we need "sortHelper" to know when we have to sort desc or asc
  let sortHelper = 1
  if (sortOrder === 'desc') {
    sortHelper = -1
  }

  bookingsDataTest.sort(function(a, b) {
    if (a[sortBy] < b[sortBy]) {
      return -sortHelper
    }
    if (a[sortBy] > b[sortBy]) {
      return sortHelper
    }
    return 0
  })
  
  return bookingsDataTest
}

export function validateEmailFormat(email) {
  cy.get('input[id="mail"]').clear()
  cy.get('input[id="mail"]').click().type(email)
  cy.get('button[id="create"').click()
  cy.contains('Invalid email adress!')
}

export function createProspect(email, name, phone) {
  cy.get('button[id="create-prospect"]').click()

  cy.get('input[id="mail"]').click().type(email)
  cy.get('input[id="name"]').click().type(name)
  cy.get('input[id="phone"]').click().type(phone)

  cy.get('button[id="create"]').click()
  cy.contains('Prospect successfully created!')
}