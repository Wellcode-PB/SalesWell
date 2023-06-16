import { Divider, Grid, Paper } from '@mui/material';
import CustomError from '../../../components/CustomError';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import Profile from '../../../components/team-members/Profile';

export async function getServerSideProps({ params, req }) {
  const session = await getSession({req})
  if (!session) {
    return {
      redirect: {
        destination: "/"
      }
    }
  }

  const mail = String(params?.mail);
  const teamMember = await prisma.team_members.findMany({ 
    where: { mail: mail} 
  })
 
  if (!teamMember[0]) {
    return {
      props: {
        error: true
      }
    }
  }

  return {
    props: {
      response: teamMember[0]
    }
  }
}

function ProspectProfile(props) {
  if (props.error) {
    return (
      <CustomError
        title="Team member not found"
        message="The team member you are searching for does not exist."
      />
    )
  }

  return (
    <Paper sx={{ p: 1, margin: '2%' }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Profile teamMember={{ entityType: "team-member", ...props.response }}/>
        </Grid>
        <Grid item>
          <Divider sx={{ height: '100%' }} orientation="vertical"/>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ProspectProfile;