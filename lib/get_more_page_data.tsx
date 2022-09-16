import Router from 'next/router'

//we need this variable to know how many items we are getting
const NEXT_DATA_LENGTH = 10;

export default async function getMorePageData(getDataParams) {
  /**
   * getDataParams contains:
   *  - dataLength -> needed to skip the data we already loaded before
   *  - setData -> function for the component where the data will be displayed
   *  - setDataLength -> set the new data length in the component
   *  - setHasMore -> set it "false" if we have no longer data
   *  - resultSource -> needed to know what data type we are loading
   */

  fetch('/api/utils/get_paginated_data?skip=' + getDataParams.dataLength + 
    '&resultSource=' + getDataParams.resultSource, {
    method: 'GET'
  })
  .then(response => response.json())
  .then((response) => {
    if (response.error === "No access!") {
      Router.push('/')
    } else {
      if (response.length < NEXT_DATA_LENGTH) {
        getDataParams.setHasMore(false)
      }
      getDataParams.setDataLength(getDataParams.dataLength + NEXT_DATA_LENGTH)
      getDataParams.setData((data) => [...data, ...response])
    }
  })
}