import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const MAX_W = 1200

const STATEMENTS = [
  {
    id: 'tools',
    text: "Businesses don't fail because they lack tools. They fail because their tools don't work together.",
  },
  {
    id: 'handoff',
    text: 'Every manual handoff is a gap. Every reminder is a system design problem that has not been solved yet.',
  },
  {
    id: 'invisible',
    text: 'Good operations are invisible to the people they serve. You only notice them when they break.',
  },
  {
    id: 'layer',
    text: 'I design the coordination layer — the operational infrastructure that closes those gaps and makes each part of the business aware of what happens next.',
  },
]

export default function WhySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

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
        style={{ display: 'flex', gap: 72, maxWidth: MAX_W, width: '100%', alignItems: 'flex-start' }}
      >
        {/* Portrait — replace div with <img> when ready */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: 340, flexShrink: 0 }}
        >
          <div style={{
            width: '100%',
            height: 440,
            background: '#EDECEA',
            borderRadius: 16,
            border: '1px solid rgba(0,0,0,0.09)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }} />
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

        {/* Philosophy text */}
        <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.52, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 20 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(0,0,0,0.2)' }} />
              <span style={{
                fontSize: 9.5, fontWeight: 700, letterSpacing: '0.13em',
                textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)',
              }}>Why I Build Systems</span>
            </div>

            <div style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.14,
              color: '#0A0A0A',
              marginBottom: 40,
            }}>
              Most businesses have more software than they know how to operate.
            </div>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {STATEMENTS.map((block, i) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.44, delay: 0.20 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  padding: '22px 0',
                  borderTop: '1px solid rgba(0,0,0,0.085)',
                  ...(i === STATEMENTS.length - 1
                    ? { borderBottom: '1px solid rgba(0,0,0,0.085)' }
                    : {}),
                }}
              >
                <p style={{
                  fontSize: 15,
                  fontWeight: i === STATEMENTS.length - 1 ? 500 : 400,
                  color: i === STATEMENTS.length - 1
                    ? 'rgba(0,0,0,0.68)'
                    : 'rgba(0,0,0,0.50)',
                  lineHeight: 1.70,
                  letterSpacing: '-0.008em',
                  margin: 0,
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
