import { motion } from 'framer-motion'
import CornerMarks from '../components/CornerMarks'

export default function MeetingPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, x: 16, y: 24 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.4 } }}
      transition={{ type: 'spring', stiffness: 240, damping: 20 }}
      style={panel({ left: 584, top: 350, width: 236, height: 118, zIndex: 3 })}
    >
      <CornerMarks />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 18 }}
              style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#22C55E', flexShrink: 0, display: 'block',
              }}
            />
            <span style={{ ...labelStyle, color: '#16A34A' }}>Meeting Confirmed ↑</span>
          </div>
        </div>

        {/* Calendar block */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'rgba(34,197,94,0.05)',
          border: '1px solid rgba(34,197,94,0.15)',
          borderRadius: 8, padding: '8px 10px',
        }}>
          {/* Date block */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            background: '#fff', border: '1px solid rgba(0,0,0,0.07)',
            borderRadius: 6, padding: '4px 8px', minWidth: 36,
          }}>
            <span style={{ fontSize: 8, fontWeight: 600, color: '#22C55E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Thu</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#0A0A0A', lineHeight: 1, letterSpacing: '-0.02em' }}>12</span>
          </div>

          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#0A0A0A', letterSpacing: '-0.01em' }}>
              Discovery Call
            </div>
            <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.45)', marginTop: 1 }}>
              2:00 PM · 30 min
            </div>
          </div>

          {/* Checkmark */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 400, damping: 20 }}
            style={{ marginLeft: 'auto' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7.5" stroke="rgba(34,197,94,0.3)" />
              <motion.path
                d="M4.5 8L7 10.5L11.5 6"
                stroke="#22C55E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Footer */}
        <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.35)' }}>
          Carlos Ferreira · Jun 12, 2:00 PM
        </div>
      </div>
    </motion.div>
  )
}

const labelStyle = {
  fontSize: 9, fontWeight: 600,
  letterSpacing: '0.08em', textTransform: 'uppercase',
  color: 'rgba(0,0,0,0.35)',
}

function panel({ left, top, width, height, zIndex }) {
  return {
    position: 'absolute', left, top, width, height, zIndex,
    borderRadius: 12,
    background: '#fff',
    border: '1px solid rgba(34,197,94,0.18)',
    boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.05), 0 12px 32px rgba(0,0,0,0.06), 0 0 0 1px rgba(34,197,94,0.06)',
    padding: '12px 14px',
  }
}
