import React from 'react'

const characters = [
  {
    name: 'Togepi',
    color: 'from-pink-200 to-rose-300',
    emoji: '🥚',
    pitch: 1.6,
    rate: 1.12,
  },
  {
    name: 'Pikachu',
    color: 'from-yellow-200 to-amber-300',
    emoji: '⚡',
    pitch: 1.2,
    rate: 1.25,
  },
]

export default function CharacterPicker({ value, onChange }) {
  return (
    <div className="w-full max-w-xl mx-auto grid grid-cols-2 gap-4">
      {characters.map((c) => {
        const selected = value === c.name
        return (
          <button
            key={c.name}
            onClick={() => onChange(c.name)}
            className={
              `rounded-2xl p-4 transition-all border flex items-center gap-3 ` +
              `bg-gradient-to-br ${c.color} ` +
              (selected
                ? 'ring-2 ring-offset-2 ring-blue-500 border-blue-400 scale-[1.02]'
                : 'border-transparent hover:scale-[1.01] hover:shadow')
            }
            aria-pressed={selected}
          >
            <span className="text-2xl" role="img" aria-label={c.name}>{c.emoji}</span>
            <div className="text-left">
              <div className="font-bold text-gray-900">{c.name}</div>
              <div className="text-xs text-gray-600">Tap to chat as {c.name}</div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
