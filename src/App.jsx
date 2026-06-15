import { useState, useEffect, useRef } from 'react'
import { AnimatedWordmark } from './components/AnimatedWordmark'
import ContainerTextFlip from './components/ContainerTextFlip'
import WavyBackground from './components/WavyBackground'
import HeroRampV2 from './HeroRampV2'
import LeadEnginePanel from './panels/LeadEnginePanel'
import IntakePanel from './panels/IntakePanel'
import InfraPanel from './panels/InfraPanel'
import DashboardPanel from './panels/DashboardPanel'

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
  const TICKER = '847 LEADS CAPTURED · 12 WORKFLOWS RUNNING · 1.2s AVG RESPONSE · 23 MEETINGS BOOKED THIS WEEK · 4 CLIENTS ACTIVE · CRM SYNCED · FOLLOW-UPS AUTOMATED · '

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
          OPERATIONAL INFRASTRUCTURE · BUILT BY SHALA NEVES
        </span>
        <h1 style={{ fontSize: 'clamp(40px, 5.5vw, 76px)', fontWeight: 800, color: '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0 }}>
          <span style={{ display: 'block' }}>Every customer journey</span>
          <span style={{ display: 'block' }}>is a system.</span>
        </h1>
        <p style={{ margin: '20px auto 0', fontSize: 16, color: 'rgba(0,0,0,0.50)', lineHeight: 1.65, maxWidth: 460 }}>
          I design and build the systems that power lead capture, qualification, follow-up and operations.
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
          · SYSTEMS ACTIVE
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
      <a href="#contact" style={{
        fontSize: 13, fontWeight: 500, color,
        textDecoration: 'none', letterSpacing: '-0.005em', opacity: 0.68,
        transition: 'color 0.40s ease',
      }}>
        Contact
      </a>
    </nav>
  )
}

// ── S2: Stack Grid (Ramp-style ticker + logo grid) ─────────────
const GRID_LOGOS = [
  // Row 1
  { name: 'n8n',           type: 'svg-n8n'                                                    },
  { name: 'Python',        type: 'devicon', slug: 'python',     file: 'python-original.svg'   },
  { name: 'FastAPI',       type: 'mono-sq', bg: '#009688', text: 'F',   textSize: 13          },
  { name: 'PostgreSQL',    type: 'devicon', slug: 'postgresql', file: 'postgresql-original.svg'},
  { name: 'Claude API',    type: 'mono-sq', bg: '#cc785c', text: 'Cl',  textSize: 11          },
  { name: 'WhatsApp API',  type: 'svg-wa'                                                      },
  // Row 2
  { name: 'LangGraph',     type: 'mono-sq', bg: '#1a1a1a', text: 'LG',  textSize: 11          },
  { name: 'Docker',        type: 'devicon', slug: 'docker',     file: 'docker-original.svg'   },
  { name: 'Vercel',        type: 'svg-vercel'                                                  },
  { name: 'Supabase',      type: 'devicon', slug: 'supabase',   file: 'supabase-original.svg' },
  { name: 'Evolution API', type: 'mono-sq', bg: '#6366f1', text: 'Ev',  textSize: 11          },
  { name: 'Airtable',      type: 'svg-airtable'                                                },
]

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

