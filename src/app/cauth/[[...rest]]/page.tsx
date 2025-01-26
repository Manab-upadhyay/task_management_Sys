"use client"
import { SignIn, useUser } from '@clerk/nextjs'

export default function Home() {
  const { user } = useUser()

  if (!user) {
    return(
    <div className="flex items-center justify-center h-screen">
    <SignIn />
  </div>
    )
  }

  return <div>Welcome!</div>
}