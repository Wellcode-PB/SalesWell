import Router from 'next/router'

export default async function getBookingStatusTypes(setTeamMembers) {
  fetch('/api/user/list', {
    method: 'GET'
  })
  .then(response => response.json())
  .then((response) => {
    if (response.error === "No access!") {
      Router.push('/')
    } else {
      setTeamMembers(response)
    }
  })
}