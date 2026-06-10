import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const MAX_W = 1080

// ── Shared ─────────────────────────────────────────────────────────────────────

function ContentSide({ num, client, challenge, system, outcome }) {
  return (
    <div style={{ width: 360, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <span style={{
          fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.32)',
        }}>{num}</span>
        <div style={{ width: 1, height: 10, background: 'rgba(0,0,0,0.15)' }} />
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.02em', color: 'rgba(0,0,0,0.48)' }}>
          {client}
        </span>
      </div>

      <div style={{ marginBottom: 22 }}>
        <div style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.11em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.26)', marginBottom: 9,
        }}>Challenge</div>
        <p style={{
          fontSize: 14, color: 'rgba(0,0,0,0.55)', lineHeight: 1.72,
          letterSpacing: '-0.006em', margin: 0,
        }}>{challenge}</p>
      </div>

      <div style={{ marginBottom: 26 }}>
        <div style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.11em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.26)', marginBottom: 9,
        }}>System</div>
        <p style={{
          fontSize: 14, color: 'rgba(0,0,0,0.55)', lineHeight: 1.72,
          letterSpacing: '-0.006em', margin: 0,
        }}>{system}</p>
      </div>

      <div style={{
        display: 'flex', gap: 10,
        background: 'rgba(34,197,94,0.05)',
        border: '1px solid rgba(34,197,94,0.18)',
        borderRadius: 12, padding: '13px 15px',
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
          <path d="M2 6L5 9L10 3" stroke="#22C55E" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <div style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '0.09em',
            textTransform: 'uppercase', color: '#16A34A', marginBottom: 4,
          }}>Outcome</div>
          <p style={{
            fontSize: 13, fontWeight: 500, color: '#16A34A',
            lineHeight: 1.55, letterSpacing: '-0.005em', margin: 0,
          }}>{outcome}</p>
        </div>
      </div>
    </div>
  )
}

function BlockDivider() {
  return <div style={{ width: '100%', height: 1, background: 'rgba(0,0,0,0.06)' }} />
}

function Window({ title, children }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 16,
      border: '1px solid rgba(0,0,0,0.09)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06), 0 20px 56px rgba(0,0,0,0.06)',
      overflow: 'hidden', flex: 1, minWidth: 0,
    }}>
      <div style={{
        padding: '11px 16px',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        display: 'flex', alignItems: 'center', gap: 10,
        background: '#FAFAFA',
      }}>
        <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(0,0,0,0.11)' }} />
          ))}
        </div>
        <span style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(0,0,0,0.44)', letterSpacing: '-0.005em', flex: 1 }}>
          {title}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E' }}
          />
          <span style={{ fontSize: 9.5, fontWeight: 500, color: '#16A34A' }}>Active</span>
        </div>
      </div>
      <div style={{ padding: '18px 18px 22px' }}>{children}</div>
    </div>
  )
}

// ── System 01: Schilling's English ─────────────────────────────────────────────

const ENROLLMENT_STAGES = [
  { label: 'Inquiry',    color: '#4A7CF7', count: 8  },
  { label: 'Assessment', color: '#F59E0B', count: 5  },
  { label: 'Enrolled',   color: '#8B5CF6', count: 12 },
  { label: 'Active',     color: '#22C55E', count: 47 },
  { label: 'Renewed',    color: '#06B6D4', count: 31 },
]

const SCHOOL_EVENTS = [
  { name: 'Ana Souza',    action: 'enrolled · Basic English',        time: '2 min ago',  color: '#22C55E' },
  { name: 'Carlos Lima',  action: 'assessment scheduled · 3:00 PM',  time: '8 min ago',  color: '#F59E0B' },
  { name: 'Beatriz M.',   action: 'WhatsApp confirmation sent',       time: '14 min ago', color: '#25D366' },
  { name: 'Pedro Rocha',  action: 'renewal reminder triggered',       time: '21 min ago', color: '#06B6D4' },
  { name: 'Lara Campos',  action: 'inquiry received · Level test',    time: '30 min ago', color: '#4A7CF7' },
]

