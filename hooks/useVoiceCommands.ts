'use client'

import { useEffect } from 'react'
import { useCurrentOrder } from './useCurrentOrder'

export function useVoiceCommands() {
  const { currentOrder, setCurrentOrder, clearCurrentOrder } = useCurrentOrder()

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      console.warn("Voice recognition not supported")
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onresult = async (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase()

      if (transcript.includes("start delivery")) {
        if (currentOrder && currentOrder.status !== "in_progress") {
          setCurrentOrder({ ...currentOrder, status: "in_progress" })
          speechSynthesis.speak(new SpeechSynthesisUtterance("Delivery started."))
        } else {
          speechSynthesis.speak(new SpeechSynthesisUtterance("No order to start or already started."))
        }
      }

      if (transcript.includes("complete delivery")) {
        if (currentOrder && currentOrder.status === "in_progress") {
          setCurrentOrder({ ...currentOrder, status: "completed" })
          speechSynthesis.speak(new SpeechSynthesisUtterance("Delivery completed."))
        } else {
          speechSynthesis.speak(new SpeechSynthesisUtterance("No active delivery to complete."))
        }
      }

      if (transcript.includes("cancel delivery")) {
        if (currentOrder) {
          clearCurrentOrder()
          speechSynthesis.speak(new SpeechSynthesisUtterance("Delivery canceled."))
        } else {
          speechSynthesis.speak(new SpeechSynthesisUtterance("No delivery to cancel."))
        }
      }

      if (transcript.includes("where am i going")) {
        if (currentOrder && currentOrder.address) {
          speechSynthesis.speak(new SpeechSynthesisUtterance(`Your destination is ${currentOrder.address}`))
        } else {
          speechSynthesis.speak(new SpeechSynthesisUtterance("No current delivery."))
        }
      }

      if (transcript.includes("return to base")) {
        speechSynthesis.speak(new SpeechSynthesisUtterance("Returning to base."))
      }
    }

    recognition.onerror = (e) => {
      console.error("Voice recognition error:", e)
    }

    recognition.onend = () => {
      recognition.start()
    }

    recognition.start()

    return () => recognition.stop()
  }, [currentOrder, setCurrentOrder, clearCurrentOrder])
}