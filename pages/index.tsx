import { useSession } from 'next-auth/react'
import { Typography } from '@mui/material'

function HomePage() {
  const { data: session } = useSession()

  return (
    <Typography variant="h4" style={{ textAlign: 'center' }}>
      Welcome
      { session ? ' back, ' + session.user.name + '!' : ' to SalesWell' }
    </Typography>
  )
}

export default HomePage