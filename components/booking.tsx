import { styled } from '@mui/material/styles'
import { useState } from 'react'

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

function Booking(data) {
  const [expanded, setExpanded] = useState(false)
  
  function handleExpandClick(i) {
    setExpanded(expanded === i ? false : i)
  }

  const startsat = new Date(data.children.startsat)
  const endsat = new Date(data.children.endsat)
  const createdat = new Date(data.children.createdat)

  const fields = [
    {id : "name", label : "Name", value : data.children.name},
    {id : "phone", label : "Phone", value : data.children.phone},
    {id : "mail", label : "Mail", value : data.children.mail},
    {id : "startsat", label : "Starts at", 
      value : startsat.toLocaleString('ro-RO')},
    {id : "endsat", label : "Ends at", value : endsat.toLocaleString('ro-RO')},
    {id : "id", label : "ID", value : data.children.id},
    {id : "utm_source", label : "UTM SOURCE", value : data.children.utm_source},
    {id : "utm_medium", label : "UTM MEDIUM", value : data.children.utm_medium},
    {id : "utm_campaign", label : "UTM CAMPAIGN", 
      value : data.children.utm_campaign},
    {id : "fb", label : "FB", value : data.children.fb},
    {id : "timezone", label : "Timezone", value : data.children.timezone},
    {id : "createdat", label : "Created at", 
      value : createdat.toLocaleString('ro-RO')},
    {id : "tentative", label : "Tentative", value : data.children.tentative},
    {id : "cancelled", label : "Cancelled", value : data.children.cancelled},
    {id : "accountid", label : "Account ID", value : data.children.accountid},
    {id : "profileid", label : "Profile ID", value : data.children.profileid},
    {id : "team_member", label : "Team member", 
      value : data.children.team_member},
    {id : "status_id", label : "Status ID", value : data.children.status_id}
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
      <Card sx={{ width: 'auto', height: 'auto', m: 2}} elevation={5}>
        <CardContent>
          {fieldsRows}
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded === data.children.id}
            onClick={() => handleExpandClick(data.children.id)}
            aria-expanded={expanded === data.children.id}
            aria-label="show more"
            id={data.children.id}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded === data.children.id} timeout="auto" unmountOnExit>
          <CardContent>
            {detailsFieldsRows}
          </CardContent>
        </Collapse>
      </Card>
    </>
  )
}

export default Booking