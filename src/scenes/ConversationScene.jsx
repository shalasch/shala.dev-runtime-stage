import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Scene 1 — the conversation expands and AI analysis appears alongside it
export default function ConversationScene() {
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [scoreVisible, setScoreVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowAnalysis(true),  1200)
    const t2 = setTimeout(() => setScoreVisible(true),  2200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.18 }}
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {/* ── Header ── */}
      <div style={{
        height: 48, padding: '0 16px',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'linear-gradient(135deg, #e8e6e1 0%, #d0cdc8 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 600, color: 'rgba(0,0,0,0.45)',
        }}>CF</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0A0A0A', letterSpacing: '-0.01em' }}>
            Chris Foster
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#25D366', display: 'block' }} />
            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.38)' }}>WhatsApp · New contact</span>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(0,0,0,0.28)', fontWeight: 500 }}>
          Just now
        </div>
      </div>

      {/* ── Body: conversation + analysis ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Messages */}
        <div style={{
          flex: 1, padding: '14px 16px',
          display: 'flex', flexDirection: 'column', gap: 10,
          overflowY: 'auto',
          borderRight: showAnalysis ? '1px solid rgba(0,0,0,0.06)' : 'none',
          transition: 'border-color 300ms',
        }}>
          <Bubble
            text="Hi, I came across your work on AI automation for businesses. Very interested in learning more."
            incoming delay={0}
          />
          <Bubble
            text="Hi Chris! What area of your business are you looking to automate?"
            delay={0.15}
          />
          <Bubble
            text="Mainly our lead follow-up. We lose a lot of clients because we're too slow to respond. Do you work with this?"
            incoming delay={0.3}
          />
        </div>

        {/* AI Analysis panel — slides in */}
        <AnimatePresence>
          {showAnalysis && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 188, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{
                flexShrink: 0, overflow: 'hidden',
                background: '#FAFAF8',
              }}
            >
              <div style={{ width: 188, padding: '14px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>

                <div style={{
                  fontSize: 9, fontWeight: 600, letterSpacing: '0.09em',
                  textTransform: 'uppercase', color: 'rgba(0,0,0,0.30)',
                }}>
                  AI Analysis
                </div>

                {/* Intent signals */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)', marginBottom: 2 }}>
                    Signals
                  </div>
                  {[
                    { label: 'Automation need', color: '#4A7CF7' },
                    { label: 'Response time pain', color: '#F59E0B' },
                    { label: 'Available this week', color: '#22C55E' },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12, duration: 0.3, ease: 'easeOut' }}
                      style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.60)', fontWeight: 400 }}>{s.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Score */}
                <AnimatePresence>
                  {scoreVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        borderTop: '1px solid rgba(0,0,0,0.06)',
                        paddingTop: 10,
                        display: 'flex', flexDirection: 'column', gap: 8,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)' }}>Score</span>
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#0A0A0A', letterSpacing: '-0.02em' }}>92</span>
                      </div>
                      <ScoreBar value={92} />
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        background: 'rgba(74,124,247,0.08)',
                        border: '1px solid rgba(74,124,247,0.18)',
                        borderRadius: 20, padding: '3px 8px',
                        fontSize: 10, fontWeight: 600, color: '#4A7CF7',
                      }}>
                        High Intent
                      </div>
                      <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.40)', lineHeight: 1.4 }}>
                        Route to discovery call
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Input bar ── */}
      <div style={{
        height: 40, padding: '0 14px',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
      }}>
        <div style={{
          flex: 1, height: 26, borderRadius: 13,
          background: 'rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.06)',
          display: 'flex', alignItems: 'center', paddingLeft: 10,
        }}>
          <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.25)' }}>Type a message...</span>
        </div>
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          background: '#25D366',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

function Bubble({ text, incoming = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: 'easeOut' }}
      style={{
        display: 'flex',
        justifyContent: incoming ? 'flex-start' : 'flex-end',
      }}
    >
      <div style={{
        maxWidth: '82%',
        padding: '7px 11px',
        borderRadius: incoming ? '4px 12px 12px 12px' : '12px 4px 12px 12px',
        background: incoming ? 'rgba(0,0,0,0.05)' : '#DCF8C6',
        fontSize: 12,
        lineHeight: 1.45,
        color: incoming ? 'rgba(0,0,0,0.70)' : 'rgba(0,0,0,0.72)',
        letterSpacing: '-0.005em',
      }}>
        {text}
      </div>
    </motion.div>
  )
}

function ScoreBar({ value }) {
  return (
    <div style={{
      height: 4, borderRadius: 2,
      background: 'rgba(0,0,0,0.07)', overflow: 'hidden',
    }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        style={{ height: '100%', borderRadius: 2, background: '#4A7CF7' }}
      />
    </div>
  )
}
