import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DAYS  = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const WEEKS = [
  [1,  2,  3,  4,  5,  6,  7],
  [8,  9,  10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, null, null, null, null, null],
]

const CONFIRM_CARDS = [
  { text: 'WhatsApp Confirmation Sent', delay: 0.10 },
  { text: 'Agent Notified',             delay: 0.25 },
  { text: 'Property Address Shared',    delay: 0.40 },
  { text: 'Reminder Scheduled',         delay: 0.55 },
]

export default function CalendarScene({ showPayoff }) {
  const [clicked, setClicked] = useState(false)
  const [showEvt, setShowEvt] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setClicked(true), 820)
    const t2 = setTimeout(() => setShowEvt(true), 1150)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.26, delay: 0.16 }}
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      <motion.div
        animate={{ opacity: showPayoff ? 0.10 : 1 }}
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
      >
        {/* Header */}
        <div style={{
          height: 44, padding: '0 20px',
          borderBottom: '1px solid rgba(0,0,0,0.055)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#0A0A0A', letterSpacing: '-0.01em' }}>
              June 2026
            </span>
            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.28)', fontWeight: 500 }}>
              Property Visits
            </span>
          </div>
          <div style={{ display: 'flex', gap: 2 }}>
            {['‹', '›'].map(ch => (
              <div key={ch} style={{
                width: 24, height: 24, borderRadius: 5,
                border: '1px solid rgba(0,0,0,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, color: 'rgba(0,0,0,0.32)', cursor: 'default',
              }}>{ch}</div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ padding: '12px 20px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 7 }}>
            {DAYS.map(d => (
              <div key={d} style={{
                textAlign: 'center', fontSize: 10.5, fontWeight: 600,
                letterSpacing: '0.04em', textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.26)',
              }}>{d}</div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {WEEKS.map((week, wi) => (
              <div key={wi} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
                {week.map((day, di) => (
                  <DayCell key={di} day={day} isBooked={day === 18} clicked={clicked} isToday={day === 9} />
                ))}
              </div>
            ))}
          </div>

          {/* Event block */}
          <AnimatePresence>
            {showEvt && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  marginTop: 14,
                  borderRadius: 10,
                  border: '1px solid rgba(34,197,94,0.22)',
                  background: 'rgba(34,197,94,0.04)',
                  padding: '11px 14px',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}
              >
                <div style={{ width: 3, height: 38, borderRadius: 2, background: '#22C55E', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: '#0A0A0A', letterSpacing: '-0.01em' }}>
                    Property Visit · Jessica Carter
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.40)', marginTop: 3 }}>
                    Thu, Jun 18 · 2:00 PM – 3:00 PM
                  </div>
                  <div style={{ fontSize: 10.5, color: 'rgba(0,0,0,0.28)', marginTop: 1 }}>
                    Beverly Hills · Agent: Morgan Oliver
                  </div>
                </div>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.42, type: 'spring', stiffness: 380, damping: 18 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '4px 9px', borderRadius: 20,
                    background: 'rgba(34,197,94,0.10)',
                    border: '1px solid rgba(34,197,94,0.22)',
                    fontSize: 10.5, fontWeight: 600, color: '#16A34A', flexShrink: 0,
                  }}
                >
                  <CheckIcon /> Booked
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Payoff overlay */}
      <AnimatePresence>
        {showPayoff && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', inset: 0,
              background: '#FFFFFF',
              borderRadius: 14,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 10, zIndex: 10,
              padding: '0 28px',
            }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.12, type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'rgba(34,197,94,0.09)',
                border: '1.5px solid rgba(34,197,94,0.28)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 12L9.5 17.5L20 7" stroke="#22C55E" strokeWidth="2.4"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                fontSize: 16, fontWeight: 700, color: '#0A0A0A',
                letterSpacing: '-0.02em', textTransform: 'uppercase',
              }}>
                Property Visit Confirmed
              </div>
              <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.44)', marginTop: 6 }}>
                Jessica Carter · Thu Jun 18 · 2:00 PM
              </div>
              <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.28)', marginTop: 2 }}>
                Beverly Hills · Agent: Morgan Oliver
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.40, duration: 0.36 }}
              style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 480, marginTop: 4 }}
            >
              {CONFIRM_CARDS.map(c => (
                <motion.div
                  key={c.text}
                  initial={{ opacity: 0, scale: 0.84 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.40 + c.delay, type: 'spring', stiffness: 300, damping: 22 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    padding: '4px 10px', borderRadius: 20,
                    background: 'rgba(34,197,94,0.07)',
                    border: '1px solid rgba(34,197,94,0.18)',
                    fontSize: 10, fontWeight: 500, color: 'rgba(0,0,0,0.52)',
                  }}
                >
                  <CheckIcon /> {c.text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function DayCell({ day, isBooked, clicked, isToday }) {
  if (!day) return <div style={{ height: 34 }} />
  const active = isBooked && clicked
  return (
    <motion.div
      animate={active ? { scale: [1, 1.12, 1] } : {}}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{
        height: 34,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 7, cursor: 'default',
        background: active ? '#22C55E'
          : isBooked ? 'rgba(34,197,94,0.08)'
          : isToday  ? 'rgba(0,0,0,0.055)'
          : 'transparent',
        border: isBooked && !active ? '1px dashed rgba(34,197,94,0.32)' : 'none',
      }}
    >
      <span style={{
        fontSize: 12.5,
        fontWeight: active ? 700 : isToday ? 600 : 400,
        color: active ? '#fff' : isToday ? '#0A0A0A' : 'rgba(0,0,0,0.58)',
      }}>
        {day}
      </span>
    </motion.div>
  )
}

function CheckIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
      <path d="M2 6L5 9L10 3" stroke="#22C55E" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
