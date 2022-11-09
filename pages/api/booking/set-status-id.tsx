import prisma from '../../../lib/prisma'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await prisma.bookings.update({
    where: { 
      id: req.body.bookingId 
    },
    data: { 
      status_id: req.body.bookingStatus 
    }
  })
  if (result) {
    return res.status(201).json({ success: true })
  }
  return
}