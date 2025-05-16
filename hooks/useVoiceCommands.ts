
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useVoiceCommands() {
  const router = useRouter()

  useEffect(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    recognition.lang = 'en-US'
    recognition.continuous = true

    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.toLowerCase()
      if (command.includes('dashboard')) {
        router.push('/operator/dashboard')
      } else if (command.includes('next stop')) {
        alert('Routing to next stop...')
      }
    }

    recognition.start()
    return () => recognition.stop()
  }, [router])
}
