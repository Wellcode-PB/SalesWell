import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const prospectsList = []
for (let i = 1; i <= 20; ++i) {
  prospectsList.push({
    id: i,
    name: 'Prospect ' + i,
    mail: 'booking' + i + '@gmail.com'
  })
}
prospectsList.forEach(async (prospect) => {
  await prisma.prospects.create({
    data: prospect
  })
})