import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ChapterDivider({ statement, secondary }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })

  return (
    <section style={{
      background: '#0C0C0C',
      width: '100%',
      padding: '96px 80px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div ref={ref} style={{ maxWidth: 840, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{
            fontSize: 52,
            fontWeight: 700,
            color: '#F5F4F1',
            letterSpacing: '-0.038em',
            lineHeight: 1.1,
            margin: 0,
          }}>
            {statement}
          </p>
          {secondary && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.22, ease: 'easeOut' }}
              style={{
                fontSize: 16,
                color: 'rgba(245,244,241,0.36)',
                letterSpacing: '-0.008em',
                lineHeight: 1.65,
                margin: '22px 0 0',
              }}
            >
              {secondary}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
