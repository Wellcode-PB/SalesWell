import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Modal,
  Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import NoteTextarea from '../notes/NoteTextarea'
import ConfirmModal from '../helper/ConfirmModal'
import NoteTextField from '../notes/NoteTextField'

function NoteList({ prospectId }) {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState(null)

  useEffect(() => {
    let isMounted = true
    fetch(`/api/prospect/prospect-note?prospectId=${prospectId}`)
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setNotes(data)
        }
      })
      .catch((error) => console.error('Error:', error))
      return () => {isMounted = false}
  }, [notes])

  function deleteNote(noteId) {
    fetch('/api/prospect/prospect-note', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: noteId })
    })
    .then(() => setNotes(notes.filter((note) => note.id !== noteId)))
    .catch((error) => console.error('Error:', error))
  }

  function updateNote(noteId, newNote) {
    fetch('/api/prospect/prospect-note', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: noteId, note: newNote })
    })
    .then(() => {
      const updatedNoteIndex = notes.findIndex((note) => note.id === noteId)
      const updatedNote = { ...notes[updatedNoteIndex], note: newNote }
      const updatedNotes = [...notes]
      updatedNotes[updatedNoteIndex] = updatedNote
      setNotes(updatedNotes)
      setSelectedNote(null)
    })
    .catch((error) => console.error('Error:', error))
  }

  function handleNoteChange(event) {
    const newNote = event.target.value
    setSelectedNote((prevNote) => ({ ...prevNote, note: newNote }))
  }

  function handleSaveNote() {
    if (selectedNote) {
      updateNote(selectedNote.id, selectedNote.note)
    }
    setSelectedNote(null)
    setIsEditing(false)
  }

  function handleEditNote(note) {
    setSelectedNote(note)
    setIsEditing(true)
  }

  function handleDeleteNote(note) {
    setNoteToDelete(note)
    setDeleteModalOpen(true)
  }

  function handleConfirmDelete() {
    if (noteToDelete) {
      deleteNote(noteToDelete.id)
    }
    setDeleteModalOpen(false)
    setNoteToDelete(null)
  }

  function handleCancelDelete() {
    setDeleteModalOpen(false)
    setNoteToDelete(null)
  }

  function formatDateTime(dateTime) {
    const date = new Date(dateTime).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    const time = new Date(dateTime).toLocaleTimeString('en-GB', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    return `${date} ${time}`
  }

  return (
    <Box>
      {!selectedNote && (
        <NoteTextarea prospectId={prospectId} />
      )}
      {notes.map((note) => (
        <Card key={note.id}>
          <CardContent>
            {selectedNote && selectedNote.id === note.id ? (
              <Modal
                open={isEditing}
                onClose={() => setSelectedNote(null)}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    border: '1px solid #000',
                    boxShadow: 24,
                    p: '2rem',
                    width: '80vw'
                  }}>
                  <NoteTextField
                    id="updated-note"
                    label="Update note..."
                    value={selectedNote.note}
                    onChange={handleNoteChange}
                  />
                  <Typography style={{ fontSize: '0.5rem' }}>
                    Created at: {formatDateTime(note.createdAt)}
                  </Typography>
                  {formatDateTime(note.updatedAt) !== formatDateTime(note.createdAt) && (
                    <Typography style={{ fontSize: '0.5rem' }}>
                      Updated at: {formatDateTime(note.updatedAt)}
                    </Typography>
                  )}
                  <Button
                    className="save-note-button"
                    id="save"
                    variant="outlined"
                    color="success"
                    onClick={handleSaveNote}>
                    Save
                  </Button>
                  <Button
                    className="cancel-note-button"
                    id="cancel"
                    variant="outlined"
                    color="error"
                    onClick={() => setSelectedNote(null)}>
                    Cancel
                  </Button>
                </Box>
              </Modal>
            ) : (
                <Box style={{ wordBreak: 'break-all' }}>
                <Typography style={{ fontSize: '1rem' }}>{note.note}</Typography>
                <Typography style={{ fontSize: '0.5rem' }}>
                  Created at: {formatDateTime(note.createdAt)}
                </Typography>
                  {formatDateTime(note.updatedAt) !== formatDateTime(note.createdAt) && (
                    <Typography style={{ fontSize: '0.5rem' }}>
                      Updated at: {formatDateTime(note.updatedAt)}
                    </Typography>
                  )}
              </Box>
            )}
            {!selectedNote || (selectedNote && selectedNote.id !== note.id) ? (
              <Box>
                <IconButton
                  id="delete-note"
                  onClick={() => handleDeleteNote(note)}>
                  <DeleteIcon color="error" />
                </IconButton>
                <IconButton
                  id="edit-note"
                  onClick={() => handleEditNote(note)}>
                  <EditIcon color="primary" />
                </IconButton>
              </Box>
            ) : null}
          </CardContent>
        </Card>
      ))}
      <ConfirmModal
        open={deleteModalOpen}
        onClose={handleCancelDelete}
        message="Are you sure you want to delete this note?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmButtonName="Delete"
      />
    </Box>
  )
}

export default NoteList