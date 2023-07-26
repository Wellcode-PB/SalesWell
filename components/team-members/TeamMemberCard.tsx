import { Card, CardActionArea, CardContent } from '@mui/material';
import Link from 'next/link';
import React from 'react';

function TeamMemberCard({ teamMember }) {
  const card = teamMember.account_state === 'DISABLED' ? 'grey' : '';

  return (
    <Link href={'/team-members/profile/' + teamMember.mail}>
      <CardActionArea>
        <Card sx={{ width: 'auto', height: 'auto', m: 1, background: card }}
          elevation={5}>
          <CardContent id={teamMember.mail}>
            <h2>{teamMember.name}</h2>
            <p>{teamMember.mail}</p>
            <p>{teamMember.role}</p>
          </CardContent>
        </Card>
      </CardActionArea>
    </Link>
  );
}

export default TeamMemberCard;
