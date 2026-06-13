import { useEffect, useRef } from 'react'
import { createNoise2D } from 'simplex-noise'

export default function WavyBackground({
  colors = ['#38bdf8', '#818cf8', '#c084fc', '#a855f7', '#22d3ee'],
  waveWidth = 50,
  backgroundFill = '#ffffff',
  blur = 10,
  speed = 'fast',
  waveOpacity = 0.5,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const noise2D = createNoise2D()
    let rafId
    let nt = 0

    const getSpeed = () => (speed === 'slow' ? 0.001 : 0.002)

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const render = () => {
      const w = canvas.width
      const h = canvas.height

      ctx.fillStyle = backgroundFill
      ctx.globalAlpha = 1
      ctx.fillRect(0, 0, w, h)

      nt += getSpeed()

      for (let i = 0; i < colors.length; i++) {
        ctx.beginPath()
        ctx.lineWidth = waveWidth
        ctx.strokeStyle = colors[i]
        ctx.globalAlpha = waveOpacity

        for (let x = 0; x < w; x += 5) {
          const y = noise2D(x / 800, 0.3 * i + nt) * 100
          ctx.lineTo(x, y + h * 0.68)
        }

        ctx.stroke()
        ctx.beginPath()
      }

      rafId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        filter: `blur(${blur}px)`,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
