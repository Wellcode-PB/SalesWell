import prisma from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const name = req.body.tag
    const prospectId = req.body.prospectId
    const data = await prisma.tags.create({
      data: {
        name: name,
        prospects: { connect: { id: prospectId }}
      }
    })
    res.status(201).json(data)
} else if (req.method === 'GET') {
    const prospectId = Number(req.query.prospect) 
    
    const tags = await prisma.tags.findMany({
      where: {
        prospectId: prospectId
      }
    })
    res.status(200).json(tags)
  }
}