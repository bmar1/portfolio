import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

const CYAN = '#39d0d8'
const CYAN_SOFT = '#8feaf3'
const CORE = '#d8f9ff'
const FIBER_SEGMENTS = 6

function hashNoise(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function n3(x: number, y: number, z: number, t: number): number {
  return (
    Math.sin(x * 4.2 + t * 1.15) * Math.cos(y * 3.7 - t * 0.92) * 0.55 +
    Math.sin(y * 2.4 + z * 3.2 + t * 0.68) * 0.38 +
    Math.sin(z * 3.9 + t * 1.25) * Math.cos(x * 2.3 + y * 1.1) * 0.42 +
    Math.sin((x + y + z) * 2.1 + t * 0.45) * 0.25
  )
}

function fibonacciPoint(i: number, n: number, r: number, out: THREE.Vector3) {
  const y = 1 - (i / Math.max(1, n - 1)) * 2
  const rad = Math.sqrt(Math.max(0, 1 - y * y))
  const theta = Math.PI * (3 - Math.sqrt(5)) * i
  out.set(Math.cos(theta) * rad * r, y * r, Math.sin(theta) * rad * r)
}

function Scene({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null)
  const haloA = useRef<THREE.Mesh>(null)
  const haloB = useRef<THREE.Mesh>(null)

  const { shellPoints, innerPoints, fiberSeeds, shellN, innerN, fiberN, linePairs } =
    useMemo(() => {
      const shellN = 320
      const innerN = 760
      const fiberN = 620

      const shellPoints: THREE.Vector3[] = []
      const temp = new THREE.Vector3()
      for (let i = 0; i < shellN; i++) {
        fibonacciPoint(i, shellN, 1, temp)
        shellPoints.push(temp.clone())
      }

      const innerPoints: THREE.Vector3[] = []
      for (let i = 0; i < innerN; i++) {
        const magnitude = 0.08 + hashNoise(i + 11) * 0.86
        innerPoints.push(
          new THREE.Vector3().randomDirection().multiplyScalar(magnitude),
        )
      }

      const fiberSeeds: Array<{
        base: THREE.Vector3
        tangent: THREE.Vector3
        phase: number
        amplitude: number
        length: number
      }> = []
      for (let i = 0; i < fiberN; i++) {
        const base = new THREE.Vector3().randomDirection()
        const tangent = new THREE.Vector3(0, 1, 0).cross(base)
        if (tangent.lengthSq() < 0.001) {
          tangent.set(1, 0, 0).cross(base)
        }
        tangent.normalize()
        const seed = i + 97
        fiberSeeds.push({
          base,
          tangent,
          phase: hashNoise(seed) * Math.PI * 2,
          amplitude: 0.14 + hashNoise(seed + 1) * 0.34,
          length: 0.16 + hashNoise(seed + 2) * 0.28,
        })
      }

      const linePairs: [number, number][] = []
      const offsets = [1, 7, 21, 47]
      for (let i = 0; i < shellN; i++) {
        for (const offset of offsets) {
          linePairs.push([i, (i + offset) % shellN])
        }
      }
      for (let i = 0; i < innerN; i += 3) {
        linePairs.push([i % shellN, shellN + i])
      }

      return { shellPoints, innerPoints, fiberSeeds, shellN, innerN, fiberN, linePairs }
    }, [])

  const shellGeo = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(shellN * 3), 3),
    )
    return geometry
  }, [shellN])

  const innerGeo = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(innerN * 3), 3),
    )
    return geometry
  }, [innerN])

  const fiberGeo = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(fiberN * FIBER_SEGMENTS * 2 * 3), 3),
    )
    return geometry
  }, [fiberN])

  const lineGeo = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(linePairs.length * 2 * 3), 3),
    )
    return geometry
  }, [linePairs.length])

  const tmp = useRef(new THREE.Vector3())
  const tmpN = useRef(new THREE.Vector3())

  useFrame((state) => {
    const t = animate ? state.clock.elapsedTime : 0
    const dt = animate ? state.clock.getDelta() : 0

    if (group.current) {
      group.current.rotation.y += dt * 0.12
      group.current.rotation.x = Math.sin(t * 0.2) * 0.07
      group.current.rotation.z = Math.cos(t * 0.16) * 0.045
    }
    if (animate) {
      const cam = state.camera as THREE.PerspectiveCamera
      cam.position.x = Math.sin(t * 0.22) * 0.26
      cam.position.y = Math.cos(t * 0.18) * 0.18
      cam.position.z = 3.6 + Math.sin(t * 0.14) * 0.14
      cam.lookAt(0, 0, 0)
    }

    if (haloA.current) {
      haloA.current.rotation.z += dt * 0.05
      haloA.current.scale.setScalar(1 + Math.sin(t * 0.7) * 0.025)
    }
    if (haloB.current) {
      haloB.current.rotation.z -= dt * 0.07
      haloB.current.scale.setScalar(1 + Math.cos(t * 0.8) * 0.035)
    }

    const shellAttr = shellGeo.getAttribute('position') as THREE.BufferAttribute
    const shellArr = shellAttr.array as Float32Array
    let si = 0
    for (let i = 0; i < shellPoints.length; i++) {
      const point = shellPoints[i]
      tmpN.current.copy(point).normalize()
      const wobble = animate
        ? n3(point.x, point.y, point.z, t) * 0.1 + Math.sin(t * 1.35 + i * 0.04) * 0.035
        : 0
      tmp.current.copy(point).addScaledVector(tmpN.current, wobble)
      shellArr[si++] = tmp.current.x
      shellArr[si++] = tmp.current.y
      shellArr[si++] = tmp.current.z
    }
    shellAttr.needsUpdate = true

    const innerAttr = innerGeo.getAttribute('position') as THREE.BufferAttribute
    const innerArr = innerAttr.array as Float32Array
    let ii = 0
    for (let i = 0; i < innerPoints.length; i++) {
      const point = innerPoints[i]
      tmpN.current.copy(point).normalize()
      const wobble = animate
        ? n3(point.x * 2.8, point.y * 2.8, point.z * 2.8, t * 1.1) * 0.26 +
          Math.sin(t * 1.7 + i * 0.07) * 0.08
        : 0
      tmp.current.copy(point).addScaledVector(tmpN.current, wobble)
      innerArr[ii++] = tmp.current.x
      innerArr[ii++] = tmp.current.y
      innerArr[ii++] = tmp.current.z
    }
    innerAttr.needsUpdate = true

    const fiberAttr = fiberGeo.getAttribute('position') as THREE.BufferAttribute
    const fiberArr = fiberAttr.array as Float32Array
    let fi = 0
    const bitangent = new THREE.Vector3()
    const center = new THREE.Vector3()
    const drift = new THREE.Vector3()
    const pA = new THREE.Vector3()
    const pB = new THREE.Vector3()
    for (let i = 0; i < fiberSeeds.length; i++) {
      const fiber = fiberSeeds[i]
      bitangent.copy(fiber.base).cross(fiber.tangent).normalize()

      const phase = fiber.phase + t * (0.55 + fiber.amplitude * 0.65)
      const radial =
        0.7 +
        fiber.amplitude +
        Math.sin(phase * 0.8 + i * 0.03) * 0.18 +
        n3(fiber.base.x * 2.2, fiber.base.y * 2.2, fiber.base.z * 2.2, t * 0.6) * 0.22

      center
        .copy(fiber.base)
        .multiplyScalar(radial)
        .addScaledVector(fiber.tangent, Math.sin(phase) * 0.24)
        .addScaledVector(bitangent, Math.cos(phase * 1.2) * 0.24)

      drift.set(
        Math.sin(phase * 0.9 + fiber.base.y * 4) * 0.11,
        Math.cos(phase * 1.1 + fiber.base.z * 4) * 0.11,
        Math.sin(phase * 1.3 + fiber.base.x * 4) * 0.11,
      )
      center.add(drift)

      const strandDir = tmp.current
        .copy(fiber.tangent)
        .multiplyScalar(Math.sin(phase * 1.4) * 0.95)
        .addScaledVector(bitangent, Math.cos(phase * 1.05) * 1.1)
        .addScaledVector(fiber.base, Math.sin(phase * 0.6) * 0.42)
        .normalize()

      for (let seg = 0; seg < FIBER_SEGMENTS; seg++) {
        const u0 = seg / FIBER_SEGMENTS
        const u1 = (seg + 1) / FIBER_SEGMENTS
        const arc0 = (u0 - 0.5) * fiber.length * 2.6
        const arc1 = (u1 - 0.5) * fiber.length * 2.6
        const curveAmp = fiber.amplitude * 0.44

        pA
          .copy(center)
          .addScaledVector(strandDir, arc0)
          .addScaledVector(
            fiber.tangent,
            Math.sin(phase * 2.7 + u0 * 12 + i * 0.09) * curveAmp,
          )
          .addScaledVector(
            bitangent,
            Math.cos(phase * 2.2 + u0 * 9 + i * 0.07) * curveAmp * 0.9,
          )
          .addScaledVector(
            fiber.base,
            Math.sin(phase * 3.1 + u0 * 15 + i * 0.05) * curveAmp * 0.45,
          )

        pB
          .copy(center)
          .addScaledVector(strandDir, arc1)
          .addScaledVector(
            fiber.tangent,
            Math.sin(phase * 2.7 + u1 * 12 + i * 0.09) * curveAmp,
          )
          .addScaledVector(
            bitangent,
            Math.cos(phase * 2.2 + u1 * 9 + i * 0.07) * curveAmp * 0.9,
          )
          .addScaledVector(
            fiber.base,
            Math.sin(phase * 3.1 + u1 * 15 + i * 0.05) * curveAmp * 0.45,
          )

        fiberArr[fi++] = pA.x
        fiberArr[fi++] = pA.y
        fiberArr[fi++] = pA.z
        fiberArr[fi++] = pB.x
        fiberArr[fi++] = pB.y
        fiberArr[fi++] = pB.z
      }
    }
    fiberAttr.needsUpdate = true

    const lineAttr = lineGeo.getAttribute('position') as THREE.BufferAttribute
    const lineArr = lineAttr.array as Float32Array
    let li = 0
    for (const [a, b] of linePairs) {
      const start = shellPoints[a]
      tmpN.current.copy(start).normalize()
      const w1 = animate ? n3(start.x, start.y, start.z, t) * 0.11 : 0
      tmp.current.copy(start).addScaledVector(tmpN.current, w1)
      lineArr[li++] = tmp.current.x
      lineArr[li++] = tmp.current.y
      lineArr[li++] = tmp.current.z

      if (b < shellN) {
        const end = shellPoints[b]
        tmpN.current.copy(end).normalize()
        const w2 = animate ? n3(end.x, end.y, end.z, t + 0.18) * 0.11 : 0
        tmp.current.copy(end).addScaledVector(tmpN.current, w2)
      } else {
        const end = innerPoints[b - shellN]
        tmpN.current.copy(end).normalize()
        const w2 = animate ? n3(end.x * 2.4, end.y * 2.4, end.z * 2.4, t) * 0.18 : 0
        tmp.current.copy(end).addScaledVector(tmpN.current, w2)
      }
      lineArr[li++] = tmp.current.x
      lineArr[li++] = tmp.current.y
      lineArr[li++] = tmp.current.z
    }
    lineAttr.needsUpdate = true
  })

  return (
    <group ref={group}>
      <ambientLight intensity={0.01} />
      <pointLight color={CYAN} intensity={1.4} distance={10} position={[1.4, 1.2, 2.4]} />
      <pointLight color={CYAN_SOFT} intensity={0.75} distance={8} position={[-1.6, -0.7, 2]} />

      <mesh ref={haloA} scale={1.08}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          color={CYAN}
          transparent
          opacity={0.02}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh ref={haloB} scale={[1.24, 1.02, 1.24]} rotation={[0.6, 0.1, Math.PI / 7]}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial
          color={CYAN_SOFT}
          wireframe
          transparent
          opacity={0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          color={CYAN}
          transparent
          opacity={0.24}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      <lineSegments geometry={lineGeo} rotation={[0.4, 0.65, 0.3]} scale={[1.02, 0.9, 1.08]}>
        <lineBasicMaterial
          color={CYAN_SOFT}
          transparent
          opacity={0.14}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      <lineSegments geometry={fiberGeo}>
        <lineBasicMaterial
          color={CYAN_SOFT}
          transparent
          opacity={0.38}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      <points geometry={shellGeo}>
        <pointsMaterial
          color={CYAN}
          size={0.03}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points geometry={innerGeo}>
        <pointsMaterial
          color={CORE}
          size={0.024}
          sizeAttenuation
          transparent
          opacity={0.92}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh scale={0.12}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color={CORE}
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh scale={0.36}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={CYAN}
          transparent
          opacity={0.07}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh scale={[0.86, 1.02, 0.86]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={CYAN_SOFT}
          transparent
          opacity={0.03}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      <EffectComposer enableNormalPass={false}>
        <Bloom luminanceThreshold={0.08} intensity={2.35} radius={0.72} mipmapBlur />
      </EffectComposer>
    </group>
  )
}

export default function JarvisOrb({ animate }: { animate: boolean }) {
  return (
    <div className="relative isolate z-0 h-full min-h-0 w-full min-w-0">
      {/* Rounded clip only — clipPath + mask on the same layer as WebGL can blank the canvas in some browsers */}
      <div className="relative h-full w-full min-h-0 overflow-hidden rounded-full bg-transparent [&_canvas]:block [&_canvas]:h-full [&_canvas]:min-h-[280px] [&_canvas]:w-full [&_canvas]:rounded-full">
        <Canvas
          camera={{ position: [0, 0, 3.6], fov: 38 }}
          className="h-full! min-h-[280px]! w-full!"
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: false,
          }}
          dpr={[1, 2]}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0)
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.toneMappingExposure = 1.18
          }}
        >
          <Suspense fallback={null}>
            <Scene animate={animate} />
          </Suspense>
        </Canvas>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, rgba(57, 208, 216, 0.06) 0%, rgba(57, 208, 216, 0.02) 42%, transparent 74%)',
          }}
        />
      </div>
    </div>
  )
}
