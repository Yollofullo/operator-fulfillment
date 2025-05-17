
'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold text-center">Login</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input className="input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="btn btn-primary w-full" type="submit">Sign In</button>
      </form>
    </div>
  )
}
