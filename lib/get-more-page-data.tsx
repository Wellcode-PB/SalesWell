import Router from 'next/router'

//we need this variable to know how many items we are getting
const NEXT_DATA_LENGTH = 10;

export default async function getMorePageData(getDataParams) {
  /**
   * getDataParams contains:
   *  - setData -> function for the component where the data will be displayed
   *  - setHasMore -> set it "false" if we have no longer data
   *  - resultSource -> needed to know what data type we are loading
   */

  fetch('/api/utils/get-paginated-data?skip=' + getDataParams.data.length + 
  '&resultSource=' + getDataParams.resultSource + 
  '&orderBy=' + getDataParams.orderBy +
  '&sortOrder=' + getDataParams.sortOrder, {
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
      getDataParams.setData((data) => [...data, ...response])
    }
  })
}