function SchillingsVisual({ inView }) {
  const [evOffset, setEvOffset] = useState(0)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setEvOffset(i => (i + 1) % SCHOOL_EVENTS.length), 2800)
    return () => clearInterval(id)
  }, [inView])

  const visible = [0, 1, 2].map(i => SCHOOL_EVENTS[(evOffset + i) % SCHOOL_EVENTS.length])

  return (
    <Window title="Schilling's English · Enrollment Operations">
      {/* Metrics */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {[['47', 'Active Students'], ['12', 'Enrolling Now'], ['6', 'Starting This Week']].map(([v, l]) => (
          <div key={l} style={{
            flex: 1, padding: '11px 12px',
            background: '#F8F8F8', borderRadius: 10,
            border: '1px solid rgba(0,0,0,0.06)',
          }}>
            <div style={{
              fontSize: 20, fontWeight: 700, color: '#0A0A0A',
              letterSpacing: '-0.04em', marginBottom: 2,
              fontFamily: "'SF Mono','Fira Code',monospace",
            }}>{v}</div>
            <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.38)', letterSpacing: '-0.003em' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Pipeline */}
      <div style={{ marginBottom: 18 }}>
        <div style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', marginBottom: 10,
        }}>Enrollment Pipeline</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {ENROLLMENT_STAGES.map(s => (
            <div key={s.label} style={{
              flex: 1, padding: '9px 10px',
              background: s.color + '0D', border: `1px solid ${s.color}22`,
              borderRadius: 9,
            }}>
              <div style={{
                fontSize: 16, fontWeight: 700, color: s.color, marginBottom: 2,
                fontFamily: "'SF Mono','Fira Code',monospace",
              }}>{s.count}</div>
              <div style={{ fontSize: 9.5, color: 'rgba(0,0,0,0.44)', lineHeight: 1.3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div>
        <div style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', marginBottom: 10,
        }}>Recent Activity</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={evOffset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26 }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {visible.map((ev, i) => (
              <div key={ev.name + i} style={{
                display: 'flex', alignItems: 'center', gap: 9,
                padding: '8px 0',
                borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.045)' : 'none',
                opacity: 1 - i * 0.28,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: ev.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(0,0,0,0.72)', letterSpacing: '-0.007em', flexShrink: 0 }}>
                  {ev.name}
                </span>
                <span style={{
                  fontSize: 11.5, color: 'rgba(0,0,0,0.42)', letterSpacing: '-0.005em',
                  flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{ev.action}</span>
                <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.26)', flexShrink: 0 }}>{ev.time}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Window>
  )
}

// ── System 02: WhatsApp Lead Engine ────────────────────────────────────────────

const LEAD_DATA = [
  { name: 'Rodrigo Alves',   source: 'WhatsApp',  stage: 'Qualified',  stageColor: '#22C55E', score: 91, time: 'just now'   },
  { name: 'Marina Ferreira', source: 'Web Form',   stage: 'Routed',     stageColor: '#8B5CF6', score: 87, time: '4 min ago'  },
  { name: 'Thiago Costa',    source: 'Instagram',  stage: 'Contacted',  stageColor: '#06B6D4', score: 74, time: '11 min ago' },
  { name: 'Lara Mendes',     source: 'WhatsApp',   stage: 'Scheduled',  stageColor: '#F59E0B', score: 68, time: '18 min ago' },
]

function LeadEngineProVisual({ inView }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setActive(i => (i + 1) % LEAD_DATA.length), 2400)
    return () => clearInterval(id)
  }, [inView])

  const lead = LEAD_DATA[active]

  return (
    <Window title="WhatsApp Lead Engine · Processing">
      {/* Active qualification */}
      <div style={{ marginBottom: 18 }}>
        <div style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', marginBottom: 10,
        }}>Active Qualification</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: lead.stageColor + '08',
              border: `1px solid ${lead.stageColor}28`,
              borderRadius: 12, padding: '14px 16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div style={{
                  fontSize: 13.5, fontWeight: 600, color: 'rgba(0,0,0,0.78)',
                  letterSpacing: '-0.01em', marginBottom: 3,
                }}>{lead.name}</div>
                <div style={{ fontSize: 10.5, color: 'rgba(0,0,0,0.4)' }}>via {lead.source}</div>
              </div>
              <span style={{
                fontSize: 10.5, fontWeight: 600, color: lead.stageColor,
                background: lead.stageColor + '12', border: `1px solid ${lead.stageColor}28`,
                borderRadius: 8, padding: '4px 10px',
              }}>{lead.stage}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 20px' }}>
              {[['Score', `${lead.score} / 100`], ['Intent', 'High'], ['Budget', 'Confirmed']].map(([k, v]) => (
                <div key={k}>
                  <div style={{
                    fontSize: 9, fontWeight: 600, letterSpacing: '0.07em',
                    textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', marginBottom: 4,
                  }}>{k}</div>
                  <div style={{
                    fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.74)',
                    letterSpacing: '-0.01em', fontFamily: "'SF Mono','Fira Code',monospace",
                  }}>{v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lead list */}
      <div style={{ marginBottom: 16 }}>
        <div style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', marginBottom: 10,
        }}>Lead Pipeline</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {LEAD_DATA.map((l, i) => (
            <div key={l.name} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 0',
              borderBottom: i < LEAD_DATA.length - 1 ? '1px solid rgba(0,0,0,0.045)' : 'none',
              background: i === active ? l.stageColor + '04' : 'transparent',
              transition: 'background 0.3s',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: l.stageColor, flexShrink: 0 }} />
              <span style={{
                fontSize: 12, fontWeight: i === active ? 600 : 500,
                color: 'rgba(0,0,0,0.72)', letterSpacing: '-0.007em', flex: 1,
              }}>{l.name}</span>
              <span style={{
                fontSize: 10, fontWeight: 500, color: l.stageColor,
                background: l.stageColor + '12', borderRadius: 6, padding: '2px 8px', whiteSpace: 'nowrap',
              }}>{l.stage}</span>
              <span style={{ fontSize: 9.5, color: 'rgba(0,0,0,0.28)', flexShrink: 0 }}>{l.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 14 }}>
        {[['14', 'Captured today'], ['11', 'Qualified'], ['8', 'Meetings booked']].map(([v, l], i) => (
          <div key={l} style={{
            flex: 1, textAlign: 'center',
            borderRight: i < 2 ? '1px solid rgba(0,0,0,0.07)' : 'none',
          }}>
            <div style={{
              fontSize: 18, fontWeight: 700, color: '#0A0A0A',
              letterSpacing: '-0.03em', fontFamily: "'SF Mono','Fira Code',monospace",
            }}>{v}</div>
            <div style={{ fontSize: 9.5, color: 'rgba(0,0,0,0.38)', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </Window>
  )
}

// ── System 03: Operational Infrastructure ─────────────────────────────────────

const INFRA_SYSTEMS = [
  { label: 'CRM',             color: '#8B5CF6', stat: '142 events today' },
  { label: 'Database',        color: '#4A7CF7', stat: '893 records active' },
  { label: 'Calendar',        color: '#EF4444', stat: '28 scheduled' },
  { label: 'Notifications',   color: '#F59E0B', stat: '67 sent today' },
  { label: 'Workflow Engine',  color: '#06B6D4', stat: '54 executions' },
]

const INFRA_EVENTS = [
  { from: 'CRM',            to: 'Calendar',      text: 'Meeting created after lead qualification',  color: '#8B5CF6' },
  { from: 'Database',       to: 'CRM',           text: 'Contact record synced on inquiry',          color: '#4A7CF7' },
  { from: 'Calendar',       to: 'Notifications', text: 'Confirmation dispatched to client',         color: '#EF4444' },
  { from: 'Workflow Engine', to: 'Database',     text: 'Operation result logged on completion',     color: '#06B6D4' },
  { from: 'CRM',            to: 'Notifications', text: 'Alert triggered by deal stage update',      color: '#8B5CF6' },
]

function InfrastructureVisual({ inView }) {
  const [evIdx, setEvIdx] = useState(0)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setEvIdx(i => (i + 1) % INFRA_EVENTS.length), 2200)
    return () => clearInterval(id)
  }, [inView])

  const visibleEvents = [0, 1, 2].map(o => INFRA_EVENTS[(evIdx + o) % INFRA_EVENTS.length])

  return (
    <Window title="Operational Runtime · All Systems Nominal">
      {/* System status */}
      <div style={{ marginBottom: 18 }}>
        <div style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', marginBottom: 10,
        }}>Connected Systems</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {INFRA_SYSTEMS.map((s, i) => (
            <div key={s.label} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 0',
              borderBottom: i < INFRA_SYSTEMS.length - 1 ? '1px solid rgba(0,0,0,0.045)' : 'none',
            }}>
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8 + i * 0.22, repeat: Infinity }}
                style={{ width: 7, height: 7, borderRadius: '50%', background: s.color, flexShrink: 0 }}
              />
              <span style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(0,0,0,0.7)', flex: 1, letterSpacing: '-0.007em' }}>
                {s.label}
              </span>
              <span style={{
                fontSize: 10.5, fontWeight: 500, color: '#16A34A',
                background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.16)',
                borderRadius: 6, padding: '2px 8px', flexShrink: 0,
              }}>Active</span>
              <span style={{ fontSize: 10.5, color: 'rgba(0,0,0,0.36)', flexShrink: 0, minWidth: 110, textAlign: 'right' }}>
                {s.stat}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Coordination log */}
      <div>
        <div style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', marginBottom: 10,
        }}>Recent Coordination</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={evIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26 }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {visibleEvents.map((ev, i) => (
              <div key={ev.from + ev.to + i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 9,
                padding: '8px 0',
                borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                opacity: 1 - i * 0.3,
              }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: ev.color, flexShrink: 0, marginTop: 4 }} />
                <div>
                  <span style={{ fontSize: 9.5, color: 'rgba(0,0,0,0.33)', marginBottom: 2, display: 'block', letterSpacing: '0.02em' }}>
                    {ev.from} → {ev.to}
                  </span>
                  <span style={{
                    fontSize: 12, letterSpacing: '-0.007em',
                    fontWeight: i === 0 ? 500 : 400,
                    color: i === 0 ? 'rgba(0,0,0,0.62)' : 'rgba(0,0,0,0.38)',
                  }}>{ev.text}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Window>
  )
}

