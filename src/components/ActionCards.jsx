import { motion } from 'framer-motion'

// V2 — CRM 860×460 centered in 560px stage with paddingTop=20.
// CRM: left=20, top=60, right=880, bottom=520.
// Stage width=900, overflow:hidden clips anything past 900px.
// Right-side cards: start at x=748, slightly clip at right edge (Ramp-style).
// Bottom cards: just below CRM bottom at top=526.
const CARDS = [
  {
    id: 'agent',
    text: 'Agent Assigned',
    pos: { left: 748, top: 72 },
    enter: { x: 28, opacity: 0 },
    delay: 0.0,
  },
  {
    id: 'followup',
    text: 'Follow-up Created',
    pos: { left: 748, top: 158 },
    enter: { x: 28, opacity: 0 },
    delay: 0.18,
  },
  {
    id: 'suggestions',
    text: 'Property Suggestions Sent',
    pos: { left: 488, top: 526 },
    enter: { y: 22, opacity: 0 },
    delay: 0.36,
  },
  {
    id: 'scheduling',
    text: 'Visit Scheduling Triggered',
    pos: { left: 278, top: 526 },
    enter: { y: 22, opacity: 0 },
    delay: 0.54,
  },
]

export default function ActionCards() {
  return (
    <>
      {CARDS.map(card => (
        <motion.div
          key={card.id}
          initial={card.enter}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.22, ease: 'easeIn' } }}
          transition={{ delay: card.delay, duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            ...card.pos,
            zIndex: 9,
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#FFFFFF',
            borderRadius: 20,
            border: '1px solid rgba(34,197,94,0.22)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05)',
            padding: '5px 11px 5px 7px',
            whiteSpace: 'nowrap',
          }}
        >
          <div style={{
            width: 16, height: 16, borderRadius: '50%',
            background: 'rgba(34,197,94,0.12)',
            border: '1px solid rgba(34,197,94,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
              <path d="M2 6L5 9L10 3" stroke="#22C55E" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(0,0,0,0.63)', letterSpacing: '-0.005em' }}>
            {card.text}
          </span>
        </motion.div>
      ))}
    </>
  )
}
