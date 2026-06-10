import { motion } from 'framer-motion'

export default function StatusBadge({ label, accent = false, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '4px 9px',
        borderRadius: 20,
        background: accent ? 'rgba(34,197,94,0.08)' : 'rgba(0,0,0,0.04)',
        border: `1px solid ${accent ? 'rgba(34,197,94,0.25)' : 'rgba(0,0,0,0.08)'}`,
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: accent ? '#16A34A' : 'rgba(0,0,0,0.45)',
        whiteSpace: 'nowrap',
        zIndex: 4,
        ...style,
      }}
    >
      {accent && (
        <span style={{
          width: 5, height: 5, borderRadius: '50%',
          background: '#22C55E', flexShrink: 0,
        }} />
      )}
      {label}
    </motion.div>
  )
}
