import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { PROFILE } from '../content/profile'
import { prefersReducedMotion } from '../utils/motion'
import { rng } from '../utils/rng'

/* ------------------------------------------------------------------ */
/* Loader: the segmented bar from the game's loading screens, with a  */
/* boot log underneath. It hesitates twice, like the real one.        */
/* ------------------------------------------------------------------ */

const LOADER_MS = 1900
const CURVE: [number, number][] = [[0, 0], [0.22, 31], [0.38, 36], [0.62, 70], [0.78, 74], [1, 100]]
const SEGMENTS = 36
const LOG = ['Sync cortex', 'Map synapse bus', 'Load attributes', 'Decrypt perks', 'Neural link stable']

function progressAt(t: number) {
  for (let i = 1; i < CURVE.length; i++) {
    const [t1, v1] = CURVE[i]
    const [t0, v0] = CURVE[i - 1]
    if (t <= t1) return v0 + ((t - t0) / (t1 - t0)) * (v1 - v0)
  }
  return 100
}

/* Synapse field for the scan: seeded nodes inside the reticle, each lights at its threshold. */
const SCAN = (() => {
  const r = rng(77)
  const nodes = Array.from({ length: 26 }, (_, i) => {
    const a = r() * Math.PI * 2
    const d = 22 + Math.sqrt(r()) * 92
    return { x: 150 + Math.cos(a) * d, y: 150 + Math.sin(a) * d, at: ((i + 1) / 26) * 100 }
  })
  const edges: [number, number][] = []
  nodes.forEach((n, i) => {
    nodes.forEach((m, j) => {
      if (j > i && Math.hypot(n.x - m.x, n.y - m.y) < 52) edges.push([i, j])
    })
  })
  return { nodes, edges }
})()

const EKG = 'M0 30 H40 L48 24 L54 30 H70 L76 6 L84 52 L90 30 H104 L112 22 L122 30 H150'

function NeuralScan({ pct }: { pct: number }) {
  return (
    <svg className="jack-scan" viewBox="0 0 300 300" aria-hidden>
      <circle cx={150} cy={150} r={136} className="jack-scan__ring is-outer" />
      <path d="M150 22 A128 128 0 0 1 278 150" className="jack-scan__arc" />
      <path d="M150 278 A128 128 0 0 1 22 150" className="jack-scan__arc" />
      <circle cx={150} cy={150} r={118} className="jack-scan__ring is-inner" />
      <path d="M150 150 L150 32 A118 118 0 0 1 252 91 Z" className="jack-scan__sweep" />
      {SCAN.edges.map(([a, b]) => {
        const on = pct >= SCAN.nodes[a].at && pct >= SCAN.nodes[b].at
        return (
          <line
            key={`${a}-${b}`}
            x1={SCAN.nodes[a].x}
            y1={SCAN.nodes[a].y}
            x2={SCAN.nodes[b].x}
            y2={SCAN.nodes[b].y}
            className={`jack-scan__edge${on ? ' is-on' : ''}`}
          />
        )
      })}
      {SCAN.nodes.map((n) => (
        <circle key={n.at} cx={n.x} cy={n.y} r={pct >= n.at ? 3.5 : 2} className={`jack-scan__node${pct >= n.at ? ' is-on' : ''}`} />
      ))}
      <path d="M150 4 V24 M150 276 V296 M4 150 H24 M276 150 H296" className="jack-scan__tick" />
      <text x={150} y={158} textAnchor="middle" className="jack-scan__pct">{pct}</text>
    </svg>
  )
}

