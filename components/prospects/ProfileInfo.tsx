import { Card, Divider, Link, Typography } from '@mui/material'
import OpenInNewWindowIcon from '@mui/icons-material/OpenInNew';
import ProfileActions from './ProfileActions';
import Router from 'next/router';
import ProspectTags from '../tags/ProspectTags';

// use this PNF (Phone Number Format) constant
// to format the phone number to a national format
const PNF_NATIONAL = 2

function ProfileInfo({ prospect }) {
  // create an instance of PhoneNumberUtil
  const phoneUtil = require('libphonenumbers').PhoneNumberUtil.getInstance()

  // make sure the phone number is valid
  if (prospect.phone !== '--') {
    const phoneNumber = phoneUtil.parseAndKeepRawInput(prospect.phone, 'RO')
    prospect.phone = phoneUtil.format(phoneNumber, PNF_NATIONAL)
  }

  function deleteProfile(id) {
    fetch(`/api/prospect/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      Router.replace('/prospects/list')
    })
  }

  return (
    <>
      <Typography sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ProfileActions id={prospect.id} name={prospect.name} options={[
          { id: 0, label: 'Delete', action: deleteProfile },
        ]} />
      </Typography>
      <img src="/img/prospect.png" style={{ margin: 'auto', 
          display: 'block', width: '65%', height: 'auto' }} />
      <Typography gutterBottom variant="h6" 
          sx={{ m: '2.5%', flexGrow: 1, textAlign: "center" }}>
        {prospect.name}
      </Typography>
      <Card>
        <Typography gutterBottom variant="subtitle1" sx={{ m: '2.5%' }}>
          {prospect.mail}
        </Typography>
        <Divider sx={{ width: 'auto', m: 0.5 }} orientation="horizontal" />
        <Typography gutterBottom variant="subtitle1" sx={{ m: '2.5%' }}>
          {prospect.phone}
        </Typography>
        <Divider sx={{ width: 'auto', m: 0.5 }} orientation="horizontal" />
        <Typography gutterBottom variant="subtitle1" sx={{ m: '2.5%' }}>
          { prospect.fb ?
            <Link href={prospect.fb} target='_blank' rel='noopener noreferrer'
                style={{ textDecoration: 'inherit' }} >
              Facebook Profile
              <OpenInNewWindowIcon fontSize='small' sx={{ ml: 1 }}/>
            </Link>
            : 'No Facebook provided' }
        </Typography>
        <Divider sx={{ width: 'auto', m: 0.5 }} orientation="horizontal" />
        <Typography gutterBottom variant="subtitle1" sx={{ m: '2.5%' }}>
          <ProspectTags prospectId={prospect.id} />
        </Typography>
      </Card>
    </>
  )
}

export default ProfileInfo