function LogoIcon({ type, slug, file, bg, text, textSize }) {
  if (type === 'devicon') return (
    <img src={`${DEVICON_BASE}/${slug}/${file}`} alt="" width={32} height={32} style={{ display: 'block' }} />
  )
  if (type === 'mono-sq') return (
    <div style={{ width: 32, height: 32, borderRadius: 6, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: textSize || 13, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>{text}</span>
    </div>
  )
  if (type === 'svg-n8n') return (
    <svg width="32" height="32" viewBox="0 0 32 32" style={{ display: 'block' }}>
      <rect width="32" height="32" rx="6" fill="#ff6d5a" />
      <text x="16" y="21" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">n8n</text>
    </svg>
  )
  if (type === 'svg-wa') return (
    <svg width="32" height="32" viewBox="0 0 32 32" style={{ display: 'block' }}>
      <circle cx="16" cy="16" r="15" fill="#25d366" />
      <path d="M22 19.5c-.3-.2-1.8-.9-2.1-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-1 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.8-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.1-.3.1-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .2.2 2 3.1 4.9 4.3.7.3 1.2.4 1.6.5.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.8-1.3.2-.7.2-1.2.1-1.3-.2-.2-.4-.3-.7-.4z" fill="white"/>
    </svg>
  )
  if (type === 'svg-vercel') return (
    <svg width="32" height="32" viewBox="0 0 32 32" style={{ display: 'block' }}>
      <polygon points="16,6 28,26 4,26" fill="black" />
    </svg>
  )
  if (type === 'svg-airtable') return (
    <svg width="32" height="32" viewBox="0 0 32 32" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="at-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FCB400" />
          <stop offset="100%" stopColor="#F7D039" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="5" fill="url(#at-g)" />
      <text x="16" y="23" textAnchor="middle" fill="white" fontSize="17" fontWeight="800" fontFamily="Inter, sans-serif">A</text>
    </svg>
  )
  return null
}

function LogoCell({ name, type, slug, file, bg, text, textSize }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 10,
        borderRight: '1px solid rgba(0,0,0,0.07)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        background: hovered ? '#fafafa' : 'transparent',
        transition: 'background 0.15s ease',
        cursor: 'default',
      }}
    >
      <div style={{
        filter: hovered ? 'none' : 'grayscale(100%) opacity(0.55)',
        transition: 'filter 0.2s ease',
        display: 'flex',
      }}>
        <LogoIcon type={type} slug={slug} file={file} bg={bg} text={text} textSize={textSize} />
      </div>
      <span style={{
        fontSize: 12, fontWeight: 500, letterSpacing: '0.02em',
        color: hovered ? 'rgba(0,0,0,0.70)' : 'rgba(0,0,0,0.40)',
        transition: 'color 0.15s ease',
      }}>
        {name}
      </span>
    </div>
  )
}

