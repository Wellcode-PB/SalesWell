import prisma from '../../../lib/prisma'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const searchInput = (req.query.input).toString()

  const data = await prisma.prospects.findMany({
    where: {
      OR: [
        { mail: { contains: searchInput, mode: 'insensitive' } },
        { name: { contains: searchInput, mode: 'insensitive' } },
        { phone: { contains: searchInput } }
      ]
    }
  })

  if (data.length == 0) {
    return await res.status(400).send({ error: 'No results!' })
  }

  return res.send(data)
}