import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SYSTEMS = [
  { label: 'CRM',             color: '#8B5CF6', stat: '142 events today' },
  { label: 'Database',        color: '#4A7CF7', stat: '893 records active' },
  { label: 'Calendar',        color: '#EF4444', stat: '28 scheduled' },
  { label: 'Notifications',   color: '#F59E0B', stat: '67 sent today' },
  { label: 'Workflow Engine',  color: '#06B6D4', stat: '54 executions' },
]

const EVENTS = [
  { from: 'CRM',            to: 'Calendar',      text: 'Meeting created after lead qualification',  color: '#8B5CF6' },
  { from: 'Database',       to: 'CRM',           text: 'Contact record synced on inquiry',          color: '#4A7CF7' },
  { from: 'Calendar',       to: 'Notifications', text: 'Confirmation dispatched to client',         color: '#EF4444' },
  { from: 'Workflow Engine', to: 'Database',     text: 'Operation result logged on completion',     color: '#06B6D4' },
  { from: 'CRM',            to: 'Notifications', text: 'Alert triggered by deal stage update',      color: '#8B5CF6' },
]

export default function InfraPanel({ inView }) {
  const [evIdx, setEvIdx] = useState(0)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setEvIdx(i => (i + 1) % EVENTS.length), 2200)
    return () => clearInterval(id)
  }, [inView])

  const visibleEvents = [0, 1, 2].map(o => EVENTS[(evIdx + o) % EVENTS.length])

  return (
    <div style={{
      background: '#fff', borderRadius: 16,
      border: '1px solid rgba(0,0,0,0.09)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06), 0 20px 56px rgba(0,0,0,0.06)',
      overflow: 'hidden',
    }}>
      {/* Title bar */}
      <div style={{
        padding: '11px 16px',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        display: 'flex', alignItems: 'center', gap: 10,
        background: '#FAFAFA',
      }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(0,0,0,0.11)' }} />)}
        </div>
        <span style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(0,0,0,0.44)', letterSpacing: '-0.005em', flex: 1 }}>
          Operational Runtime · All Systems Nominal
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E' }}
          />
          <span style={{ fontSize: 9.5, fontWeight: 500, color: '#16A34A' }}>Active</span>
        </div>
      </div>

      <div style={{ padding: '18px 18px 22px' }}>
        {/* Connected systems */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', marginBottom: 10 }}>
            Connected Systems
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {SYSTEMS.map((s, i) => (
              <div key={s.label} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
                borderBottom: i < SYSTEMS.length - 1 ? '1px solid rgba(0,0,0,0.045)' : 'none',
              }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(0,0,0,0.28)', flexShrink: 0 }} />
                <span style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(0,0,0,0.7)', flex: 1, letterSpacing: '-0.007em' }}>
                  {s.label}
                </span>
                <span style={{
                  fontSize: 10.5, fontWeight: 500, color: 'rgba(0,0,0,0.45)',
                  background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.09)',
                  borderRadius: 6, padding: '2px 8px', flexShrink: 0,
                }}>Active</span>
                <span style={{ fontSize: 10.5, color: 'rgba(0,0,0,0.36)', flexShrink: 0, minWidth: 110, textAlign: 'right' }}>
                  {s.stat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Coordination log */}
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', marginBottom: 10 }}>
            Recent Coordination
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={evIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.26 }}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {visibleEvents.map((ev, i) => (
                <div key={ev.from + ev.to + i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 9, padding: '8px 0',
                  borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                  opacity: 1 - i * 0.3,
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(0,0,0,0.28)', flexShrink: 0, marginTop: 4 }} />
                  <div>
                    <span style={{ fontSize: 9.5, color: 'rgba(0,0,0,0.33)', marginBottom: 2, display: 'block', letterSpacing: '0.02em' }}>
                      {ev.from} → {ev.to}
                    </span>
                    <span style={{ fontSize: 12, letterSpacing: '-0.007em', fontWeight: i === 0 ? 500 : 400, color: i === 0 ? 'rgba(0,0,0,0.62)' : 'rgba(0,0,0,0.38)' }}>
                      {ev.text}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
