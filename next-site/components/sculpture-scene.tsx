"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group } from "three";
function Sculpture({
  active,
  onReady,
  onFailure,
}: {
  active: boolean;
  onReady: () => void;
  onFailure: () => void;
}) {
  const group = useRef<Group>(null);
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);
  const ready = useRef(false);
  const callbacks = useRef({ onReady, onFailure });
  callbacks.current = { onReady, onFailure };
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => {
      event.preventDefault();
      callbacks.current.onFailure();
    };
    canvas.addEventListener("webglcontextlost", lost);
    invalidate();
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, invalidate]);
  useEffect(() => {
    if (!active) return;
    const timer = setInterval(() => invalidate(), 1000 / 30);
    return () => clearInterval(timer);
  }, [active, invalidate]);
  useFrame((state, delta) => {
    if (group.current && active) {
      group.current.rotation.y += Math.min(delta, 0.05) * 0.12;
      group.current.rotation.x += (state.pointer.y * 0.08 - group.current.rotation.x) * 0.035;
    }
    if (!ready.current) {
      ready.current = true;
      requestAnimationFrame(() => callbacks.current.onReady());
    }
  });
  return (
    <group ref={group} rotation={[0, 0.3, -0.35]}>
      <mesh>
        <torusKnotGeometry args={[1.35, 0.35, 128, 16, 2, 3]} />
        <meshStandardMaterial color="#8dddc4" metalness={0.75} roughness={0.24} />
      </mesh>
      <mesh rotation={[0.9, 0.2, 0]}>
        <torusGeometry args={[1.75, 0.085, 12, 96]} />
        <meshStandardMaterial color="#dce5e2" metalness={0.85} roughness={0.2} />
      </mesh>
    </group>
  );
}
export default function SculptureScene({
  active,
  onReady,
  onFailure,
}: {
  active: boolean;
  onReady: () => void;
  onFailure: () => void;
}) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8.3], fov: 42 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "low-power",
        failIfMajorPerformanceCaveat: true,
      }}
      fallback={null}
    >
      <color attach="background" args={["#061923"]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 5]} intensity={5} color="#e9fff8" />
      <directionalLight position={[-4, -2, 2]} intensity={3} color="#3cb8b5" />
      <Sculpture active={active} onReady={onReady} onFailure={onFailure} />
    </Canvas>
  );
}
