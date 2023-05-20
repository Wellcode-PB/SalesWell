import { getSession } from 'next-auth/react'
import type { NextApiRequest, NextApiResponse } from 'next'

async function hasPermissions(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (session && session.role === 'ADMIN') {
    return true
  }
  // Admin routes are restricted
  if (req.url === '/api/user/generate') {
    res.status(403)
      .send({ error: 'You do not have enough permissions for this action!' })
    return false
  }
}

export default hasPermissions