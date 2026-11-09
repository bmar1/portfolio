import { useMemo } from 'react'
import { rng } from '../utils/rng'

const W = 1600
const H = 900
const DECK = 600
const PILLARS = Array.from({ length: 9 }, (_, i) => 40 + i * 200)

function useSkyline() {
  return useMemo(() => {
    const r = rng(2077)
    const towers: { x: number; w: number; h: number }[] = []
    const windows: { x: number; y: number; c: string }[] = []
    let x = -20
    while (x < W) {
      const w = 40 + r() * 80
      const h = 160 + r() * 320
      towers.push({ x, w, h })
      for (let wy = DECK - h + 14; wy < DECK - 30; wy += 14) {
        for (let wx = x + 6; wx < x + w - 8; wx += 10) {
          if (r() < 0.12) windows.push({ x: wx, y: wy, c: r() < 0.7 ? '#fcee0a' : '#25e1ed' })
        }
      }
      x += w + 4 + r() * 18
    }
    return { towers, windows }
  }, [])
}

/** Elevated night-city platform, drawn for the leadership backdrop. */
export default function StationScene() {
  const { towers, windows } = useSkyline()

  return (
    <svg className="station-scene" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="st-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#050508" />
          <stop offset="0.55" stopColor="#0f0a18" />
          <stop offset="0.7" stopColor="#1c0c22" />
          <stop offset="1" stopColor="#050508" />
        </linearGradient>
        <filter id="st-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <rect width={W} height={H} fill="url(#st-sky)" />

      <g className="station-scene__city">
        {towers.map((t) => (
          <rect key={t.x} x={t.x} y={DECK - t.h} width={t.w} height={t.h} fill="#0b0b14" />
        ))}
        {windows.map((w) => (
          <rect key={`${w.x}-${w.y}`} x={w.x} y={w.y} width={3} height={5} fill={w.c} opacity={0.45} />
        ))}
        <rect x={262} y={250} width={6} height={150} fill="#ed1e79" filter="url(#st-glow)" />
        <rect x={262} y={250} width={6} height={150} fill="#ed1e79" />
        <rect x={1312} y={210} width={5} height={120} fill="#fcee0a" filter="url(#st-glow)" />
        <rect x={1312} y={210} width={5} height={120} fill="#fcee0a" />
      </g>

      <g className="station-scene__wires" fill="none" stroke="#1f2430" strokeWidth={2}>
        {PILLARS.map((x) => (
          <line key={x} x1={x} y1={DECK} x2={x} y2={DECK - 84} />
        ))}
        {PILLARS.slice(0, -1).map((x) => (
          <path key={x} d={`M${x} ${DECK - 76} Q${x + 100} ${DECK - 58} ${x + 200} ${DECK - 76}`} />
        ))}
      </g>

      <g className="station-train">
        <rect x={0} y={DECK - 50} width={640} height={46} fill="#14141f" />
        {Array.from({ length: 14 }, (_, i) => (
          <rect key={i} x={20 + i * 44} y={DECK - 40} width={30} height={14} fill="#fcee0a" opacity={0.55} />
        ))}
        <rect x={628} y={DECK - 30} width={12} height={8} fill="#fff" filter="url(#st-glow)" />
      </g>

      <rect x={0} y={DECK} width={W} height={20} fill="#101018" />
      <line x1={0} y1={DECK} x2={W} y2={DECK} stroke="#2a2f3d" strokeWidth={2} />
      {Array.from({ length: 20 }, (_, i) => (
        <circle key={i} cx={40 + i * 80} cy={DECK + 24} r={2} fill="#fcee0a" opacity={0.6} />
      ))}
      {PILLARS.map((x) => (
        <rect key={x} x={x - 13} y={DECK + 20} width={26} height={H - DECK} fill="#0a0a12" />
      ))}

      <g className="station-scene__canopy">
        <polygon points={`980,470 1540,470 1570,494 950,494`} fill="#0d0d16" stroke="#1f2430" />
        <rect x={960} y={494} width={600} height={3} fill="#fcee0a" filter="url(#st-glow)" />
        <rect x={960} y={494} width={600} height={2} fill="#fcee0a" />
        <line x1={1000} y1={494} x2={1000} y2={DECK} stroke="#1f2430" strokeWidth={6} />
        <line x1={1520} y1={494} x2={1520} y2={DECK} stroke="#1f2430" strokeWidth={6} />
        <line x1={1270} y1={494} x2={1270} y2={512} stroke="#2a2f3d" strokeWidth={2} />
        <rect x={1170} y={512} width={200} height={36} fill="#050508" stroke="#ed1e79" strokeWidth={2} />
        <text x={1270} y={537} textAnchor="middle" className="station-scene__sign" filter="url(#st-glow)">
          SENECA
        </text>
        <text x={1270} y={537} textAnchor="middle" className="station-scene__sign">
          SENECA
        </text>
      </g>

      <rect y={DECK + 20} width={W} height={H - DECK} fill="url(#st-sky)" opacity={0.6} />
    </svg>
  )
}
