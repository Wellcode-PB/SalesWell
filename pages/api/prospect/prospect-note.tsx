import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  switch (method) {
    case 'GET':
      return getNotes(req, res)
    case 'POST':
      return createNote(req, res)
    case 'PUT':
      return updateNote(req, res)
    case 'DELETE':
      return deleteNote(req, res)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

// Get all notes for a user
const getNotes = async (req: NextApiRequest, res: NextApiResponse) => {
  const { prospectId } = req.query

  if (!prospectId) {
    return res.status(400).json({ message: 'User ID is required' })
  }

  try {
    const notes = await prisma.notes.findMany({
      where: {
        prospect: {
          id: parseInt(prospectId as string)
        }
      }
    })
    return res.status(200).json(notes)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

// Create a new note
const createNote = async (req: NextApiRequest, res: NextApiResponse) => {
  const { note, prospectId } = req.body

  if (!note || !prospectId) {
    return res.status(400).json({ message: 'Note and prospectId are required fields' })
  }

  try {
    const newNote = await prisma.notes.create({
      data: {
        prospectId: parseInt(prospectId),
        note: note
      },
    })
    return res.status(201).json({ message: 'Note created successfully', note: newNote })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

// Update a note
const updateNote = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, note } = req.body
  if (!id || !note) {
    return res.status(400).json({ message: 'id and note are required fields' })
  }

  try {
    const updatedNote = await prisma.notes.update({
      where: { id: parseInt(id) },
      data: { note: note }
    })
    return res.status(200).json({ message: 'Note updated successfully', note: updatedNote })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

// Delete a note
const deleteNote = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body
  if (!id) {
    return res.status(400).json({ message: 'id is a required field' })
  }

  try {
    await prisma.notes.delete({ where: { id: parseInt(id) } })
    return res.status(200).json({ message: 'Note deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}