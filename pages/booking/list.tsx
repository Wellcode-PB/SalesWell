import Booking from '../../components/booking'
import GetMorePageData from '../../components/get_more_page_data'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useState } from 'react'

function BookingList() {
  const [bookingsLength, setBookingsLength] = useState(0)
  const [bookings, setBookings] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const dataParams = {
    dataLength: bookingsLength,
    setDataLength: setBookingsLength,
    setData: setBookings,
    setHasMore: setHasMore,
    resultSource: "bookings"
  }

  useEffect(() => {
    GetMorePageData(dataParams)
  }, [])

  return (
    <>
      <InfiniteScroll
        dataLength={bookings.length}
        next={() => {GetMorePageData(dataParams)}}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {bookings.map((data) => (
          <Booking key={data.id}>
            {data}
          </Booking>
        ))}
      </InfiniteScroll>
    </>
  )
}

export default BookingList