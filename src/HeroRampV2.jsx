import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LeadScene from './scenes/LeadScene'
import DatabaseScene from './scenes/DatabaseScene'
import CRMScene from './scenes/CRMScene'
import CalendarScene from './scenes/CalendarScene'
import AnalysisCards from './components/AnalysisCards'
import ActionCards from './components/ActionCards'

const CONTAINER_SCENE = ['lead', 'lead', 'db', 'crm', 'cal']

// V2 — dramatic scale progression
const SIZES = {
  lead: { w: 320,  h: 244  },
  db:   { w: 840,  h: 400  },
  crm:  { w: 860,  h: 460  },
  cal:  { w: 840,  h: 440  },
}

const TITLES = [
  'New Lead',
  'AI Qualification',
  'Operational Database',
  'CRM Update',
  'Property Visit Booked',
]

// CRM extended to 8 000ms — longest dwell, core value proposition
const DURATIONS = [2500, 5000, 5500, 8000, 4500]

export default function HeroRampV2() {
  const [sceneIdx, setSceneIdx]     = useState(0)
  const [showPayoff, setShowPayoff] = useState(false)
  const [cycle, setCycle]           = useState(0)
  const [cur, setCur]               = useState({ x: 960, y: 280 })
  const [curVis, setCurVis]         = useState(false)

  useEffect(() => {
    setSceneIdx(0)
    setShowPayoff(false)
    setCurVis(false)
    setCur({ x: 960, y: 280 })

    const t = []

    // stamps[i] = cumulative time when scene i+1 starts
    const stamps = DURATIONS.reduce((acc, d, i) => {
      acc.push((acc[i - 1] ?? 0) + d)
      return acc
    }, [])
    // [2500, 7500, 13000, 21000, 25500]
    stamps.slice(0, -1).forEach((ms, i) => {
      t.push(setTimeout(() => setSceneIdx(i + 1), ms))
    })

    const [, dbStart, crmStart, calStart] = stamps

    t.push(setTimeout(() => setShowPayoff(true),            calStart + 3000))
    t.push(setTimeout(() => { setShowPayoff(false); setCycle(c => c + 1) }, calStart + 5800))

    // ── cursor: Scene 0 (lead) ─────────────────────────
    // Stage 560px, lead card top≈168, Source row ≈ y344
    t.push(setTimeout(() => { setCurVis(true); setCur({ x: 840, y: 270 }) }, 360))
    t.push(setTimeout(() => setCur({ x: 448, y: 344 }),   790))   // Source row
    t.push(setTimeout(() => setCurVis(false),              2160))

    // ── cursor: Scene 2 (database) — T=7500 ─────────────
    // DB left=(900-840)/2=30, paddingLeft=14. New row 6 center ≈ y337.
    // Col centers in stage: lead_name≈179, budget≈471, status≈582
    t.push(setTimeout(() => { setCurVis(true); setCur({ x: 870, y: 337 }) }, dbStart + 460))
    t.push(setTimeout(() => setCur({ x: 179, y: 337 }),   dbStart + 960))   // lead_name
    t.push(setTimeout(() => setCur({ x: 471, y: 337 }),   dbStart + 1960))  // budget
    t.push(setTimeout(() => setCur({ x: 582, y: 337 }),   dbStart + 2860))  // status
    t.push(setTimeout(() => setCurVis(false),              dbStart + 5100))

    // ── cursor: Scene 3 (crm) — T=13000 ─────────────────
    // CRM top≈60, body starts≈129, left panel x≈20-260
    t.push(setTimeout(() => { setCurVis(true); setCur({ x: 840, y: 220 }) }, crmStart + 420))
    t.push(setTimeout(() => setCur({ x: 225, y: 210 }),   crmStart + 940))   // left panel
    t.push(setTimeout(() => setCur({ x: 225, y: 325 }),   crmStart + 1920))  // lower fields
    t.push(setTimeout(() => setCur({ x: 570, y: 398 }),   crmStart + 2940))  // activity
    t.push(setTimeout(() => setCurVis(false),              crmStart + 6800))  // late exit

    // ── cursor: Scene 4 (calendar) — T=21000 ────────────
    // Cal top≈70, Jun 18 ≈ y242
    t.push(setTimeout(() => { setCurVis(true); setCur({ x: 440, y: 148 }) }, calStart + 310))
    t.push(setTimeout(() => setCur({ x: 450, y: 242 }),   calStart + 850))   // Jun 18
    t.push(setTimeout(() => setCurVis(false),              calStart + 2650))

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
        overflow: 'visible',
      }}
    >
      <div style={{ height: 560, position: 'relative' }}>

        {/* Large ambient environmental title — low contrast, part of composition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            style={{
              position: 'absolute',
              top: 22, left: 26,
              fontSize: 58,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'rgba(0,0,0,0.068)',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            {title}
          </motion.div>
        </AnimatePresence>

        {/* Morphing container */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 20,
        }}>
          <motion.div
            initial={{ width: 320, height: 244 }}
            animate={{ width: w, height: h }}
            transition={{ type: 'spring', stiffness: 105, damping: 22, mass: 1 }}
            style={{
              background: '#FFFFFF',
              borderRadius: 14,
              border: '1px solid rgba(0,0,0,0.085)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 8px 28px rgba(0,0,0,0.07), 0 32px 80px rgba(0,0,0,0.10)',
              overflow: 'hidden',
              flexShrink: 0,
              position: 'relative',
              zIndex: 2,
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

        {/* Floating analysis cards — qualification scene */}
        <AnimatePresence>
          {sceneIdx === 1 && <AnalysisCards key="analysis" />}
        </AnimatePresence>

        {/* Floating action cards — CRM scene */}
        <AnimatePresence>
          {sceneIdx === 3 && <ActionCards key="actions" />}
        </AnimatePresence>

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
      color: 'rgba(0,0,0,0.14)',
      fontSize: 10, lineHeight: 1,
      userSelect: 'none', pointerEvents: 'none',
      zIndex: 2, ...s,
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
        position: 'absolute', top: 0, left: 0,
        pointerEvents: 'none', zIndex: 20,
      }}
    >
      <svg width="15" height="19" viewBox="0 0 15 19" fill="none">
        <path d="M1 1L1 14.5L4.2 11.3L6.8 17.2L8.8 16.3L6.3 10.5L11.2 10.5L1 1Z"
          fill="white" stroke="#111" strokeWidth="1.2"
          strokeLinejoin="round" strokeLinecap="round"/>
      </svg>
    </motion.div>
  )
}
