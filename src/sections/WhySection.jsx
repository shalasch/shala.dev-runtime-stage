import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const MAX_W = 1080

const PHILOSOPHY = [
  {
    id: 'problem',
    text: 'Business operations break in predictable ways. A lead arrives without a follow-up system. A student enrolls without a confirmation workflow. A client books without anyone being notified. The work that should happen next falls on a person — and that person becomes the bottleneck.',
  },
  {
    id: 'approach',
    text: 'I design the layer that handles that work. Not a collection of integrations — a coordinated operational system. One that captures, qualifies, routes, schedules and notifies, end to end, without manual steps in between.',
  },
  {
    id: 'thinking',
    text: 'Every system starts with the same question: what needs to happen next, and who is currently responsible for making it happen? When the answer is "a person, manually" — that is where the system should be.',
  },
]

export default function WhySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section style={{
      background: '#F7F6F2',
      backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.038) 1.5px, transparent 1.5px)',
      backgroundSize: '24px 24px',
      width: '100%',
      padding: '88px 40px 96px',
      display: 'flex', justifyContent: 'center',
    }}>
      <div
        ref={ref}
        style={{ display: 'flex', gap: 80, maxWidth: MAX_W, width: '100%', alignItems: 'flex-start' }}
      >
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: 340, flexShrink: 0 }}
        >
          {/* Replace the div below with an <img> tag when portrait is ready */}
          <div style={{
            width: '100%',
            height: 420,
            background: '#EDECEA',
            borderRadius: 16,
            border: '1px solid rgba(0,0,0,0.09)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Subtle dot grid matches site background */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }} />
            {/* Corner marks — visual language consistent with rest of site */}
            {[
              { top: 10, left: 12 },
              { top: 10, right: 12 },
              { bottom: 10, left: 12 },
              { bottom: 10, right: 12 },
            ].map((pos, i) => (
              <span key={i} style={{
                position: 'absolute', fontSize: 11,
                color: 'rgba(0,0,0,0.18)', lineHeight: 1,
                userSelect: 'none', ...pos,
              }}>+</span>
            ))}
            {/* Placeholder label */}
            <div style={{
              position: 'absolute', bottom: 20, left: 20, right: 20,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.12)' }} />
              <span style={{
                fontSize: 9.5, color: 'rgba(0,0,0,0.28)', letterSpacing: '0.09em',
                textTransform: 'uppercase', whiteSpace: 'nowrap',
              }}>Portrait</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.12)' }} />
            </div>
          </div>
        </motion.div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.52, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 22 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(0,0,0,0.2)' }} />
              <span style={{
                fontSize: 9.5, fontWeight: 700, letterSpacing: '0.13em',
                textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)',
              }}>Why I Build Systems</span>
            </div>
            <div style={{
              fontSize: 30, fontWeight: 700, letterSpacing: '-0.03em',
              lineHeight: 1.12, color: '#0A0A0A', marginBottom: 36,
            }}>
              Operations should not depend on people remembering to do things.
            </div>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {PHILOSOPHY.map((block, i) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.46, delay: 0.18 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  padding: '20px 0',
                  borderTop: i === 0 ? '1px solid rgba(0,0,0,0.09)' : 'none',
                  borderBottom: '1px solid rgba(0,0,0,0.09)',
                }}
              >
                <p style={{
                  fontSize: 14.5, color: 'rgba(0,0,0,0.52)',
                  lineHeight: 1.72, letterSpacing: '-0.006em', margin: 0,
                }}>
                  {block.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
