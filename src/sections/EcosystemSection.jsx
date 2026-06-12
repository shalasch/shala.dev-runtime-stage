import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ── Stage geometry ─────────────────────────────────────────────────────────────
const W = 1280, H = 700
const OW = 188, OH = 52
const CX = 450, CY = 200, CW = 380, CH = 300

// Orbital cards + the edge point on the core card they connect to
const ORBITALS = [
  { id: 'wa',    label: 'WhatsApp',        color: '#25D366', badge: 'WA', x: 30,   y: 58,  ex: 450, ey: 238 },
  { id: 'em',    label: 'Email',           color: '#4A7CF7', badge: '✉',  x: 250,  y: 18,  ex: 548, ey: 200 },
  { id: 'cal',   label: 'Google Calendar', color: '#EF4444', badge: 'GC', x: 1000, y: 28,  ex: 752, ey: 200 },
  { id: 'crm',   label: 'CRM System',      color: '#6366F1', badge: 'CR', x: 1082, y: 218, ex: 830, ey: 268 },
  { id: 'db',    label: 'Database',        color: '#3ECF8E', badge: 'DB', x: 1082, y: 430, ex: 830, ey: 408 },
  { id: 'forms', label: 'Google Forms',    color: '#7CB342', badge: 'GF', x: 820,  y: 578, ex: 718, ey: 500 },
  { id: 'leads', label: 'Lead Sources',    color: '#F59E0B', badge: 'LS', x: 248,  y: 588, ex: 562, ey: 500 },
  { id: 'web',   label: 'Website',         color: '#94A3B8', badge: 'WB', x: 30,   y: 390, ex: 450, ey: 392 },
]

const STORIES = [
  { oi: 0, text: 'Lead captured · Juliana Costa' },
  { oi: 6, text: 'Campaign triggered · 47 sources' },
  { oi: 1, text: 'Follow-up email scheduled' },
  { oi: 7, text: 'Website visitor converted' },
  { oi: 2, text: 'Appointment booked · 2:00 PM' },
  { oi: 3, text: 'CRM record updated · assigned' },
  { oi: 5, text: 'Form submission qualified' },
  { oi: 4, text: 'Database synced · 3 records' },
]

