import { Card, CardActionArea, CardContent } from '@mui/material'
import React from 'react'

function TeamMemberCard({ teamMember }) {
  return (
    <CardActionArea>
      <Card sx={{ width: 'auto', height: 'auto', m: 1}} elevation={5}>
        <CardContent>
          <h2>{teamMember.name}</h2>
          <p>{teamMember.mail}</p>
          <p>{teamMember.role}</p>
        </CardContent>
      </Card>
    </CardActionArea>
  )
}

export default TeamMemberCard