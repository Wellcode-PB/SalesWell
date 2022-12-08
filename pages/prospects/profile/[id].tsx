import { useEffect, useState } from 'react'
import { Divider, Grid, Paper, Typography } from '@mui/material'
import ProfileInfo from '../../../components/prospects/ProfileInfo';

// use this function to get the 'id' parameter from the url
export async function getServerSideProps({ params }) {
  return { props: { id: String(params?.id) } }
}

function ProspectProfile(props) {
  const [prospect, setProspect] = useState({
    name: "--", mail: "--", phone: "--", fb: "--"
  })

  useEffect(() => { 
    fetch('/api/prospect/get-by-key?key=id&value=' + props.id, {
      method: 'GET'
    })
    .then(response => response.json())
    .then((response) => {
      // the response will be received as an array,
      // but we only need the first object
      setProspect(response[0])
    })
  }, [])


  return (
    <Paper sx={{ p: 1, margin: '2%' }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ProfileInfo prospect={prospect}/>
        </Grid>
        <Grid item>
          <Divider sx={{ height: '100%' }} orientation="vertical" />
        </Grid>
        <Grid item xs>
          <Typography gutterBottom variant="h6">Notes</Typography>
          <Divider sx={{ width: 'auto' }} orientation="horizontal" />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ProspectProfile