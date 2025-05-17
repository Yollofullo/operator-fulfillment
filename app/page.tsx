<<<<<<< HEAD
'use client'
import { useEffect } from 'react'
import { useSession } from '../../hooks/useSession'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const session = useSession()
=======

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '../hooks/useSession'

export default function Home() {
  const { session } = useSession()
>>>>>>> 5971a59ad466a9dd1814ff4f28ab772ce6c15400
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/operator/dashboard')
    } else {
      router.push('/login')
    }
<<<<<<< HEAD
  }, [session])

  return null
}
=======
  }, [session, router])

  return <p>Redirecting...</p>
}
>>>>>>> 5971a59ad466a9dd1814ff4f28ab772ce6c15400
