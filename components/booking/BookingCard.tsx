import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useState } from 'react'

import BookingStatusDropdown from './BookingStatusDropdown'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    })
  }))

function BookingCard({bookingData, statusesTypes}) {
  const [expanded, setExpanded] = useState(false)
  
  function handleExpandClick(i) {
    setExpanded(expanded === i ? false : i)
  }

  const startsat = new Date(bookingData.startsat)
  const endsat = new Date(bookingData.endsat)
  const createdat = new Date(bookingData.createdat)

  const fields = [
    {id : "name", label : "Name", value : bookingData.name},
    {id : "phone", label : "Phone", value : bookingData.phone},
    {id : "mail", label : "Mail", value : bookingData.mail},
    {id : "startsat", label : "Starts at", 
      value : startsat.toLocaleString('ro-RO')},
    {id : "endsat", label : "Ends at", value : endsat.toLocaleString('ro-RO')},
    {id : "id", label : "ID", value : bookingData.id},
    {id : "utm_source", label : "UTM SOURCE", value : bookingData.utm_source},
    {id : "utm_medium", label : "UTM MEDIUM", value : bookingData.utm_medium},
    {id : "utm_campaign", label : "UTM CAMPAIGN", 
      value : bookingData.utm_campaign},
    {id : "fb", label : "FB", value : bookingData.fb},
    {id : "timezone", label : "Timezone", value : bookingData.timezone},
    {id : "createdat", label : "Created at", 
      value : createdat.toLocaleString('ro-RO')},
    {id : "tentative", label : "Tentative", value : bookingData.tentative},
    {id : "cancelled", label : "Cancelled", value : bookingData.cancelled},
    {id : "accountid", label : "Account ID", value : bookingData.accountid},
    {id : "profileid", label : "Profile ID", value : bookingData.profileid},
    {id : "team_member", label : "Team member", 
      value : bookingData.team_member},
    {id : "status_id", label : "Status ID", value : bookingData.status_id}
  ]

  const lengthPrimaryFields = 5
  let fieldsRows = [], detailsFieldsRows = []

  fields.map((field, index) => {
    if (index < lengthPrimaryFields) {
      fieldsRows.push(
        <Typography key={field.id} variant="body2" gutterBottom>
          <b>{field.label}:</b> {field.value}
        </Typography> )
    } else {
      detailsFieldsRows.push(
        <Typography key={field.id} variant="body2" gutterBottom>
          <b>{field.label}:</b> {field.value}
        </Typography> )
    }})

  return (
    <>
      <Card sx={{ width: 'auto', height: 'auto', m: 2 }} elevation={5}>
        <Grid container>
          <Grid item xs>
            <CardContent>
              {fieldsRows}
            </CardContent>
          </Grid>
          <Grid item xs container justifyContent="flex-end">
            <BookingStatusDropdown 
              key={bookingData.id} 
              bookingId={bookingData.id} 
              bookingStatus={bookingData.status_id} 
              statusesTypes={statusesTypes} />
          </Grid>
        </Grid>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded === bookingData.id}
            onClick={() => handleExpandClick(bookingData.id)}
            aria-expanded={expanded === bookingData.id}
            aria-label="show more"
            id={bookingData.id}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded === bookingData.id} timeout="auto" unmountOnExit>
          <CardContent>
            {detailsFieldsRows}
          </CardContent>
        </Collapse>
      </Card>
    </>
  )
}

export default BookingCard