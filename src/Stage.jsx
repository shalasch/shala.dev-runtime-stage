import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LeadScene from './scenes/LeadScene'
import DatabaseScene from './scenes/DatabaseScene'
import CRMScene from './scenes/CRMScene'
import CalendarScene from './scenes/CalendarScene'
import AnalysisCards from './components/AnalysisCards'
import ActionCards from './components/ActionCards'

// containerScene key per sceneIdx
const CONTAINER_SCENE = ['lead', 'lead', 'db', 'crm', 'cal']

const SIZES = {
  lead: { w: 300, h: 224 },
  db:   { w: 778, h: 284 },
  crm:  { w: 728, h: 374 },
  cal:  { w: 728, h: 374 },
}

const TITLES = [
  'New Lead',
  'AI Qualification',
  'Operational Database',
  'CRM Update',
  'Property Visit Booked',
]

// ms before advancing to next scene
const DURATIONS = [2500, 5000, 5500, 6500, 4500]

export default function Stage() {
  const [sceneIdx, setSceneIdx]     = useState(0)
  const [showPayoff, setShowPayoff] = useState(false)
  const [cycle, setCycle]           = useState(0)
  const [cur, setCur]               = useState({ x: 960, y: 250 })
  const [curVis, setCurVis]         = useState(false)

  useEffect(() => {
    setSceneIdx(0)
    setShowPayoff(false)
    setCurVis(false)
    setCur({ x: 960, y: 250 })

    const t = []

    // scene transitions
    const stamps = DURATIONS.reduce((acc, d, i) => {
      acc.push((acc[i - 1] ?? 0) + d)
      return acc
    }, [])
    // stamps = [2500, 7500, 13000, 19500, 24000]
    stamps.slice(0, -1).forEach((ms, i) => {
      t.push(setTimeout(() => setSceneIdx(i + 1), ms))
    })

    const [, dbStart, crmStart, calStart] = stamps

    // payoff + loop
    t.push(setTimeout(() => setShowPayoff(true),            calStart + 3000))
    t.push(setTimeout(() => { setShowPayoff(false); setCycle(c => c + 1) }, calStart + 5800))

    // ── cursor: Scene 0 (lead) ─────────────────────────
    t.push(setTimeout(() => { setCurVis(true); setCur({ x: 840, y: 255 }) }, 350))
    t.push(setTimeout(() => setCur({ x: 440, y: 310 }),   770))   // Source row
    t.push(setTimeout(() => setCurVis(false),              2150))

    // ── cursor: Scene 2 (database) ────────────────────
    t.push(setTimeout(() => { setCurVis(true); setCur({ x: 840, y: 215 }) }, dbStart + 450))
    t.push(setTimeout(() => setCur({ x: 340, y: 215 }),   dbStart + 950))   // new row
    t.push(setTimeout(() => setCur({ x: 510, y: 215 }),   dbStart + 1950))  // budget
    t.push(setTimeout(() => setCur({ x: 635, y: 215 }),   dbStart + 2900))  // status
    t.push(setTimeout(() => setCurVis(false),              dbStart + 5100))

    // ── cursor: Scene 3 (crm) ────────────────────────
    t.push(setTimeout(() => { setCurVis(true); setCur({ x: 840, y: 195 }) }, crmStart + 400))
    t.push(setTimeout(() => setCur({ x: 220, y: 195 }),   crmStart + 920))   // left panel
    t.push(setTimeout(() => setCur({ x: 220, y: 295 }),   crmStart + 1880))  // lower fields
    t.push(setTimeout(() => setCur({ x: 545, y: 345 }),   crmStart + 2900))  // activity
    t.push(setTimeout(() => setCurVis(false),              crmStart + 5600))

    // ── cursor: Scene 4 (calendar) ───────────────────
    t.push(setTimeout(() => { setCurVis(true); setCur({ x: 430, y: 150 }) }, calStart + 300))
    t.push(setTimeout(() => setCur({ x: 450, y: 218 }),   calStart + 840))   // Jun 18
    t.push(setTimeout(() => setCurVis(false),              calStart + 2700))

    return () => t.forEach(clearTimeout)
  }, [cycle])

  const containerScene = CONTAINER_SCENE[sceneIdx]
  const { w, h }       = SIZES[containerScene]
  const title          = TITLES[sceneIdx]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.975, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      style={{
        width: 900,
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: 20,
        boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04), 0 20px 56px rgba(0,0,0,0.09)',
        overflow: 'hidden',
      }}
    >
      <div style={{ height: 490, position: 'relative' }}>

        {/* Large environmental title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={title}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: 24, left: 30,
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: '#0A0A0A',
              lineHeight: 1,
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 5,
            }}
          >
            {title}
          </motion.div>
        </AnimatePresence>

        {/* Morphing container — centered in composition */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 18,
        }}>
          <motion.div
            initial={{ width: 300, height: 224 }}
            animate={{ width: w, height: h }}
            transition={{ type: 'spring', stiffness: 110, damping: 22, mass: 1 }}
            style={{
              background: '#FFFFFF',
              borderRadius: 14,
              border: '1px solid rgba(0,0,0,0.085)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 8px 28px rgba(0,0,0,0.07), 0 32px 80px rgba(0,0,0,0.10)',
              overflow: 'hidden',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            <CornerMark pos="tl" />
            <CornerMark pos="tr" />
            <CornerMark pos="bl" />
            <CornerMark pos="br" />

            <AnimatePresence>
              {containerScene === 'lead' && <LeadScene key="lead" />}
              {containerScene === 'db'   && <DatabaseScene key="db" />}
              {containerScene === 'crm'  && <CRMScene key="crm" />}
              {containerScene === 'cal'  && (
                <CalendarScene key="cal" showPayoff={showPayoff} />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Analysis cards — qualification scene only */}
        <AnimatePresence>
          {sceneIdx === 1 && <AnalysisCards key="analysis" />}
        </AnimatePresence>

        {/* Action cards — CRM scene only */}
        <AnimatePresence>
          {sceneIdx === 3 && <ActionCards key="actions" />}
        </AnimatePresence>

        {/* Animated cursor */}
        <Cursor x={cur.x} y={cur.y} visible={curVis} />
      </div>
    </motion.div>
  )
}

function CornerMark({ pos }) {
  const s = {
    tl: { top: -5, left: -4 },
    tr: { top: -5, right: -4 },
    bl: { bottom: -5, left: -4 },
    br: { bottom: -5, right: -4 },
  }[pos]
  return (
    <span style={{
      position: 'absolute',
      color: 'rgba(0,0,0,0.15)',
      fontSize: 10,
      lineHeight: 1,
      userSelect: 'none',
      pointerEvents: 'none',
      zIndex: 2,
      ...s,
    }}>+</span>
  )
}

function Cursor({ x, y, visible }) {
  return (
    <motion.div
      animate={{ x, y, opacity: visible ? 1 : 0 }}
      transition={{
        x: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
        y: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
        opacity: { duration: 0.18 },
      }}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      <svg width="15" height="19" viewBox="0 0 15 19" fill="none">
        <path
          d="M1 1L1 14.5L4.2 11.3L6.8 17.2L8.8 16.3L6.3 10.5L11.2 10.5L1 1Z"
          fill="white"
          stroke="#111"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  )
}
