import { 
  PrismaClient, 
  booking_status,
  team_members,
  Role 
} from '@prisma/client'

const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

let seedData = async (): Promise<void> => {
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