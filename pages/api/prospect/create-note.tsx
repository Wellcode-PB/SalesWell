import prisma from '../../../lib/prisma'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }
    
  const { note } = req.body
  const { prospectId } = req.body
    
  if (!note) {
    return res.status(400).json({ message: "Note cannot be empty" })
  }
 
  try {
    const newNote = await prisma.notes.create({ data: { note: note,
      prospectId: parseInt(prospectId),
      } })
    return res.status(201).json({ message: "Note created successfully", note: newNote })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Server error" })
  }
}