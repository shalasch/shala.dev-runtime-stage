import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const MAX_W = 1080

// ── Shared ─────────────────────────────────────────────────────────────────────

function BlockCopy({ eyebrow, title, description, outcome }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexShrink: 0, width: 340 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(0,0,0,0.2)' }} />
        <span style={{
          fontSize: 9.5, fontWeight: 700, letterSpacing: '0.13em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.32)',
        }}>{eyebrow}</span>
      </div>
      <div style={{
        fontSize: 36, fontWeight: 700, letterSpacing: '-0.034em',
        lineHeight: 1.07, color: '#0A0A0A', marginBottom: 16,
        whiteSpace: 'pre-line',
      }}>{title}</div>
      <div style={{
        fontSize: 14.5, color: 'rgba(0,0,0,0.44)', lineHeight: 1.68,
        letterSpacing: '-0.005em', marginBottom: 28,
      }}>{description}</div>
      <div style={{
        alignSelf: 'flex-start',
        display: 'flex', alignItems: 'center', gap: 7,
        background: 'rgba(34,197,94,0.07)',
        border: '1px solid rgba(34,197,94,0.20)',
        borderRadius: 20, padding: '7px 14px',
      }}>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M2 6L5 9L10 3" stroke="#22C55E" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontSize: 12, fontWeight: 500, color: '#16A34A', letterSpacing: '-0.005em' }}>
          {outcome}
        </span>
      </div>
    </div>
  )
}

function BlockDivider() {
  return <div style={{ width: '100%', height: 1, background: 'rgba(0,0,0,0.06)' }} />
}

// ── Block 1: Lead Engine ───────────────────────────────────────────────────────

const LEAD_STAGES = [
  { id: 'capture', label: 'Lead Captured', color: '#4A7CF7',
    rows: [['Name', 'Juliana Costa'], ['Source', 'WhatsApp'], ['Received', '09:14 AM']] },
  { id: 'qualify', label: 'Qualified',     color: '#F59E0B',
    rows: [['Score', '94 / 100'], ['Intent', 'High'], ['Budget', 'Confirmed']] },
  { id: 'route',   label: 'Routed',        color: '#8B5CF6',
    rows: [['Agent', 'R. Mendes'], ['Region', 'SP Sul'], ['Priority', 'High']] },
  { id: 'contact', label: 'Contacted',     color: '#06B6D4',
    rows: [['Channels', 'WA + Email'], ['Sent', '09:16 AM'], ['Status', 'Delivered']] },
  { id: 'booked',  label: 'Meeting Set',   color: '#22C55E',
    rows: [['Date', 'Thu Jun 19'], ['Time', '2:00 PM'], ['Type', 'Video Call']] },
]

const LEAD_QUEUE = [
  { name: 'Juliana Costa',    stage: 'Meeting Set',   stageColor: '#22C55E', time: '2 min ago' },
  { name: 'Pedro Nakamura',   stage: 'Contacted',     stageColor: '#06B6D4', time: '8 min ago' },
  { name: 'Camila Rodrigues', stage: 'Routed',        stageColor: '#8B5CF6', time: '15 min ago' },
  { name: 'Diego Santos',     stage: 'Lead Captured', stageColor: '#4A7CF7', time: '32 min ago' },
]

