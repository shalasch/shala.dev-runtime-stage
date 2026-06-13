import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STAGES = [
  { id: 'capture', label: 'Lead Captured', color: '#4A7CF7',
    rows: [['Name', 'Jessica Carter'], ['Source', 'WhatsApp'], ['Received', '09:14 AM']] },
  { id: 'qualify', label: 'Qualified',     color: '#F59E0B',
    rows: [['Score', '94 / 100'], ['Intent', 'High'], ['Budget', 'Confirmed']] },
  { id: 'route',   label: 'Routed',        color: '#8B5CF6',
    rows: [['Agent', 'R. Collins'], ['Region', 'SP Sul'], ['Priority', 'High']] },
  { id: 'contact', label: 'Contacted',     color: '#06B6D4',
    rows: [['Channels', 'WA + Email'], ['Sent', '09:16 AM'], ['Status', 'Delivered']] },
  { id: 'booked',  label: 'Meeting Set',   color: '#22C55E',
    rows: [['Date', 'Thu Jun 19'], ['Time', '2:00 PM'], ['Type', 'Video Call']] },
]

const QUEUE = [
  { name: 'Jessica Carter',    stage: 'Meeting Set',   color: '#22C55E', time: '2 min ago' },
  { name: 'Peter Johnson',   stage: 'Contacted',     color: '#06B6D4', time: '8 min ago' },
  { name: 'Chloe Rodriguez', stage: 'Routed',        color: '#8B5CF6', time: '15 min ago' },
  { name: 'Dylan Scott',     stage: 'Lead Captured', color: '#4A7CF7', time: '32 min ago' },
]

export default function LeadEnginePanel({ inView }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setActive(i => (i + 1) % STAGES.length), 2200)
    return () => clearInterval(id)
  }, [inView])

  const stage = STAGES[active]
  const fill = active === 0 ? 0 : (active / (STAGES.length - 1)) * 100

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Stage track */}
      <div style={{
        background: '#fff', borderRadius: 14,
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)',
        padding: '24px 24px 20px',
      }}>
        <div style={{ display: 'flex', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 15, left: '10%', right: '10%', height: 1, background: 'rgba(0,0,0,0.08)' }} />
          <motion.div
            style={{ position: 'absolute', top: 15, left: '10%', height: 1, background: 'rgba(0,0,0,0.45)', originX: 0 }}
            animate={{ width: `${fill * 0.8}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          {STAGES.map((s, i) => (
            <div key={s.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, position: 'relative', zIndex: 1 }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: i < active ? 'rgba(0,0,0,0.5)' : i === active ? 'rgba(0,0,0,0.07)' : '#fff',
                border: `1.5px solid ${i <= active ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.1)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.35s, border-color 0.35s',
              }}>
                {i < active ? (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : i === active ? (
                  <motion.div animate={{ scale: [1, 1.35, 1] }} transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ width: 10, height: 10, borderRadius: '50%', background: '#0a0a0a' }} />
                ) : (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,0.15)' }} />
                )}
              </div>
              <span style={{
                fontSize: 10, fontWeight: i === active ? 600 : 500, textAlign: 'center', lineHeight: 1.3,
                color: i === active ? 'rgba(0,0,0,0.80)' : i < active ? 'rgba(0,0,0,0.50)' : 'rgba(0,0,0,0.28)',
                transition: 'color 0.3s', letterSpacing: '-0.005em',
              }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stage data */}
      <AnimatePresence mode="wait">
        <motion.div key={active}
          initial={{ opacity: 0, y: 10, scale: 0.987 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.987 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: '#fff', borderRadius: 16,
            border: '1px solid rgba(0,0,0,0.09)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)',
            padding: '22px 26px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.3, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(0,0,0,0.40)' }} />
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.58)' }}>
              {stage.label}
            </span>
            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.28)', marginLeft: 'auto' }}>
              Step {active + 1} of {STAGES.length}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 28px' }}>
            {stage.rows.map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', marginBottom: 5 }}>{k}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.76)', letterSpacing: '-0.012em' }}>{v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pipeline queue */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <div style={{ padding: '11px 18px', borderBottom: '1px solid rgba(0,0,0,0.055)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)' }}>Active Pipeline</span>
          <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.28)' }}>{QUEUE.length} leads</span>
        </div>
        {QUEUE.map((lead, i) => (
          <div key={lead.name} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px',
            borderBottom: i < QUEUE.length - 1 ? '1px solid rgba(0,0,0,0.045)' : 'none',
            background: 'transparent',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(0,0,0,0.28)', flexShrink: 0 }} />
            <span style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(0,0,0,0.7)', flex: 1, letterSpacing: '-0.007em' }}>{lead.name}</span>
            <span style={{ fontSize: 10.5, fontWeight: 500, color: 'rgba(0,0,0,0.50)', background: 'rgba(0,0,0,0.06)', borderRadius: 7, padding: '2px 8px', whiteSpace: 'nowrap' }}>{lead.stage}</span>
            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.28)', flexShrink: 0 }}>{lead.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
