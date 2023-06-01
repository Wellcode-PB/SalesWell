import prisma from '../../../lib/prisma'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prospectId = Number(req.query.id)

    await prisma.prospects.delete({ 
        where: { id: prospectId }
    })
    return res.status(201).json({ success: true })
}