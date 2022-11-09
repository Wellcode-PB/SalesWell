import BookingCard from '../../components/booking/BookingCard'
import BookingsFilter from '../../components/booking/BookingsFilter'
import InfiniteScroll from 'react-infinite-scroll-component'
import getBookingStatusTypes from '../../lib/get-booking-status-types'
import getMorePageData from '../../lib/get-more-page-data'

import { useEffect, useState } from 'react'

function BookingList() {
  const [bookings, setBookings] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [statusesTypes, setStatusTypes] = useState()
  const [orderBy, setOrderBy] = useState('default')
  const [sortOrder, setSortOrder] = useState('default')

  const getMorePageDataParams = {
    data: bookings,
    orderBy: orderBy,
    resultSource: "bookings",
    setData: setBookings,
    setHasMore: setHasMore,
    setOrderBy: setOrderBy,
    setSortOrder: setSortOrder,
    sortOrder: sortOrder
  }

  useEffect(() => {
    getMorePageData(getMorePageDataParams)
    getBookingStatusTypes(setStatusTypes)
  }, [orderBy, sortOrder])

  return (
    <>
      <BookingsFilter dataUpdateParams={getMorePageDataParams} />
      <InfiniteScroll
        dataLength={bookings.length}
        next={() => {getMorePageData(getMorePageDataParams)}}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {bookings.map((data) => (
          <BookingCard 
            key={data.id} 
            bookingData={data} 
            statusesTypes={statusesTypes} />
        ))}
      </InfiniteScroll>
    </>
  )
}

export default BookingList