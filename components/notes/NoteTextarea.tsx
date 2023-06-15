import { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import CreateIcon from '@mui/icons-material/Create'
import SaveIcon from '@mui/icons-material/Save'

function NoteTextarea() {
  const [note, setNote] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const handleNoteChange = (event) => {
    setNote(event.target.value)
  }

  const handleCancelNote = () => {
    setIsEditing(false)
    setNote('')
  }

  return (
    <>
      <Box style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        {!isEditing && (
          <Button
            className="create-note-button"
            id="create-note"
            variant="outlined"
            onClick={() => setIsEditing(true)}>
            <CreateIcon style={{ fontSize: '1.4rem' }} />
            Create note
          </Button>
        )}
      </Box>
      {isEditing && (
        <Box>
          <TextField
            id="prospect-note"
            multiline
            minRows={4}
            fullWidth
            label="Leave a note here..."
            value={note}
            onChange={handleNoteChange}
          />
          <Box>
            <Button
              className="save-note-button"
              id="save"
              variant="outlined"
              color="success"
              disabled={!note}>
              <SaveIcon style={{ fontSize: '1.4rem' }} />
              Save
            </Button>
            <Button
              className="cancel-note-button"
              id="cancel"
              variant="outlined"
              color="error"
              onClick={handleCancelNote}>
              <CancelIcon style={{ fontSize: '1.4rem' }} />
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </>
  )
}

export default NoteTextarea