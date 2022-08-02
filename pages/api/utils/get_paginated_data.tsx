import hasNoUserAccess from '../../../lib/utils'
import prisma from '../../../lib/prisma'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const hasNoAccess = await hasNoUserAccess({req})
  if (hasNoAccess) {
    return res.status(400).send({ error: 'No access!' })
  }
  
  const skipCount = parseInt((req.query.skip).toString())
  const resultSource = (req.query.resultSource).toString()

  if (resultSource === 'bookings') {
    const data = await prisma.bookings.findMany({
      orderBy: {
        id: 'asc'
      },
      skip: skipCount,
      take: 10
    })
    return res.send(data)
  }
  return
}