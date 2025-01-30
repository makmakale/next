'use client'
import {SessionProvider as NextSessionProvider} from 'next-auth/react'

const SessionProvider = ({children, session}) => {
  return (
    <NextSessionProvider session={session}>
      {children}
    </NextSessionProvider>
  )
}

export default SessionProvider