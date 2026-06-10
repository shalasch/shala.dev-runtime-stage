import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ChapterDivider({ statement, sub }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section style={{
      background: '#FFFFFF',
      width: '100%',
      padding: '88px 40px 96px',
      display: 'flex', justifyContent: 'center',
    }}>
      <div
        ref={ref}
        style={{ maxWidth: 680, width: '100%', textAlign: 'center' }}
      >
        {/* Thin rule — draws in from center on scroll */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 36,
            height: 1,
            background: 'rgba(0,0,0,0.13)',
            margin: '0 auto 28px',
            transformOrigin: 'center',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.56, delay: 0.10, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: '#0A0A0A',
            letterSpacing: '-0.032em',
            lineHeight: 1.14,
            margin: 0,
          }}
        >
          {statement}
        </motion.p>

        {sub && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.48, delay: 0.26 }}
            style={{
              fontSize: 15.5,
              fontWeight: 400,
              color: 'rgba(0,0,0,0.42)',
              letterSpacing: '-0.010em',
              lineHeight: 1.66,
              margin: '18px auto 0',
              maxWidth: 500,
            }}
          >
            {sub}
          </motion.p>
        )}
      </div>
    </section>
  )
}
