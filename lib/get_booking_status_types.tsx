import Router from 'next/router'

export default async function getBookingStatusTypes(setStatusTypes) {
  fetch('/api/booking/get_booking_status_types', {
    method: 'GET'
  })
  .then(response => response.json())
  .then((response) => {
    if (response.error === "No access!") {
      Router.push('/')
    } else {
      setStatusTypes(response)
    }
  })
}