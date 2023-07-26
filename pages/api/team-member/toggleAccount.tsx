import hasPermissions from '../../../lib/has-permissions'
import prisma from '../../../lib/prisma'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const permitRequest = await hasPermissions(req, res)
  if (!permitRequest) {
    return res.status(403).send({
      error: 'You do not have enough permissions for this action!'
    })}

   const { mail, state } = JSON.parse(req.body);
   await prisma.team_members.update({
        where: { 
            mail: mail 
        },
        data: { 
            account_state: state
        }
    })
    return res.status(201).json({ success: true })
  }