import Router from 'next/router'

export default async function GetMorePageData(dataParams) {
  fetch('/api/utils/get_paginated_data?skip=' + dataParams.dataLength + 
    '&resultSource=' + dataParams.resultSource, {
    method: 'GET'
  })
  .then(response => response.json())
  .then((response) => {
    if (response.error === "No access!") {
      Router.push('/')
    } else {
      if (response.length < 10) {
        dataParams.setHasMore(false)
      }
      dataParams.setDataLength(dataParams.dataLength + 10)
      dataParams.setData((bookings) => [...bookings, ...response])
    }
  })
}