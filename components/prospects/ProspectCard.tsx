import { Box, Card, CardActionArea, CardContent } from '@mui/material'
import ProspectTags from '../tags/ProspectTags'
import Router from 'next/router'
import React from 'react'

function ProspectCard({ prospect }) {
  function goToProspectProfile() {
    Router.push('/prospects/profile/' + prospect.id)
  }
  // console.log(prospect.tags)
  return (
    <CardActionArea onClick={goToProspectProfile} component='a'>
      <Card  sx={{ width: 'auto', height: 'auto', m: 1}} elevation={5}>
        <CardContent sx={{ display: 'flex' }} id={'prospect-' + prospect.id}>
          <Box sx={{ minWidth: '70%'}}>
            <h2>{prospect.name}</h2>
            <p>{prospect.mail}</p>
            <p>{prospect.phone}</p>
          </Box>
            {prospect.tags.map(tag => {
              return (
                <div key={tag.id}>{tag.name}</div>
              )
            })}
            {/* <ProspectTags prospectId={prospect.id}/> */}
        </CardContent>
      </Card>
    </CardActionArea>
  )
}

export default ProspectCard