import { useEffect, useState } from 'react'
import { Divider, Grid, Paper, Typography, Box, Button } from '@mui/material'
import ProfileInfo from '../../../components/prospects/ProfileInfo';
import Modal from '../../../components/prospects/CreateProspectNotes';

// use this function to get the 'id' parameter from the url
export async function getServerSideProps({ params }) {
  return { props: { id: String(params?.id) } }
}

function ProspectProfile(props) {
  const [openModal, setOpenModal] = useState(false);
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
          <Box display="flex">
            <Button variant="contained" sx={{
              position: 'absolute',
              top: '92px',
              right: '400px' 
              }} onClick={()=> {
                setOpenModal(true);
            }}>create note</Button>            
            <br />
            {openModal && <Modal prospectId={props.id} setCloseModal={setOpenModal}/>}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ProspectProfile