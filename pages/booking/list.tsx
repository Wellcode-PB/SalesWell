import Alert from '@mui/material/Alert'
import Booking from '../../components/booking'
import hasNoUserAccess from '../../lib/utils'
import prisma from '../../lib/prisma'

function BookingList({ bookings }) {
  if (!bookings) {
    return <Alert severity="info">Loading...</Alert>
  }

  return (
    <>
      {bookings.error ? 
        <Alert severity="error">{bookings.error}</Alert> 
        : bookings.map((data) => (
          <Booking key={data.id}>
            {data}
          </Booking>
        ))}
    </>
  )
}

export default BookingList

export async function getServerSideProps(req) {
  const hasNoAccess = await hasNoUserAccess(req)

  if (hasNoAccess) {
    return hasNoAccess
  }

  const data = await prisma.bookings.findMany()
  const length = data.length
  
  if (!length) {
    return {
      props: {
        bookings: {
          error: 'No bookings!'
        }
      }
    }
  }

  return {
    props: {
      bookings: JSON.parse(JSON.stringify(data))
    }
  }
}