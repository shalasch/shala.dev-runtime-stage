import { useCallback, useEffect, useRef } from 'react';

const WORDMARK = 'shala.dev';
const PAD = 34;

const SCATTER_MS  = 290;
const HOLD_MS     = 260;
const RETURN_MS   = 870;
const STAGGER_MAX = 60;
const FADEIN_MS   = 240;
const FIRST_DELAY = 1_100;
const REST_MS     = 1_700;
const CYCLE_MS    = SCATTER_MS + HOLD_MS + RETURN_MS + STAGGER_MAX + FADEIN_MS + REST_MS;

const DENSITY = 0.28;
const MAX_P   = 480;
const MIN_P   = 50;

const easeOutCubic   = (t) => 1 - (1 - t) ** 3;
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
const easeOutBack = (t) => {
  const c1 = 1.45;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

export function AnimatedWordmark({ style, color = '#ffffff', onClick }) {
  const containerRef  = useRef(null);
  const textRef       = useRef(null);
  const canvasRef     = useRef(null);
  const particlesRef  = useRef([]);
  const phaseRef      = useRef('idle');
  const phaseStartRef = useRef(0);
  const rafRef        = useRef(0);
  const sampledRef    = useRef(false);
  const dprRef        = useRef(1);
  const strengthRef   = useRef(1);
  const rmRef         = useRef(false);
  const colorRef      = useRef(color);

  useEffect(() => { colorRef.current = color; }, [color]);

  useEffect(() => {
    rmRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const buildParticles = useCallback(async () => {
    if (sampledRef.current) return;
    const text   = textRef.current;
    const canvas = canvasRef.current;
    const cont   = containerRef.current;
    if (!text || !canvas || !cont) return;

    try { await document.fonts.ready; } catch (_) {}
    await new Promise(r => setTimeout(r, 80));

    const tR  = text.getBoundingClientRect();
    const cR  = cont.getBoundingClientRect();
    const cs  = window.getComputedStyle(text);
    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;

    const W  = Math.ceil(tR.width);
    const H  = Math.ceil(tR.height);
    const oX = tR.left - cR.left;
    const oY = tR.top  - cR.top;
    const CW = W + PAD * 2;
    const CH = H + PAD * 2;

    canvas.style.left   = `${oX - PAD}px`;
    canvas.style.top    = `${oY - PAD}px`;
    canvas.style.width  = `${CW}px`;
    canvas.style.height = `${CH}px`;
    canvas.width  = CW * dpr;
    canvas.height = CH * dpr;

    const sc = document.createElement('canvas');
    sc.width  = W * dpr;
    sc.height = H * dpr;
    const sCtx = sc.getContext('2d');
    sCtx.scale(dpr, dpr);
    sCtx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    try {
      sCtx.letterSpacing = cs.letterSpacing !== 'normal' ? cs.letterSpacing : '0px';
    } catch (_) {}
    sCtx.fillStyle    = '#fff';
    sCtx.textBaseline = 'alphabetic';

    const m    = sCtx.measureText(WORDMARK);
    const asc  = m.actualBoundingBoxAscent  ?? parseFloat(cs.fontSize) * 0.78;
    const desc = m.actualBoundingBoxDescent ?? parseFloat(cs.fontSize) * 0.18;
    sCtx.fillText(WORDMARK, 0, (H - asc - desc) / 2 + asc);

    const img  = sCtx.getImageData(0, 0, sc.width, sc.height);
    const data = img.data;
    const step = Math.max(1, Math.ceil(dpr));
    const pool = [];

    for (let py = 0; py < sc.height; py += step) {
      for (let px = 0; px < sc.width; px += step) {
        if (data[(py * sc.width + px) * 4 + 3] > 90) {
          pool.push({ x: px / dpr, y: py / dpr });
        }
      }
    }

    if (pool.length < 10) {
      for (let i = 0; i < MIN_P * 4; i++) {
        pool.push({ x: Math.random() * W, y: Math.random() * H });
      }
    }

    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const count = Math.min(MAX_P, Math.max(MIN_P, Math.floor(pool.length * DENSITY)));
    const cx = W / 2;
    const cy = H / 2;

    particlesRef.current = pool.slice(0, count).map((p, i) => {
      const vx   = p.x - cx;
      const vy   = p.y - cy;
      const dist = Math.sqrt(vx * vx + vy * vy) || 1;
      const mag  = 8 + Math.random() * 22;
      return {
        hx:  p.x + PAD,
        hy:  p.y + PAD,
        bdx: (vx / dist) * mag + (Math.random() - 0.5) * 7,
        bdy: (vy / dist) * mag * 0.5 + (Math.random() - 0.5) * 4,
        sz:  Math.random() > 0.45 ? 1 : 2,
        a:   0.62 + Math.random() * 0.38,
        ms:  i * 1.1 + Math.random() * STAGGER_MAX * 0.65,
      };
    });

    sampledRef.current = true;
  }, []);

  useEffect(() => { buildParticles(); }, [buildParticles]);

  const tick = useCallback((now) => {
    const canvas = canvasRef.current;
    const text   = textRef.current;
    if (!canvas || !text) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr     = dprRef.current;
    const ps      = particlesRef.current;
    const s       = strengthRef.current;
    const elapsed = now - phaseStartRef.current;
    const phase   = phaseRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.fillStyle = colorRef.current;

    if (phase === 'scattering') {
      const t     = Math.min(elapsed / SCATTER_MS, 1);
      const tFade = easeInOutCubic(t);
      const tPos  = easeOutCubic(t);

      text.style.opacity   = `${1 - tFade}`;
      canvas.style.opacity = `${tFade}`;

      ps.forEach(p => {
        ctx.globalAlpha = p.a;
        ctx.fillRect(
          Math.round(p.hx + p.bdx * s * tPos),
          Math.round(p.hy + p.bdy * s * tPos),
          p.sz, p.sz,
        );
      });

      if (t >= 1) {
        phaseRef.current      = 'scattered';
        phaseStartRef.current = now;
      }
    } else if (phase === 'scattered') {
      text.style.opacity   = '0';
      canvas.style.opacity = '1';

      ps.forEach(p => {
        ctx.globalAlpha = p.a;
        ctx.fillRect(
          Math.round(p.hx + p.bdx * s),
          Math.round(p.hy + p.bdy * s),
          p.sz, p.sz,
        );
      });

      if (elapsed >= HOLD_MS) {
        phaseRef.current      = 'returning';
        phaseStartRef.current = now;
      }
    } else if (phase === 'returning') {
      ps.forEach(p => {
        const localT = Math.max(0, Math.min((elapsed - p.ms) / RETURN_MS, 1));
        const tPos   = easeOutBack(localT);
        const drX    = p.hx + p.bdx * s;
        const drY    = p.hy + p.bdy * s;
        ctx.globalAlpha = p.a;
        ctx.fillRect(
          Math.round(drX + (p.hx - drX) * tPos),
          Math.round(drY + (p.hy - drY) * tPos),
          p.sz, p.sz,
        );
      });

      if (elapsed >= RETURN_MS + STAGGER_MAX) {
        phaseRef.current      = 'fadein';
        phaseStartRef.current = now;
      }
    } else if (phase === 'fadein') {
      const t     = Math.min(elapsed / FADEIN_MS, 1);
      const tFade = easeOutCubic(t);

      text.style.opacity   = `${tFade}`;
      canvas.style.opacity = `${1 - tFade}`;

      ps.forEach(p => {
        ctx.globalAlpha = p.a * (1 - tFade);
        ctx.fillRect(Math.round(p.hx), Math.round(p.hy), p.sz, p.sz);
      });

      if (t >= 1) {
        ctx.restore();
        text.style.opacity   = '1';
        canvas.style.opacity = '0';
        phaseRef.current     = 'idle';
        return;
      }
    }

    ctx.restore();
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const fire = useCallback((strength = 1) => {
    if (!sampledRef.current)         return;
    if (rmRef.current)               return;
    if (phaseRef.current !== 'idle') return;

    strengthRef.current   = strength;
    phaseRef.current      = 'scattering';
    phaseStartRef.current = performance.now();

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    let alive = true;
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    (async () => {
      while (!sampledRef.current && alive) await sleep(100);
      if (!alive) return;
      await sleep(FIRST_DELAY);
      while (alive) {
        fire(1);
        await sleep(CYCLE_MS);
      }
    })();

    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
      if (textRef.current)   textRef.current.style.opacity   = '1';
      if (canvasRef.current) canvasRef.current.style.opacity = '0';
    };
  }, [fire]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'inline-block',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={() => fire(1.7)}
    >
      <span
        ref={textRef}
        style={{ color, transition: 'color 0.25s ease' }}
        aria-label={WORDMARK}
        role="img"
      >
        {WORDMARK}
      </span>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', pointerEvents: 'none', opacity: 0, imageRendering: 'pixelated' }}
        aria-hidden="true"
      />
    </div>
  );
}
