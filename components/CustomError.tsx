import React from 'react'
import { Card, Typography, Button } from '@mui/material'

function CustomError({ title, message }) {
  return (
    <div style={{ textAlign: 'center', wordWrap: 'break-word' }}>
      <Card sx={{ p: 2, margin: '20px' }} elevation={ 4 }>
        <Typography variant="h3">{ title }</Typography>
      </Card>
      <Card sx={{ p: 1, margin: '20px', textAlign: 'left' }} elevation={ 4 }>
        <Typography variant="h6">{ message }</Typography>
      </Card>
      <Button sx={{ textTransform: 'none' }} variant="contained"
        onClick={ () => window.history.back() }>
        Back to previous page
      </Button>
    </div>
  )
}

export default CustomError