function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let raf = 0
    let done = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / LOADER_MS)
      setPct(Math.round(progressAt(t)))
      if (t < 1) raf = requestAnimationFrame(tick)
      else done = window.setTimeout(onDone, 650)
    }
    raf = requestAnimationFrame(tick)

    const skip = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') onDone()
    }
    window.addEventListener('keydown', skip)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(done)
      window.removeEventListener('keydown', skip)
    }
  }, [onDone])

  const lit = Math.round((pct / 100) * SEGMENTS)
  const logged = Math.min(LOG.length, Math.floor((pct / 100) * LOG.length) + 1)

  const linked = pct === 100
  const title = linked ? 'Link established' : 'Jacking in'

  return (
    <div className={`jack-loader${linked ? ' is-linked' : ''}`} onClick={onDone}>
      <NeuralScan pct={pct} />
      <div className="jack-loader__panel">
        <p className="jack-loader__kicker">Neural link // {PROFILE.handle}</p>
        <p className="jack-loader__title" data-text={title}>{title}</p>

        <div
          className="jack-bar"
          role="progressbar"
          aria-label="Loading profile"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        >
          {Array.from({ length: SEGMENTS }, (_, i) => (
            <span key={i} className={i < lit ? 'is-on' : undefined} />
          ))}
        </div>
        <div className="jack-loader__row" aria-hidden>
          <span>{LOG[logged - 1]}</span>
          <span>{String(pct).padStart(3, '0')}%</span>
        </div>

        <svg className="jack-ekg" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden>
          <g className="jack-ekg__trace">
            {[0, 150, 300].map((x) => <path key={x} d={EKG} transform={`translate(${x} 0)`} />)}
          </g>
        </svg>

        <ul className="jack-log" aria-hidden>
          {LOG.slice(0, logged).map((line, i) => (
            <li key={line}>
              <span>0x{(0x3f2a + i * 0x1b7).toString(16).toUpperCase()}</span> {line}
              <span className={i < logged - 1 || pct === 100 ? 'is-ok' : 'is-wait'}>
                {i < logged - 1 || pct === 100 ? 'OK' : '...'}
              </span>
            </li>
          ))}
        </ul>

        <p className="jack-loader__skip">Click or press any key to skip</p>
      </div>
      {linked && <div className="jack-tear" aria-hidden />}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Neural matrix: the five attributes around a core, each with its    */
/* perks branching outward. Picking one lights its spoke and branch.  */
/* ------------------------------------------------------------------ */

const ATTRS = PROFILE.attributes
const MAX_LEVEL = 20
const C = 300
const R = 150
const R2 = 220
const PAD = 70
const SIZE = 600 + PAD * 2
const PERK_SPREAD = 13

const angleOf = (i: number) => -90 + i * (360 / ATTRS.length)
const pt = (deg: number, r: number): [number, number] => {
  const rad = (deg * Math.PI) / 180
  return [C + r * Math.cos(rad), C + r * Math.sin(rad)]
}
const pct = (v: number) => `${((v + PAD) / SIZE) * 100}%`

function NeuralMatrix() {
  const [active, setActive] = useState(0)
  const attr = ATTRS[active]

  return (
    <div className="matrix">
      <div className="matrix__stage">
        <svg viewBox={`${-PAD} ${-PAD} ${SIZE} ${SIZE}`} className="matrix__svg" aria-hidden>
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={C} cy={C} r={R2} className="matrix__pulse" style={{ animationDelay: `${i * 1.6}s` }} />
          ))}
          <circle cx={C} cy={C} r={R} className="matrix__ring" />
          <circle cx={C} cy={C} r={R2} className="matrix__ring is-outer" />
          <polygon points={ATTRS.map((_, i) => pt(angleOf(i), R).join(',')).join(' ')} className="matrix__web" />

          {ATTRS.map((a, i) => {
            const deg = angleOf(i)
            const [ax, ay] = pt(deg, R)
            const on = i === active
            return (
              <g key={a.name} className={`matrix__branch${on ? ' is-on' : ''}`}>
                <line x1={C} y1={C} x2={ax} y2={ay} className="matrix__spoke" />
                {!prefersReducedMotion() && (
                  <circle r={on ? 3.5 : 2} className="matrix__spark">
                    <animateMotion
                      dur={on ? '1.1s' : '2.6s'}
                      begin={`${i * 0.45}s`}
                      repeatCount="indefinite"
                      path={`M${C} ${C} L${ax} ${ay}`}
                    />
                  </circle>
                )}
                {a.perks.map((perk, j) => {
                  const pd = deg + (j - (a.perks.length - 1) / 2) * PERK_SPREAD
                  const [px, py] = pt(pd, R2)
                  const [lx, ly] = pt(pd, R2 + 14)
                  const norm = ((pd % 360) + 360) % 360
                  const flip = norm > 90 && norm < 270
                  return (
                    <g key={perk}>
                      <line x1={ax} y1={ay} x2={px} y2={py} className="matrix__twig" />
                      <rect x={px - 5} y={py - 5} width={10} height={10} transform={`rotate(45 ${px} ${py})`} className="matrix__perk" />
                      <text
                        x={lx}
                        y={ly}
                        transform={`rotate(${flip ? pd + 180 : pd} ${lx} ${ly})`}
                        textAnchor={flip ? 'end' : 'start'}
                        dominantBaseline="middle"
                        className="matrix__label"
                      >
                        {perk}
                      </text>
                    </g>
                  )
                })}
              </g>
            )
          })}
        </svg>

        <div className="matrix__core" style={{ left: pct(C), top: pct(C) }}>
          <img src={PROFILE.photo} alt="" />
        </div>

        {ATTRS.map((a, i) => {
          const [x, y] = pt(angleOf(i), R)
          return (
            <button
              key={a.name}
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className="matrix__node"
              style={{ left: pct(x), top: pct(y) }}
            >
              <span className="matrix__lvl">{a.level}</span>
              <span className="matrix__name">{a.name}</span>
            </button>
          )
        })}
      </div>

      <div className="matrix__readout" aria-live="polite">
        <p className="matrix__kicker">Attribute {String(active + 1).padStart(2, '0')} of {ATTRS.length}</p>
        <h3 className="matrix__title">{attr.name}</h3>
        <div className="matrix__ticks" role="img" aria-label={`Level ${attr.level} of ${MAX_LEVEL}`}>
          {Array.from({ length: MAX_LEVEL }, (_, i) => (
            <span key={i} className={i < attr.level ? 'is-on' : undefined} />
          ))}
          <span className="matrix__ticks-num" aria-hidden>{attr.level}/{MAX_LEVEL}</span>
        </div>
        <p className="matrix__reason">{attr.reason.text}</p>
        <ul className="matrix__perks" aria-label={`${attr.name} perks`}>
          {attr.perks.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </div>
    </div>
  )
}

