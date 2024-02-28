import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { Stats, OrbitControls, Center } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { useViewportStore } from "@/app/store/viewport";

export default function Viewport() {
  const flatShading = useViewportStore((state) => state.flatShading);

  return (
    <div className="h-100 w-1/3 bg-stone-100">
      <h1 className="font-bold text-lg text-blue-950">
        flatShading {flatShading ? "true" : "false"}
      </h1>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <OrbitControls />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Environment preset="forest" blur={0.9} />

        <Center>
          <Box position={[-1.2, 0, 0]} />
        </Center>
      </Canvas>
      ,
    </div>
  );
}

function Box(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => (meshRef.current.rotation.x += delta));

  const albedo = useViewportStore((state) => state.albedo);
  const roughness = useViewportStore((state) => state.roughness);
  const metalness = useViewportStore((state) => state.metalness);
  const opacity = useViewportStore((state) => state.opacity);
  const emissive = useViewportStore((state) => state.emissive);
  const emissiveIntensity = useViewportStore(
    (state) => state.emissiveIntensity,
  );
  const flatShading = useViewportStore((state) => state.flatShading);
  const wireframe = useViewportStore((state) => state.wireframe);
  const wireframeLinewidth = useViewportStore(
    (state) => state.wireframeLinewidth,
  );

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <sphereGeometry args={[1.3, 64, 64]} />
      <meshStandardMaterial
        color={albedo}
        roughness={roughness}
        metalness={metalness}
        opacity={opacity}
        transparent={true}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        flatShading={flatShading}
        wireframe={wireframe}
        wireframeLinewidth={wireframeLinewidth}
      />
    </mesh>
  );
}
