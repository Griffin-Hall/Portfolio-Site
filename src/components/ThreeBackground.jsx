import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

function Particles({ count = 80 }) {
  const mesh = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02
      mesh.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#6366f1" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function FloatingShape({ position, scale, speed, geometry = 'octahedron' }) {
  const mesh = useRef()

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * speed * 0.3
      mesh.current.rotation.z = state.clock.elapsedTime * speed * 0.2
    }
  })

  const geo = geometry === 'icosahedron'
    ? <icosahedronGeometry args={[1, 0]} />
    : <octahedronGeometry args={[1, 0]} />

  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={2.2}>
      <mesh ref={mesh} position={position} scale={scale}>
        {geo}
        <meshStandardMaterial color="#818cf8" transparent opacity={0.42} wireframe />
      </mesh>
    </Float>
  )
}

// Wraps all geometry in a group that smoothly tilts toward the mouse pointer
function Scene() {
  const groupRef = useRef()
  const { pointer } = useThree()
  const lerped = useRef({ x: 0, y: 0 })

  useFrame(() => {
    lerped.current.x += (pointer.x - lerped.current.x) * 0.025
    lerped.current.y += (pointer.y - lerped.current.y) * 0.025
    if (groupRef.current) {
      groupRef.current.rotation.y = lerped.current.x * 0.3
      groupRef.current.rotation.x = lerped.current.y * -0.2
    }
  })

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 5]}  intensity={1.2} color="#818cf8" />
      <pointLight position={[-8, -6, 3]}  intensity={0.6} color="#a78bfa" />
      <Particles count={isMobile ? 50 : 80} />
      <group ref={groupRef}>
        <FloatingShape position={[-3, 1, -1]}      scale={1.6} speed={1.2} />
        <FloatingShape position={[3.5, -1.5, -2]}  scale={1.1} speed={0.8} />
        <FloatingShape position={[0, 2.5, -3]}      scale={0.9} speed={1.5} />
        {!isMobile && (
          <>
            <FloatingShape position={[-2, -2, -0.5]}   scale={0.7} speed={1.0} />
            <FloatingShape position={[2.5, 1.5, -4]}   scale={1.2} speed={0.9} geometry="icosahedron" />
          </>
        )}
      </group>
    </>
  )
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
