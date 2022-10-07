import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const bookingsList = []
for (let i = 1; i <= 20; ++i) {
  bookingsList.push({
    id:           String.fromCharCode(i + 64) + '-' + i,
    name:         'Booking ' + i,
    phone:        '0123456789',
    mail:         'booking' + i + '@gmail.com',
    team_member:  'ionut',
    status_id:    null,
    utm_source:   'utm source',
    utm_medium:   'utm medium',
    utm_campaign: 'utm campaign',
    fb:           'fb',
    createdat:    new Date('2018/02/10 20:00:00'),
    startsat:     new Date('2019/02/10 ' + i + ':00:00'),
    endsat:       new Date('2020/02/10 21:00:00'),
    tentative:    '',
    cancelled:    '',
    timezone:     '',
    accountid:    '',
    profileid:    ''
  })
}

bookingsList.forEach(async (booking) => {
  await prisma.bookings.create({
    data: booking
  })
})
