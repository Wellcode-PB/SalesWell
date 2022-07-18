import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React from 'react';

function ProspectCard({ prospect }) {
  return (
    <Card sx={{ width: 'auto', height: 'auto', m: 1}} elevation={5}>
      <CardContent>
        <h2>{prospect.name}</h2>
        <p>{prospect.mail}</p>
      </CardContent>
    </Card>
  )
}

export default ProspectCard;