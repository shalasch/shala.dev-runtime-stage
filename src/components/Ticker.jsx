import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const ITEMS = [
  { label: 'LEADS TODAY', value: '847', up: true },
  { label: 'CALLS BOOKED', value: '23', up: true },
  { label: 'FOLLOW-UPS SENT', value: '1,204', up: true },
  { label: 'QUALIFICATION RATE', value: '89%', up: true },
  { label: 'AVG RESPONSE TIME', value: '4 MIN', up: false },
  { label: 'MEETINGS THIS WEEK', value: '61', up: true },
]

const ITEM_CONTENT = ITEMS.map(({ label, value, up }) =>
  `${label}: ${value} ${up ? '↑' : '↓'}`
).join('   ·   ')

const FULL_TEXT = `${ITEM_CONTENT}   ·   ${ITEM_CONTENT}   ·   `

export default function Ticker({ visible }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      style={{
        borderTop: '1px solid rgba(0,0,0,0.055)',
        height: 36,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Fade masks */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 48,
        background: 'linear-gradient(to right, #fff, transparent)',
        zIndex: 1, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 48,
        background: 'linear-gradient(to left, #fff, transparent)',
        zIndex: 1, pointerEvents: 'none',
      }} />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{
          display: 'flex', alignItems: 'center',
          whiteSpace: 'nowrap',
          fontSize: 10, fontWeight: 500,
          letterSpacing: '0.07em',
          color: 'rgba(0,0,0,0.30)',
          paddingLeft: 24,
        }}
      >
        {FULL_TEXT}
        {FULL_TEXT}
      </motion.div>
    </motion.div>
  )
}
