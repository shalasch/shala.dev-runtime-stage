import { motion } from 'framer-motion'
import CornerMarks from '../components/CornerMarks'

export default function FollowUpPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, x: -20, y: 16 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.4 } }}
      transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
      style={panel({ left: 80, top: 376, width: 216, height: 78, zIndex: 3 })}
    >
      <CornerMarks />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
            <span style={labelStyle}>Follow-up Scheduled</span>
          </div>
        </div>

        {/* Details row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.35)' }}>WhatsApp</span>
            <span style={{ fontSize: 9, color: 'rgba(0,0,0,0.20)' }}>·</span>
            <span style={{ fontSize: 10, fontWeight: 500, color: 'rgba(0,0,0,0.65)' }}>Today, 3:00 PM</span>
          </div>
        </div>

        {/* Message type */}
        <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.40)' }}>
          Discovery intro · personalized
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
    border: '1px solid rgba(0,0,0,0.07)',
    boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.05), 0 12px 32px rgba(0,0,0,0.06)',
    padding: '12px 14px',
  }
}
