import { useState, useEffect, useRef } from 'react'
import { AnimatedWordmark } from './components/AnimatedWordmark'
import ContainerTextFlip from './components/ContainerTextFlip'
import WavyBackground from './components/WavyBackground'
import HeroRampV2 from './HeroRampV2'
import LeadEnginePanel from './panels/LeadEnginePanel'
import IntakePanel from './panels/IntakePanel'
import InfraPanel from './panels/InfraPanel'
import DashboardPanel from './panels/DashboardPanel'
import { COPY } from './i18n'

const lang = window.location.pathname.startsWith('/pt') ? 'pt' : 'en'
const t = COPY[lang]

// ── useVisible ────────────────────────────────────────────────
function useVisible(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

// ── Gradient bleed between dark/light sections ────────────────
function Bleed({ from, to }) {
  return (
    <div style={{ height: 1, background: from === '#ffffff' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)' }} />
  )
}

// ── S1: Hero — white background, 5 animated scenes ───────────

function Scene1() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div style={{
        width: 'min(270px, 100%)',
        background: '#ffffff', border: '1px solid rgba(0,0,0,0.09)',
        borderRadius: 10, padding: 16,
        boxShadow: '0 2px 14px rgba(0,0,0,0.07)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#ffffff' }}>JC</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a', lineHeight: 1.2 }}>Jessica Carter</div>
            <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', marginTop: 1 }}>New contact via WhatsApp</div>
          </div>
          <span style={{ fontSize: 10, fontWeight: 600, color: '#c2670a', background: '#fff7ed', padding: '2px 8px', borderRadius: 20, whiteSpace: 'nowrap', flexShrink: 0 }}>New Lead</span>
        </div>
        <div style={{ margin: '12px 0 10px', borderTop: '1px solid rgba(0,0,0,0.06)' }} />
        {[['Interest','3-bedroom apartment',false],['Budget','R$850,000',false],['Source',null,true],['Received','Just now',false]].map(([label, value, isSrc]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)' }}>{label}</span>
            {isSrc ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#0a0a0a' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0 }} />
                WhatsApp
              </span>
            ) : <span style={{ fontSize: 12, color: '#0a0a0a' }}>{value}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

function Scene2() {
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80)
    return () => clearTimeout(t)
  }, [])
  const SATS = [
    { top: 0,    left:  0,    centerV: false, overline: 'PREVIOUS INQUIRY',      oc: 'rgba(0,0,0,0.35)', main: '2 listings viewed',  sub: '6 months ago',    delay: 100 },
    { top: 0,    right: 0,    centerV: false, overline: 'BUDGET DETECTED',        oc: '#c2670a',           main: 'R$780k – R$920k',   sub: 'Pre-approved',    delay: 200 },
    { top: '50%',left:  0,    centerV: true,  overline: 'PREFERRED REGION',       oc: 'rgba(0,0,0,0.35)', main: 'Beverly Hills',    sub: 'Santa Monica',delay: 300 },
    { top: '50%',right: 0,    centerV: true,  overline: 'BUYER PROFILE',          oc: '#c2670a',           main: 'Family of 4',        sub: 'Moving this month',delay: 400 },
    { bottom: 0, left:  0,    centerV: false, overline: 'HIGH PURCHASE INTENT',   oc: '#c2670a',           main: 'AI Signal: 94%',     sub: null,              delay: 500 },
    { bottom: 0, right: 0,    centerV: false, overline: 'URGENCY INFERRED',       oc: '#c2670a',           main: '"Visit this week"',  sub: 'Lease ends July', delay: 600 },
  ]
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', alignSelf: 'stretch' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 230, zIndex: 2,
        background: '#ffffff', border: '1px solid rgba(0,0,0,0.09)', borderRadius: 10, padding: 16,
        boxShadow: '0 2px 14px rgba(0,0,0,0.07)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#ffffff' }}>JC</span>
          </div>
          <div><div style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a' }}>Jessica Carter</div>
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', marginTop: 1 }}>New contact via WhatsApp</div></div>
        </div>
        <div style={{ margin: '12px 0 10px', borderTop: '1px solid rgba(0,0,0,0.06)' }} />
        {[['Interest','3-bedroom apartment'],['Budget','R$850,000'],['Region','Beverly Hills'],['Received','Just now']].map(([k,v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)' }}>{k}</span>
            <span style={{ fontSize: 12, color: '#0a0a0a' }}>{v}</span>
          </div>
        ))}
      </div>
      {SATS.map((s, i) => {
        const pos = {}
        if (s.top    !== undefined) pos.top    = s.top
        if (s.bottom !== undefined) pos.bottom = s.bottom
        if (s.left   !== undefined) pos.left   = s.left
        if (s.right  !== undefined) pos.right  = s.right
        const tf = s.centerV
          ? (entered ? 'translateY(-50%)' : 'translateY(calc(-50% + 8px))')
          : (entered ? 'translateY(0)'    : 'translateY(8px)')
        return (
          <div key={i} style={{
            position: 'absolute', width: 158, ...pos,
            background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8, padding: 12,
            boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
            opacity: entered ? 1 : 0, transform: tf,
            transition: entered ? `opacity 380ms ease-out ${s.delay}ms, transform 380ms ease-out ${s.delay}ms` : 'opacity 220ms ease-in',
          }}>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: s.oc, marginBottom: 6 }}>{s.overline}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0a' }}>{s.main}</div>
            {s.sub && <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.45)', marginTop: 2 }}>{s.sub}</div>}
          </div>
        )
      })}
    </div>
  )
}

