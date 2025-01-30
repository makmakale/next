import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from '@/lib/form/validation'
import { getUserByEmail, getUserById, getUserByUsername } from '@/lib/utils/users'
import bcrypt from 'bcryptjs'
import Google from 'next-auth/providers/google'
import { db } from '@/lib/database/prisma'
import { redirect } from 'next/navigation'

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt', maxAge: 60 * 60 },
  secret: process.env.AUTH_SECRET || 'secret',
  callbacks: {
    async jwt({ token, account }) {
      if (!token.sub) return token

      const user = await getUserById(token.sub)
      if (!user) return token

      token.isAdmin = user.isAdmin

      return token
    },
    async session({ session, token }) {
      const user = await getUserByEmail(token.email)
      if (user && user.isActive) {
        session.user.id = user.id
        session.user.isAdmin = user.isAdmin
      }

      return session
    },
    async signIn({ account, profile }) {
      if (account.provider === 'google') {
        let userExists = await getUserByEmail(profile.email)

        if (!userExists) {
          userExists = await db.user.create({
            data: {
              email: profile.email,
              username: profile.name.replace(' ', '_').toLowerCase(),
              name: profile.name,
              image: profile.picture,
            },
          })
        }

        if (!userExists.isActive) {
          throw Error('You account was disabled. PLease contact to admin.')
        }

        return true
      }

      return true
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        await LoginSchema.validate(credentials)

        const { username, password } = LoginSchema.cast(credentials)
        const user = await getUserByUsername(username)

        if (!user) throw Error('User not found')
        if (!user.password) return null

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
          throw Error('Incorrect password')
        }
        if (!user.isActive) {
          throw Error('You account was deactivated. PLease contact to admin.')
        }

        return user
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
})
