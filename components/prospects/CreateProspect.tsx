import AddButtonIcon from '@mui/icons-material/AddCircle'
import { Alert, Box, Button, IconButton, TextField } from '@mui/material'
import SlidingPane from "react-sliding-pane"
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useState } from 'react'

function CreateProspect() {
  const [message, setMessage] = useState(null)
  const [paneState, setPaneState] = useState({ isOpen: false })
  const [prospect, setProspect] = useState({ 
    mail: "", name: "", fb: "", phone: ""
  })

  function saveProspect() {
    fetch('/api/prospect/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prospect),
    })
    .then(response => response.json())
    .then((response) => {
      if (response.error) {
        setMessage({
          severity: 'error',
          text: response.error
        })
      } else {
        setMessage({
          severity: 'success',
          text: 'Prospect successfully created!'
        })
      }
    })
  }

  function handleChange(event) {
    const value = event.target.value
    setProspect({
      ...prospect,
      [event.target.id]: value
    })
  }

  return (
    <>
      <IconButton id="create-prospect"
          onClick={() => setPaneState({ isOpen: true })}>
        <AddButtonIcon />
      </IconButton>
      <SlidingPane
        isOpen={paneState.isOpen}
        title="Create a new prospect"
        width='40%'
        onRequestClose={() => {
          setPaneState({ isOpen: false })
          setMessage(null)
        }}
      >
        <Box component="form" sx={{
            '& .MuiTextField-root': { m: 1, width: '97%' },
            '& button': { m: 1 },
          }}
        >
          { message ?
            <Alert severity={message.severity}>{message.text}</Alert>
            : null }
          <br/>
          <TextField id="mail" label="Email" onChange={handleChange}/>
          <TextField id="name" label="Full Name" onChange={handleChange}/>
          <TextField id="phone" label="Phone Number" onChange={handleChange}/>
          <TextField id="fb" label="Facebook" onChange={handleChange}/>
          <div>
            <Button id="create" variant="contained" 
                disabled={(!prospect.mail || !prospect.name || !prospect.phone)}
                onClick={saveProspect}>
              Create
            </Button>
            <Button id="cancel" variant="contained"
                onClick={() => {
                  setPaneState({ isOpen: false })
                  setMessage(null)
                }}>
              Cancel
            </Button>
          </div>
        </Box>
      </SlidingPane>
    </>
  )
}

export default CreateProspect