function Scene3({ qualified }) {
  const COL = '1.8fr 1.2fr 1.2fr 1fr 1fr 1fr'
  const ROWS = [
    { name: 'James Parker',  phone: '+55 21 9···',  budget: 'R$720,000',   st: 'Qualified', sc: { bg: '#f0fdf4', c: '#16a34a' },              src: 'Website',  cr: '2 days ago', live: false },
    { name: 'Emily Brooks',        phone: '+55 21 9···',  budget: 'R$1,200,000', st: 'Prospect',  sc: { bg: '#eff6ff', c: '#2563eb' },              src: 'Referral', cr: 'Yesterday',  live: false },
    { name: 'Kevin M.',       phone: '+55 21 9···',  budget: 'R$650,000',   st: 'Cold',      sc: { bg: 'rgba(0,0,0,0.05)', c: 'rgba(0,0,0,0.4)' }, src: 'Website',  cr: '5 hrs ago',  live: false },
    { name: 'Jessica Carter',   phone: '+55 21 97···', budget: 'R$850,000',   st: 'Qualified', sc: { bg: '#f0fdf4', c: '#16a34a' },              src: 'WhatsApp', cr: 'Just now',   live: true  },
  ]
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#0a0a0a' }}>leads</span>
        <span style={{ fontSize: 10, background: 'rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.5)', padding: '2px 7px', borderRadius: 3, fontWeight: 500 }}>GRID VIEW</span>
        <div style={{ flexGrow: 1 }} />
        <span style={{ fontSize: 10, background: '#f0fdf4', color: '#16a34a', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>+ 1 new</span>
        <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.35)', marginLeft: 6 }}>4 records</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: COL, padding: '5px 8px', borderBottom: '1px solid rgba(0,0,0,0.08)', marginBottom: 2 }}>
        {['lead_name','phone','budget','status','source','created_at'].map(c => (
          <span key={c} style={{ fontSize: 11, color: 'rgba(0,0,0,0.38)', fontWeight: 500 }}>{c}</span>
        ))}
      </div>
      {ROWS.map((row, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: COL, padding: '9px 8px', borderBottom: '1px solid rgba(0,0,0,0.05)', alignItems: 'center', fontSize: 12, color: '#0a0a0a' }}>
          <span style={{ fontWeight: 500 }}>{row.name}</span>
          <span style={{ color: 'rgba(0,0,0,0.45)' }}>{row.phone}</span>
          <span>{row.budget}</span>
          <span>
            <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: row.sc.bg, color: row.sc.c, opacity: row.live && !qualified ? 0 : 1, transition: 'opacity 0.3s' }}>{row.st}</span>
          </span>
          <span style={{ color: 'rgba(0,0,0,0.55)' }}>{row.src}</span>
          <span style={{ color: 'rgba(0,0,0,0.4)' }}>{row.live ? (qualified ? 'Just now' : '—') : row.cr}</span>
        </div>
      ))}
    </div>
  )
}

