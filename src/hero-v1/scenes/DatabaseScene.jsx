import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COLS = [
  { key: '#',          w: 32,  mono: true,  align: 'center' },
  { key: 'lead_name',  w: 146, mono: false, bold: true },
  { key: 'phone',      w: 118, mono: true },
  { key: 'budget',     w: 104, mono: true },
  { key: 'status',     w: 94,  badge: true },
  { key: 'source',     w: 82,  dot: true },
  { key: 'created_at', w: 88,  mono: false },
]

const EXISTING = [
  { id: 1, lead_name: 'Fernando Alves', phone: '+55 21 9····', budget: 'R$720,000',   status: 'Qualified', source: 'Website',  created_at: '2 days ago',  sourceColor: '#94A3B8' },
  { id: 2, lead_name: 'Ana Lima',        phone: '+55 11 9····', budget: 'R$1,200,000', status: 'Prospect',  source: 'Referral', created_at: 'Yesterday',   sourceColor: '#4A7CF7' },
  { id: 3, lead_name: 'Carlos M.',       phone: '+55 21 9····', budget: 'R$650,000',   status: 'Cold',      source: 'Website',  created_at: '5 hrs ago',   sourceColor: '#94A3B8' },
]

const NEW_FIELDS = [
  ['lead_name',  'Juliana Costa'],
  ['phone',      '+55 21 97···'],
  ['budget',     'R$850,000'],
  ['status',     'New Lead'],
  ['source',     'WhatsApp'],
  ['created_at', 'Just now'],
]

const STATUS = {
  'Qualified': { bg: 'rgba(34,197,94,0.09)',  border: 'rgba(34,197,94,0.22)',  text: '#16A34A' },
  'Prospect':  { bg: 'rgba(74,124,247,0.09)', border: 'rgba(74,124,247,0.20)', text: '#2563EB' },
  'Cold':      { bg: 'rgba(0,0,0,0.055)',     border: 'rgba(0,0,0,0.10)',      text: 'rgba(0,0,0,0.42)' },
  'New Lead':  { bg: 'rgba(245,158,11,0.09)', border: 'rgba(245,158,11,0.24)', text: '#D97706' },
}

export default function DatabaseScene() {
  const [rowVisible, setRowVisible] = useState(false)
  const [filled, setFilled]         = useState({})
  const [promoted, setPromoted]     = useState(false)

  useEffect(() => {
    const t = []
    t.push(setTimeout(() => setRowVisible(true), 620))
    NEW_FIELDS.forEach(([key], i) => {
      t.push(setTimeout(() => setFilled(p => ({ ...p, [key]: true })), 1050 + i * 380))
    })
    // status upgrades: New Lead → Qualified
    t.push(setTimeout(() => setPromoted(true), 1050 + 3 * 380 + 720))
    return () => t.forEach(clearTimeout)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.26, delay: 0.18 }}
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {/* Toolbar */}
      <div style={{
        height: 34,
        padding: '0 16px',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        background: 'rgba(0,0,0,0.018)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <GridIcon />
          <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(0,0,0,0.55)', letterSpacing: '-0.01em' }}>
            leads
          </span>
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>
            Grid view
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, color: 'rgba(0,0,0,0.30)' }}>
          <AnimatePresence>
            {rowVisible && (
              <motion.span
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  padding: '1px 6px', borderRadius: 4,
                  background: 'rgba(34,197,94,0.10)',
                  border: '1px solid rgba(34,197,94,0.20)',
                  color: '#16A34A', fontWeight: 600, fontSize: 9, letterSpacing: '0.04em',
                }}
              >
                + 1 new
              </motion.span>
            )}
          </AnimatePresence>
          <span style={{ fontWeight: 500 }}>4 records</span>
        </div>
      </div>

      {/* Column headers */}
      <div style={{
        display: 'flex', height: 26,
        background: 'rgba(0,0,0,0.020)',
        borderBottom: '1px solid rgba(0,0,0,0.065)',
        flexShrink: 0, paddingLeft: 14,
      }}>
        {COLS.map(col => (
          <div key={col.key} style={{
            width: col.w, flexShrink: 0,
            display: 'flex', alignItems: 'center',
            paddingRight: 8,
            fontSize: 9.5,
            fontWeight: 600,
            letterSpacing: '0.04em',
            color: 'rgba(0,0,0,0.36)',
            fontFamily: "'SF Mono','Fira Code','Fira Mono','Roboto Mono',monospace",
            borderRight: '1px solid rgba(0,0,0,0.045)',
          }}>
            {col.key === '#' ? '' : col.key}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {EXISTING.map((row, i) => (
          <ExistingRow key={row.id} row={row} idx={i + 1} />
        ))}

        {/* New Juliana row */}
        <AnimatePresence>
          {rowVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 34 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'flex', alignItems: 'stretch',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                background: 'rgba(245,158,11,0.028)',
                overflow: 'hidden', paddingLeft: 14,
                position: 'relative',
              }}
            >
              {/* Left accent pulse */}
              <motion.div
                animate={{ opacity: [1, 0.3, 1, 0.3, 1, 0] }}
                transition={{ duration: 2.4, delay: 0.2 }}
                style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: 2, background: '#F59E0B',
                }}
              />

              {COLS.map(col => (
                <NewCell
                  key={col.key}
                  col={col}
                  filled={filled[col.key]}
                  value={NEW_FIELDS.find(([k]) => k === col.key)?.[1]}
                  status={promoted ? 'Qualified' : 'New Lead'}
                  rowIdx={4}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty placeholder rows */}
        {[5, 6].map(n => (
          <div key={n} style={{
            height: 34,
            borderBottom: '1px solid rgba(0,0,0,0.04)',
            paddingLeft: 14,
            display: 'flex', alignItems: 'center',
          }}>
            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.15)', width: 32, textAlign: 'center' }}>
              {n}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function ExistingRow({ row, idx }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'stretch',
      height: 34,
      borderBottom: '1px solid rgba(0,0,0,0.048)',
      paddingLeft: 14,
      opacity: 0.52,
    }}>
      {COLS.map(col => (
        <div key={col.key} style={{
          width: col.w, flexShrink: 0,
          display: 'flex', alignItems: 'center',
          paddingRight: 8,
          fontSize: 11,
          fontFamily: col.mono ? "'SF Mono','Fira Code',monospace" : 'inherit',
          borderRight: '1px solid rgba(0,0,0,0.04)',
          color: col.bold ? '#0A0A0A' : 'rgba(0,0,0,0.60)',
          fontWeight: col.bold ? 500 : 400,
          justifyContent: col.align === 'center' ? 'center' : 'flex-start',
        }}>
          {col.key === '#' ? (
            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.25)' }}>{idx}</span>
          ) : col.badge ? (
            <Badge status={row.status} />
          ) : col.dot ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: row.sourceColor, flexShrink: 0 }} />
              {row[col.key]}
            </span>
          ) : (
            row[col.key]
          )}
        </div>
      ))}
    </div>
  )
}

