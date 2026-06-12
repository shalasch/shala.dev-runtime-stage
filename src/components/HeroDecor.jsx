import { motion } from 'framer-motion'

// ── Shared primitives ──────────────────────────────────────────────────────────

const LBL = {
  fontSize: 8.5, fontWeight: 700,
  letterSpacing: '0.12em', textTransform: 'uppercase',
  color: 'rgba(0,0,0,0.27)',
}

function LiveDot({ color = '#22C55E' }) {
  return (
    <motion.div
      animate={{ opacity: [1, 0.25, 1] }}
      transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: 5.5, height: 5.5, borderRadius: '50%', background: color, flexShrink: 0 }}
    />
  )
}

function StaticDot({ color }) {
  return <div style={{ width: 5.5, height: 5.5, borderRadius: '50%', background: color, flexShrink: 0 }} />
}

function Avatar({ initials, bg = '#E8F5E9', fg = '#16A34A' }) {
  return (
    <div style={{
      width: 26, height: 26, borderRadius: '50%',
      background: bg, color: fg,
      fontSize: 10, fontWeight: 700,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, letterSpacing: '-0.01em',
    }}>{initials}</div>
  )
}

// ── Floating card shell ────────────────────────────────────────────────────────
function Card({ children, style, delay = 0, floatY = 3, floatDur = 4.2 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'absolute', ...style }}
    >
      <motion.div
        animate={{ y: [0, -floatY, 0] }}
        transition={{
          duration: floatDur, repeat: Infinity,
          ease: 'easeInOut', repeatType: 'mirror',
          delay: delay * 0.4,
        }}
        style={{
          background: '#FFFFFF',
          borderRadius: 12,
          border: '1px solid rgba(0,0,0,0.09)',
          boxShadow: '0 2px 18px rgba(0,0,0,0.09), 0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}


// ── Main export ────────────────────────────────────────────────────────────────
export default function HeroDecor() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none', zIndex: 7,
      overflow: 'hidden',
    }}>

      {/* Status label — top left */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{ position: 'absolute', top: 26, left: 36, display: 'flex', alignItems: 'center', gap: 7, zIndex: 8 }}
      >
        <LiveDot />
        <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)' }}>
          Live Operational Infrastructure
        </span>
      </motion.div>

      {/* ── F1: WhatsApp Lead — upper left ── */}
      <Card style={{ top: '12%', left: '2%', zIndex: 7 }} delay={0.55} floatY={3.5} floatDur={4.6}>
        <div style={{ padding: '11px 14px', width: 216 }}>
          <div style={{ ...LBL, marginBottom: 9 }}>New Lead · WhatsApp</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
            <Avatar initials="MS" />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#0F0F0F', lineHeight: 1.2 }}>Maria Silva</div>
              <div style={{ fontSize: 9.5, color: 'rgba(0,0,0,0.38)', marginTop: 1 }}>Just now</div>
            </div>
          </div>
          <div style={{
            fontSize: 10.5, color: 'rgba(0,0,0,0.44)', lineHeight: 1.45,
            borderTop: '1px solid rgba(0,0,0,0.055)', paddingTop: 7,
            fontStyle: 'italic',
          }}>
            "Oi, vi o anúncio do apt..."
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 8 }}>
            <StaticDot color="#22C55E" />
            <span style={{ fontSize: 9.5, fontWeight: 600, color: '#16A34A', letterSpacing: '0.02em' }}>Score 91 · High Intent</span>
          </div>
        </div>
      </Card>

      {/* ── F2: Lead Qualified — upper right ── */}
      <Card style={{ top: '10%', right: '2.5%', zIndex: 7 }} delay={0.75} floatY={2.5} floatDur={3.9}>
        <div style={{ padding: '11px 14px', width: 196 }}>
          <div style={{ ...LBL, marginBottom: 9 }}>Lead Qualified</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: '#0F0F0F', letterSpacing: '-0.04em' }}>91</span>
            <span style={{
              fontSize: 9, background: '#DCFCE7', color: '#16A34A',
              padding: '3px 8px', borderRadius: 20, fontWeight: 700, letterSpacing: '0.04em',
            }}>HIGH</span>
          </div>
          <div style={{ height: 3, background: 'rgba(0,0,0,0.07)', borderRadius: 2, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ width: '91%', height: '100%', background: 'linear-gradient(to right, #22C55E, #4ADE80)', borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.38)' }}>Budget match · Fast reply</div>
        </div>
      </Card>

      {/* ── F3: CRM Updated — mid right, partially clipped ── */}
      <Card style={{ top: '40%', right: -14, transform: 'translateY(-50%)', zIndex: 7 }} delay={1.0} floatY={4} floatDur={5.2}>
        <div style={{ padding: '11px 14px', width: 208 }}>
          <div style={{ ...LBL, marginBottom: 9 }}>CRM Updated</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
            <Avatar initials="JS" bg="#EEF2FF" fg="#6366F1" />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#0F0F0F', lineHeight: 1.2 }}>João Santos</div>
              <div style={{ fontSize: 9.5, color: 'rgba(0,0,0,0.38)', marginTop: 1 }}>2 min ago</div>
            </div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, fontSize: 10,
            borderTop: '1px solid rgba(0,0,0,0.055)', paddingTop: 7,
          }}>
            <span style={{ color: '#6366F1', fontWeight: 600 }}>Qualified</span>
            <span style={{ color: 'rgba(0,0,0,0.28)' }}>→</span>
            <span style={{ color: '#22C55E', fontWeight: 600 }}>Meeting Set</span>
          </div>
        </div>
      </Card>

      {/* ── F4: Follow-up Created — mid left ── */}
      <Card style={{ top: '52%', left: '1.5%', transform: 'translateY(-50%)', zIndex: 7 }} delay={1.15} floatY={2.5} floatDur={4.3}>
        <div style={{ padding: '11px 14px', width: 202 }}>
          <div style={{ ...LBL, marginBottom: 9 }}>Follow-up Created</div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#0F0F0F', marginBottom: 4, lineHeight: 1.3 }}>Auto-sent in 48h</div>
          <div style={{ fontSize: 10.5, color: 'rgba(0,0,0,0.44)', marginBottom: 8, lineHeight: 1.4 }}>
            Carlos Lima notified<br />via WhatsApp
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <StaticDot color="#6366F1" />
            <span style={{ fontSize: 9.5, fontWeight: 600, color: '#6366F1' }}>Automation active</span>
          </div>
        </div>
      </Card>

      {/* ── F5: Database Record — lower left ── */}
      <Card style={{ bottom: '17%', left: '2%', zIndex: 7 }} delay={1.05} floatY={2.5} floatDur={4.8}>
        <div style={{ padding: '11px 14px', width: 210 }}>
          <div style={{ ...LBL, marginBottom: 9 }}>Database Record</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#0F0F0F' }}>João Santos</span>
            <span style={{ fontSize: 9, color: 'rgba(0,0,0,0.32)', fontFamily: "'SF Mono', 'Fira Code', monospace" }}>#2847</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, borderTop: '1px solid rgba(0,0,0,0.055)', paddingTop: 7 }}>
            {[
              { k: 'Budget', v: 'R$ 850k' },
              { k: 'Type', v: '3BR · Moema' },
              { k: 'Status', v: 'Active', vc: '#22C55E' },
            ].map(({ k, v, vc }) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.38)' }}>{k}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: vc ?? '#0F0F0F' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ── F6: Property Visit Booked — lower right ── */}
      <Card style={{ bottom: '16%', right: '2.5%', zIndex: 7 }} delay={0.88} floatY={3} floatDur={4.1}>
        <div style={{ padding: '11px 14px', width: 196 }}>
          <div style={{ ...LBL, marginBottom: 9 }}>Property Visit Booked</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 7 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0F0F0F', letterSpacing: '-0.02em' }}>Jun 18</div>
              <div style={{ fontSize: 11.5, fontWeight: 500, color: 'rgba(0,0,0,0.50)', marginTop: 1 }}>2:00 PM</div>
            </div>
            <span style={{
              fontSize: 8.5, background: '#FEF3C7', color: '#B45309',
              padding: '3px 7px', borderRadius: 20, fontWeight: 700, letterSpacing: '0.04em', marginTop: 2,
            }}>CONFIRMED</span>
          </div>
          <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.40)', borderTop: '1px solid rgba(0,0,0,0.055)', paddingTop: 7 }}>
            Apt 302, Moema · Auto-confirmed
          </div>
        </div>
      </Card>

    </div>
  )
}
