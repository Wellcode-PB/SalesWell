import { signIn, useSession } from "next-auth/react"

function HomePage() {
  const { data: session } = useSession()

  return <div>
    Welcome to SalesWell{session ? ' ' + session.user.name : ''}!
    <br />
    { !session ? 
      <button onClick={() => signIn()}>Sign in with Email</button> 
      : null }
  </div>
}

export default HomePage