// ── Block wrappers ─────────────────────────────────────────────────────────────

function SchillingsBlock() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  return (
    <div ref={ref} style={{ padding: '88px 0', display: 'flex', alignItems: 'flex-start', gap: 80 }}>
      <motion.div
        style={{ flex: 1, minWidth: 0 }}
        initial={{ opacity: 0, x: -18 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
      >
        <SchillingsVisual inView={inView} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.52, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ paddingTop: 8 }}
      >
        <ContentSide
          num="Production 01"
          client="Schilling's English"
          challenge="Student enrollment, follow-up and communication were fragmented across forms, spreadsheets and manual processes."
          system="Operational runtime connecting intake, enrollment, WhatsApp messaging and student lifecycle workflows into a single coordinated layer."
          outcome="Enrollment operations coordinated through a single workflow."
        />
      </motion.div>
    </div>
  )
}

function LeadEngineBlock() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  return (
    <div ref={ref} style={{ padding: '88px 0', display: 'flex', alignItems: 'flex-start', gap: 80 }}>
      <motion.div
        initial={{ opacity: 0, x: -18 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        style={{ paddingTop: 8 }}
      >
        <ContentSide
          num="Production 02"
          client="WhatsApp Lead Engine"
          challenge="Leads arriving from multiple channels without qualification or structured follow-up processes."
          system="Lead capture, qualification, routing and scheduling workflow that handles incoming leads from multiple sources into a structured pipeline."
          outcome="Lead handling standardized and automated from first contact to booked meeting."
        />
      </motion.div>
      <motion.div
        style={{ flex: 1, minWidth: 0 }}
        initial={{ opacity: 0, x: 18 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.52, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <LeadEngineProVisual inView={inView} />
      </motion.div>
    </div>
  )
}

function InfrastructureBlock() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  return (
    <div ref={ref} style={{ padding: '88px 0', display: 'flex', alignItems: 'flex-start', gap: 80 }}>
      <motion.div
        style={{ flex: 1, minWidth: 0 }}
        initial={{ opacity: 0, x: -18 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
      >
        <InfrastructureVisual inView={inView} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.52, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ paddingTop: 8 }}
      >
        <ContentSide
          num="Production 03"
          client="Operational Infrastructure"
          challenge="Business information spread across disconnected systems with no coordination layer between them."
          system="Central operational layer coordinating data, events and business actions across CRM, database, calendar and notification systems."
          outcome="Disconnected systems operating as a single coordinated environment."
        />
      </motion.div>
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────────

export default function ProductionSection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 })

  return (
    <section style={{
      background: '#FFFFFF', width: '100%',
      padding: '100px 40px 112px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', marginBottom: 72, maxWidth: 560 }}
      >
        <div style={{
          fontSize: 9.5, fontWeight: 700, letterSpacing: '0.13em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.26)', marginBottom: 14,
        }}>
          In Production
        </div>
        <div style={{
          fontSize: 42, fontWeight: 700, color: '#0A0A0A',
          letterSpacing: '-0.035em', lineHeight: 1.06, marginBottom: 16,
        }}>
          Systems In Production
        </div>
        <div style={{
          fontSize: 15.5, color: 'rgba(0,0,0,0.42)', lineHeight: 1.62,
          letterSpacing: '-0.008em', maxWidth: 460, margin: '0 auto',
        }}>
          Examples of operational systems designed and deployed to support real business workflows.
        </div>
      </motion.div>

      <div style={{ width: '100%', maxWidth: MAX_W }}>
        <SchillingsBlock />
        <BlockDivider />
        <LeadEngineBlock />
        <BlockDivider />
        <InfrastructureBlock />
      </div>
    </section>
  )
}