function StackSection() {
  const [count, setCount] = useState(47)
  const [leads, setLeads] = useState(847)
  const [messages, setMessages] = useState(2341)
  const [crm, setCrm] = useState(1204)

  useEffect(() => {
    const t1 = setInterval(() => setCount(n => n + 1), 3000)
    const t2 = setInterval(() => setLeads(n => n + 1), 4200)
    const t3 = setInterval(() => setMessages(n => n + 1), 2000)
    const t4 = setInterval(() => setCrm(n => n + 1), 3800)
    return () => [t1, t2, t3, t4].forEach(clearInterval)
  }, [])

  const fmt = n => n.toLocaleString('pt-BR')

  const tickerContent =
    `WORKFLOWS ACTIVE: 12 · LEADS PROCESSED: ${fmt(leads)} · MESSAGES SENT: ${fmt(messages)} · INTEGRATIONS RUNNING: 9 · AUTOMATIONS DEPLOYED: 23 · CRM RECORDS SYNCED: ${fmt(crm)} · `

  return (
    <section data-theme="light" style={{ background: '#ffffff' }}>
      {/* Top separator */}
      <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06), transparent)' }} />

      {/* Ticker bar */}
      <div style={{
        height: 36, borderBottom: '1px solid rgba(0,0,0,0.08)',
        display: 'flex', alignItems: 'center', background: '#ffffff', overflow: 'hidden',
      }}>
        {/* Left anchor */}
        <div style={{
          flexShrink: 0, padding: '0 20px', whiteSpace: 'nowrap',
          borderRight: '1px solid rgba(0,0,0,0.08)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          {/* 2×2 grid icon */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ width: 3, height: 3, background: 'rgba(0,0,0,0.4)', borderRadius: 0.5 }} />
            ))}
          </div>
          <span style={{ fontSize: 10, letterSpacing: '0.10em', color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase' }}>
            Stack in use:
          </span>
          <div style={{ width: 1, height: 16, background: 'rgba(0,0,0,0.1)', margin: '0 6px' }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: '#0a0a0a', fontVariantNumeric: 'tabular-nums' }}>
            {count}
          </span>
        </div>

        {/* Scrolling right side */}
        <div className="marquee-wrap" style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{
            display: 'inline-flex', whiteSpace: 'nowrap',
            fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.4)', paddingLeft: 20,
            animation: 'ticker-scroll 40s linear infinite',
          }}>
            {tickerContent}{tickerContent}{tickerContent}{tickerContent}
          </div>
        </div>
      </div>

      {/* Technology grid — edge to edge */}
      <div style={{
        display: 'grid', position: 'relative',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gridTemplateRows: 'repeat(2, 160px)',
      }}>
        {/* Cell [0,0] — text card spanning 2 rows */}
        <div style={{
          gridRow: '1 / 3', gridColumn: '1 / 2',
          background: '#f7f7f7', padding: '28px 24px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          borderRight: '1px solid rgba(0,0,0,0.07)',
        }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#0a0a0a', lineHeight: 1.5, maxWidth: 160, display: 'block' }}>
            Built on tools that run in production.
          </span>
          <a href="#" style={{
            fontSize: 12, color: 'rgba(0,0,0,0.40)',
            textDecoration: 'none', cursor: 'pointer',
            transition: 'color 0.15s ease',
          }}
            onMouseEnter={e => e.target.style.color = '#0a0a0a'}
            onMouseLeave={e => e.target.style.color = 'rgba(0,0,0,0.40)'}
          >
            View full stack →
          </a>
        </div>

        {/* Logo cells */}
        {GRID_LOGOS.map((logo) => (
          <LogoCell key={logo.name} {...logo} />
        ))}

        {/* Intersection dots — rendered last so they paint above cells */}
        {[1,2,3,4,5,6].map(k => (
          <span key={k} style={{
            position: 'absolute',
            top: 160, left: `${(k / 7) * 100}%`,
            width: 14, height: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, color: 'rgba(0,0,0,0.28)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none', zIndex: 10,
            lineHeight: 1, userSelect: 'none',
          }}>+</span>
        ))}
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
            eyebrow="System 01" title={"Lead\nEngine"}
            description="Captures, qualifies and routes opportunities without manual follow-up."
            outcome="Lead → Qualified → Scheduled" dark={false}
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
            eyebrow="System 02" title={"Client Intake\nRuntime"}
            description="Receives inquiries, qualifies prospects and schedules appointments automatically."
            outcome="Inquiry → Qualified → Booked" dark={true}
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
            eyebrow="System 03" title={"Operational\nRuntime"}
            description="Connects business systems into a single operational workflow."
            outcome="Disconnected → Coordinated" dark={false}
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
  { id: 'dashboard',   label: 'Dashboard Layer'     },
  { id: 'reporting',   label: 'Reporting Runtime'   },
  { id: 'operations',  label: 'Internal Operations' },
  { id: 'ai',          label: 'AI Employees'        },
  { id: 'diagnostic',  label: 'Business Diagnostic' },
]

