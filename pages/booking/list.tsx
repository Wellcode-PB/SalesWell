import Booking from '../../components/booking'
import InfiniteScroll from "react-infinite-scroll-component"
import Router from 'next/router'
import { useEffect, useState } from 'react'

function BookingList() {
  const [bookingsLength, setBookingsLength] = useState(0)
  const [bookings, setBookings] = useState([])
  const [hasMore, setHasMore] = useState(true)
  
  useEffect(() => {
    getMoreBookings() 
  }, [])

  async function getMoreBookings() {
    fetch('/api/utils/get_paginated_data?skip=' + bookingsLength + 
      '&resultSource=bookings', {
      method: 'GET'
    })
    .then(response => response.json())
    .then((response) => {
      if (response.error === "No access!") {
        Router.push('/')
      } else {
        if (response.length < 10) {
          setHasMore(false)
        }
        setBookingsLength(bookingsLength + 10)
        setBookings((bookings) => [...bookings, ...response])
      }
    })
  }

  return (
    <>
      <InfiniteScroll
        dataLength={bookings.length}
        next={getMoreBookings}
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