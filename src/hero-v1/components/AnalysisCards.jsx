import { motion } from 'framer-motion'

// Positioned absolutely in the 900×490 composition area.
// Lead card is 300×224, centered at approximately (450, 254) with paddingTop=18.
// Cards surround the lead card from all four quadrants.
const CARDS = [
  {
    id: 'prev',
    label: 'PREVIOUS INQUIRY',
    lines: ['2 listings viewed', '6 months ago'],
    pos: { left: 44, top: 72 },
    enter: { x: -18, y: -10, opacity: 0 },
    delay: 0.06,
  },
  {
    id: 'budget',
    label: 'BUDGET DETECTED',
    lines: ['R$780k – R$920k', 'Pre-approved'],
    pos: { left: 645, top: 72 },
    enter: { x: 18, y: -10, opacity: 0 },
    delay: 0.16,
  },
  {
    id: 'region',
    label: 'PREFERRED REGION',
    lines: ['Barra da Tijuca', 'Recreio dos Band.'],
    pos: { left: 36, top: 185 },
    enter: { x: -18, y: 0, opacity: 0 },
    delay: 0.26,
  },
  {
    id: 'profile',
    label: 'BUYER PROFILE',
    lines: ['Family of 4', 'Moving this month', 'Prefers Barra'],
    pos: { left: 648, top: 172 },
    enter: { x: 18, y: 0, opacity: 0 },
    delay: 0.36,
    highlight: true,
  },
  {
    id: 'intent',
    label: 'HIGH PURCHASE INTENT',
    lines: ['AI Signal: 94%'],
    pos: { left: 40, top: 388 },
    enter: { x: -18, y: 12, opacity: 0 },
    delay: 0.48,
    accent: '#4A7CF7',
  },
  {
    id: 'urgency',
    label: 'URGENCY INFERRED',
    lines: ['"Visit this week"', 'Lease ends July'],
    pos: { left: 648, top: 388 },
    enter: { x: 18, y: 12, opacity: 0 },
    delay: 0.58,
    accent: '#F59E0B',
  },
]

export default function AnalysisCards() {
  return (
    <>
      {CARDS.map(card => (
        <motion.div
          key={card.id}
          initial={card.enter}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ scale: 0.55, opacity: 0, transition: { duration: 0.28, ease: 'easeIn' } }}
          transition={{ delay: card.delay, duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            ...card.pos,
            zIndex: 8,
            background: '#FFFFFF',
            borderRadius: 10,
            border: `1px solid ${card.highlight ? 'rgba(245,158,11,0.22)' : 'rgba(0,0,0,0.08)'}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 8px 20px rgba(0,0,0,0.05)',
            padding: '9px 12px',
            minWidth: 158,
            maxWidth: 196,
          }}
        >
          <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />

          <div style={{
            fontSize: 8.5, fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: card.accent || (card.highlight ? '#D97706' : 'rgba(0,0,0,0.33)'),
            marginBottom: 5,
          }}>
            {card.label}
          </div>

          {card.lines.map((line, i) => (
            <div key={i} style={{
              fontSize: 11.5,
              fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? '#0A0A0A' : 'rgba(0,0,0,0.44)',
              letterSpacing: '-0.005em',
              lineHeight: 1.35,
            }}>
              {line}
            </div>
          ))}
        </motion.div>
      ))}
    </>
  )
}

function Corner({ pos }) {
  const s = {
    tl: { top: -4, left: -3 },
    tr: { top: -4, right: -3 },
    bl: { bottom: -4, left: -3 },
    br: { bottom: -4, right: -3 },
  }[pos]
  return (
    <span style={{
      position: 'absolute', fontSize: 9,
      color: 'rgba(0,0,0,0.18)', lineHeight: 1,
      userSelect: 'none', pointerEvents: 'none', ...s,
    }}>+</span>
  )
}
