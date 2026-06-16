import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { lang } from '../lang'

const pt = lang === 'pt'

const LEADS = pt ? [
  { name: 'Lucas Oliveira',  source: 'WhatsApp',    stage: 'Qualificado',  color: '#22C55E', score: 91, time: 'agora'      },
  { name: 'Beatriz Ferreira', source: 'Formulário', stage: 'Encaminhado',  color: '#8B5CF6', score: 87, time: 'há 4 min'   },
  { name: 'Mateus Costa',    source: 'Instagram',   stage: 'Contatado',    color: '#06B6D4', score: 74, time: 'há 11 min'  },
  { name: 'Juliana Rocha',   source: 'WhatsApp',    stage: 'Agendado',     color: '#F59E0B', score: 68, time: 'há 18 min'  },
] : [
  { name: 'Ryan Mitchell',  source: 'WhatsApp',  stage: 'Qualified',  color: '#22C55E', score: 91, time: 'just now'   },
  { name: 'Amanda Foster',  source: 'Web Form',  stage: 'Routed',     color: '#8B5CF6', score: 87, time: '4 min ago'  },
  { name: 'Tyler Brooks',   source: 'Instagram', stage: 'Contacted',  color: '#06B6D4', score: 74, time: '11 min ago' },
  { name: 'Lauren Scott',   source: 'WhatsApp',  stage: 'Scheduled',  color: '#F59E0B', score: 68, time: '18 min ago' },
]

const titleBar       = pt ? 'Motor de Leads via WhatsApp — Processando' : 'WhatsApp Lead Engine — Processing'
const activeLabel    = pt ? 'Ativo'              : 'Active'
const activeQualLabel = pt ? 'Qualificação Ativa' : 'Active Qualification'
const pipelineLabel  = pt ? 'Pipeline de Leads'  : 'Lead Pipeline'
const viaLabel       = pt ? 'via'                : 'via'
const scoreLabel     = pt ? 'Score'              : 'Score'
const intentLabel    = pt ? 'Intenção'           : 'Intent'
const budgetLabel    = pt ? 'Orçamento'          : 'Budget'
const intentValue    = pt ? 'Alta'               : 'High'
const budgetValue    = pt ? 'Confirmado'         : 'Confirmed'
const footerStats    = pt
  ? [['14', 'Capturados hoje'], ['11', 'Qualificados'], ['8', 'Reuniões agendadas']]
  : [['14', 'Captured today'],  ['11', 'Qualified'],    ['8', 'Meetings booked']]

const DIM = 'rgba(255,255,255,0.38)'
const MUT = 'rgba(255,255,255,0.56)'
const BRI = 'rgba(255,255,255,0.88)'
const BDR = 'rgba(255,255,255,0.08)'

export default function DashboardPanel({ inView }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setActive(i => (i + 1) % LEADS.length), 2400)
    return () => clearInterval(id)
  }, [inView])

  const lead = LEADS[active]

  return (
    <div style={{
      background: '#111111', borderRadius: 16,
      border: `1px solid ${BDR}`,
      boxShadow: '0 4px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05) inset',
      overflow: 'hidden', width: '100%', maxWidth: 560,
    }}>
      {/* Title bar */}
      <div style={{
        padding: '11px 16px',
        borderBottom: `1px solid ${BDR}`,
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'rgba(255,255,255,0.03)',
      }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['rgba(255,255,255,0.12)','rgba(255,255,255,0.12)','rgba(255,255,255,0.12)'].map((c, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <span style={{ fontSize: 10.5, fontWeight: 600, color: MUT, letterSpacing: '-0.005em', flex: 1 }}>
          {titleBar}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E' }}
          />
          <span style={{ fontSize: 9.5, fontWeight: 600, color: '#22C55E' }}>{activeLabel}</span>
        </div>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        {/* Active qualification */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: DIM, marginBottom: 10 }}>
            {activeQualLabel}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8, scale: 0.987 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.987 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 12, padding: '14px 16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: BRI, letterSpacing: '-0.01em', marginBottom: 3 }}>
                    {lead.name}
                  </div>
                  <div style={{ fontSize: 10.5, color: DIM }}>{viaLabel} {lead.source}</div>
                </div>
                <span style={{
                  fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,0.65)',
                  background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.13)',
                  borderRadius: 8, padding: '4px 10px',
                }}>{lead.stage}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 20px' }}>
                {[[scoreLabel, `${lead.score} / 100`], [intentLabel, intentValue], [budgetLabel, budgetValue]].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: DIM, marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: MUT, letterSpacing: '-0.01em' }}>{v}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pipeline */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: DIM, marginBottom: 10 }}>
            {pipelineLabel}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {LEADS.map((l, i) => (
              <div key={l.name} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
                borderBottom: i < LEADS.length - 1 ? `1px solid ${BDR}` : 'none',
                transition: 'background 0.3s',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.30)', flexShrink: 0 }} />
                <span style={{
                  fontSize: 12, fontWeight: i === active ? 600 : 500,
                  color: i === active ? BRI : MUT, letterSpacing: '-0.007em', flex: 1,
                  transition: 'color 0.3s',
                }}>{l.name}</span>
                <span style={{
                  fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.50)',
                  background: 'rgba(255,255,255,0.08)', borderRadius: 6, padding: '2px 8px', whiteSpace: 'nowrap',
                }}>{l.stage}</span>
                <span style={{ fontSize: 9.5, color: DIM, flexShrink: 0 }}>{l.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer stats */}
      <div style={{ display: 'flex', borderTop: `1px solid ${BDR}` }}>
        {footerStats.map(([v, l], i) => (
          <div key={l} style={{
            flex: 1, textAlign: 'center', padding: '14px 0',
            borderRight: i < 2 ? `1px solid ${BDR}` : 'none',
          }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: BRI, letterSpacing: '-0.03em' }}>{v}</div>
            <div style={{ fontSize: 9.5, color: DIM, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
