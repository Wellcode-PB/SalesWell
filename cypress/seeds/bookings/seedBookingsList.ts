import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// This function will create 20 bookings for testing the list of bookings
async function addBookingsList() {
  // use a simple for loop to make sure the bookings are
  // going to be inserted in this exact order (from 1 to 20)
  for (let index = 1; index <= 20; ++index) {
    await prisma.bookings.create({ data: {
      id:           String.fromCharCode(index + 64) + '-' + index,
      name:         'Booking ' + index,
      phone:        '0123456789',
      mail:         'booking' + index + '@gmail.com',
      team_member:  'ionut',
      status_id:    null,
      utm_source:   'utm source',
      utm_medium:   'utm medium',
      utm_campaign: 'utm campaign',
      fb:           'fb',
      createdat:    new Date('2018/02/10 20:00:00'),
      startsat:     new Date('2019/02/10 ' + index + ':00:00'),
      endsat:       new Date('2020/02/10 21:00:00'),
      tentative:    '',
      cancelled:    '',
      timezone:     '',
      accountid:    '',
      profileid:    ''
    } })
  }
}

addBookingsList()
