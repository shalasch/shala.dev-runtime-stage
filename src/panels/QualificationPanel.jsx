import { motion } from 'framer-motion'
import CornerMarks from '../components/CornerMarks'

// r=22, circumference=2π*22≈138.2, 92% fill → dashoffset=138.2*0.08≈11.1
const C = 138.2

export default function QualificationPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, x: 20, y: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.4 } }}
      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
      style={panel({ left: 526, top: 40, width: 214, height: 144, zIndex: 3 })}
    >
      <CornerMarks />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4A7CF7', flexShrink: 0 }} />
          <span style={labelStyle}>AI Qualification</span>
        </div>

        {/* Score + ring */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0 }}>
            <svg width="56" height="56" viewBox="0 0 56 56" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="3" />
              <motion.circle
                cx="28" cy="28" r="22"
                fill="none"
                stroke="#4A7CF7"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={C}
                initial={{ strokeDashoffset: C }}
                animate={{ strokeDashoffset: 11.1 }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
              />
            </svg>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, fontWeight: 700, color: '#0A0A0A', letterSpacing: '-0.02em',
            }}>92</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: 'rgba(74,124,247,0.08)', border: '1px solid rgba(74,124,247,0.18)',
              borderRadius: 20, padding: '2px 8px',
              fontSize: 10, fontWeight: 600, color: '#4A7CF7', letterSpacing: '0.04em',
            }}>
              High Intent
            </div>
            <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.40)', lineHeight: 1.4 }}>
              Business owner · <br />automation need
            </div>
          </div>
        </div>

        {/* Signal */}
        <div style={{
          fontSize: 10, color: 'rgba(0,0,0,0.35)',
          borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: 8,
        }}>
          Owner signal detected · available this week
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
