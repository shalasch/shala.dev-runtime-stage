import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ── Stage constants ────────────────────────────────────────────────────────────
const W = 1200, H = 540
const NW = 172, NH = 38
const CX = 443, CY = 178        // CY shifted up — centers 185px card in 540px stage
const CW = 323, CH = 185        // Taller card = more visual weight
const CARD_H = 36

const SYSTEMS = [
  { id: 'wa',    label: 'WhatsApp',        color: '#25D366', x: 28,  y: 22  },
  { id: 'email', label: 'Email',           color: '#4A7CF7', x: 6,   y: 96  },
  { id: 'forms', label: 'Google Forms',    color: '#7CB342', x: 160, y: 168 },
  { id: 'api',   label: 'Webhook / API',   color: '#94A3B8', x: 19,  y: 242 },
  { id: 'cal',   label: 'Google Calendar', color: '#EF4444', x: 153, y: 314 },
  { id: 'crm',   label: 'CRM System',      color: '#6366F1', x: 23,  y: 388 },
  { id: 'sb',    label: 'Supabase',        color: '#3ECF8E', x: 148, y: 462 },
]

// Entry/exit points on center card edges — within CY=178 to CY+CH=363
const L_ENTRIES = [218, 230, 242, 254, 266, 278, 290]
const R_EXITS   = [222, 234, 246, 258, 270]

const OUTCOMES = [
  { id: 'lq', label: 'Lead Qualified',        x: 823, y: 48  },
  { id: 'fu', label: 'Follow-up Created',     x: 844, y: 162 },
  { id: 'cu', label: 'CRM Updated',           x: 835, y: 278 },
  { id: 'ms', label: 'Meeting Scheduled',     x: 813, y: 390 },
  { id: 'pb', label: 'Property Visit Booked', x: 780, y: 470 },
]

// Each story: which system fires, which outcome lights up, what op text appears
const STORIES = [
  { si: 0, oi: 0, op: { text: 'Lead Captured · Juliana Costa',     color: '#25D366' } },
  { si: 2, oi: 0, op: { text: 'Lead Qualified · Score 94',          color: '#22C55E' } },
  { si: 5, oi: 2, op: { text: 'CRM Updated · Agent Assigned',       color: '#6366F1' } },
  { si: 1, oi: 1, op: { text: 'Follow-up Created · 3:00 PM',        color: '#4A7CF7' } },
  { si: 4, oi: 3, op: { text: 'Meeting Scheduled · 2:00 PM',        color: '#EF4444' } },
  { si: 6, oi: 4, op: { text: 'Property Visit Booked · Jun 18',     color: '#3ECF8E' } },
  { si: 3, oi: 2, op: { text: 'CRM Record Created',                 color: '#94A3B8' } },
]

// ── Path builders ──────────────────────────────────────────────────────────────
function lp(sys, ey) {
  const sx = sys.x + NW, sy = sys.y + NH / 2
  const c1x = Math.min(sx + 55, CX - 28)
  return `M ${sx} ${sy} C ${c1x} ${sy} ${CX - 28} ${ey} ${CX} ${ey}`
}

function rp(ey, out) {
  const ex = CX + CW, oy = out.y + CARD_H / 2
  return `M ${ex} ${ey} C ${ex + 62} ${ey} ${out.x - 28} ${oy} ${out.x} ${oy}`
}

