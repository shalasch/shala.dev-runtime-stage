import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section style={{
      background: '#0A0A0A',
      width: '100%',
      padding: '96px 40px 108px',
      display: 'flex', justifyContent: 'center',
    }}>
      <div
        ref={ref}
        style={{ maxWidth: 600, width: '100%', textAlign: 'center' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{
            fontSize: 9.5, fontWeight: 700, letterSpacing: '0.13em',
            textTransform: 'uppercase', color: 'rgba(245,244,241,0.26)',
            marginBottom: 20,
          }}>
            Start a conversation
          </div>

          <div style={{
            fontSize: 38, fontWeight: 700, color: '#F5F4F1',
            letterSpacing: '-0.034em', lineHeight: 1.1, marginBottom: 22,
          }}>
            Let's build something that works.
          </div>

          <div style={{
            fontSize: 15, color: 'rgba(245,244,241,0.38)',
            lineHeight: 1.66, letterSpacing: '-0.008em', marginBottom: 40,
          }}>
            If your business runs on manual steps, reminders and disconnected tools — there is a better way to operate.
          </div>

          <motion.a
            href="mailto:shaladrive@gmail.com"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.22 }}
            style={{
              display: 'inline-flex', alignItems: 'center',
              fontSize: 13.5, fontWeight: 600, color: '#F5F4F1',
              letterSpacing: '-0.005em',
              background: 'rgba(245,244,241,0.07)',
              border: '1px solid rgba(245,244,241,0.13)',
              borderRadius: 10,
              padding: '13px 26px',
              textDecoration: 'none',
              transition: 'background 0.18s, border-color 0.18s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(245,244,241,0.12)'
              e.currentTarget.style.borderColor = 'rgba(245,244,241,0.22)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(245,244,241,0.07)'
              e.currentTarget.style.borderColor = 'rgba(245,244,241,0.13)'
            }}
          >
            shaladrive@gmail.com
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
