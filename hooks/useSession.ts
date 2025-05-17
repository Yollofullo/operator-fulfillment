import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useSession() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data?.session ?? null))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    )
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return session
}