function NewCell({ col, filled, value, status, rowIdx }) {
  const style = {
    width: col.w, flexShrink: 0,
    display: 'flex', alignItems: 'center',
    paddingRight: 8,
    fontSize: 11,
    fontFamily: col.mono ? "'SF Mono','Fira Code',monospace" : 'inherit',
    borderRight: '1px solid rgba(0,0,0,0.04)',
    color: col.bold ? '#0A0A0A' : 'rgba(0,0,0,0.65)',
    fontWeight: col.bold ? 600 : 400,
    justifyContent: col.align === 'center' ? 'center' : 'flex-start',
  }

  if (col.key === '#') {
    return <div style={style}><span style={{ fontSize: 10, color: 'rgba(0,0,0,0.28)' }}>{rowIdx}</span></div>
  }

  if (!filled) {
    return (
      <div style={style}>
        <motion.span
          animate={{ opacity: [0.8, 0.2, 0.8] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ display: 'block', width: 8, height: 1.5, background: 'rgba(0,0,0,0.25)', borderRadius: 1 }}
        />
      </div>
    )
  }

  return (
    <div style={style}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.22 }}
      >
        {col.badge ? (
          <Badge status={status} />
        ) : col.dot ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#25D366', flexShrink: 0 }} />
            {value}
          </span>
        ) : (
          value
        )}
      </motion.span>
    </div>
  )
}

function Badge({ status }) {
  const c = STATUS[status] || STATUS['New Lead']
  return (
    <motion.span
      key={status}
      initial={{ opacity: 0, scale: 0.82 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        padding: '2px 7px', borderRadius: 20,
        background: c.bg, border: `1px solid ${c.border}`,
        fontSize: 10, fontWeight: 600, color: c.text,
        whiteSpace: 'nowrap',
      }}
    >
      {status}
    </motion.span>
  )
}

function GridIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="0"   y="0"   width="5"  height="5"  rx="1" fill="rgba(0,0,0,0.28)" />
      <rect x="7"   y="0"   width="5"  height="5"  rx="1" fill="rgba(0,0,0,0.28)" />
      <rect x="0"   y="7"   width="5"  height="5"  rx="1" fill="rgba(0,0,0,0.28)" />
      <rect x="7"   y="7"   width="5"  height="5"  rx="1" fill="rgba(0,0,0,0.28)" />
    </svg>
  )
}
