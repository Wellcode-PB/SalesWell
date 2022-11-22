import prisma from '../../../lib/prisma'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // get the key-value pair from the URL
  const key = (req.query.key).toString()
  let value: any = (req.query.value).toString()

  // the only column of another type than 'string' is the 'id' column, 
  // so we need to convert the value, if 'key' is the 'id' column
  if (key === 'id') {
    value = parseInt(value)
  }

  // search prospects based on the inputs
  const data = await prisma.prospects.findMany({ where: { [key]: value }})

  return res.send(data)
}