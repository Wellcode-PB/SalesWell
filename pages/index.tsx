import { useSession } from "next-auth/react"

function HomePage() {
  const { data: session } = useSession()

  return <div style={{
    fontFamily: 'Arial',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <h1>Welcome{session ? ' back, ' + session.user.name + '!' : ' to SalesWell'}</h1>
  </div>
}

export default HomePage