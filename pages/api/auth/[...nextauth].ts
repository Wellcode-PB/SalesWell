import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Email',

      credentials: {
        mail: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },

      async authorize(credentials, req) {
        const res = await fetch(process.env.SITE_URL + "/api/user/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const userResponse = await res.json()

        if (res.status === 200) {
          const user = await JSON.parse(userResponse.user)
          return user
        }
        return null
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          ...user
        }
      }
      return token
    },

    async session({ session, token, user }) {
      return {
        ...session,
        ...token
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
})