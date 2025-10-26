import React from 'react'
import { Send } from 'lucide-react'

const backendURL = import.meta.env.VITE_BACKEND_URL || `${window.location.origin.replace(':3000', ':8000')}`

export default function ChatPanel({ character, onSpeakingChange, onReply }) {
  const [input, setInput] = React.useState('Hi there!')
  const [loading, setLoading] = React.useState(false)

  const speak = React.useCallback((text) => {
    if (!('speechSynthesis' in window)) return
    const utter = new SpeechSynthesisUtterance(text)
    // Character voice styling
    if (character === 'Togepi') {
      utter.pitch = 1.6
      utter.rate = 1.12
    } else {
      utter.pitch = 1.2
      utter.rate = 1.25
    }
    utter.onstart = () => onSpeakingChange(true)
    utter.onend = () => onSpeakingChange(false)
    try {
      window.speechSynthesis.cancel() // stop any previous speech
    } catch {}
    window.speechSynthesis.speak(utter)
  }, [character, onSpeakingChange])

  const send = async () => {
    const message = input.trim()
    if (!message) return
    onReply({ role: 'user', text: message })
    setLoading(true)
    try {
      const res = await fetch(`${backendURL}/api/talk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ character, message }),
      })
      if (!res.ok) throw new Error('Network error')
      const data = await res.json()
      onReply({ role: 'assistant', text: data.reply })
      speak(data.reply)
      setInput('')
    } catch (e) {
      const fallback = character === 'Togepi' ? "Toge! Let's try again!" : "Pika! Let's try again!"
      onReply({ role: 'assistant', text: fallback })
      speak(fallback)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder={`Talk to ${character}...`}
          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80"
        />
        <button
          onClick={send}
          disabled={loading}
          className="rounded-xl bg-blue-600 text-white px-4 py-3 font-medium hover:bg-blue-700 disabled:opacity-60 flex items-center gap-2"
        >
          <Send size={18} />
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
