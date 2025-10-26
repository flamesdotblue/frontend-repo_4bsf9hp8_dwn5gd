import React from 'react'
import { motion, useAnimationControls } from 'framer-motion'

export default function PokemonAvatar({ character = 'Togepi', speaking = false }) {
  const controls = useAnimationControls()

  React.useEffect(() => {
    controls.start({
      y: speaking ? [0, -6, 0] : [0, -2, 0],
      transition: { duration: speaking ? 0.6 : 1.6, repeat: Infinity, ease: 'easeInOut' },
    })
  }, [speaking, controls])

  const colors = character === 'Pikachu'
    ? { base: 'bg-yellow-300', cheek: 'bg-rose-400' }
    : { base: 'bg-pink-200', cheek: 'bg-rose-300' }

  return (
    <motion.div animate={controls} className="w-40 h-40 mx-auto relative">
      <div className={`w-full h-full rounded-[28px] ${colors.base} shadow-inner relative flex items-center justify-center`}>
        {/* Eyes */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-5">
          <div className="w-4 h-6 rounded-full bg-white shadow-inner" />
          <div className="w-4 h-6 rounded-full bg-white shadow-inner" />
        </div>
        {/* Mouth */}
        <motion.div
          className="absolute bottom-9 left-1/2 -translate-x-1/2 w-10 h-3 rounded-full bg-black/80"
          animate={{ height: speaking ? [6, 14, 6] : 6 }}
          transition={{ duration: 0.24, repeat: speaking ? Infinity : 0, ease: 'easeInOut' }}
          style={{ borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }}
        />
        {/* Cheeks */}
        <div className={`absolute bottom-12 left-6 w-5 h-5 rounded-full ${colors.cheek} opacity-80`} />
        <div className={`absolute bottom-12 right-6 w-5 h-5 rounded-full ${colors.cheek} opacity-80`} />
      </div>
      <div className="text-center mt-3 text-sm font-semibold text-gray-700">{character}</div>
    </motion.div>
  )
}