function LeadEngineVisual({ inView }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView) return
    let i = 0
    const id = setInterval(() => {
      i = (i + 1) % LEAD_STAGES.length
      setActive(i)
    }, 2200)
    return () => clearInterval(id)
  }, [inView])

  const stage = LEAD_STAGES[active]
  const trackFill = active === 0 ? 0 : (active / (LEAD_STAGES.length - 1)) * 100

  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Pipeline progress */}
      <div style={{
        background: '#fff', borderRadius: 14,
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)',
        padding: '24px 24px 20px',
      }}>
        <div style={{ display: 'flex', position: 'relative' }}>
          {/* Base track */}
          <div style={{
            position: 'absolute', top: 15, left: '10%', right: '10%', height: 1,
            background: 'rgba(0,0,0,0.07)',
          }} />
          {/* Filled track */}
          <motion.div
            style={{ position: 'absolute', top: 15, left: '10%', height: 1, background: stage.color, originX: 0 }}
            animate={{ width: `${trackFill * 0.8}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {LEAD_STAGES.map((s, i) => (
            <div key={s.id} style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 8, position: 'relative', zIndex: 1,
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: i < active ? s.color : i === active ? s.color + '15' : '#fff',
                border: `1.5px solid ${i <= active ? s.color : 'rgba(0,0,0,0.1)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.35s, border-color 0.35s',
              }}>
                {i < active ? (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#fff" strokeWidth="2.2"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : i === active ? (
                  <motion.div
                    animate={{ scale: [1, 1.35, 1] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }}
                  />
                ) : (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,0.15)' }} />
                )}
              </div>
              <span style={{
                fontSize: 10, fontWeight: i === active ? 600 : 500,
                color: i === active ? s.color : i < active ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.28)',
                letterSpacing: '-0.005em', textAlign: 'center', lineHeight: 1.3,
                transition: 'color 0.3s',
              }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Active stage data */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10, scale: 0.987 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.987 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: '#fff', borderRadius: 16,
            border: `1px solid ${stage.color}26`,
            boxShadow: `0 0 0 4px ${stage.color}06, 0 4px 24px rgba(0,0,0,0.07)`,
            padding: '22px 26px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.3, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: stage.color }}
            />
            <span style={{
              fontSize: 10.5, fontWeight: 700, letterSpacing: '0.09em',
              textTransform: 'uppercase', color: stage.color,
            }}>
              {stage.label}
            </span>
            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.28)', marginLeft: 'auto' }}>
              Step {active + 1} of {LEAD_STAGES.length}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 28px' }}>
            {stage.rows.map(([key, val]) => (
              <div key={key}>
                <div style={{
                  fontSize: 9.5, fontWeight: 600, letterSpacing: '0.07em',
                  textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', marginBottom: 5,
                }}>
                  {key}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.76)', letterSpacing: '-0.012em' }}>
                  {val}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Lead queue */}
      <div style={{
        background: '#fff', borderRadius: 14,
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '11px 18px', borderBottom: '1px solid rgba(0,0,0,0.055)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)' }}>
            Active Pipeline
          </span>
          <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.28)' }}>{LEAD_QUEUE.length} leads</span>
        </div>
        {LEAD_QUEUE.map((lead, i) => (
          <div key={lead.name} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 18px',
            borderBottom: i < LEAD_QUEUE.length - 1 ? '1px solid rgba(0,0,0,0.045)' : 'none',
            background: i === 0 ? 'rgba(34,197,94,0.025)' : 'transparent',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: lead.stageColor, flexShrink: 0 }} />
            <span style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(0,0,0,0.7)', flex: 1, letterSpacing: '-0.007em' }}>
              {lead.name}
            </span>
            <span style={{
              fontSize: 10.5, fontWeight: 500, color: lead.stageColor,
              background: lead.stageColor + '12', borderRadius: 7,
              padding: '2px 8px', letterSpacing: '-0.005em', whiteSpace: 'nowrap',
            }}>
              {lead.stage}
            </span>
            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.28)', flexShrink: 0 }}>{lead.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LeadEngineBlock() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <div ref={ref} style={{ padding: '88px 0', display: 'flex', alignItems: 'flex-start', gap: 80 }}>
      <motion.div
        initial={{ opacity: 0, x: -18 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        style={{ paddingTop: 8 }}
      >
        <BlockCopy
          eyebrow="System 01"
          title={"Lead\nEngine"}
          description="Captures, qualifies and routes opportunities without manual follow-up."
          outcome="Lead → Qualified → Scheduled"
        />
      </motion.div>
      <motion.div
        style={{ flex: 1, minWidth: 0 }}
        initial={{ opacity: 0, x: 18 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.52, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <LeadEngineVisual inView={inView} />
      </motion.div>
    </div>
  )
}

// ── Block 2: Client Intake Runtime ────────────────────────────────────────────

const INTAKE_STEPS = [
  {
    id: 'inquiry', label: 'Customer Inquiry', color: '#4A7CF7',
    content: {
      type: 'message',
      sender: 'Marcos Oliveira',
      time: '14:32',
      text: "Hi, I'm looking for a 2-bedroom apartment in Vila Madalena, up to R$4,500/month. Available for a visit this week?",
    },
  },
  {
    id: 'qualify', label: 'Qualification', color: '#F59E0B',
    content: {
      type: 'extraction',
      fields: [
        ['Property type', '2-bedroom apt.'],
        ['Location',      'Vila Madalena'],
        ['Budget',        'Up to R$4.500'],
        ['Timeframe',     'This week'],
        ['Intent',        'High'],
        ['Status',        'Qualified'],
      ],
    },
  },
  {
    id: 'booked', label: 'Appointment Booked', color: '#22C55E',
    content: {
      type: 'appointment',
      name:     'Marcos Oliveira',
      property: 'Rua Harmonia, 220 — Apto 42',
      date:     'Wednesday, Jun 18',
      time:     '10:30 AM',
      agent:    'Rafael Mendes',
    },
  },
]

function IntakeFlowVisual({ inView }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView) return
    let i = 0
    const id = setInterval(() => {
      i = (i + 1) % INTAKE_STEPS.length
      setActive(i)
    }, 2800)
    return () => clearInterval(id)
  }, [inView])

  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
      {INTAKE_STEPS.map((step, i) => {
        const isActive = active === i
        const isPast   = i < active
        return (
          <div key={step.id}>
            <div style={{
              background: '#fff', borderRadius: 14,
              border: `1px solid ${isActive ? step.color + '35' : isPast ? 'rgba(34,197,94,0.20)' : 'rgba(0,0,0,0.08)'}`,
              boxShadow: isActive
                ? `0 0 0 4px ${step.color}06, 0 4px 20px rgba(0,0,0,0.07)`
                : '0 1px 4px rgba(0,0,0,0.04)',
              padding: '18px 20px',
              transition: 'border-color 0.3s, box-shadow 0.3s',
            }}>
              {/* Step header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: isActive ? step.color + '18' : isPast ? 'rgba(34,197,94,0.12)' : 'rgba(0,0,0,0.04)',
                  border: `1.5px solid ${isActive ? step.color + '50' : isPast ? 'rgba(34,197,94,0.30)' : 'rgba(0,0,0,0.1)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.3s, border-color 0.3s', flexShrink: 0,
                }}>
                  {isPast ? (
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="#22C55E" strokeWidth="2.2"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : isActive ? (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.1, repeat: Infinity }}
                      style={{ width: 7, height: 7, borderRadius: '50%', background: step.color }}
                    />
                  ) : (
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(0,0,0,0.15)' }} />
                  )}
                </div>
                <span style={{
                  fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: isActive ? step.color : isPast ? '#16A34A' : 'rgba(0,0,0,0.32)',
                  transition: 'color 0.3s',
                }}>
                  {step.label}
                </span>
              </div>

              {/* Content */}
              <div style={{ opacity: isActive || isPast ? 1 : 0.35, transition: 'opacity 0.3s' }}>
                {step.content.type === 'message' && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(0,0,0,0.72)', letterSpacing: '-0.007em' }}>
                        {step.content.sender}
                      </span>
                      <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.3)' }}>{step.content.time}</span>
                    </div>
                    <p style={{ fontSize: 12.5, color: 'rgba(0,0,0,0.55)', lineHeight: 1.6, letterSpacing: '-0.005em', margin: 0 }}>
                      {step.content.text}
                    </p>
                  </div>
                )}

                {step.content.type === 'extraction' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px' }}>
                    {step.content.fields.map(([k, v]) => (
                      <div key={k}>
                        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', marginBottom: 3 }}>
                          {k}
                        </div>
                        <div style={{
                          fontSize: 12.5, fontWeight: 600, letterSpacing: '-0.01em',
                          color: k === 'Status' ? '#22C55E' : 'rgba(0,0,0,0.72)',
                        }}>
                          {v}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {step.content.type === 'appointment' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.76)', letterSpacing: '-0.01em' }}>
                        {step.content.name}
                      </span>
                      <span style={{
                        fontSize: 10.5, fontWeight: 600, color: '#16A34A',
                        background: 'rgba(34,197,94,0.1)', borderRadius: 8, padding: '3px 9px',
                      }}>
                        Confirmed
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.48)', letterSpacing: '-0.005em' }}>
                      {step.content.property}
                    </div>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center', paddingTop: 2 }}>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(0,0,0,0.65)', letterSpacing: '-0.008em' }}>
                        {step.content.date}
                      </span>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: '#22C55E', letterSpacing: '-0.008em' }}>
                        {step.content.time}
                      </span>
                    </div>
                    <div style={{ fontSize: 11.5, color: 'rgba(0,0,0,0.38)', letterSpacing: '-0.005em' }}>
                      Agent: {step.content.agent}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Connector arrow */}
            {i < INTAKE_STEPS.length - 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 28 }}>
                <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                  <path
                    d="M6 1L6 12M6 12L2 8M6 12L10 8"
                    stroke={isPast ? '#22C55E' : 'rgba(0,0,0,0.14)'}
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transition: 'stroke 0.3s' }}
                  />
                </svg>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function ClientIntakeBlock() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <div ref={ref} style={{ padding: '88px 0', display: 'flex', alignItems: 'flex-start', gap: 80 }}>
      <motion.div
        style={{ flex: 1, minWidth: 0 }}
        initial={{ opacity: 0, x: -18 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.52, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <IntakeFlowVisual inView={inView} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        style={{ paddingTop: 8 }}
      >
        <BlockCopy
          eyebrow="System 02"
          title={"Client Intake\nRuntime"}
          description="Receives inquiries, qualifies prospects and schedules appointments automatically."
          outcome="Inquiry → Qualified → Booked"
        />
      </motion.div>
    </div>
  )
}

