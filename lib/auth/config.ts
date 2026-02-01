import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.log('Missing credentials')
          return null
        }

        const validUsername = process.env.ADMIN_USERNAME
        const validPassword = process.env.ADMIN_PASSWORD

        if (credentials.username !== validUsername || credentials.password !== validPassword) {
          return null
        }
        
        return {
          id: '1',
          name: 'Admin',
          email: 'admin@solarautopilot.com',
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
