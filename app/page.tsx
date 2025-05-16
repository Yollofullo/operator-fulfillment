
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '../hooks/useSession'

export default function Home() {
  const { session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/operator/dashboard')
    } else {
      router.push('/login')
    }
  }, [session, router])

  return <p>Redirecting...</p>
}
