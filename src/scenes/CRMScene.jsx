import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CRMScene() {
  const [stage, setStage]     = useState('new')
  const [agent, setAgent]     = useState(null)
  const [next, setNext]       = useState(null)
  const [activities, setActs] = useState([
    { id: 1, text: 'Lead received via WhatsApp', time: 'Just now', color: '#25D366' },
  ])

  useEffect(() => {
    const t = []

    t.push(setTimeout(() => setActs(a => [...a, {
      id: 2, text: 'AI qualification complete · Score: 94', time: '1s ago', color: '#4A7CF7',
    }]), 900))

    t.push(setTimeout(() => {
      setStage('qualified')
      setActs(a => [...a, {
        id: 3, text: 'Lead qualified · Barra da Tijuca · 3-bed', time: '2s ago', color: '#22C55E',
      }])
    }, 1900))

    t.push(setTimeout(() => {
      setAgent('Mariana Oliveira')
      setActs(a => [...a, {
        id: 4, text: 'Agent assigned: Mariana Oliveira', time: '3s ago', color: '#22C55E',
      }])
    }, 3000))

    t.push(setTimeout(() => {
      setNext('Schedule visit · Barra da Tijuca')
      setActs(a => [...a, {
        id: 5, text: 'Follow-up sent via WhatsApp · 3:00 PM', time: '4s ago', color: '#22C55E',
      }])
    }, 4100))

    t.push(setTimeout(() => {
      setActs(a => [...a, {
        id: 6, text: 'Property suggestions sent · 3 listings', time: '5s ago', color: '#22C55E',
      }])
    }, 5400))

    return () => t.forEach(clearTimeout)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.26, delay: 0.16 }}
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {/* Header */}
      <div style={{
        padding: '14px 20px 13px',
        borderBottom: '1px solid rgba(0,0,0,0.055)',
        display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'linear-gradient(135deg, #1c1c1c 0%, #3a3a3a 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 600, color: '#fff', flexShrink: 0,
          letterSpacing: '-0.01em',
        }}>
          JC
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#0A0A0A', letterSpacing: '-0.02em' }}>
              Juliana Costa
            </span>
            <StageBadge stage={stage} />
          </div>
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.36)', marginTop: 2 }}>
            WhatsApp · +55 21 97··· · Barra da Tijuca
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#0A0A0A', letterSpacing: '-0.03em', lineHeight: 1 }}>94</div>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', marginTop: 2 }}>
            AI Score
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left panel */}
        <div style={{
          width: 240, flexShrink: 0,
          borderRight: '1px solid rgba(0,0,0,0.052)',
          padding: '15px 17px',
          display: 'flex', flexDirection: 'column', gap: 14,
          overflowY: 'auto',
        }}>
          <Label>Lead Details</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <Field label="Interest">3-bedroom apt.</Field>
            <Field label="Budget">R$850,000</Field>
            <Field label="Region">Barra da Tijuca</Field>
            <Field label="Timeline">
              <span style={{ color: '#D97706', fontWeight: 600 }}>This month</span>
            </Field>
            <Field label="Priority">
              <span style={{ color: '#D97706', fontWeight: 600 }}>High</span>
            </Field>
            <Field label="Source">
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#25D366' }} />
                WhatsApp
              </span>
            </Field>
            <Field label="Agent">
              <Live value={agent} placeholder="Assigning..." />
            </Field>
            <Field label="Next">
              <LiveGreen value={next} placeholder="Processing..." />
            </Field>
          </div>
        </div>

        {/* Right panel — activity */}
        <div style={{
          flex: 1, padding: '15px 18px',
          display: 'flex', flexDirection: 'column', gap: 12,
          overflowY: 'auto',
        }}>
          <Label>Activity</Label>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <AnimatePresence>
              {activities.map((a, i) => (
                <ActivityRow key={a.id} {...a} isLast={i === activities.length - 1} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function StageBadge({ stage }) {
  return (
    <motion.span
      key={stage}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        padding: '2px 8px', borderRadius: 20,
        fontSize: 10, fontWeight: 600,
        background: stage === 'qualified' ? 'rgba(34,197,94,0.09)' : 'rgba(245,158,11,0.09)',
        border: `1px solid ${stage === 'qualified' ? 'rgba(34,197,94,0.22)' : 'rgba(245,158,11,0.24)'}`,
        color: stage === 'qualified' ? '#16A34A' : '#D97706',
      }}
    >
      {stage === 'qualified' ? '● Qualified' : '○ New Lead'}
    </motion.span>
  )
}

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 18 }}>
      <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.33)', fontWeight: 400, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(0,0,0,0.65)', textAlign: 'right', maxWidth: 130 }}>
        {children}
      </span>
    </div>
  )
}

function Live({ value, placeholder }) {
  return (
    <AnimatePresence mode="wait">
      {value ? (
        <motion.span key="v" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ fontWeight: 500, color: '#0A0A0A' }}>
          {value}
        </motion.span>
      ) : (
        <motion.span key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ color: 'rgba(0,0,0,0.26)', fontStyle: 'italic' }}>
          {placeholder}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

function LiveGreen({ value, placeholder }) {
  return (
    <AnimatePresence mode="wait">
      {value ? (
        <motion.span key="v" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ fontWeight: 500, color: '#16A34A' }}>
          {value}
        </motion.span>
      ) : (
        <motion.span key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ color: 'rgba(0,0,0,0.26)', fontStyle: 'italic' }}>
          {placeholder}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

function ActivityRow({ text, time, color, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex', gap: 10,
        paddingBottom: isLast ? 0 : 13,
        position: 'relative',
      }}
    >
      {!isLast && (
        <div style={{
          position: 'absolute', left: 5, top: 12, bottom: 0,
          width: 1, background: 'rgba(0,0,0,0.065)',
        }} />
      )}
      <div style={{
        width: 11, height: 11, borderRadius: '50%',
        background: color, flexShrink: 0, marginTop: 1,
        boxShadow: `0 0 0 3px ${color}22`,
      }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11.5, color: 'rgba(0,0,0,0.68)', lineHeight: 1.4 }}>{text}</div>
        <div style={{ fontSize: 9.5, color: 'rgba(0,0,0,0.28)', marginTop: 2 }}>{time}</div>
      </div>
    </motion.div>
  )
}

function Label({ children }) {
  return (
    <div style={{
      fontSize: 9, fontWeight: 600,
      letterSpacing: '0.09em', textTransform: 'uppercase',
      color: 'rgba(0,0,0,0.27)',
    }}>
      {children}
    </div>
  )
}