// ── Section ────────────────────────────────────────────────────────────────────
export default function EcosystemSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })

  const [activeOrbital, setActiveOrbital] = useState(-1)
  const [dots, setDots] = useState([])
  const [feed, setFeed] = useState([])

  useEffect(() => {
    if (!inView) return
    const timers = []
    let running = true

    function runStory(idx) {
      if (!running) return
      const s = STORIES[idx % STORIES.length]
      const orb = ORBITALS[s.oi]

      setActiveOrbital(s.oi)

      const dotId = `dot-${idx}`
      setDots(prev => [...prev, {
        id: dotId,
        x0: orb.x + OW / 2,
        y0: orb.y + OH / 2,
        x1: orb.ex,
        y1: orb.ey,
        color: orb.color,
      }])

      // Dot arrives → update feed, remove dot
      timers.push(setTimeout(() => {
        if (!running) return
        setFeed(prev => [
          { id: dotId, text: s.text, color: orb.color },
          ...prev,
        ].slice(0, 4))
        setDots(prev => prev.filter(d => d.id !== dotId))
      }, 760))

      // Deactivate orbital
      timers.push(setTimeout(() => {
        if (!running) return
        setActiveOrbital(-1)
      }, 1300))

      timers.push(setTimeout(() => runStory(idx + 1), 2400))
    }

    timers.push(setTimeout(() => runStory(0), 900))
    return () => { running = false; timers.forEach(clearTimeout) }
  }, [inView])

  return (
    <section
      ref={ref}
      style={{
        background: 'transparent',
        width: '100%',
        padding: '80px 0 68px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', marginBottom: 52, maxWidth: 540, padding: '0 40px' }}
      >
        <div style={{
          fontSize: 9.5, fontWeight: 700, letterSpacing: '0.13em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.26)', marginBottom: 14,
        }}>
          Operational Ecosystem
        </div>
        <div style={{
          fontSize: 40, fontWeight: 700, color: '#0A0A0A',
          letterSpacing: '-0.035em', lineHeight: 1.08, marginBottom: 14,
        }}>
          One layer. Every system connected.
        </div>
        <div style={{
          fontSize: 15, color: 'rgba(0,0,0,0.44)', lineHeight: 1.66,
          letterSpacing: '-0.008em',
        }}>
          All business systems route through a single operational core — qualifying leads, updating records and scheduling appointments without manual steps.
        </div>
      </motion.div>

      {/* Stage */}
      <div style={{ position: 'relative', width: W, height: H, flexShrink: 0 }}>
        {/* SVG connection lines */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{
            position: 'absolute', inset: 0,
            width: W, height: H,
            pointerEvents: 'none', zIndex: 0,
          }}
        >
          {ORBITALS.map((orb, i) => (
            <motion.path
              key={orb.id}
              d={`M ${orb.x + OW / 2} ${orb.y + OH / 2} L ${orb.ex} ${orb.ey}`}
              stroke="rgba(0,0,0,0.068)"
              strokeWidth="1"
              strokeDasharray="3 7"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 0.52 + i * 0.07, duration: 0.88, ease: 'easeOut' }}
            />
          ))}
        </svg>

        {/* Traveling dots */}
        {dots.map(dot => (
          <motion.div
            key={dot.id}
            style={{
              position: 'absolute',
              width: 7, height: 7,
              borderRadius: '50%',
              background: dot.color,
              top: 0, left: 0,
              zIndex: 10,
              pointerEvents: 'none',
              boxShadow: `0 0 9px ${dot.color}99`,
            }}
            initial={{ opacity: 0.9, x: dot.x0 - 3.5, y: dot.y0 - 3.5 }}
            animate={{ opacity: [0.9, 0.9, 0], x: dot.x1 - 3.5, y: dot.y1 - 3.5 }}
            transition={{ duration: 0.76, ease: 'easeInOut', times: [0, 0.72, 1] }}
          />
        ))}

        {/* Orbital cards */}
        {ORBITALS.map((orb, i) => (
          <OrbitalCard key={orb.id} orb={orb} i={i} inView={inView} active={activeOrbital === i} />
        ))}

        {/* Core card */}
        <CoreCard inView={inView} feed={feed} />
      </div>
    </section>
  )
}

