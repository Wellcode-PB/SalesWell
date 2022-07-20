import Alert from '@mui/material/Alert'
import Booking from '../../components/booking/booking_card'
import hasNoUserAccess from '../../lib/utils'
import prisma from '../../lib/prisma'

function BookingList({ data }) {
  const bookings = data.bookings
  const statuses = data.statuses
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
            {statuses}
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
  const statuses = await prisma.booking_status.findMany()
  const length = data.length
  
  if (!length) {
    return {
      props: {
        data: {
          bookings: {
            error: 'No bookings!'
          }
        }
      }
    }
  }

  return {
    props: {
      data: {
        bookings: JSON.parse(JSON.stringify(data)),
        statuses: JSON.parse(JSON.stringify(statuses))
      }
    }
  }
}