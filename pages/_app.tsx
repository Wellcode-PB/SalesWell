import { SessionProvider } from "next-auth/react"

import Layout from '../components/Layout'
import '../public/css/global.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return <SessionProvider session={session}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </SessionProvider>
}

export default MyApp