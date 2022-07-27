import Alert from '@mui/material/Alert'
import Profile from '../../components/prospects/profile'
import hasNoUserAccess from '../../lib/utils'
import prisma from '../../lib/prisma'

function ProspectList({ prospects }) {
  return (
    <>
      {prospects.error ? 
        <Alert severity="error">{prospects.error}</Alert>
        : prospects.map((data) => (
          <Profile key={data.id} prospect={data}/>
        ))}
    </>
  )
}

export default ProspectList

export async function getServerSideProps(req) {
  const hasNoAccess = await hasNoUserAccess(req)

  if (hasNoAccess) {
    return hasNoAccess
  }

  const data = await prisma.prospects.findMany()
  
  const length = data.length

  if (!length) {
    return {
      props: {
        prospects: {
          error: 'No prospects!'
        }
      }
    }
  }

  return {
    props: { 
      prospects: JSON.parse(JSON.stringify(data))
    }
  }
}