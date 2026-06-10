import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CornerMarks from '../components/CornerMarks'

export default function CRMPanel() {
  const [qualified, setQualified] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setQualified(true), 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, x: -32 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.4 } }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      style={panel({ left: 88, top: 194, width: 196, height: 114, zIndex: 1 })}
    >
      <CornerMarks />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
            <span style={labelStyle}>CRM Updated</span>
          </div>
        </div>

        {/* Stage transition */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            fontSize: 10, fontWeight: 500,
            color: 'rgba(0,0,0,0.28)',
            textDecoration: 'line-through',
          }}>New Lead</span>
          <span style={{ fontSize: 9, color: 'rgba(0,0,0,0.25)' }}>→</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: qualified ? 1 : 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              fontSize: 10, fontWeight: 600,
              color: '#16A34A',
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.20)',
              borderRadius: 4, padding: '1px 6px',
            }}
          >
            Qualified
          </motion.span>
        </div>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <FieldRow label="Contact" value="Carlos Ferreira" />
          <FieldRow label="Score" value="92 / High" />
        </div>
      </div>
    </motion.div>
  )
}

function FieldRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.35)' }}>{label}</span>
      <span style={{ fontSize: 10, fontWeight: 500, color: 'rgba(0,0,0,0.65)' }}>{value}</span>
    </div>
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
