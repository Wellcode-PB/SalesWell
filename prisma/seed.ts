import { 
  PrismaClient, 
  bookings,
  booking_status,
  prospects,
  team_members,
  Role 
} from '@prisma/client'

const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

const bookingsList: bookings[] = [
  {
    id: 'booking1',
    name: 'Booking 1',
    phone: '0213212341',
    mail: 'booking1@gmail.com',
    team_member:  'andrei',
    status_id:    null,
    utm_source:   'utm source',
    utm_medium:   'utm medium',
    utm_campaign: 'utm campaign',
    fb:           'fb',
    createdat:    new Date('2020/02/10 20:00:00'),
    startsat:     new Date('2019/02/10 20:00:00'),
    endsat:       new Date('2020/02/10 21:00:00'),
    tentative:    '',
    cancelled:    '',
    timezone:     '',
    accountid:    '',
    profileid:    ''
  }, 
  {
    id: 'booking2',
    name: 'Booking 2',
    phone: '0213522341',
    mail: 'booking2@gmail.com',
    team_member:  'ionut',
    status_id:    null,
    utm_source:   'utm source',
    utm_medium:   'utm medium',
    utm_campaign: 'utm campaign',
    fb:           'fb',
    createdat:    new Date('2018/02/10 20:00:00'),
    startsat:     new Date('2017/02/10 20:00:00'),
    endsat:       new Date('2028/02/10 21:00:00'),
    tentative:    '',
    cancelled:    '',
    timezone:     '',
    accountid:    '',
    profileid:    ''
  }
]

bookingsList.forEach(async (booking) => {
  await prisma.bookings.create({
    data: booking
  })
})

let seedData = async (): Promise<void> => {
  const prospects: prospects[] = [
    {
      id: 'prospect-1',
      name: 'Prospect 1',
      mail: 'booking1@gmail.com'
    },
    {
      id: 'prospect-2',
      name: 'Prospect 2',
      mail: 'booking2@gmail.com'
    }
  ]

  prospects.forEach(async (prospect) => {
    await prisma.prospects.create({
      data: prospect
    })
  })

  const statusTypes: booking_status[] = [
    {
      id: 'active',
      description: 'A booking that has been made'
    },
    {
      id: 'canceled',
      description: 'Booking canceled by prospect'
    }
  ]

  statusTypes.forEach(async (status) => {
    await prisma.booking_status.create({
      data: status
    })
  })

  const teamMembers: team_members[] = [
    {
      mail: 'normal@example.com',
      name: 'normal user',
      password: await bcrypt.hash('password', 10),
      role: Role.USER,
      last_login: null
    },
    {
      mail: 'admin@example.com',
      name: 'admin user',
      password: await bcrypt.hash('password', 10),
      role: Role.ADMIN,
      last_login: null
    },
  ]

  teamMembers.forEach(async (teamMember) => {
    await prisma.team_members.create({
      data: teamMember
    })
  })
};

seedData().catch((e) => {
  console.error(e)
  process.exit(1)
})
.finally(async () => {
  await prisma.$disconnect()
})