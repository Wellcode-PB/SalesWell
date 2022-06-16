import { getSession } from 'next-auth/react'

async function hasNoUserAccess(req) {
  const session = await getSession(req)
  if (session) {
    return false
  }

  return {
    redirect: {
      destination: "/"
    },
    props: {}
  }
}

export default hasNoUserAccess