import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const STEPS = [
  {
    id: 'inquiry', label: 'Customer Inquiry', color: '#4A7CF7',
    content: {
      type: 'message',
      sender: 'Marcos Oliveira', time: '14:32',
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

export default function IntakePanel({ inView }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setActive(i => (i + 1) % STEPS.length), 2800)
    return () => clearInterval(id)
  }, [inView])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {STEPS.map((step, i) => {
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
                      <path d="M2 6L5 9L10 3" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
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
                        <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: '-0.01em', color: k === 'Status' ? '#22C55E' : 'rgba(0,0,0,0.72)' }}>
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
                      <span style={{ fontSize: 10.5, fontWeight: 600, color: '#16A34A', background: 'rgba(34,197,94,0.1)', borderRadius: 8, padding: '3px 9px' }}>
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

            {i < STEPS.length - 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 28 }}>
                <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                  <path d="M6 1L6 12M6 12L2 8M6 12L10 8"
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
