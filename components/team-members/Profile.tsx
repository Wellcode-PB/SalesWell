import { Card, Divider, Typography } from '@mui/material';
import ProfileActions from '../helper/ProfileActions';
import Router from 'next/router';
import { useSession } from "next-auth/react"

function Profile({ teamMember }) {
  const { data: session } = useSession()

  function deleteProfile(id) {
    fetch(`/api/team-member/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      Router.replace(`/team-members/list`);
    });
  }

  return (
    <>
      <Typography sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ProfileActions id={teamMember.mail} name={teamMember.name} options={[
            session && session.role === 'ADMIN' ?
            {id: 0, label: 'Delete', action: deleteProfile }: null ]} 
            entityType={'team member'}
        />
      </Typography>
      <img src="/img/prospect.png" style={{ margin: 'auto', display: 'block',
          width: '65%', height: 'auto' }} />
      <Typography gutterBottom variant="h6"
          sx={{ m: '2.5%', flexGrow: 1, textAlign: 'center' }}>
        {teamMember.name}
      </Typography>
      <Card id={teamMember.entityType}>
        <Typography gutterBottom variant="subtitle1" sx={{ m: '2.5%' }}>
          {teamMember.role}
        </Typography>
        <Divider sx={{ width: 'auto', m: 0.5 }} orientation="horizontal" />
        <Typography gutterBottom variant="subtitle1" sx={{ m: '2.5%' }}>
          {teamMember.mail}
        </Typography>
      </Card>
    </>
  )
}

export default Profile;