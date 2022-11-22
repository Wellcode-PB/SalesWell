import { Card, CardActionArea, CardContent } from '@mui/material'
import Router from 'next/router'
import React from 'react'

function ProspectCard({ prospect }) {
  function goToProspectProfile() {
    Router.push('/prospects/profile/' + prospect.id)
  }

  return (
    <CardActionArea onClick={goToProspectProfile}>
      <Card  sx={{ width: 'auto', height: 'auto', m: 1}} elevation={5}>
        <CardContent id={'prospect-' + prospect.id}>
          <h2>{prospect.name}</h2>
          <p>{prospect.mail}</p>
        </CardContent>
      </Card>
    </CardActionArea>
  )
}

export default ProspectCard