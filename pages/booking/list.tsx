import Booking from '../../components/booking/card'
import InfiniteScroll from 'react-infinite-scroll-component'
import getBookingStatusTypes from '../../lib/get_booking_status_types'
import getMorePageData from '../../lib/get_more_page_data'
import { useEffect, useState } from 'react'

function BookingList() {
  const [bookingsLength, setBookingsLength] = useState(0)
  const [bookings, setBookings] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [statusesTypes, setStatusTypes] = useState()

  const getMorePageDataParams = {
    dataLength: bookingsLength,
    setDataLength: setBookingsLength,
    setData: setBookings,
    setHasMore: setHasMore,
    resultSource: "bookings"
  }

  useEffect(() => {
    getMorePageData(getMorePageDataParams)
    getBookingStatusTypes(setStatusTypes)
  }, [])

  return (
    <>
      <InfiniteScroll
        dataLength={bookings.length}
        next={() => {getMorePageData(getMorePageDataParams)}}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {bookings.map((data) => (
          <Booking 
            key={data.id} 
            bookingData={data} 
            statusesTypes={statusesTypes} />
        ))}
      </InfiniteScroll>
    </>
  )
}

export default BookingList