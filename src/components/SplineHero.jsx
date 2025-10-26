import React from 'react'
import Spline from '@splinetool/react-spline'

export default function SplineHero() {
  return (
    <div className="relative h-[340px] w-full rounded-3xl overflow-hidden shadow-md">
      <Spline scene="https://prod.spline.design/XuAg4PYWfzmy0iW1/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-white/20" />
      <div className="pointer-events-none absolute bottom-4 left-4 text-sm font-medium text-gray-700 bg-white/70 backdrop-blur rounded-full px-3 py-1">
        Playful AI chat for kids — choose a Pokémon and talk!
      </div>
    </div>
  )
}
