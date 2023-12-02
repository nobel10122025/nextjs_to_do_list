"use client"

import { SessionProvider } from 'next-auth/react'

function Provider({ children, sessions }) {
    return (
        <SessionProvider session={sessions}>
            {children}
        </SessionProvider>
    )
}

export default Provider