// ── Section ────────────────────────────────────────────────────────────────────
export default function OrchestrationSection() {
  const stageRef = useRef(null)
  const inView   = useInView(stageRef, { once: true, amount: 0.22 })

  // Which system / outcome is currently "active"
  const [activeSys, setActiveSys]   = useState(-1)
  const [activeOut, setActiveOut]   = useState(-1)
  // Fire counters — increment to re-trigger line animation via key
  const [leftFires, setLeftFires]   = useState({})  // { sysIdx: count }
  const [rightFires, setRightFires] = useState({})  // { outIdx: count }
  // Accumulating live ops feed (newest first, max 4)
  const [ops, setOps]               = useState([])

  useEffect(() => {
    if (!inView) return
    const timers = []
    let running = true

    function runStory(idx) {
      if (!running) return
      const s = STORIES[idx % STORIES.length]

      // T+0   System node activates
      setActiveSys(s.si)

      // T+280  Left connection fires (light travels system → center)
      timers.push(setTimeout(() => {
        if (!running) return
        setLeftFires(p => ({ ...p, [s.si]: (p[s.si] || 0) + 1 }))
      }, 280))

      // T+840  New operation appears in center feed
      timers.push(setTimeout(() => {
        if (!running) return
        setOps(prev => [{ ...s.op, id: `${idx}-${Date.now()}` }, ...prev].slice(0, 4))
      }, 840))

      // T+1180  Right connection fires (light travels center → outcome)
      timers.push(setTimeout(() => {
        if (!running) return
        setRightFires(p => ({ ...p, [s.oi]: (p[s.oi] || 0) + 1 }))
      }, 1180))

      // T+1680  Outcome card activates
      timers.push(setTimeout(() => {
        if (!running) return
        setActiveOut(s.oi)
      }, 1680))

      // T+3000  Deactivate both
      timers.push(setTimeout(() => {
        if (!running) return
        setActiveSys(-1)
        setActiveOut(-1)
      }, 3000))

      // T+3500  Next story
      timers.push(setTimeout(() => runStory(idx + 1), 3500))
    }

    // First story starts 700ms after section enters view
    timers.push(setTimeout(() => runStory(0), 700))

    return () => {
      running = false
      timers.forEach(clearTimeout)
    }
  }, [inView])

  return (
    <section style={{
      background: 'transparent',
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '80px 40px 88px',
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', marginBottom: 52, maxWidth: 560 }}
      >
        <div style={{
          fontSize: 9.5, fontWeight: 700, letterSpacing: '0.13em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.26)',
          marginBottom: 14,
        }}>
          Operational Infrastructure
        </div>
        <div style={{
          fontSize: 42, fontWeight: 700, color: '#0A0A0A',
          letterSpacing: '-0.035em', lineHeight: 1.06, marginBottom: 16,
        }}>
          One Operational Layer
        </div>
        <div style={{
          fontSize: 15.5, color: 'rgba(0,0,0,0.42)', lineHeight: 1.62,
          letterSpacing: '-0.008em', maxWidth: 420, margin: '0 auto',
        }}>
          Every business system connected through a single operational core.
        </div>
      </motion.div>

      {/* Stage */}
      <div
        ref={stageRef}
        style={{ position: 'relative', width: W, height: H, flexShrink: 0 }}
      >
        {/* ── SVG: base lines + fire pulses ─────────────────────────────────── */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{
            position: 'absolute', inset: 0,
            width: W, height: H,
            pointerEvents: 'none', overflow: 'visible',
            zIndex: 0,
          }}
        >
          {SYSTEMS.map((sys, i) => (
            <g key={sys.id}>
              {/* Base left line — draws in on entrance, stays subtle */}
              <motion.path
                d={lp(sys, L_ENTRIES[i])}
                stroke="rgba(0,0,0,0.07)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ delay: 0.78 + i * 0.09, duration: 0.68, ease: 'easeOut' }}
              />
              {/* Fire pulse — key increments retrigger the animation */}
              {(leftFires[i] || 0) > 0 && (
                <motion.path
                  key={leftFires[i]}
                  d={lp(sys, L_ENTRIES[i])}
                  stroke={sys.color}
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0.6 }}
                  animate={{ pathLength: 1, opacity: [0.6, 0.6, 0] }}
                  transition={{ duration: 0.68, times: [0, 0.65, 1], ease: 'easeOut' }}
                />
              )}
            </g>
          ))}

          {OUTCOMES.map((out, i) => (
            <g key={out.id}>
              {/* Base right line */}
              <motion.path
                d={rp(R_EXITS[i], out)}
                stroke="rgba(0,0,0,0.065)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ delay: 1.52 + i * 0.1, duration: 0.62, ease: 'easeOut' }}
              />
              {/* Fire pulse */}
              {(rightFires[i] || 0) > 0 && (
                <motion.path
                  key={rightFires[i]}
                  d={rp(R_EXITS[i], out)}
                  stroke="rgba(34,197,94,0.60)"
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0.6 }}
                  animate={{ pathLength: 1, opacity: [0.6, 0.6, 0] }}
                  transition={{ duration: 0.62, times: [0, 0.65, 1], ease: 'easeOut' }}
                />
              )}
            </g>
          ))}
        </svg>

        {/* ── System nodes ──────────────────────────────────────────────────── */}
        {SYSTEMS.map((sys, i) => (
          <SystemNode key={sys.id} sys={sys} i={i} inView={inView} active={activeSys === i} />
        ))}

        {/* ── Center anchor ─────────────────────────────────────────────────── */}
        <CenterAnchor inView={inView} ops={ops} />

        {/* ── Outcome cards ─────────────────────────────────────────────────── */}
        {OUTCOMES.map((out, i) => (
          <OutcomeCard key={out.id} out={out} i={i} inView={inView} active={activeOut === i} />
        ))}
      </div>
    </section>
  )
}

