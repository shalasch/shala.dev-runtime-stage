import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: '43,000+', label: 'Messages Processed' },
  { value: '12,000+', label: 'Leads Qualified' },
  { value: '1,800+',  label: 'Appointments Scheduled' },
  { value: '99.7%',   label: 'Operational Uptime' },
]

export default function ProofSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })

  return (
    <section style={{
      background: '#FFFFFF',
      width: '100%',
      padding: '48px 40px 52px',
      borderTop: '1px solid rgba(0,0,0,0.07)',
      display: 'flex', justifyContent: 'center',
    }}>
      <div ref={ref} style={{ maxWidth: 1500, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.48, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{
                flex: 1,
                paddingLeft: i > 0 ? 44 : 0,
                paddingRight: i < STATS.length - 1 ? 44 : 0,
                borderLeft: i > 0 ? '1px solid rgba(0,0,0,0.08)' : 'none',
              }}
            >
              <div style={{
                fontSize: 56,
                fontWeight: 700,
                letterSpacing: '-0.040em',
                lineHeight: 1,
                color: '#0A0A0A',
                marginBottom: 9,
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.32)',
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
