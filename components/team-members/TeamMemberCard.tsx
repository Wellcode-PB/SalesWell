import { Card, CardActionArea, CardContent } from '@mui/material'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'

function TeamMemberCard({ teamMember }) {

  return (
    <Link href={"/team-members/profile/" + teamMember.mail}>
      <CardActionArea>
        <Card sx={{ width: 'auto', height: 'auto', m: 1 }} elevation={5}>
          <CardContent id={teamMember.mail}>
            <h2>{teamMember.name}</h2>
            <p>{teamMember.mail}</p>
            <p>{teamMember.role}</p>
          </CardContent>
        </Card>
      </CardActionArea>
    </Link>
  )
}

export default TeamMemberCard