import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContainerTextFlip({
  words = ['better', 'scalable', 'connected', 'reliable', 'efficient'],
  interval = 2400,
  inline = false,
}) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCurrent(i => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  if (inline) {
    return (
      <span
        style={{
          display: 'inline-block',
          height: '1.05em',
          minWidth: '5em',
          overflow: 'hidden',
          verticalAlign: 'bottom',
          textAlign: 'center',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[current]}
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-105%' }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'inline-block' }}
          >
            {words[current]}
          </motion.span>
        </AnimatePresence>
      </span>
    )
  }

  return (
    <span
      style={{
        display: 'block',
        position: 'relative',
        height: '1.15em',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={words[current]}
          initial={{ y: '105%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-105%', opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'block',
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
          }}
        >
          {words[current]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
