import { motion } from 'framer-motion'

export default function LeadScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '22px 24px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'linear-gradient(135deg, #1c1c1c 0%, #3a3a3a 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 600, color: '#fff',
          flexShrink: 0, letterSpacing: '-0.01em',
        }}>
          JC
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0A0A0A', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Juliana Costa
          </div>
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.38)', marginTop: 2 }}>
            New contact via WhatsApp
          </div>
        </div>
        <div style={{
          padding: '3px 9px', borderRadius: 20,
          background: 'rgba(245,158,11,0.09)',
          border: '1px solid rgba(245,158,11,0.24)',
          fontSize: 10, fontWeight: 600, color: '#D97706',
          letterSpacing: '0.01em', flexShrink: 0,
        }}>
          New Lead
        </div>
      </div>

      <div style={{ height: 1, background: 'rgba(0,0,0,0.055)', marginBottom: 16 }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        <Row label="Interest">3-bedroom apartment</Row>
        <Row label="Budget">R$850,000</Row>
        <Row label="Source">
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#25D366', flexShrink: 0 }} />
            WhatsApp
          </span>
        </Row>
        <Row label="Received">
          <span style={{ color: 'rgba(0,0,0,0.35)' }}>Just now</span>
        </Row>
      </div>
    </motion.div>
  )
}

function Row({ label, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.35)', fontWeight: 400 }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(0,0,0,0.68)' }}>{children}</span>
    </div>
  )
}
