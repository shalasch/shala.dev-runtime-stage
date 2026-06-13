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

      <Bleed from="#ffffff" to="#0a0a0a" />

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