// ── Block 3: Operational Runtime ───────────────────────────────────────────────

const OPS_SYSTEMS = [
  { id: 'db',    label: 'Database',      badge: 'DB', color: '#4A7CF7',
    events: ['Record created · Juliana C.', 'Contact stored · 09:14', 'Data synced · 12 fields'] },
  { id: 'crm',   label: 'CRM',           badge: 'CR', color: '#8B5CF6',
    events: ['Contact synced · Pedro N.', 'Stage updated · Qualified', 'Deal created · Jun 18'] },
  { id: 'cal',   label: 'Calendar',      badge: 'GC', color: '#EF4444',
    events: ['Meeting booked · Jun 19', 'Slot confirmed · 2:00 PM', 'Reminder queued · 1h before'] },
  { id: 'notif', label: 'Notifications', badge: 'NT', color: '#F59E0B',
    events: ['Confirmation sent · Marcos', 'Alert dispatched · Agent', 'Follow-up queued · +24h'] },
]

const COORD_EVENTS = [
  { from: 'Database',      to: 'CRM',           text: 'New contact record synced to CRM',     color: '#4A7CF7' },
  { from: 'CRM',           to: 'Calendar',      text: 'Meeting scheduled after stage update', color: '#8B5CF6' },
  { from: 'Calendar',      to: 'Notifications', text: 'Confirmation dispatched to client',    color: '#EF4444' },
  { from: 'Notifications', to: 'Database',      text: 'Interaction logged to contact record', color: '#F59E0B' },
  { from: 'Database',      to: 'Calendar',      text: 'Appointment created from open record', color: '#4A7CF7' },
  { from: 'CRM',           to: 'Notifications', text: 'Alert triggered by deal stage update', color: '#8B5CF6' },
]