function Scene4({ badgeCount }) {
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80)
    return () => clearTimeout(t)
  }, [])
  const EVENTS = [
    { dot: '#22c55e', text: 'Lead received via WhatsApp',          time: 'Just now', delay: 350 },
    { dot: '#3b82f6', text: 'AI qualification complete · Score: 94', time: '1s ago',  delay: 650 },
    { dot: '#22c55e', text: 'Lead qualified · Beverly Hills · 3-bed', time: '2s ago', delay: 950 },
  ]
  const BADGES = [
    { top: -12,  right: -12, label: 'Agent Assigned' },
    { top:  32,  right: -12, label: 'Follow-up Created' },
    { bottom: 32, left: 14,  label: 'Visit Scheduling Triggered' },
    { bottom: 32, right: 14, label: 'Property Suggestions Sent' },
  ]
  const DETAILS = [
    ['Interest','3-bedroom apt.',null],['Budget','R$850,000',null],['Region','Beverly Hills',null],
    ['Priority','High','#c2670a'],['Source','WhatsApp',null],
    ['Agent','Assigning...','mi'],['Next','Processing...','mi'],
  ]
  return (
    <div style={{ display: 'flex', gap: 14, height: '100%', alignSelf: 'stretch', width: '100%' }}>
      <div style={{ flex: '0 0 44%', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8, padding: 14, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#ffffff' }}>JC</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#0a0a0a' }}>Jessica Carter</span>
          <span style={{ fontSize: 10, fontWeight: 600, background: '#f0fdf4', color: '#16a34a', padding: '2px 7px', borderRadius: 20 }}>Qualified</span>
        </div>
        <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', paddingLeft: 34, marginBottom: 2 }}>WhatsApp · +55 21 97··· · Beverly Hills</div>
        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', margin: '12px 0 8px' }}>LEAD DETAILS</div>
        {DETAILS.map(([k,v,sp]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
            <span style={{ color: 'rgba(0,0,0,0.4)' }}>{k}</span>
            <span style={{ color: sp === 'mi' ? 'rgba(0,0,0,0.3)' : sp || '#0a0a0a', fontStyle: sp === 'mi' ? 'italic' : 'normal' }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8, padding: 14, position: 'relative', overflow: 'visible' }}>
        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 12 }}>ACTIVITY</div>
        {EVENTS.map((ev, i) => (
          <div key={i} style={{
            display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 10,
            opacity: entered ? 1 : 0, transform: entered ? 'translateX(0)' : 'translateX(-6px)',
            transition: entered ? `opacity 300ms ease-out ${ev.delay}ms, transform 300ms ease-out ${ev.delay}ms` : 'opacity 220ms ease-in',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: ev.dot, flexShrink: 0, marginTop: 3 }} />
            <div>
              <div style={{ fontSize: 12, color: '#0a0a0a' }}>{ev.text}</div>
              <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', marginTop: 1 }}>{ev.time}</div>
            </div>
          </div>
        ))}
        {BADGES.map((b, i) => {
          const pos = {}
          if (b.top    !== undefined) pos.top    = b.top
          if (b.bottom !== undefined) pos.bottom = b.bottom
          if (b.left   !== undefined) pos.left   = b.left
          if (b.right  !== undefined) pos.right  = b.right
          return (
            <div key={i} style={{
              position: 'absolute', ...pos,
              background: '#ffffff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 20, padding: '4px 10px',
              fontSize: 11, fontWeight: 500, color: '#0a0a0a', whiteSpace: 'nowrap',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              opacity: badgeCount > i ? 1 : 0, transform: `scale(${badgeCount > i ? 1 : 0.9})`,
              transition: 'opacity 300ms ease-out, transform 300ms ease-out',
            }}>
              <span style={{ color: '#16a34a', marginRight: 4 }}>✓</span>{b.label}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Scene5({ revealed }) {
  const DAYS = Array.from({ length: 30 }, (_, i) => i + 1)
  return (
    <div>
      <div style={{ position: 'relative' }}>
        <div style={{
          width: 380, margin: '0 auto',
          opacity: revealed ? 0.3 : 1,
          transform: revealed ? 'scale(0.88) translateY(-10px)' : 'scale(1) translateY(0)',
          transition: '0.4s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a' }}>June 2026</span>
            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', background: 'rgba(0,0,0,0.05)', padding: '2px 8px', borderRadius: 20 }}>Property Visits</span>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ color: 'rgba(0,0,0,0.3)', fontSize: 14 }}>‹</span>
              <span style={{ color: 'rgba(0,0,0,0.3)', fontSize: 14 }}>›</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', paddingBottom: 8, borderBottom: '1px solid rgba(0,0,0,0.06)', marginBottom: 4 }}>
            {['MO','TU','WE','TH','FR','SA','SU'].map(d => (
              <div key={d} style={{ fontSize: 11, color: 'rgba(0,0,0,0.35)', fontWeight: 500, textAlign: 'center' }}>{d}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
            {DAYS.map(d => {
              const active = d === 18, marked = d === 9
              return (
                <div key={d} style={{
                  height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, borderRadius: 4,
                  background: active ? '#16a34a' : marked ? 'rgba(0,0,0,0.06)' : 'transparent',
                  color: active ? '#ffffff' : '#0a0a0a',
                  fontWeight: active ? 700 : marked ? 600 : 400,
                }}>{d}</div>
              )
            })}
          </div>
        </div>
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.94)', borderRadius: 8,
          opacity: revealed ? 1 : 0, transition: 'opacity 300ms ease-out 50ms',
          pointerEvents: revealed ? 'auto' : 'none',
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', color: '#16a34a' }}>PROPERTY VISIT CONFIRMED</span>
        </div>
      </div>
      <div style={{
        marginTop: 16, borderLeft: '3px solid #16a34a', padding: '10px 14px',
        background: '#f0fdf4', borderRadius: '0 6px 6px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        opacity: revealed ? 1 : 0, transform: revealed ? 'translateY(0)' : 'translateY(14px)',
        transition: revealed ? 'opacity 400ms ease-out 400ms, transform 400ms ease-out 400ms' : 'opacity 220ms ease-in',
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0a0a0a' }}>Property Visit · Jessica Carter</div>
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.5)', marginTop: 2 }}>Thu, Jun 18 · 2:00 PM – 3:00 PM · Beverly Hills</div>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#16a34a', whiteSpace: 'nowrap', marginLeft: 12 }}>✓ Booked</span>
      </div>
    </div>
  )
}

function HeroSection() {
  const TICKER = t.hero.ticker

  return (
    <section data-theme="light" style={{
      background: '#ffffff',
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px 64px', overflow: 'hidden', position: 'relative',
    }}>

      <WavyBackground />

      {/* Text block */}
      <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 52px', position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', color: 'rgba(0,0,0,0.38)', fontWeight: 500, textTransform: 'uppercase', marginBottom: 24, display: 'block' }}>
          {t.hero.overline}
        </span>
        <h1 style={{ fontSize: 'clamp(40px, 5.5vw, 76px)', fontWeight: 800, color: '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0 }}>
          <span style={{ display: 'block' }}>{t.hero.titleLine1}</span>
          <span style={{ display: 'block' }}>{t.hero.titleLine2}</span>
        </h1>
        <p style={{ margin: '20px auto 0', fontSize: 16, color: 'rgba(0,0,0,0.50)', lineHeight: 1.65, maxWidth: 460 }}>
          {t.hero.subtitle}
        </p>
      </div>

      {/* Hero demo — V2 morphing container */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <HeroRampV2 />
      </div>

      {/* Ticker */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 34, zIndex: 1,
        borderTop: '1px solid rgba(0,0,0,0.08)',
        display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#ffffff',
      }}>
        <div style={{ flexShrink: 0, padding: '0 20px', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.08)', fontSize: 10, letterSpacing: '0.12em', color: 'rgba(0,0,0,0.30)' }}>
          {t.hero.tickerAnchor}
        </div>
        <div className="marquee-wrap" style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ display: 'inline-flex', whiteSpace: 'nowrap', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', paddingLeft: 20, animation: 'ticker-scroll 38s linear infinite' }}>
            {TICKER}{TICKER}{TICKER}{TICKER}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── S2: Stack Grid ─────────────────────────────────────────────
// (defined below — StackSection)

// ── Copy block (reused for S3/S4/S5) ─────────────────────────
function SysCopy({ eyebrow, title, description, outcome, dark }) {
  const c = dark ? {
    eyebrow: 'rgba(255,255,255,0.28)', title: '#ffffff',
    body: 'rgba(255,255,255,0.58)', dot: 'rgba(255,255,255,0.18)',
    oText: 'rgba(255,255,255,0.70)', oBg: 'rgba(255,255,255,0.07)', oBdr: 'rgba(255,255,255,0.13)',
  } : {
    eyebrow: 'rgba(0,0,0,0.32)', title: '#0a0a0a',
    body: 'rgba(0,0,0,0.50)', dot: 'rgba(0,0,0,0.18)',
    oText: 'rgba(0,0,0,0.58)', oBg: 'rgba(0,0,0,0.05)', oBdr: 'rgba(0,0,0,0.10)',
  }

  return (
    <div style={{ width: 370, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 18 }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: c.dot }} />
        <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: c.eyebrow }}>
          {eyebrow}
        </span>
      </div>
      <div style={{
        fontSize: 'clamp(40px, 5.2vw, 56px)', fontWeight: 800,
        letterSpacing: '-0.034em', lineHeight: 1.07, color: c.title,
        marginBottom: 20, whiteSpace: 'pre-line',
      }}>
        {title}
      </div>
      <div style={{ fontSize: 14.5, color: c.body, lineHeight: 1.7, letterSpacing: '-0.005em', marginBottom: 28 }}>
        {description}
      </div>
      <div style={{
        alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 7,
        background: c.oBg, border: `1px solid ${c.oBdr}`, borderRadius: 20, padding: '7px 14px',
      }}>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M2 6L5 9L10 3" stroke={c.oText} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontSize: 12, fontWeight: 500, color: c.oText, letterSpacing: '-0.005em' }}>
          {outcome}
        </span>
      </div>
    </div>
  )
}

// ── Navbar ────────────────────────────────────────────────────
function Navbar() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const update = () => {
      const y = window.scrollY + 60
      const sections = Array.from(document.querySelectorAll('[data-theme]'))
      let theme = 'dark'
      for (const s of sections) {
        if (s.offsetTop <= y) theme = s.getAttribute('data-theme')
      }
      setIsDark(theme === 'dark')
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const color = isDark ? '#0a0a0a' : '#ffffff'

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 56, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 48px',
      background: isDark ? 'rgba(255,255,255,0.90)' : 'rgba(10,10,10,0.90)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderBottom: `1px solid ${isDark ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.08)'}`,
      transition: 'background 0.40s ease, border-color 0.40s ease',
    }}>
      <AnimatedWordmark
        color={color}
        style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.02em' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <a href="#contact" style={{
          fontSize: 13, fontWeight: 500, color,
          textDecoration: 'none', letterSpacing: '-0.005em', opacity: 0.68,
          transition: 'color 0.40s ease',
        }}>
          {t.nav.contact}
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <a href="/" style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.05em',
            color, textDecoration: 'none',
            opacity: lang === 'en' ? 0.85 : 0.32,
            transition: 'color 0.40s ease, opacity 0.18s ease',
            padding: '2px 4px',
          }}>EN</a>
          <span style={{ color, opacity: 0.18, fontSize: 11, margin: '0 2px' }}>|</span>
          <a href="/pt" style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.05em',
            color, textDecoration: 'none',
            opacity: lang === 'pt' ? 0.85 : 0.32,
            transition: 'color 0.40s ease, opacity 0.18s ease',
            padding: '2px 4px',
          }}>PT-BR</a>
        </div>
      </div>
    </nav>
  )
}

// ── Stack Marquee ─────────────────────────────────────────────
const DEVICON_CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'
const SIMPLE_CDN  = 'https://cdn.simpleicons.org'

const ROW1_ITEMS = [
  { name: 'Next.js',       icon: { type: 'devicon', slug: 'nextjs',       fallback: { bg: '#000000', label: 'Nx' } } },
  { name: 'React',         icon: { type: 'devicon', slug: 'react',         fallback: { bg: '#61dafb', label: 'Re' } } },
  { name: 'TypeScript',    icon: { type: 'devicon', slug: 'typescript',    fallback: { bg: '#3178c6', label: 'TS' } } },
  { name: 'Python',        icon: { type: 'devicon', slug: 'python',        fallback: { bg: '#3776ab', label: 'Py' } } },
  { name: 'FastAPI',       icon: { type: 'devicon', slug: 'fastapi',       fallback: { bg: '#009688', label: 'FA' } } },
  { name: 'PostgreSQL',    icon: { type: 'devicon', slug: 'postgresql',    fallback: { bg: '#336791', label: 'PG' } } },
  { name: 'Docker',        icon: { type: 'devicon', slug: 'docker',        fallback: { bg: '#2496ed', label: 'Do' } } },
  { name: 'Vercel',        icon: { type: 'devicon', slug: 'vercel',        fallback: { bg: '#000000', label: 'Vc' } } },
  { name: 'Supabase',      icon: { type: 'devicon', slug: 'supabase',      fallback: { bg: '#3ecf8e', label: 'Sb' } } },
  { name: 'Tailwind CSS',  icon: { type: 'devicon', slug: 'tailwindcss',   fallback: { bg: '#06b6d4', label: 'TW' } } },
  { name: 'Node.js',       icon: { type: 'devicon', slug: 'nodejs',        fallback: { bg: '#339933', label: 'Nd' } } },
  { name: 'Framer Motion', icon: { type: 'devicon', slug: 'framermotion',  fallback: { bg: '#0055ff', label: 'FM' } } },
]

const ROW2_ITEMS = [
  { name: 'n8n',           icon: { type: 'simple',   slug: 'n8n',          fallback: { bg: '#ff6d5a', label: 'n8' } } },
  { name: 'Claude API',    icon: { type: 'simple',   slug: 'anthropic',    fallback: { bg: '#cc785c', label: 'Cl' } } },
  { name: 'OpenAI',        icon: { type: 'simple',   slug: 'openai',       fallback: { bg: '#412991', label: 'OA' } } },
  { name: 'LangGraph',     icon: { type: 'monogram', bg: '#1a1a1a',        label: 'LG'                              } },
  { name: 'LangChain',     icon: { type: 'simple',   slug: 'langchain',    fallback: { bg: '#1c3c3c', label: 'LC' } } },
  { name: 'ChromaDB',      icon: { type: 'simple',   slug: 'chromadb',     fallback: { bg: '#ff6600', label: 'Ch' } } },
  { name: 'Airtable',      icon: { type: 'simple',   slug: 'airtable',     fallback: { bg: '#fcb400', label: 'At' } } },
  { name: 'Ollama',        icon: { type: 'simple',   slug: 'ollama',       fallback: { bg: '#000000', label: 'Ol' } } },
  { name: 'Firebase',      icon: { type: 'devicon',  slug: 'firebase',     fallback: { bg: '#ffca28', label: 'Fb' } } },
  { name: 'Cloudflare',    icon: { type: 'devicon',  slug: 'cloudflare',   fallback: { bg: '#f48120', label: 'CF' } } },
  { name: 'WhatsApp API',  icon: { type: 'simple',   slug: 'whatsapp',     fallback: { bg: '#25d366', label: 'WA' } } },
  { name: 'Evolution API', icon: { type: 'monogram', bg: '#6366f1',        label: 'Ev'                              } },
]

function StackIcon({ icon }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  const monoColor = icon.type === 'monogram' ? icon.bg : icon.fallback.bg
  const monoLabel = icon.type === 'monogram' ? icon.label : icon.fallback.label

  if (icon.type === 'monogram') {
    return (
      <div style={{
        width: 22, height: 22, borderRadius: 5, background: monoColor,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, fontSize: 9, fontWeight: 700, color: '#ffffff',
      }}>{monoLabel}</div>
    )
  }

  const src = icon.type === 'devicon'
    ? `${DEVICON_CDN}/${icon.slug}/${icon.slug}-original.svg`
    : `${SIMPLE_CDN}/${icon.slug}`

  return (
    <div style={{
      position: 'relative', width: 22, height: 22, flexShrink: 0,
      borderRadius: 5, background: monoColor,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ fontSize: 9, fontWeight: 700, color: '#ffffff', userSelect: 'none' }}>
        {monoLabel}
      </span>
      {!failed && (
        <img
          src={src} alt="" width={22} height={22}
          className="stack-icon-img"
          style={{ opacity: loaded ? 1 : 0 }}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

function StackMarquee() {
  return (
    <section data-theme="light" style={{
      width: '100%', background: '#ffffff',
      padding: '72px 0', position: 'relative',
    }}>
      <div style={{
        textAlign: 'center', marginBottom: 44,
        fontSize: 11, letterSpacing: '0.12em',
        color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase',
      }}>{t.stackLabel}</div>
      <div style={{
        overflow: 'hidden',
        width: '100%', display: 'flex', flexDirection: 'column', gap: 20,
        maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}>
        <div className="stack-marquee-line stack-marquee-line-1">
          {[...ROW1_ITEMS, ...ROW1_ITEMS, ...ROW1_ITEMS, ...ROW1_ITEMS].map((item, i) => (
            <div key={i} className="stack-item">
              <StackIcon icon={item.icon} />
              <span className="stack-item-name">{item.name}</span>
            </div>
          ))}
        </div>
        <div className="stack-marquee-line stack-marquee-line-2">
          {[...ROW2_ITEMS, ...ROW2_ITEMS, ...ROW2_ITEMS, ...ROW2_ITEMS].map((item, i) => (
            <div key={i} className="stack-item">
              <StackIcon icon={item.icon} />
              <span className="stack-item-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── S3: System 01 — Lead Engine (light) ───────────────────────
function System01Section() {
  const [ref, visible] = useVisible()
  return (
    <section data-theme="light" style={{ background: '#ffffff', padding: '96px 48px' }}>
      <div ref={ref} className="sys-layout" style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className={`fade-up${visible ? ' is-visible' : ''}`}>
          <SysCopy
            eyebrow={t.sys01.eyebrow} title={t.sys01.title}
            description={t.sys01.description}
            outcome={t.sys01.outcome} dark={false}
          />
        </div>
        <div className={`fade-up delay-1${visible ? ' is-visible' : ''}`} style={{ flex: 1, minWidth: 0 }}>
          <LeadEnginePanel inView={visible} />
        </div>
      </div>
    </section>
  )
}

// ── S4: System 02 — Client Intake (dark) ──────────────────────
function System02Section() {
  const [ref, visible] = useVisible()
  return (
    <section data-theme="dark" style={{ background: '#0a0a0a', padding: '96px 48px' }}>
      <div ref={ref} className="sys-layout" style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className={`fade-up${visible ? ' is-visible' : ''}`} style={{ flex: 1, minWidth: 0 }}>
          <IntakePanel inView={visible} />
        </div>
        <div className={`fade-up delay-1${visible ? ' is-visible' : ''}`}>
          <SysCopy
            eyebrow={t.sys02.eyebrow} title={t.sys02.title}
            description={t.sys02.description}
            outcome={t.sys02.outcome} dark={true}
          />
        </div>
      </div>
    </section>
  )
}

// ── S5: System 03 — Operational Runtime (light) ───────────────
function System03Section() {
  const [ref, visible] = useVisible()
  return (
    <section data-theme="light" style={{ background: '#ffffff', padding: '96px 48px' }}>
      <div ref={ref} className="sys-layout" style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className={`fade-up${visible ? ' is-visible' : ''}`}>
          <SysCopy
            eyebrow={t.sys03.eyebrow} title={t.sys03.title}
            description={t.sys03.description}
            outcome={t.sys03.outcome} dark={false}
          />
        </div>
        <div className={`fade-up delay-1${visible ? ' is-visible' : ''}`} style={{ flex: 1, minWidth: 0 }}>
          <InfraPanel inView={visible} />
        </div>
      </div>
    </section>
  )
}

// ── S5.5: Build Beyond Lead Capture ────────────────────────────

const BEYOND_ITEMS = [
  { id: 'dashboard',  label: t.beyond.navItems[0] },
  { id: 'reporting',  label: t.beyond.navItems[1] },
  { id: 'operations', label: t.beyond.navItems[2] },
  { id: 'ai',         label: t.beyond.navItems[3] },
  { id: 'diagnostic', label: t.beyond.navItems[4] },
]

function BeyondDashboardPanel() {
  const dp = t.dashboardPanel
  return (
    <div>

      {/* ── Main dashboard card ── */}
      <div style={{
        background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: 14, overflow: 'hidden',
        boxShadow: '0 2px 24px rgba(0,0,0,0.06)',
      }}>

        {/* Header */}
        <div style={{ padding: '13px 20px', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fafafa' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#111', letterSpacing: '-0.01em' }}>{dp.header}</span>
            <span style={{ fontSize: 10, color: '#bbb' }}>· {dp.live}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.18)', borderRadius: 20, padding: '4px 12px' }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#16a34a', letterSpacing: '-0.02em', lineHeight: 1 }}>92</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#16a34a', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{dp.health}</span>
          </div>
        </div>

        {/* 4 KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          {dp.kpis.map((m, i) => (
            <div key={i} style={{ padding: '14px 20px', borderRight: i < 3 ? '1px solid rgba(0,0,0,0.07)' : 'none' }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1 }}>{m.value}</div>
              <div style={{ fontSize: 10, color: m.green ? '#16a34a' : '#888', marginTop: 5, fontWeight: m.green ? 600 : 400 }}>{m.delta}</div>
            </div>
          ))}
        </div>

        {/* Two-column body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

          {/* Pipeline funnel */}
          <div style={{ padding: '16px 20px', borderRight: '1px solid rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#bbb', marginBottom: 14 }}>{dp.pipelineTitle}</div>
            {dp.pipelineRows.map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: '#555', minWidth: 118, flexShrink: 0 }}>{row.label}</span>
                <div style={{ flex: 1, height: 6, background: 'rgba(0,0,0,0.06)', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${row.pct}%`, background: '#111', borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#111', minWidth: 28, textAlign: 'right' }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Connected Systems — live status */}
          <div style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#bbb', marginBottom: 14 }}>{dp.systemsTitle}</div>
            {dp.systems.map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '16px 1fr auto', columnGap: 8, alignItems: 'center', marginTop: i > 0 ? 10 : 0, paddingBottom: i < 3 ? 10 : 0, borderBottom: i < 3 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                <div className={s.pingClass} style={{ width: 6, height: 6, borderRadius: '50%', background: s.dotColor, flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: '#0a0a0a' }}>{s.name}</span>
                <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', textAlign: 'right', whiteSpace: 'nowrap' }}>{s.count}</span>
              </div>
            ))}
            <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.3)', marginTop: 8 }}>{dp.systemsNominal}</div>
          </div>
        </div>
      </div>

      {/* ── Float cards row ── */}
      <div className="beyond-float-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 16 }}>

        {/* Meeting Booked */}
        <div className="beyond-float-card" style={{
          background: '#ffffff',
          border: '1px solid rgba(0,0,0,0.09)', borderRadius: 10, padding: '14px 16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14, color: '#6366f1', lineHeight: 1 }}>▦</span>
            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>{dp.cards.meetingLabel}</span>
          </div>
          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '8px 0' }} />
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0a0a0a' }}>Jessica Carter</div>
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.5)', marginTop: 1 }}>{dp.cards.meetingTime}</div>
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', marginTop: 1 }}>{dp.cards.meetingPlace}</div>
          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '8px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ fontSize: 11, fontWeight: 500, color: '#16a34a' }}>{dp.cards.meetingStatus}</span>
            </div>
            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.35)' }}>Agent: R. Mendes</span>
          </div>
        </div>

        {/* Opportunity Recovered */}
        <div className="beyond-float-card" style={{
          background: '#ffffff',
          border: '1px solid rgba(0,0,0,0.09)', borderRadius: 10, padding: '14px 16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13, color: '#16a34a', fontWeight: 700, lineHeight: 1 }}>✓</span>
            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>{dp.cards.oppLabel}</span>
          </div>
          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '8px 0' }} />
          <div style={{ fontSize: 20, fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1 }}>{dp.cards.oppAmount}</div>
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.5)', marginTop: 2 }}>{dp.cards.oppSub}</div>
          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '8px 0' }} />
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)' }}>Lead #2831</div>
          <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.35)', marginTop: 2 }}>{dp.cards.oppDays}</div>
          <div style={{ fontSize: 10, color: '#6366f1', marginTop: 6 }}>{dp.cards.oppAI}</div>
        </div>

        {/* Business Outcome */}
        <div className="beyond-float-card" style={{
          background: '#0a0a0a',
          borderRadius: 10, padding: '16px 18px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
        }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{dp.cards.thisMonth}</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#ffffff', lineHeight: 1, marginTop: 4 }}>127h</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{dp.cards.manualElim}</div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '12px 0' }} />
          {dp.cards.stats.map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: i < 2 ? 6 : 0 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{r.label}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: r.green ? '#22c55e' : '#ffffff' }}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BeyondReportingPanel() {
  const rp = t.reportingPanel
  return (
    <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>

      {/* Document header */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, color: '#aaa', marginBottom: 5, fontWeight: 500 }}>{rp.generated}</div>
          <div style={{ fontSize: 19, fontWeight: 800, color: '#0a0a0a', letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: 4 }}>{rp.title}</div>
          <div style={{ fontSize: 11, color: '#999' }}>{rp.period}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.18)', borderRadius: 20, padding: '5px 12px', flexShrink: 0 }}>
          <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontSize: 10.5, fontWeight: 600, color: '#16a34a' }}>{rp.delivered}</span>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ padding: '16px 24px 12px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: '#111', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{rp.metricsTitle}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8 }}>
          {rp.metrics.map((m, i) => (
            <div key={i} style={{ background: '#f7f7f7', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#111', letterSpacing: '-0.025em', lineHeight: 1 }}>{m.value}</div>
              <div style={{ fontSize: 9.5, color: '#999', marginTop: 3 }}>{m.label}</div>
              <div style={{ fontSize: 9, color: '#16a34a', fontWeight: 600, marginTop: 4 }}>{m.delta}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Observations + Recommendations */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        <div style={{ padding: '14px 24px', borderRight: '1px solid rgba(0,0,0,0.07)' }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#bbb', marginBottom: 10 }}>{rp.obsTitle}</div>
          {rp.obs.map((obs, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 10, color: '#ccc', marginTop: 3, flexShrink: 0 }}>→</span>
              <span style={{ fontSize: 11.5, color: '#444', lineHeight: 1.5 }}>{obs}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '14px 24px' }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#bbb', marginBottom: 10 }}>{rp.recTitle}</div>
          {rp.rec.map((rec, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 9.5, fontWeight: 700, color: '#ccc', flexShrink: 0, marginTop: 2 }}>{i + 1}.</span>
              <span style={{ fontSize: 11.5, color: '#444', lineHeight: 1.5 }}>{rec}</span>
            </div>
          ))}
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#bbb', marginBottom: 8 }}>{rp.alertsTitle}</div>
            {rp.alerts.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5, alignItems: 'center' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#d97706', flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: '#666' }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '9px 24px', borderTop: '1px solid rgba(0,0,0,0.07)', background: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: '#bbb' }}>{rp.nextReport}</span>
        <span style={{ fontSize: 10, color: '#ccc' }}>Report #47</span>
      </div>
    </div>
  )
}

function BeyondOperationsPanel() {
  const op = t.operationsPanel
  return (
    <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>

      {/* Header */}
      <div style={{ padding: '13px 20px', borderBottom: '1px solid rgba(0,0,0,0.07)', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#111', letterSpacing: '-0.01em' }}>{op.header}</span>
        </div>
        <span style={{ fontSize: 10, color: '#bbb' }}>{op.status}</span>
      </div>

      {/* System nodes */}
      <div style={{ padding: '14px 20px 10px', display: 'flex', gap: 8 }}>
        {op.systems.map((sys, i) => (
          <div key={i} style={{ flex: 1, padding: '10px 10px', background: '#f9f9f9', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 8, textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} />
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#111', letterSpacing: '-0.005em' }}>{sys.name}</div>
            <div style={{ fontSize: 9.5, color: '#aaa', marginTop: 3 }}>{sys.events}</div>
          </div>
        ))}
      </div>

      {/* Coordination flow */}
      <div style={{ padding: '8px 20px 16px' }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#bbb', marginBottom: 10 }}>{op.flowTitle}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {op.flows.map((flow, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#f9f9f9', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#111', minWidth: 66, flexShrink: 0 }}>{flow.from}</span>
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" style={{ flexShrink: 0 }}>
                <path d="M1 5h12M10 1l4 4-4 4" stroke="rgba(0,0,0,0.20)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#111', minWidth: 66, flexShrink: 0 }}>{flow.to}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: '#222', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{flow.label}</div>
                <div style={{ fontSize: 10, color: '#999', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{flow.sub}</div>
              </div>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BeyondAIPanel() {
  const ai = t.aiPanel
  return (
    <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>

      {/* Header */}
      <div style={{ padding: '13px 20px', borderBottom: '1px solid rgba(0,0,0,0.07)', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#111', letterSpacing: '-0.01em' }}>{ai.header}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 10, color: '#aaa' }}>{ai.agentsActive}</span>
          <span style={{ fontSize: 10, color: '#aaa' }}>{ai.tasksToday}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.16)', borderRadius: 20, padding: '3px 9px' }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ fontSize: 9.5, fontWeight: 600, color: '#16a34a' }}>{ai.failures}</span>
          </div>
        </div>
      </div>

      {/* Agent grid: 3 + 2 */}
      <div style={{ padding: '16px 20px 8px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 10 }}>
          {ai.agents.slice(0, 3).map((agent, i) => (
            <div key={i} style={{ background: '#f9f9f9', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 10, padding: '14px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                <span style={{ fontSize: 9.5, fontWeight: 700, color: '#16a34a', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{ai.active}</span>
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#111', letterSpacing: '-0.01em', marginBottom: 6, lineHeight: 1.3 }}>{agent.name}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#111', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 4 }}>{agent.tasks}</div>
              <div style={{ fontSize: 9, color: '#bbb', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{ai.tasksTodayLabel}</div>
              <div style={{ fontSize: 10, color: '#888', lineHeight: 1.4, borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 8 }}>{agent.current}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 16 }}>
          {ai.agents.slice(3).map((agent, i) => (
            <div key={i} style={{ background: '#f9f9f9', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 10, padding: '14px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                <span style={{ fontSize: 9.5, fontWeight: 700, color: '#16a34a', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{ai.active}</span>
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#111', letterSpacing: '-0.01em', marginBottom: 6, lineHeight: 1.3 }}>{agent.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#111', letterSpacing: '-0.03em', lineHeight: 1 }}>{agent.tasks}</div>
                <div style={{ fontSize: 9, color: '#bbb', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{ai.tasksTodayLabel}</div>
              </div>
              <div style={{ fontSize: 10, color: '#888', lineHeight: 1.4, borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 8 }}>{agent.current}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BeyondDiagnosticPanel() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    setPhase(0)
    const timers = [
      setTimeout(() => setPhase(1), 500),   // URL bar appears
      setTimeout(() => setPhase(2), 1200),  // scanning starts
      setTimeout(() => setPhase(3), 2000),  // issue 1
      setTimeout(() => setPhase(4), 2500),  // issue 2
      setTimeout(() => setPhase(5), 3000),  // issue 3
      setTimeout(() => setPhase(6), 3500),  // issue 4
      setTimeout(() => setPhase(7), 4000),  // issue 5
      setTimeout(() => setPhase(8), 4500),  // issue 6
      setTimeout(() => setPhase(9), 5100),  // score
      setTimeout(() => setPhase(10), 5700), // actions
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const diag = t.diagnosticPanel
  const issues = diag.issues
  const actions = diag.actions

  return (
    <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>

      {/* Header */}
      <div style={{ padding: '13px 20px', borderBottom: '1px solid rgba(0,0,0,0.07)', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#bbb', marginBottom: 2 }}>{diag.title}</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#111', letterSpacing: '-0.01em' }}>{diag.subtitle}</div>
        </div>
        {phase >= 9 && (
          <div style={{ fontSize: 10, fontWeight: 600, color: '#dc2626', background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.14)', borderRadius: 20, padding: '4px 10px', transition: 'opacity 0.4s' }}>{diag.complete}</div>
        )}
      </div>

      <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* URL bar */}
        <div style={{ opacity: phase >= 1 ? 1 : 0, transition: 'opacity 0.4s', display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 7 }}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="rgba(0,0,0,0.28)" strokeWidth="1.4"/><path d="M6 3v3l2 1.5" stroke="rgba(0,0,0,0.28)" strokeWidth="1.3" strokeLinecap="round"/></svg>
          <span style={{ fontSize: 11, fontFamily: "'SF Mono','Fira Code',monospace", color: '#777' }}>yourbusiness.com/operations</span>
          {phase >= 2 && phase < 9 && <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 600, color: '#d97706' }}>{diag.scanning}</span>}
        </div>

        {/* Issues */}
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#bbb', marginBottom: 8, opacity: phase >= 3 ? 1 : 0, transition: 'opacity 0.3s' }}>{diag.problemsTitle}</div>
          {issues.map((issue, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 9, padding: '5px 0',
              borderBottom: i < issues.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
              opacity: phase >= i + 3 ? 1 : 0,
              transform: phase >= i + 3 ? 'translateY(0)' : 'translateY(5px)',
              transition: 'opacity 0.35s, transform 0.35s',
            }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M2.5 7.5L5 5M5 5L7.5 2.5M5 5L2.5 2.5M5 5L7.5 7.5" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <span style={{ fontSize: 11.5, color: '#555', letterSpacing: '-0.005em' }}>{issue}</span>
            </div>
          ))}
        </div>

        {/* Score + Recommendations + Impact */}
        <div style={{ opacity: phase >= 9 ? 1 : 0, transition: 'opacity 0.5s', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 14 }}>

          {/* Operational score */}
          <div style={{ padding: '10px 14px', background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.14)', borderRadius: 10, textAlign: 'center', minWidth: 72 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#dc2626', letterSpacing: '-0.04em', lineHeight: 1 }}>2</div>
            <div style={{ fontSize: 9, color: 'rgba(220,38,38,0.65)', fontWeight: 600, marginTop: 2 }}>/10</div>
            <div style={{ fontSize: 8.5, color: '#aaa', marginTop: 5, fontWeight: 500, lineHeight: 1.4 }}>{diag.scoreLabel}</div>
          </div>

          {/* Recommendations */}
          <div style={{ opacity: phase >= 10 ? 1 : 0, transition: 'opacity 0.4s' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#4A7CF7', marginBottom: 8 }}>{diag.actionsTitle}</div>
            {actions.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(74,124,247,0.08)', border: '1px solid rgba(74,124,247,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="7" height="7" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#4A7CF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span style={{ fontSize: 11, color: '#555', letterSpacing: '-0.005em' }}>{a}</span>
              </div>
            ))}
          </div>

          {/* Estimated impact */}
          <div style={{ opacity: phase >= 10 ? 1 : 0, transition: 'opacity 0.4s', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 130 }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#bbb', marginBottom: 5 }}>{diag.impactTitle}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#16a34a', letterSpacing: '-0.03em', lineHeight: 1 }}>847 hrs</div>
              <div style={{ fontSize: 10, color: '#aaa', marginTop: 3 }}>{diag.impactSub}</div>
            </div>
            <div style={{ paddingTop: 8, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#bbb', marginBottom: 5 }}>{diag.revenueTitle}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#16a34a', letterSpacing: '-0.03em', lineHeight: 1 }}>$48k</div>
              <div style={{ fontSize: 10, color: '#aaa', marginTop: 3 }}>{diag.revenueSub}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const BEYOND_PANEL_MAP = [BeyondDashboardPanel, BeyondReportingPanel, BeyondOperationsPanel, BeyondAIPanel, BeyondDiagnosticPanel]

function BuildBeyondSection() {
  const [ref, sectionVisible] = useVisible(0.08)
  const [activeIdx, setActiveIdx]     = useState(0)
  const [panelVisible, setPanelVisible] = useState(true)
  const timerRef = useRef(null)

  useEffect(() => {
    const run = () => {
      setPanelVisible(false)
      setTimeout(() => {
        setActiveIdx(i => (i + 1) % BEYOND_ITEMS.length)
        setPanelVisible(true)
      }, 200)
    }
    timerRef.current = setInterval(run, 4800)
    return () => clearInterval(timerRef.current)
  }, [])

  const handleNavClick = (idx) => {
    clearInterval(timerRef.current)
    if (idx === activeIdx) return
    setPanelVisible(false)
    setTimeout(() => { setActiveIdx(idx); setPanelVisible(true) }, 200)
  }

  const ActivePanel = BEYOND_PANEL_MAP[activeIdx]

  return (
    <section data-theme="light" style={{
      background: '#ffffff',
      backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      padding: '96px 40px',
    }}>
      <div ref={ref} style={{ maxWidth: 1240, margin: '0 auto' }}>

        {/* Header */}
        <div className={`fade-up${sectionVisible ? ' is-visible' : ''}`} style={{ marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(0,0,0,0.22)' }} />
            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)' }}>
              {t.beyond.eyebrow}
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(40px,5.2vw,56px)', fontWeight: 800, color: '#0a0a0a', letterSpacing: '-0.034em', lineHeight: 1.07, margin: '0 0 16px' }}>
            {t.beyond.title}
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(0,0,0,0.50)', lineHeight: 1.7, maxWidth: 560, margin: 0, letterSpacing: '-0.005em' }}>
            {t.beyond.body}
          </p>
        </div>

        {/* Nav + Panel */}
        <div className={`fade-up delay-1${sectionVisible ? ' is-visible' : ''}`} style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>

          {/* Left nav */}
          <div className="beyond-nav" style={{ width: 140, flexShrink: 0, paddingTop: 2 }}>
            {BEYOND_ITEMS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(i)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '6px 10px',
                  background: 'transparent',
                  border: 'none',
                  borderLeft: activeIdx === i ? '3px solid #0a0a0a' : '2px solid rgba(0,0,0,0.10)',
                  borderRadius: '0 4px 4px 0',
                  cursor: 'pointer', marginBottom: 3,
                  fontSize: 12, fontWeight: activeIdx === i ? 600 : 400,
                  color: activeIdx === i ? '#0a0a0a' : 'rgba(0,0,0,0.4)',
                  fontFamily: 'inherit', letterSpacing: '-0.005em',
                  transition: 'all 0.18s ease',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right showcase panel — each panel owns its own visual container */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              opacity: panelVisible ? 1 : 0,
              transform: panelVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.99)',
              transition: 'opacity 0.32s cubic-bezier(0.22,1,0.36,1), transform 0.32s cubic-bezier(0.22,1,0.36,1)',
            }}>
              <ActivePanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── S6: Dashboard — WhatsApp Lead Engine (dark) ───────────────
function DashboardSection() {
  const [ref, visible] = useVisible()
  return (
    <section data-theme="dark" style={{ background: '#0a0a0a', padding: '96px 48px' }}>
      <div ref={ref} style={{ maxWidth: 560, margin: '0 auto' }}>
        <div className={`fade-up${visible ? ' is-visible' : ''}`} style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            fontSize: 9.5, fontWeight: 700, letterSpacing: '0.13em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 14,
          }}>
            {t.dashSection.eyebrow}
          </div>
          <div style={{
            fontSize: 'clamp(36px,4.5vw,52px)', fontWeight: 800,
            letterSpacing: '-0.034em', lineHeight: 1.07, color: '#ffffff', marginBottom: 14,
          }}>
            {t.dashSection.title1}<br />{t.dashSection.title2}
          </div>
          <div style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.62)', lineHeight: 1.68, letterSpacing: '-0.005em' }}>
            {t.dashSection.subtitle}
          </div>
        </div>
        <div className={`fade-up delay-1${visible ? ' is-visible' : ''}`}>
          <DashboardPanel inView={visible} />
        </div>
      </div>
    </section>
  )
}

// ── S7: Closing CTA ────────────────────────────────────────────

function CTASection() {
  const [ref, visible] = useVisible(0.2)
  return (
    <section data-theme="light" style={{
      background: '#ffffff', minHeight: '60vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div ref={ref} className={`fade-up${visible ? ' is-visible' : ''}`} style={{
        textAlign: 'center', maxWidth: 900, padding: '0 40px',
      }}>
        <p style={{
          fontSize: 'clamp(52px, 7vw, 96px)', fontWeight: 800,
          color: '#0a0a0a', lineHeight: 1.05, letterSpacing: '-0.035em',
          margin: 0,
        }}>
          <span style={{ display: 'block' }}>{t.cta.prefix}</span>
          <span style={{ display: 'block' }}>
            <ContainerTextFlip
              words={t.cta.words}
              interval={2400}
              inline={true}
            />{t.cta.suffix}
          </span>
        </p>
      </div>
    </section>
  )
}

// ── S8: Bio + Contact (dark) ──────────────────────────────────
const FORMSPREE_ID = 'mjgdploe' // substitua pelo ID do Formspree

function BioContactSection() {
  const [ref, visible] = useVisible()
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: JSON.stringify({
          email: form.email.value,
          message: form.message.value,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      if (res.ok) {
        setStatus('done')
        form.reset()
      } else {
        const body = await res.json().catch(() => ({}))
        console.error('Formspree error:', res.status, body)
        setStatus('error')
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setStatus('error')
    }
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: 10, padding: '13px 16px',
    fontSize: 13.5, color: '#ffffff',
    letterSpacing: '-0.005em', width: '100%',
    fontFamily: 'inherit', transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" data-theme="dark" style={{
      background: '#0a0a0a', padding: '96px 48px 0',
    }}>
      <div ref={ref} style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div className="bio-grid">
          {/* Left — Bio */}
          <div className={`fade-up${visible ? ' is-visible' : ''}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
              <img
                src="/pic.jpeg"
                alt="Shala Neves"
                style={{
                  width: 72, height: 72, borderRadius: '50%',
                  objectFit: 'cover', flexShrink: 0,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              />
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  Shala Neves
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.36)', marginTop: 3, letterSpacing: '-0.005em' }}>
                  {t.bio.role}
                </div>
              </div>
            </div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.52)', lineHeight: 1.72, letterSpacing: '-0.007em', marginBottom: 20 }}>
              {t.bio.p1}
            </p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.30)', lineHeight: 1.7, letterSpacing: '-0.006em' }}>
              {t.bio.p2}
            </p>
          </div>

          {/* Right — Contact form */}
          <div className={`fade-up delay-1${visible ? ' is-visible' : ''}`}>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 20,
            }}>
              {t.bio.contactLabel}
            </div>

            {status === 'done' ? (
              <div style={{
                padding: '20px 0', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7,
              }}>
                {t.bio.success}
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input name="email" type="email" placeholder={t.bio.emailPlaceholder} required style={inputStyle} />
                <textarea name="message" placeholder={t.bio.messagePlaceholder} required rows={5}
                  style={{ ...inputStyle, resize: 'vertical' }} />
                {status === 'error' && (
                  <span style={{ fontSize: 12, color: 'rgba(255,100,100,0.8)' }}>
                    {t.bio.error}
                  </span>
                )}
                <button type="submit" disabled={status === 'sending'} style={{
                  background: '#ffffff', color: '#0a0a0a', border: 'none',
                  borderRadius: 10, padding: '13px 24px',
                  fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.005em',
                  cursor: status === 'sending' ? 'default' : 'pointer',
                  fontFamily: 'inherit', alignSelf: 'flex-start',
                  opacity: status === 'sending' ? 0.5 : 1,
                  transition: 'opacity 0.2s',
                }}>
                  {status === 'sending' ? t.bio.sending : t.bio.sendButton}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        maxWidth: 1000, margin: '64px auto 0', padding: '24px 0',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)' }}>© 2026 Shala Neves</span>
        <div style={{ display: 'flex', gap: 24 }}>
          {[['GitHub', 'https://github.com/shalasch'], ['LinkedIn', 'https://linkedin.com/in/shalasch']].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
              fontSize: 12, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontWeight: 500,
            }}>
              {label}
            </a>
          ))}
        </div>
      </div>
      <div style={{ height: 48 }} />
    </section>
  )
}

// ── App ───────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Navbar />

      {/* S1: Hero (light) */}
      <HeroSection />

      {/* S3: Lead Engine (light) */}
      <System01Section />

      <Bleed from="#ffffff" to="#0a0a0a" />

      {/* S4: Client Intake (dark) */}
      <System02Section />

      <Bleed from="#0a0a0a" to="#ffffff" />

      {/* S5: Operational Runtime (light) */}
      <System03Section />

      {/* Stack Marquee (light) */}
      <StackMarquee />

      {/* S5.5: Build Beyond Lead Capture (off-white) */}
      <BuildBeyondSection />

      <Bleed from="#f9f9f7" to="#0a0a0a" />

      {/* S6: Dashboard (dark) */}
      <DashboardSection />

      <Bleed from="#0a0a0a" to="#ffffff" />

      {/* S7: CTA (light) */}
      <CTASection />

      <Bleed from="#ffffff" to="#0a0a0a" />

      {/* S8: Bio + Contact (dark) */}
      <BioContactSection />
    </>
  )
}
