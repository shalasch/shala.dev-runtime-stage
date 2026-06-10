import { motion } from 'framer-motion'

// V2 — lead card is 320×244, centered in 560px stage with paddingTop=20.
// Lead card: top≈168, bottom≈412, left≈290, right≈610.
// Ambient title bottom ≈ 80px. Cards clear title and frame the lead card.
const CARDS = [
  {
    id: 'prev',
    label: 'PREVIOUS INQUIRY',
    dot: '#94A3B8',
    lines: ['2 listings viewed', '6 months ago'],
    pos: { left: 44, top: 98 },
    enter: { x: -18, y: -10, opacity: 0 },
    delay: 0.06,
    floatDelay: 0.7,
  },
  {
    id: 'budget',
    label: 'BUDGET DETECTED',
    dot: '#4A7CF7',
    lines: ['R$780k – R$920k', 'Pre-approved'],
    pos: { left: 616, top: 98 },
    enter: { x: 18, y: -10, opacity: 0 },
    delay: 0.16,
    floatDelay: 0.9,
  },
  {
    id: 'region',
    label: 'PREFERRED REGION',
    dot: '#22C55E',
    lines: ['Barra da Tijuca', 'Recreio dos Band.'],
    pos: { left: 36, top: 224 },
    enter: { x: -18, y: 0, opacity: 0 },
    delay: 0.26,
    floatDelay: 1.1,
  },
  {
    id: 'profile',
    label: 'BUYER PROFILE',
    dot: '#F59E0B',
    lines: ['Family of 4', 'Moving this month', 'Prefers Barra'],
    pos: { left: 620, top: 210 },
    enter: { x: 18, y: 0, opacity: 0 },
    delay: 0.36,
    highlight: true,
    floatDelay: 1.3,
  },
  {
    id: 'intent',
    label: 'HIGH PURCHASE INTENT',
    dot: '#4A7CF7',
    lines: ['AI Signal: 94%'],
    pos: { left: 40, top: 426 },
    enter: { x: -18, y: 12, opacity: 0 },
    delay: 0.48,
    accent: '#4A7CF7',
    floatDelay: 1.5,
  },
  {
    id: 'urgency',
    label: 'URGENCY INFERRED',
    dot: '#F59E0B',
    lines: ['"Visit this week"', 'Lease ends July'],
    pos: { left: 620, top: 426 },
    enter: { x: 18, y: 12, opacity: 0 },
    delay: 0.58,
    accent: '#F59E0B',
    floatDelay: 1.7,
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
          }}
        >
          {/* Inner wrapper for float oscillation */}
          <motion.div
            animate={{ y: [0, -3.5, 0] }}
            transition={{
              delay: card.floatDelay,
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'mirror',
            }}
            style={{
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

            {/* Label row with pulsing dot */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
              <motion.div
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: card.floatDelay }}
                style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: card.accent || card.dot || (card.highlight ? '#D97706' : 'rgba(0,0,0,0.30)'),
                  flexShrink: 0,
                }}
              />
              <span style={{
                fontSize: 8.5, fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: card.accent || (card.highlight ? '#D97706' : 'rgba(0,0,0,0.33)'),
              }}>
                {card.label}
              </span>
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