function SystemCard({ sys, idx, inView }) {
  const [eventIdx, setEventIdx] = useState(0)
  const interval = useRef(1700 + idx * 220)
  const pulseDuration = useRef(1.6 + idx * 0.2)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => {
      setEventIdx(i => (i + 1) % sys.events.length)
    }, interval.current)
    return () => clearInterval(id)
  }, [inView, sys.events.length])

  return (
    <div style={{
      background: '#fff', borderRadius: 12,
      border: '1px solid rgba(0,0,0,0.08)',
      boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 4px 14px rgba(0,0,0,0.04)',
      padding: '16px 18px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
        <div style={{
          width: 26, height: 26, borderRadius: 8,
          background: sys.color + '14', border: `1px solid ${sys.color}28`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{
            fontSize: 8, fontWeight: 700, color: sys.color,
            fontFamily: "'SF Mono','Fira Code',monospace",
          }}>{sys.badge}</span>
        </div>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(0,0,0,0.7)', letterSpacing: '-0.008em', flex: 1 }}>
          {sys.label}
        </span>
        <motion.div
          animate={{ opacity: [1, 0.25, 1] }}
          transition={{ duration: pulseDuration.current, repeat: Infinity }}
          style={{ width: 6, height: 6, borderRadius: '50%', background: sys.color }}
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={eventIdx}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22 }}
          style={{ fontSize: 11.5, color: 'rgba(0,0,0,0.42)', letterSpacing: '-0.005em' }}
        >
          {sys.events[eventIdx]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function CoordFeed({ inView }) {
  const [log, setLog] = useState([])

  useEffect(() => {
    if (!inView) return
    let i = 0
    const push = () => {
      const ev = { ...COORD_EVENTS[i % COORD_EVENTS.length], id: `${i}-${Date.now()}` }
      setLog(prev => [ev, ...prev].slice(0, 5))
      i++
    }
    push()
    const id = setInterval(push, 2200)
    return () => clearInterval(id)
  }, [inView])

  return (
    <div style={{
      background: '#fff', borderRadius: 14,
      border: '1px solid rgba(0,0,0,0.08)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05), 0 12px 32px rgba(0,0,0,0.05)',
      padding: '18px 20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)' }}>
          Coordination Log
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <motion.div
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E' }}
          />
          <span style={{ fontSize: 10, fontWeight: 500, color: '#16A34A' }}>Live</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <AnimatePresence initial={false}>
          {log.map((ev, idx) => (
            <motion.div
              key={ev.id}
              layout
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1 - idx * 0.16, height: 50, marginBottom: 6 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{
                layout: { duration: 0.24 }, opacity: { duration: 0.24 },
                height: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
              }}
              style={{
                background: idx === 0 ? ev.color + '07' : 'transparent',
                border: `1px solid ${idx === 0 ? ev.color + '1E' : 'rgba(0,0,0,0.04)'}`,
                borderRadius: 10, padding: '8px 12px', overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: ev.color, flexShrink: 0 }} />
                <span style={{ fontSize: 9.5, color: 'rgba(0,0,0,0.35)', letterSpacing: '0.02em' }}>
                  {ev.from} → {ev.to}
                </span>
              </div>
              <div style={{
                fontSize: 12, letterSpacing: '-0.007em',
                fontWeight: idx === 0 ? 500 : 400,
                color: idx === 0 ? 'rgba(0,0,0,0.65)' : 'rgba(0,0,0,0.38)',
              }}>
                {ev.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function OperationalRuntimeBlock() {
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
        <BlockCopy
          eyebrow="System 03"
          title={"Operational\nRuntime"}
          description="Connects business systems into a single operational workflow."
          outcome="Disconnected → Coordinated"
        />
      </motion.div>
      <motion.div
        style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14 }}
        initial={{ opacity: 0, x: 18 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.52, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {OPS_SYSTEMS.map((sys, i) => (
            <SystemCard key={sys.id} sys={sys} idx={i} inView={inView} />
          ))}
        </div>
        <CoordFeed inView={inView} />
      </motion.div>
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────────

export default function SystemsSection() {
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
          What's Built
        </div>
        <div style={{
          fontSize: 42, fontWeight: 700, color: '#0A0A0A',
          letterSpacing: '-0.035em', lineHeight: 1.06, marginBottom: 16,
        }}>
          Real Operational Systems
        </div>
        <div style={{
          fontSize: 15.5, color: 'rgba(0,0,0,0.42)', lineHeight: 1.62,
          letterSpacing: '-0.008em', maxWidth: 460, margin: '0 auto',
        }}>
          Designed to remove manual work, connect operations and move business processes forward.
        </div>
      </motion.div>

      <div style={{ width: '100%', maxWidth: MAX_W }}>
        <LeadEngineBlock />
        <BlockDivider />
        <ClientIntakeBlock />
        <BlockDivider />
        <OperationalRuntimeBlock />
      </div>
    </section>
  )
}