// ── Orbital card ───────────────────────────────────────────────────────────────
function OrbitalCard({ orb, i, inView, active }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.08 + i * 0.07, duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'absolute', left: orb.x, top: orb.y, zIndex: 3 }}
    >
      {/* Float wrapper — runs independently, never restarts on active change */}
      <motion.div
        animate={{ y: [0, -(2 + (i % 4) * 0.65), 0] }}
        transition={{
          delay: 1.4 + i * 0.28,
          duration: 3.2 + (i % 3) * 0.5,
          repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror',
        }}
      >
        <div style={{
          width: OW, height: OH,
          background: '#FFFFFF',
          borderRadius: 12,
          border: `1px solid ${active ? orb.color + '55' : 'rgba(0,0,0,0.09)'}`,
          boxShadow: active
            ? `0 0 0 3px ${orb.color}11, 0 4px 20px ${orb.color}1E, 0 2px 6px rgba(0,0,0,0.05)`
            : '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '0 14px',
          transition: 'border-color 0.22s, box-shadow 0.22s',
        }}>
          {/* Badge */}
          <div style={{
            width: 26, height: 26, borderRadius: 7,
            background: active ? orb.color + '22' : orb.color + '15',
            border: `1px solid ${active ? orb.color + '44' : orb.color + '28'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 8.5, fontWeight: 700, color: orb.color,
            fontFamily: "'SF Mono','Fira Code','Fira Mono',monospace",
            flexShrink: 0,
            transition: 'background 0.22s, border-color 0.22s',
          }}>
            {orb.badge}
          </div>
          {/* Label */}
          <span style={{
            fontSize: 12, fontWeight: active ? 600 : 500,
            color: active ? '#0A0A0A' : 'rgba(0,0,0,0.60)',
            letterSpacing: '-0.006em', whiteSpace: 'nowrap', flex: 1,
            transition: 'color 0.22s, font-weight 0.12s',
          }}>
            {orb.label}
          </span>
          {/* Status dot — CSS transition only, no Framer Motion */}
          <div style={{
            width: 5, height: 5, borderRadius: '50%',
            background: active ? orb.color : 'rgba(0,0,0,0.12)',
            flexShrink: 0,
            transition: 'background 0.22s',
          }} />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Core card ──────────────────────────────────────────────────────────────────
function CoreCard({ inView, feed }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.42, duration: 0.60, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'absolute', left: CX, top: CY, width: CW, height: CH, zIndex: 4 }}
    >
      {/* Ambient breathing glow */}
      <motion.div
        animate={{ scale: [1, 1.028, 1], opacity: [0.05, 0.11, 0.05] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: -22,
          borderRadius: 32, background: 'rgba(34,197,94,0.14)',
          pointerEvents: 'none',
        }}
      />

      <div style={{
        width: '100%', height: '100%',
        background: '#FFFFFF',
        borderRadius: 18,
        border: '1px solid rgba(0,0,0,0.09)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.09), 0 24px 64px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: '12px 18px 11px',
          borderBottom: '1px solid rgba(0,0,0,0.055)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <span style={{
            fontSize: 9.5, fontWeight: 700, letterSpacing: '0.09em',
            textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)',
          }}>
            Operational Layer
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <motion.div
              animate={{ opacity: [1, 0.22, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }}
            />
            <span style={{ fontSize: 9.5, fontWeight: 600, color: '#16A34A' }}>Active</span>
          </div>
        </div>

        {/* Live event feed */}
        <div style={{ flex: 1, padding: '12px 18px', overflow: 'hidden' }}>
          {feed.length === 0 ? (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.span
                animate={{ opacity: [0.25, 0.55, 0.25] }}
                transition={{ duration: 1.3, repeat: Infinity }}
                style={{ fontSize: 10, color: 'rgba(0,0,0,0.22)', letterSpacing: '0.04em' }}
              >
                Initializing
              </motion.span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <AnimatePresence initial={false}>
                {feed.map((ev, idx) => (
                  <motion.div
                    key={ev.id}
                    layout
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1 - idx * 0.2, height: 33, marginBottom: 6 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{
                      layout: { duration: 0.24 },
                      height: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.24 },
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}
                  >
                    <div style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: ev.color, flexShrink: 0,
                      opacity: idx === 0 ? 1 : 0.6,
                    }} />
                    <span style={{
                      fontSize: 11.5,
                      fontWeight: idx === 0 ? 500 : 400,
                      color: idx === 0 ? 'rgba(0,0,0,0.68)' : 'rgba(0,0,0,0.36)',
                      letterSpacing: '-0.008em',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {ev.text}
                    </span>
                    {idx === 0 && (
                      <span style={{
                        fontSize: 9, color: 'rgba(0,0,0,0.22)',
                        marginLeft: 'auto', flexShrink: 0,
                      }}>
                        now
                      </span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Bottom metrics */}
        <div style={{
          padding: '10px 18px',
          borderTop: '1px solid rgba(0,0,0,0.055)',
          display: 'flex', alignItems: 'center', gap: 22, flexShrink: 0,
        }}>
          {[
            { label: 'Processed', value: '847' },
            { label: 'Workflows', value: '12' },
            { label: 'Response',  value: '1.2s' },
          ].map(s => (
            <div key={s.label}>
              <div style={{
                fontSize: 12.5, fontWeight: 700, color: '#0A0A0A',
                fontFamily: "'SF Mono','Fira Code',monospace",
                letterSpacing: '-0.02em',
              }}>{s.value}</div>
              <div style={{
                fontSize: 8.5, color: 'rgba(0,0,0,0.28)',
                letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