/* Faint hex rain behind the matrix. One still frame under reduced motion. */
function DataRain() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const COL = 18
    const glyphs = '0123456789ABCDEF'
    let drops: number[] = []
    let raf = 0
    let last = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drops = Array.from({ length: Math.ceil(canvas.width / COL) }, () => Math.random() * canvas.height / COL)
      ctx.font = '13px monospace'
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 8, 0.12)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      drops.forEach((y, i) => {
        ctx.fillStyle = i % 7 === 0 ? 'rgba(237, 30, 121, 0.5)' : 'rgba(37, 225, 237, 0.4)'
        ctx.fillText(glyphs[(Math.random() * 16) | 0], i * COL, y * COL)
        drops[i] = y * COL > canvas.height && Math.random() > 0.97 ? 0 : y + 1
      })
    }

    const loop = (now: number) => {
      if (now - last > 70) {
        draw()
        last = now
      }
      raf = requestAnimationFrame(loop)
    }

    resize()
    if (prefersReducedMotion()) {
      for (let i = 0; i < 40; i++) draw()
    } else {
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="jack-rain" aria-hidden />
}

/* ------------------------------------------------------------------ */

export default function JackIn({ onClose }: { onClose: () => void }) {
  const [loaded, setLoaded] = useState(prefersReducedMotion)
  const finish = useCallback(() => setLoaded(true), [])

  return (
    <div className="takeover__inner">
      <div className="takeover__bar">
        <span className="takeover__signal" aria-hidden>
          {loaded ? 'Link stable' : 'Establishing link'} // {PROFILE.handle}
        </span>
        <button type="button" className="takeover__close" onClick={onClose} autoFocus>
          <X size={16} aria-hidden /> Jack out <kbd>Esc</kbd>
        </button>
      </div>

      {loaded && <DataRain />}
      {loaded ? (
        <div className="jack-grid">
          <div className="jack-hud">
            <h2 className="takeover__name" data-text={PROFILE.name}>{PROFILE.name}</h2>
            <p className="jack-hud__path">
              <span>Life path</span>
              {PROFILE.lifePath.title}
            </p>
            {PROFILE.bio.map((line) => (
              <p key={line.text} className="jack-hud__bio">{line.text}</p>
            ))}
            <dl className="jack-hud__facts">
              {PROFILE.facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <NeuralMatrix />
        </div>
      ) : (
        <Loader onDone={finish} />
      )}
    </div>
  )
}
