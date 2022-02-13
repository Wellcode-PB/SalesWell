import { PrismaClient, booking_status } from '@prisma/client'

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
};

seedData();