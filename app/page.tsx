'use client'
import { useEffect } from 'react'
import { useSession } from '../../hooks/useSession'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/operator/dashboard')
    } else {
      router.push('/login')
    }
  }, [session])

  return null
}