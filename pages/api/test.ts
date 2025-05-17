import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabase.from('orders').select('*')
  if (error) {
    console.error('Supabase error:', error)
    return res.status(500).json({ error: error.message })
  }
  return res.status(200).json({ data })
}