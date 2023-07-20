import { TextField } from '@mui/material'

function NoteTextField({ id, label, value, onChange }) {
  return (
    <TextField
      id={id}
      multiline
      minRows={4}
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
    />
  )
}

export default NoteTextField