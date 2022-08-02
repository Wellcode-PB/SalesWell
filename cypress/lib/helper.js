export const booking1 = `Name: Booking 1\
Phone: 0123456789\
Mail: booking1@gmail.com\
Starts at: 10.02.2019, 20:00:00\
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

export const prospect2 = `Prospect 2\
booking2@gmail.com`