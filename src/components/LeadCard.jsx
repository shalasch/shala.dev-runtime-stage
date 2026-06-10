import { motion } from 'framer-motion'

export default function LeadCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        left: 362, top: 127,
        width: 185, height: 235,
        zIndex: 2,
        borderRadius: 16,
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.07), 0 24px 64px rgba(0,0,0,0.09)',
        transform: 'rotate(-2deg)',
        padding: '20px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      {/* Avatar + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'linear-gradient(135deg, #e8e8e6 0%, #d4d4d2 100%)',
          flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 600, color: 'rgba(0,0,0,0.40)',
        }}>CF</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0A0A0A', letterSpacing: '-0.01em' }}>
            Carlos Ferreira
          </div>
          <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.40)', marginTop: 1 }}>
            New contact
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(0,0,0,0.05)' }} />

      {/* Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Field label="Source" value="WhatsApp" dot="#25D366" />
        <Field label="Interest" value="AI Automation" />
        <Field label="Status" value="Processing..." muted />
      </div>

      {/* Timestamp */}
      <div style={{
        marginTop: 'auto',
        fontSize: 9, fontWeight: 500,
        letterSpacing: '0.06em', textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.25)',
      }}>
        Just now
      </div>
    </motion.div>
  )
}

function Field({ label, value, dot, muted }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.35)', fontWeight: 500 }}>{label}</span>
      <span style={{
        display: 'flex', alignItems: 'center', gap: 4,
        fontSize: 11, fontWeight: 500,
        color: muted ? 'rgba(0,0,0,0.30)' : 'rgba(0,0,0,0.72)',
      }}>
        {dot && <span style={{ width: 5, height: 5, borderRadius: '50%', background: dot }} />}
        {value}
      </span>
    </div>
  )
}
