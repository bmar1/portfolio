import { useRef, useState, useEffect } from 'react'
import { useSpring, motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import TerminalTyping from '../components/TerminalTyping'
import StaggerText from '../components/StaggerText'
import { getScrollBehavior } from '../utils/motion'

const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEYNk_xsOSL_6iW-mTQOKJxI34ZXyxPUa8LLgRSTIDamH7DzmNh3BPZOJREmd5F9gWSWMzWOmx27hmTmHHYwJt_W1qCGNoyJVRMa_KIXPBbB48lrsSXHt4jYfNFqdUttPOwPZALtQcuZaj0pcgO8NbiNM90Lf8gkd6vyeEnxuF2NBEWHmZ2cOaLsVaZTY-tE3QeEZDuwQies_6iyryv5eNI--6W_6EQexyMkS_bwl_b5hJKdAwr3dKFiih3omSd0DwPSjIqWvK62dH'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [typingDone, setTypingDone] = useState(false)

  const mouseX = useSpring(0, { stiffness: 50, damping: 20 })
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="grid-bg relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Hero background image — Stitch-generated cyberpunk city */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMG}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.25 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(8,12,16,0.4) 0%, var(--color-bg-base) 85%)',
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center min-h-screen py-32">
          {/* Left — Text content (60%) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <TerminalTyping onComplete={() => setTypingDone(true)} />

            <div
              style={{
                opacity: typingDone ? 1 : 0,
                transition: 'opacity 300ms ease 200ms',
              }}
            >
              <StaggerText
                text="Building things that actually work."
                className="text-h1"
                initialDelay={100}
              />
            </div>

            <p
              className="text-body max-w-lg"
              style={{
                color: 'var(--color-text-secondary)',
                opacity: typingDone ? 1 : 0,
                transform: typingDone ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 500ms cubic-bezier(0.23, 1, 0.32, 1) 600ms, transform 500ms cubic-bezier(0.23, 1, 0.32, 1) 600ms',
              }}
            >
              Full-stack developer. Systems thinker.
              <br />
              Currently studying @ Seneca Polytechnic.
            </p>

            <div
              className="flex flex-wrap gap-4"
              style={{
                opacity: typingDone ? 1 : 0,
                transform: typingDone ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 500ms cubic-bezier(0.23, 1, 0.32, 1) 800ms, transform 500ms cubic-bezier(0.23, 1, 0.32, 1) 800ms',
              }}
            >
              <a
                href="#projects"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#projects')?.scrollIntoView({ behavior: getScrollBehavior() })
                }}
              >
                View Projects <ArrowRight size={16} />
              </a>
              <a href="/assets/resume_swe.pdf" download="Bilal_Umar_SWE_Resume.pdf" className="btn btn-ghost">
                Download Resume <Download size={16} />
              </a>
            </div>
          </div>

          {/* Right — Interactive grid visual (40%) */}
          <motion.div
            className="lg:col-span-2 hidden lg:flex items-center justify-center"
            style={{
              x: mouseX,
              y: mouseY,
            }}
          >
            <InteractiveGrid />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* Interactive Physics dot grid */
function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    const cols = 14
    const rows = 14
    const spacing = 26
    const width = cols * spacing
    const height = rows * spacing

    // Setup high-DPI canvas
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = '100%'
    canvas.style.maxWidth = `${width}px`
    canvas.style.aspectRatio = '1 / 1'
    ctx.scale(dpr, dpr)

    interface Particle {
      x: number
      y: number
      baseX: number
      baseY: number
      vx: number
      vy: number
      opacity: number
    }

    const particles: Particle[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const baseX = c * spacing + spacing / 2
        const baseY = r * spacing + spacing / 2
        
        // Fade out edges
        const distFromCenter = Math.sqrt(Math.pow(c - cols / 2, 2) + Math.pow(r - rows / 2, 2))
        const maxDist = Math.sqrt(Math.pow(cols / 2, 2) + Math.pow(rows / 2, 2))
        const opacity = 0.1 + (1 - distFromCenter / maxDist) * 0.6

        particles.push({
          x: baseX,
          y: baseY,
          baseX,
          baseY,
          vx: 0,
          vy: 0,
          opacity: Math.max(0, opacity),
        })
      }
    }

    const mouse = { x: -1000, y: -1000, radius: 80 }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      // Mapping screen pixels to canvas logical pixels
      const scaleX = width / rect.width
      const scaleY = height / rect.height
      mouse.x = (e.clientX - rect.left) * scaleX
      mouse.y = (e.clientY - rect.top) * scaleY
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Physics integration
      for (const p of particles) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius
          const angle = Math.atan2(dy, dx)
          // Repel outward
          p.vx -= Math.cos(angle) * force * 2.5
          p.vy -= Math.sin(angle) * force * 2.5
        }

        // Return forces
        p.vx += (p.baseX - p.x) * 0.08
        p.vy += (p.baseY - p.y) * 0.08

        // Friction
        p.vx *= 0.75
        p.vy *= 0.75

        p.x += p.vx
        p.y += p.vy
      }

      // Draw mesh connections
      ctx.lineWidth = 0.8
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        
        ctx.strokeStyle = `rgba(57, 208, 216, ${p1.opacity * 0.3})`
        
        // Right neighbor
        if ((i + 1) % cols !== 0) {
          const p2 = particles[i + 1]
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
        
        // Bottom neighbor
        if (i + cols < particles.length) {
          const p2 = particles[i + cols]
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      }

      // Draw dots
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(57, 208, 216, ${p.opacity})`
        ctx.fill()
      }

      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="cursor-crosshair transition-opacity duration-1000"
      style={{ filter: 'drop-shadow(0 0 16px rgba(57, 208, 216, 0.2))' }}
    />
  )
}