// ── System node ────────────────────────────────────────────────────────────────
function SystemNode({ sys, i, inView, active }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.08 + i * 0.08, duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'absolute', left: sys.x, top: sys.y, zIndex: 2 }}
    >
      {/* Float wrapper — runs independently; never restarts when active changes */}
      <motion.div
        animate={{ y: [0, -(2.2 + (i % 4) * 0.65), 0] }}
        transition={{
          delay: 1.4 + i * 0.28,
          duration: 3.2 + (i % 3) * 0.5,
          repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror',
        }}
      >
        {/* Card visual — uses CSS transition for active state, no Framer Motion */}
        <div style={{
          width: NW, height: NH,
          background: '#FFFFFF',
          borderRadius: 9,
          border: `1px solid ${active ? sys.color + '44' : 'rgba(0,0,0,0.08)'}`,
          boxShadow: active
            ? `0 0 0 3px ${sys.color}14, 0 4px 20px ${sys.color}18, 0 1px 3px rgba(0,0,0,0.04)`
            : '0 1px 3px rgba(0,0,0,0.05), 0 4px 14px rgba(0,0,0,0.04)',
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '0 12px',
          cursor: 'default',
          transition: 'border-color 0.22s, box-shadow 0.22s',
        }}>
          <SystemBadge id={sys.id} color={sys.color} active={active} />
          <span style={{
            fontSize: 11.5, fontWeight: active ? 600 : 500,
            color: active ? sys.color : 'rgba(0,0,0,0.64)',
            letterSpacing: '-0.005em', whiteSpace: 'nowrap',
            transition: 'color 0.22s, font-weight 0.12s',
          }}>
            {sys.label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

const BADGE_TEXT = {
  wa: 'WA', email: '✉', forms: 'GF', api: '</>', cal: 'GC', crm: 'CR', sb: 'SB',
}

function SystemBadge({ id, color, active }) {
  return (
    <div style={{
      width: 22, height: 22, borderRadius: 6,
      background: active ? color + '22' : color + '18',
      border: `1px solid ${active ? color + '40' : color + '2E'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: id === 'api' ? 7 : 8.5,
      fontWeight: 700, color,
      fontFamily: "'SF Mono','Fira Code','Fira Mono',monospace",
      flexShrink: 0,
      letterSpacing: id === 'api' ? '-0.04em' : '0',
      transition: 'background 0.22s, border-color 0.22s',
    }}>
      {BADGE_TEXT[id]}
    </div>
  )
}

// ── Center anchor ──────────────────────────────────────────────────────────────
function CenterAnchor({ inView, ops }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.90 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.58, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'absolute', left: CX, top: CY, width: CW, height: CH, zIndex: 4 }}
    >
      {/* Ambient breathing ring */}
      <motion.div
        animate={{ scale: [1, 1.030, 1], opacity: [0.06, 0.13, 0.06] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: -14,
          borderRadius: 28, background: 'rgba(245,158,11,0.09)',
          pointerEvents: 'none',
        }}
      />

      <div style={{
        width: '100%', height: '100%',
        background: '#FFFFFF',
        borderRadius: 16,
        border: '1px solid rgba(0,0,0,0.10)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 18px 56px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden', position: 'relative',
      }}>
        <Cx pos="tl" /><Cx pos="tr" /><Cx pos="bl" /><Cx pos="br" />

        {/* Header */}
        <div style={{
          padding: '12px 16px 11px',
          borderBottom: '1px solid rgba(0,0,0,0.055)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <span style={{
            fontSize: 8.5, fontWeight: 700,
            letterSpacing: '0.09em', textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.32)',
          }}>
            AI Operations Layer
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <motion.div
              animate={{ opacity: [1, 0.26, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E' }}
            />
            <span style={{ fontSize: 9.5, fontWeight: 500, color: '#16A34A' }}>Active</span>
          </div>
        </div>

        {/* Live operations feed */}
        <div style={{ flex: 1, padding: '13px 16px', overflow: 'hidden' }}>
          {ops.length === 0 ? (
            <div style={{
              height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: 9.5, color: 'rgba(0,0,0,0.22)', letterSpacing: '0.04em' }}
              >
                Initializing
              </motion.div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <AnimatePresence initial={false}>
                {ops.map((op, idx) => (
                  <motion.div
                    key={op.id}
                    layout
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1 - idx * 0.18, height: 32, marginBottom: 5 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{
                      layout: { duration: 0.26 },
                      opacity: { duration: 0.26 },
                      height: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 7,
                      overflow: 'hidden',
                    }}
                  >
                    {/* Dot */}
                    <div style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: op.color, flexShrink: 0,
                      opacity: idx === 0 ? 1 : 0.7,
                    }} />
                    {/* Text */}
                    <span style={{
                      fontSize: 11, fontWeight: idx === 0 ? 500 : 400,
                      color: idx === 0 ? 'rgba(0,0,0,0.65)' : 'rgba(0,0,0,0.38)',
                      letterSpacing: '-0.008em',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {op.text}
                    </span>
                    {/* "just now" marker on latest */}
                    {idx === 0 && (
                      <span style={{
                        fontSize: 9, color: 'rgba(0,0,0,0.24)',
                        marginLeft: 'auto', flexShrink: 0, letterSpacing: '0.01em',
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
      </div>
    </motion.div>
  )
}

function Cx({ pos }) {
  const s = {
    tl: { top: -4, left: -3 }, tr: { top: -4, right: -3 },
    bl: { bottom: -4, left: -3 }, br: { bottom: -4, right: -3 },
  }[pos]
  return (
    <span style={{
      position: 'absolute', fontSize: 9,
      color: 'rgba(0,0,0,0.16)', lineHeight: 1,
      userSelect: 'none', pointerEvents: 'none', ...s,
    }}>+</span>
  )
}

// ── Outcome card ───────────────────────────────────────────────────────────────
function OutcomeCard({ out, i, inView, active }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 1.68 + i * 0.09, duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'absolute', left: out.x, top: out.y, zIndex: 2 }}
    >
      {/* Float wrapper — independent of active state */}
      <motion.div
        animate={{ y: [0, -(2.0 + (i % 3) * 0.8), 0] }}
        transition={{
          delay: 2.0 + i * 0.32,
          duration: 3.4 + (i % 3) * 0.4,
          repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: '#FFFFFF',
          borderRadius: 20,
          border: `1px solid ${active ? 'rgba(34,197,94,0.44)' : 'rgba(34,197,94,0.22)'}`,
          boxShadow: active
            ? '0 0 0 3px rgba(34,197,94,0.08), 0 4px 18px rgba(34,197,94,0.12)'
            : '0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)',
          padding: '0 12px 0 8px',
          height: CARD_H, whiteSpace: 'nowrap',
          cursor: 'default',
          transition: 'border-color 0.22s, box-shadow 0.22s',
        }}>
          {/* Check circle — scales when activated */}
          <motion.div
            animate={{ scale: active ? [1, 1.28, 1] : 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 16 }}
            style={{
              width: 16, height: 16, borderRadius: '50%',
              background: active ? 'rgba(34,197,94,0.18)' : 'rgba(34,197,94,0.12)',
              border: `1px solid ${active ? 'rgba(34,197,94,0.38)' : 'rgba(34,197,94,0.25)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.22s, border-color 0.22s',
            }}
          >
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
              <path d="M2 6L5 9L10 3" stroke="#22C55E" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          <span style={{
            fontSize: 11, fontWeight: active ? 600 : 500,
            color: active ? 'rgba(0,0,0,0.76)' : 'rgba(0,0,0,0.62)',
            letterSpacing: '-0.005em',
            transition: 'color 0.22s, font-weight 0.12s',
          }}>
            {out.label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
