import hasPermissions from '../../../lib/has-permissions'
import prisma from '../../../lib/prisma'

const bcrypt = require('bcrypt')

import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const permitRequest = await hasPermissions(req, res)
  if (!permitRequest) {
    return
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);

  const emailInUse = await isEmailInUse(req.body.mail)
  if (emailInUse) {
    return await res.status(400).send({ error: 'Email is already in use!' })
  }

  await prisma.team_members.create({ data: req.body })
  return res.status(201).json({ success: true })
}

async function isEmailInUse(email: string): Promise<boolean> {
  return await prisma.team_members.findFirst({ where: { mail: email } }) 
    !== null
}