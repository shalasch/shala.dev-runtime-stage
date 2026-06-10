import { motion } from 'framer-motion'
import CornerMarks from '../components/CornerMarks'

export default function WhatsAppPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, x: -24, y: -16 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.4 } }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={panel({ left: 68, top: 48, width: 252, height: 86, zIndex: 3 })}
    >
      <CornerMarks />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: '#25D366', flexShrink: 0,
            }} />
            <span style={labelStyle}>New WhatsApp Lead</span>
          </div>
          <span style={{ fontSize: 9, color: 'rgba(0,0,0,0.25)', fontWeight: 400 }}>Just now</span>
        </div>

        {/* Message preview */}
        <div style={{
          fontSize: 12, color: 'rgba(0,0,0,0.55)', lineHeight: 1.45,
          borderLeft: '2px solid rgba(37,211,102,0.3)',
          paddingLeft: 8,
        }}>
          "Interested in your automation services..."
        </div>

        {/* Contact */}
        <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.35)', fontWeight: 500 }}>
          Carlos Ferreira
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