function BeyondDashboardPanel() {
  const SPARKS = {
    response: [1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2],
    meetings: [14, 16, 17, 18, 20, 21, 23],
    velocity: [6.1, 5.8, 5.2, 4.9, 4.7, 4.5, 4.2],
  }
  const ALERTS = [
    { dot: '#F59E0B', text: 'SLA near breach · Lead #2851', time: '4m ago' },
    { dot: '#22c55e', text: '3 opportunities recovered',    time: '12m ago' },
    { dot: '#22c55e', text: '4 leads routed automatically', time: '18m ago' },
    { dot: '#4A7CF7', text: 'Weekly report generated',      time: '2h ago'  },
  ]

  return (
    <div>
      {/* Header */}
      <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: 11.5, fontWeight: 600, color: '#0a0a0a', letterSpacing: '-0.01em' }}>Live Operations</span>
        </div>
        <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.33)' }}>Refreshing every 30s · Jun 15, 2026</span>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        {[
          { label: 'Lead Response',     value: '1.2s',  delta: '↓ 18%',       note: 'this week',      spark: SPARKS.response, rev: true  },
          { label: 'Meetings Booked',   value: '23',    delta: '↑ +6',         note: 'vs last week',   spark: SPARKS.meetings, rev: false },
          { label: 'Pipeline Velocity', value: '4.2d',  delta: '↓ improving',  note: 'avg lead→mtg',   spark: SPARKS.velocity, rev: true  },
        ].map((kpi, i) => (
          <div key={i} style={{ padding: '14px 20px', borderRight: i < 2 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.30)', marginBottom: 7 }}>{kpi.label}</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1 }}>{kpi.value}</div>
                <div style={{ display: 'flex', gap: 5, marginTop: 5, alignItems: 'center' }}>
                  <span style={{ fontSize: 10.5, fontWeight: 600, color: '#16a34a' }}>{kpi.delta}</span>
                  <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.33)' }}>{kpi.note}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 30, flexShrink: 0 }}>
                {kpi.spark.map((v, si) => {
                  const mn = Math.min(...kpi.spark), mx = Math.max(...kpi.spark)
                  const raw = (v - mn) / (mx - mn)
                  const h = kpi.rev ? (1 - raw) : raw
                  return (
                    <div key={si} style={{ width: 4, height: `${Math.round(Math.max(h, 0.12) * 100)}%`, background: si === kpi.spark.length - 1 ? '#0a0a0a' : 'rgba(0,0,0,0.12)', borderRadius: '2px 2px 0 0' }} />
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* Lead Sources + SLA */}
        <div style={{ padding: '14px 20px', borderRight: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.30)', marginBottom: 11 }}>Lead Sources</div>
          {[
            { label: 'WhatsApp', pct: 45, color: '#25D366', count: '64 leads' },
            { label: 'Web Form', pct: 32, color: '#4A7CF7', count: '45 leads' },
            { label: 'Referral', pct: 23, color: '#F59E0B', count: '33 leads' },
          ].map(src => (
            <div key={src.label} style={{ marginBottom: 9 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: src.color }} />
                  <span style={{ fontSize: 11.5, fontWeight: 500, color: '#0a0a0a' }}>{src.label}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ fontSize: 10.5, color: 'rgba(0,0,0,0.38)' }}>{src.count}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#0a0a0a', minWidth: 28, textAlign: 'right' }}>{src.pct}%</span>
                </div>
              </div>
              <div style={{ height: 3, borderRadius: 2, background: 'rgba(0,0,0,0.07)' }}>
                <div style={{ height: '100%', width: `${src.pct}%`, background: src.color, borderRadius: 2 }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.30)' }}>SLA Compliance</span>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: '#16a34a' }}>96%</span>
            </div>
            <div style={{ height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.07)' }}>
              <div style={{ height: '100%', width: '96%', background: 'linear-gradient(to right, #4A7CF7, #22c55e)', borderRadius: 2 }} />
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div style={{ padding: '14px 20px' }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.30)', marginBottom: 11 }}>Recent Alerts</div>
          {ALERTS.map((al, i) => (
            <div key={i} style={{ display: 'flex', gap: 9, marginBottom: 11, alignItems: 'flex-start' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: al.dot, flexShrink: 0, marginTop: 3 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11.5, color: '#0a0a0a', lineHeight: 1.4 }}>{al.text}</div>
                <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.35)', marginTop: 1 }}>{al.time}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 6, paddingTop: 10, borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 10.5, color: 'rgba(0,0,0,0.38)' }}>Opp. Recovery</span>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: '#16a34a' }}>23 recovered this week</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function BeyondReportingPanel() {
  return (
    <div>
      {/* Delivery header */}
      <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)', background: '#fafaf8', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 30, height: 30, borderRadius: 7, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
            <rect x="0.75" y="0.75" width="12.5" height="10.5" rx="1.5" stroke="white" strokeWidth="1.5"/>
            <path d="M1 2.5L7 7L13 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.01em' }}>Weekly Operational Summary</div>
          <div style={{ fontSize: 10.5, color: 'rgba(0,0,0,0.40)', marginTop: 1 }}>Generated Mon Jun 15 · 08:00 AM · 3 recipients</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.20)', borderRadius: 20, padding: '4px 10px', flexShrink: 0 }}>
          <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontSize: 10, fontWeight: 600, color: '#16a34a' }}>Delivered</span>
        </div>
      </div>

      {/* Report period bar */}
      <div style={{ padding: '8px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(0,0,0,0.014)' }}>
        <span style={{ fontSize: 10.5, fontWeight: 500, color: 'rgba(0,0,0,0.45)' }}>Period: Jun 9 – 15, 2026</span>
        <div style={{ width: 1, height: 12, background: 'rgba(0,0,0,0.12)' }} />
        <span style={{ fontSize: 10.5, color: 'rgba(0,0,0,0.33)' }}>Next: Jun 22 · 08:00 AM</span>
        <span style={{ marginLeft: 'auto', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.06em', color: 'rgba(0,0,0,0.25)' }}>REPORT #47</span>
      </div>

      {/* Two-section body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ padding: '14px 20px', borderRight: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', marginBottom: 10 }}>Operational Metrics</div>
          {[
            { label: 'Leads Captured',       value: '142', trend: '+18%',    up: true  },
            { label: 'Meetings Booked',       value: '67',  trend: '+47%',    up: true  },
            { label: 'Opp. Recovered',        value: '23',  trend: 'New',     up: true  },
            { label: 'SLA Compliance',        value: '96%', trend: 'On track', up: null },
            { label: 'Alerts Triggered',      value: '4',   trend: 'Resolved', up: null },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ flex: 1, fontSize: 12, color: 'rgba(0,0,0,0.60)' }}>{r.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.015em', marginRight: 10 }}>{r.value}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: r.up === true ? '#16a34a' : 'rgba(0,0,0,0.33)', minWidth: 48, textAlign: 'right' }}>{r.trend}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '14px 20px' }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', marginBottom: 10 }}>Automation Performance</div>
          {[
            { label: 'Workflows Executed', value: '1,247' },
            { label: 'Tasks Automated',    value: '847'   },
            { label: 'Messages Sent',      value: '312'   },
            { label: 'Alerts Triggered',   value: '4'     },
            { label: 'Human Touches Rem.', value: '94%'   },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ flex: 1, fontSize: 12, color: 'rgba(0,0,0,0.60)' }}>{r.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.015em' }}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: 10.5, color: 'rgba(0,0,0,0.38)' }}>Generated automatically every Monday · 08:00 AM</span>
        </div>
        <span style={{ fontSize: 10.5, color: 'rgba(0,0,0,0.33)' }}>Operations Team</span>
      </div>
    </div>
  )
}

function BeyondOperationsPanel() {
  const systems = [
    { name: 'CRM',             status: 'Healthy',   detail: '99.9% uptime · 0 errors',   bar: 99  },
    { name: 'Database',        status: 'Connected', detail: '847 records · fully synced', bar: 100 },
    { name: 'Calendar',        status: 'Running',   detail: '23 active bookings',         bar: 97  },
    { name: 'Notifications',   status: 'Synced',    detail: 'Last sync: 2 min ago',       bar: 100 },
    { name: 'Workflow Engine',  status: 'Running',   detail: '12 flows · 0 failed',        bar: 98  },
  ]
  const events = [
    { from: 'CRM',      to: 'Database',  action: 'Record #2847 synced',   time: '09:14' },
    { from: 'Calendar', to: 'Notif.',    action: 'Visit reminder sent',    time: '09:15' },
    { from: 'Workflow', to: 'CRM',       action: 'Stage updated → Qual.',  time: '09:15' },
    { from: 'Notif.',   to: 'WhatsApp',  action: 'Follow-up dispatched',   time: '09:16' },
  ]
  return (
    <div>
      {/* Header */}
      <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0a', letterSpacing: '-0.01em' }}>Control Center</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: '#16a34a' }}>All systems operational</span>
        </div>
      </div>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr' }}>
        {/* System health */}
        <div style={{ padding: '8px 0', borderRight: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', padding: '6px 18px 8px' }}>System Health</div>
          {systems.map((sys, i) => (
            <div key={i} style={{ padding: '8px 18px', borderBottom: i < systems.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 12, fontWeight: 500, color: '#0a0a0a' }}>{sys.name}</span>
                <span style={{ fontSize: 9.5, fontWeight: 600, color: '#16a34a', background: 'rgba(34,197,94,0.08)', borderRadius: 20, padding: '2px 8px', flexShrink: 0 }}>{sys.status}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 15 }}>
                <div style={{ flex: 1, height: 2, borderRadius: 1, background: 'rgba(0,0,0,0.07)' }}>
                  <div style={{ height: '100%', width: `${sys.bar}%`, background: '#22c55e', borderRadius: 1 }} />
                </div>
                <span style={{ fontSize: 9.5, color: 'rgba(0,0,0,0.35)', whiteSpace: 'nowrap', minWidth: 0 }}>{sys.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Coordination Events */}
        <div style={{ padding: '8px 0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', padding: '6px 16px 8px' }}>Coordination Events</div>
          {events.map((ev, i) => (
            <div key={i} style={{ padding: '9px 16px', borderBottom: i < events.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: '#0a0a0a' }}>{ev.from}</span>
                <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.28)', letterSpacing: '-0.01em' }}>→</span>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: '#0a0a0a' }}>{ev.to}</span>
                <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(0,0,0,0.28)', fontFamily: "'SF Mono','Fira Code',monospace" }}>{ev.time}</span>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.48)' }}>{ev.action}</div>
            </div>
          ))}
          <div style={{ marginTop: 'auto', padding: '10px 16px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.30)' }}>Last checked: just now · interval: 60s</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function BeyondAIPanel() {
  const tasks = [
    { time: '09:14', label: 'Lead Qualified',         detail: 'jessica.c@email.com · Score 94',    color: '#22c55e' },
    { time: '09:14', label: 'CRM Updated',            detail: 'Record #2847 created',               color: '#4A7CF7' },
    { time: '09:15', label: 'Follow-up Scheduled',    detail: 'Thu Jun 18 · 2:00 PM',               color: '#4A7CF7' },
    { time: '09:15', label: 'Meeting Confirmed',      detail: 'Booking link sent · WhatsApp',       color: '#22c55e' },
    { time: '09:15', label: 'Human Handoff Ready',    detail: 'Assigned → Morgan Oliver',           color: '#F59E0B' },
    { time: '09:16', label: 'Customer Reply Drafted', detail: 'WhatsApp · Awaiting send',           color: '#22c55e' },
    { time: '09:16', label: 'Opportunity Recovered',  detail: 'Lead #2831 re-engaged after 3 days', color: '#4A7CF7' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Stats header */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        {[['847', 'Tasks Completed'], ['12', 'Active Flows'], ['0', 'Failures']].map(([v, l], i) => (
          <div key={i} style={{ padding: '14px 0', textAlign: 'center', borderRight: i < 2 ? '1px solid rgba(0,0,0,0.07)' : 'none' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: i === 2 ? '#22c55e' : '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1 }}>{v}</div>
            <div style={{ fontSize: 9.5, fontWeight: 500, color: 'rgba(0,0,0,0.38)', marginTop: 4, letterSpacing: '0.01em' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Live execution log header */}
      <div style={{ padding: '10px 18px 8px', display: 'flex', alignItems: 'center', gap: 7, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
        <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(0,0,0,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Live Execution Log</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(0,0,0,0.28)' }}>Last 24 hours</span>
      </div>

      {/* Task rows */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {tasks.map((task, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 18px', borderBottom: i < tasks.length - 1 ? '1px solid rgba(0,0,0,0.045)' : 'none' }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: `${task.color}14`, border: `1px solid ${task.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L5 9L10 3" stroke={task.color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0a', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.label}</div>
              <div style={{ fontSize: 10.5, color: 'rgba(0,0,0,0.40)', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.detail}</div>
            </div>
            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.25)', fontFamily: "'SF Mono','Fira Code',monospace", flexShrink: 0 }}>{task.time}</span>
          </div>
        ))}
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

  const issues = [
    'No lead qualification system detected',
    'Follow-up is manual and inconsistent',
    'Response time exceeds 24 hours on avg.',
    'No defined SLA or tracking in place',
    'Zero opportunity recovery automation',
    'No pipeline visibility for management',
  ]
  const actions = [
    'Deploy AI qualification layer',
    'Automate follow-up sequences',
    'Implement operational dashboard',
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '10px 18px', borderBottom: '1px solid rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.015)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)' }}>Business Diagnostic</span>
        <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.22)' }}>·</span>
        <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.30)' }}>Initial Assessment</span>
      </div>

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* URL bar */}
        <div style={{ opacity: phase >= 1 ? 1 : 0, transition: 'opacity 0.4s', display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 7 }}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="rgba(0,0,0,0.28)" strokeWidth="1.4"/><path d="M6 3v3l2 1.5" stroke="rgba(0,0,0,0.28)" strokeWidth="1.3" strokeLinecap="round"/></svg>
          <span style={{ fontSize: 11, fontFamily: "'SF Mono','Fira Code',monospace", color: 'rgba(0,0,0,0.55)' }}>yourbusiness.com/operations</span>
          {phase >= 2 && phase < 9 && (
            <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 600, color: '#D97706', animation: 'none' }}>Scanning...</span>
          )}
          {phase >= 9 && (
            <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 600, color: '#dc2626' }}>Analysis complete</span>
          )}
        </div>

        {/* Issues list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', marginBottom: 8, opacity: phase >= 3 ? 1 : 0, transition: 'opacity 0.3s' }}>Problems Detected</div>
          {issues.map((issue, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 9, padding: '6px 0',
              borderBottom: i < issues.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
              opacity: phase >= i + 3 ? 1 : 0,
              transform: phase >= i + 3 ? 'translateY(0)' : 'translateY(5px)',
              transition: 'opacity 0.35s, transform 0.35s',
            }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M2.5 7.5L5 5M5 5L7.5 2.5M5 5L2.5 2.5M5 5L7.5 7.5" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <span style={{ fontSize: 11.5, color: 'rgba(0,0,0,0.65)', letterSpacing: '-0.005em' }}>{issue}</span>
            </div>
          ))}
        </div>

        {/* Score + Actions row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14, marginTop: 4, opacity: phase >= 9 ? 1 : 0, transition: 'opacity 0.5s' }}>
          {/* Score */}
          <div style={{ padding: '10px 14px', background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.15)', borderRadius: 8, textAlign: 'center', minWidth: 72 }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#dc2626', letterSpacing: '-0.04em', lineHeight: 1 }}>2</div>
            <div style={{ fontSize: 9, color: 'rgba(220,38,38,0.70)', fontWeight: 600, letterSpacing: '0.04em', marginTop: 2 }}>/10</div>
            <div style={{ fontSize: 8.5, color: 'rgba(0,0,0,0.35)', marginTop: 4, fontWeight: 500 }}>Operational Score</div>
          </div>

          {/* Recommended actions */}
          <div style={{ opacity: phase >= 10 ? 1 : 0, transition: 'opacity 0.4s' }}>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#4A7CF7', marginBottom: 7 }}>Recommended Actions</div>
            {actions.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(74,124,247,0.09)', border: '1px solid rgba(74,124,247,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="7" height="7" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#4A7CF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.62)', letterSpacing: '-0.005em' }}>{a}</span>
              </div>
            ))}
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
    <section data-theme="light" style={{ background: '#f9f9f7', padding: '96px 48px' }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div className={`fade-up${sectionVisible ? ' is-visible' : ''}`} style={{ marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(0,0,0,0.22)' }} />
            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)' }}>
              Operational Layer
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(32px,4vw,48px)', fontWeight: 800, color: '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 16px' }}>
            Build Beyond Lead Capture
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(0,0,0,0.50)', lineHeight: 1.7, maxWidth: 560, margin: 0, letterSpacing: '-0.005em' }}>
            The same operational layer can power visibility, reporting, internal tools and AI-assisted workflows.
          </p>
        </div>

        {/* Nav + Panel */}
        <div className={`fade-up delay-1${sectionVisible ? ' is-visible' : ''}`} style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>

          {/* Left nav */}
          <div style={{ width: 210, flexShrink: 0, paddingTop: 2 }}>
            {BEYOND_ITEMS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(i)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '11px 16px',
                  background: activeIdx === i ? 'rgba(0,0,0,0.05)' : 'transparent',
                  border: 'none',
                  borderLeft: `2px solid ${activeIdx === i ? '#0a0a0a' : 'rgba(0,0,0,0.10)'}`,
                  borderRadius: '0 6px 6px 0',
                  cursor: 'pointer', marginBottom: 3,
                  fontSize: 13.5, fontWeight: activeIdx === i ? 600 : 400,
                  color: activeIdx === i ? '#0a0a0a' : 'rgba(0,0,0,0.45)',
                  fontFamily: 'inherit', letterSpacing: '-0.005em',
                  transition: 'all 0.18s ease',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right showcase panel */}
          <div style={{
            flex: 1, minWidth: 0,
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.07)',
            borderRadius: 12,
            boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
            overflow: 'hidden',
          }}>
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
            WhatsApp Lead Engine
          </div>
          <div style={{
            fontSize: 'clamp(36px,4.5vw,52px)', fontWeight: 800,
            letterSpacing: '-0.034em', lineHeight: 1.07, color: '#ffffff', marginBottom: 14,
          }}>
            Processing leads.<br />Without stopping.
          </div>
          <div style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.62)', lineHeight: 1.68, letterSpacing: '-0.005em' }}>
            14 leads captured today. 11 qualified. 8 meetings booked.
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
          <span style={{ display: 'block' }}>Build</span>
          <span style={{ display: 'block' }}>
            <ContainerTextFlip
              words={['better', 'scalable', 'connected', 'reliable', 'efficient']}
              interval={2400}
              inline={true}
            />{' '}operations.
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
                  Operational Infrastructure
                </div>
              </div>
            </div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.52)', lineHeight: 1.72, letterSpacing: '-0.007em', marginBottom: 20 }}>
              Most businesses have more software than they know how to operate. I design the coordination layer — the operational infrastructure that connects those tools and makes each part of the business aware of what happens next.
            </p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.30)', lineHeight: 1.7, letterSpacing: '-0.006em' }}>
              The goal is not to add more technology. It is to make what already exists work together — with less friction, fewer missed steps, and no manual coordination overhead.
            </p>
          </div>

          {/* Right — Contact form */}
          <div className={`fade-up delay-1${visible ? ' is-visible' : ''}`}>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 20,
            }}>
              Get in touch
            </div>

            {status === 'done' ? (
              <div style={{
                padding: '20px 0', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7,
              }}>
                Mensagem enviada. Retorno em breve.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input name="email" type="email" placeholder="Your email" required style={inputStyle} />
                <textarea name="message" placeholder="What are you trying to build?" required rows={5}
                  style={{ ...inputStyle, resize: 'vertical' }} />
                {status === 'error' && (
                  <span style={{ fontSize: 12, color: 'rgba(255,100,100,0.8)' }}>
                    Erro ao enviar. Tente novamente.
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
                  {status === 'sending' ? 'Enviando...' : 'Send message'}
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

      <Bleed from="#ffffff" to="#ffffff" />

      {/* S2: Stack Grid (light) */}
      <StackSection />

      {/* S3: Lead Engine — same light bg as S2, flows directly */}
      <System01Section />

      <Bleed from="#ffffff" to="#0a0a0a" />

      {/* S4: Client Intake (dark) */}
      <System02Section />

      <Bleed from="#0a0a0a" to="#ffffff" />

      {/* S5: Operational Runtime (light) */}
      <System03Section />

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
