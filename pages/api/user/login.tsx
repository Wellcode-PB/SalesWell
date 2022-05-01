import prisma from '../../../lib/prisma'

const bcrypt = require('bcrypt')

import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let userObject 
    = await (await prisma.team_members
        .findFirst({ where: { mail: req.body.mail } }))
  if (!userObject) {
    return res.status(403).json({ error: 'Incorrect user/password combination'})
  }
  let passwordsMatch = 
    await bcrypt.compare(req.body.password, userObject.password)
  if (passwordsMatch) {
    delete userObject.password
    return res.status(200).json({
      success: true,
      user: JSON.stringify(userObject)
    })
  }
  return res.status(403).json({ error: 'Incorrect user/password combination'})
}