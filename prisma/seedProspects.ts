import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// This function will create 20 prospects for testing the list of prospects
async function addProspectsList() {
  // use a simple for loop to make sure the prospects are
  // going to be inserted in this exact order (from 1 to 20)
  for (let index = 1; index <= 20; ++index) {
    await prisma.prospects.create({ data: {
      name: 'Prospect ' + index,
      mail: 'booking' + index + '@gmail.com',
      fb: 'facebook' + index,
      phone: '077777777' + index,
    } })
  }
}

addProspectsList()
