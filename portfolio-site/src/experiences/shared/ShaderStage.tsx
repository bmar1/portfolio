import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle, Vec2 } from 'ogl'
import { useReducedMotion } from './useReducedMotion'

export type ShaderVariant = 'rain' | 'dataStream' | 'grid' | 'noise'

const VERT = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`

/**
 * One fragment shader, four looks picked by `u_variant`. This keeps a
 * single GL program warm per <ShaderStage>, instead of compiling four
 * programs nobody asked for. Each variant is a procedural "video" loop:
 * no media file, no network request, pauses itself off-screen.
 */
const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_variant;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Rain-on-glass: vertical streaks of refraction-like noise sliding down.
float rain(vec2 uv, float t) {
  vec2 p = uv * vec2(18.0, 7.0);
  p.y += t * 2.2;
  float streak = noise(vec2(p.x, p.y * 0.3));
  float drop = smoothstep(0.82, 1.0, streak);
  float trail = smoothstep(0.55, 0.82, streak) * 0.35;
  return drop + trail;
}

// Data stream: horizontal scanning bands of falling glyph-density noise.
float dataStream(vec2 uv, float t) {
  vec2 p = uv * vec2(4.0, 40.0);
  p.y += t * 6.0;
  float cell = step(0.5, noise(floor(p)));
  float scan = smoothstep(0.0, 0.08, abs(fract(uv.y * 3.0 - t * 0.4) - 0.5));
  return cell * (0.5 + 0.5 * scan);
}

// Grid pulse: faint perspective grid with a slow traveling glow line.
float gridPulse(vec2 uv, float t) {
  vec2 g = abs(fract(uv * 24.0) - 0.5);
  float lines = smoothstep(0.48, 0.5, max(g.x, g.y));
  float sweep = smoothstep(0.02, 0.0, abs(uv.y - fract(t * 0.12)));
  return lines * 0.6 + sweep * 0.8;
}

// Soft film noise: low-frequency flicker, cheapest variant, used as a base
// atmosphere layer behind readable text.
float filmNoise(vec2 uv, float t) {
  return noise(uv * 3.0 + t * 0.6) * 0.5;
}

void main() {
  vec2 uv = vUv;
  float v = 0.0;
  if (u_variant < 0.5) v = rain(uv, u_time);
  else if (u_variant < 1.5) v = dataStream(uv, u_time);
  else if (u_variant < 2.5) v = gridPulse(uv, u_time);
  else v = filmNoise(uv, u_time);

  vec3 color = mix(u_colorA, u_colorB, clamp(v, 0.0, 1.0));
  float alpha = clamp(v, 0.0, 1.0) * 0.9;
  gl_FragColor = vec4(color, alpha);
}
`

export interface ShaderStageProps {
  variant: ShaderVariant
  colorA?: [number, number, number]
  colorB?: [number, number, number]
  className?: string
  /** 0.1 to 1. Lower runs the shader slower, cheaper on battery. */
  speed?: number
}

const VARIANT_INDEX: Record<ShaderVariant, number> = {
  rain: 0,
  dataStream: 1,
  grid: 2,
  noise: 3,
}

/**
 * Full-bleed procedural "video" background. Pauses its render loop via
 * IntersectionObserver when off-screen, and never mounts the GL context at
 * all under prefers-reduced-motion (falls back to a static tinted div so
 * the layout does not shift).
 */
export default function ShaderStage({
  variant,
  colorA = [0.02, 0.02, 0.03],
  colorB = [0.99, 0.93, 0.04],
  className,
  speed = 1,
}: ShaderStageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !containerRef.current) return
    const container = containerRef.current

    const renderer = new Renderer({ alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio, 1.5) })
    const gl = renderer.gl
    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'
    container.appendChild(gl.canvas)

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new Vec2(1, 1) },
        u_variant: { value: VARIANT_INDEX[variant] },
        u_colorA: { value: colorA },
        u_colorB: { value: colorB },
      },
      transparent: true,
    })
    const mesh = new Mesh(gl, { geometry, program })

    let raf = 0
    let visible = true
    const start = performance.now()

    function resize() {
      const { clientWidth, clientHeight } = container
      renderer.setSize(clientWidth, clientHeight)
      program.uniforms.u_resolution.value.set(clientWidth, clientHeight)
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(container)

    function loop(now: number) {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      program.uniforms.u_time.value = ((now - start) / 1000) * speed
      renderer.render({ scene: mesh })
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      io.disconnect()
      gl.canvas.remove()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, variant])

  if (reduced) {
    return (
      <div
        className={className}
        aria-hidden
        style={{
          background: `linear-gradient(160deg, rgb(${colorA.map((c) => c * 255).join(',')}), rgb(${colorB
            .map((c) => c * 255)
            .join(',')}))`,
          opacity: 0.18,
        }}
      />
    )
  }

  return <div ref={containerRef} className={className} aria-hidden />
}
