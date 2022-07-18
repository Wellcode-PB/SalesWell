import Alert from '@mui/material/Alert'
import Search from '../../components/prospect_search'
import hasNoUserAccess from '../../lib/utils'
import prisma from '../../lib/prisma'

function ProspectList({ prospect }) {
  return (
    <>
      {prospect.error ? 
        <Alert severity="error">{prospect.error}</Alert> 
        : <Search details={prospect}/>}
    </>
  )
}

export default ProspectList

export async function getServerSideProps(req) {
  const hasNoAccess = await hasNoUserAccess(req)

  if (hasNoAccess) {
    return hasNoAccess
  }

  const data = await prisma.prospects.findMany({
    select: {
      id: true,
      mail: true,
      name: true,
    },
  })
  const length = data.length

  if (!length) {
    return {
      props: {
        prospect: {
          error: 'No prospects!'
        }
      }
    }
  }

  return {
    props: { 
      prospect: JSON.parse(JSON.stringify(data))
    }
  }
} 