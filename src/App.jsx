import React from 'react'
import SplineHero from './components/SplineHero'
import CharacterPicker from './components/CharacterPicker'
import PokemonAvatar from './components/PokemonAvatar'
import ChatPanel from './components/ChatPanel'

function App() {
  const [character, setCharacter] = React.useState('Togepi')
  const [speaking, setSpeaking] = React.useState(false)
  const [messages, setMessages] = React.useState([
    { role: 'system', text: 'Pick a Pokémon to start chatting!' },
  ])

  const onReply = (msg) => setMessages((m) => [...m, msg])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-rose-50 to-white text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Talking Pokémon for Kids
            </h1>
            <p className="text-sm text-gray-600">Safe, playful, and voice-animated chats</p>
          </div>
        </header>

        <SplineHero />

        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="bg-white/80 backdrop-blur rounded-3xl p-5 shadow-sm">
            <h2 className="font-semibold mb-3">Choose your buddy</h2>
            <CharacterPicker value={character} onChange={(c) => setCharacter(c)} />
            <div className="mt-6">
              <PokemonAvatar character={character} speaking={speaking} />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-3xl p-5 shadow-sm">
            <h2 className="font-semibold mb-3">Chat</h2>
            <div className="h-56 overflow-y-auto rounded-xl border border-gray-200 p-3 bg-white/70">
              {messages.map((m, i) => (
                <div key={i} className="mb-2 text-sm">
                  <span className={
                    m.role === 'assistant' ? 'text-blue-700' : m.role === 'user' ? 'text-gray-800' : 'text-gray-500'
                  }>
                    {m.role === 'assistant' ? `${character}: ` : m.role === 'user' ? 'You: ' : ''}
                  </span>
                  <span>{m.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <ChatPanel
                character={character}
                onSpeakingChange={setSpeaking}
                onReply={onReply}
              />
            </div>
          </div>
        </section>

        <footer className="mt-10 text-center text-xs text-gray-500">
          Voices are generated in your browser for privacy and fun. Keep chats kind and playful!
        </footer>
      </div>
    </div>
  )
}

export default App
