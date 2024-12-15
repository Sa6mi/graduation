import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, useTexture, Stats } from '@react-three/drei';
import * as THREE from 'three';

interface MaterialConfig {
    id: number;
    name: string;
    config: {
      color: string;
      metalness?: number;
      roughness?: number;
      transmission?: number;
      ior?: number;
      clearcoat?: number;
      clearcoatRoughness?: number;
      isNormalMap?: boolean;
      isEmissive?: boolean;
      isAnisotropic?: boolean;
      isIridescent?: boolean;
      isSubsurface?: boolean;
      emissiveIntensity?: number;
      anisotropyStrength?: number;
      thickness?: number;
      attenuationDistance?: number;
      sheen?: number;
      sheenRoughness?: number;
      aoMapIntensity?: number;
    };
  }
  const materialConfigs: MaterialConfig[] = [
    { id: 1, name: "Baseline Diffuse", config: { color: "#FF1493", metalness: 0, roughness: 1 }},
    { id: 2, name: "Mixed Material", config: { color: "#FF4500", metalness: 0.5, roughness: 0.5 }},
    { id: 3, name: "Perfect Metal", config: { color: "#FFD700", metalness: 1, roughness: 0.05 }},
    { id: 4, name: "Clearcoat", config: { color: "#32CD32", metalness: 0.8, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.1 }},
    { id: 5, name: "Diamond Glass", config: { color: "#1E90FF", metalness: 0, roughness: 0, transmission: 1, ior: 2.7 }},
    { id: 6, name: "Metal Clearcoat", config: { color: "#8A2BE2", metalness: 1, roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.3 }},
    { id: 7, name: "Thin Glass", config: { color: "#FFFFFF", metalness: 0, roughness: 0.05, transmission: 0.98, ior: 1.5 }},
    { id: 8, name: "Complex Mixed", config: { color: "#FFFFFF", metalness: 0.5, roughness: 0.1, transmission: 0.5, ior: 2.0 }},
    { id: 9, name: "Normal AO", config: { color: "#4169E1", isNormalMap: true, metalness: 0.8, roughness: 0.2, aoMapIntensity: 1.0 }},
    { id: 10, name: "Bright Emission", config: { color: "#00FF00", isEmissive: true, emissiveIntensity: 5.0 }},
    { id: 11, name: "Brushed Metal", config: { color: "#FFA500", isAnisotropic: true, anisotropyStrength: 0.8, roughness: 0.2 }},
    { id: 12, name: "Iridescent", config: { color: "#4B0082", isIridescent: true, sheenRoughness: 0.05, sheen: 1.0 }},
    { id: 13, name: "Deep Subsurface", config: { color: "#FF6347", isSubsurface: true, thickness: 2.0, attenuationDistance: 0.2 }},
    { id: 14, name: "Textured Glass", config: { color: "#555555", isNormalMap: true, roughness: 0.3, transmission: 0.8, ior: 1.4 }},
    { id: 15, name: "Multi-Layer", config: { color: "#800080", isNormalMap: true, aoMapIntensity: 1.0, metalness: 0.7, roughness: 0.2 }}
  ];
interface SingleBenchmarkProps {
  config: MaterialConfig['config'];
  active: boolean;
}

function SingleBenchmark({ config, active }: SingleBenchmarkProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const {
    normalMap,
    emissiveMap,
    anisotropicMap,
    thicknessMap,
    aoMap,
    roughnessMap,
    metallicMap
  } = useTexture({
    normalMap: '/Maps/Normal.jpg',
    emissiveMap: '/Maps/Emmisive.jpg',
    anisotropicMap: '/Maps/Anisotropy.jpg',
    thicknessMap: '/Maps/Thickness.jpg',
    aoMap: '/Maps/AO.jpg',
    roughnessMap: '/Maps/Roughness.jpg',
    metallicMap: '/Maps/Metallic.jpg'
  });
  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: config.color,
      metalness: config.metalness || 0,
      roughness: config.roughness || 0.5,
      transmission: config.transmission || 0,
      ior: config.ior || 1.5,
      clearcoat: config.clearcoat || 0,
      clearcoatRoughness: config.clearcoatRoughness || 0,
      normalMap: config.isNormalMap ? normalMap : null,
      emissiveMap: config.isEmissive ? emissiveMap : null,
      anisotropyMap: config.isAnisotropic ? anisotropicMap : null,
      thicknessMap: config.isSubsurface ? thicknessMap : null,
      aoMap: config.aoMapIntensity ? aoMap : null,
      aoMapIntensity: config.aoMapIntensity || 0,
      emissiveIntensity: config.emissiveIntensity || 0,
      anisotropy: config.anisotropyStrength || 0,
      thickness: config.thickness || 0,
      attenuationDistance: config.attenuationDistance || 0,
      sheen: config.sheen || 0,
      sheenRoughness: config.sheenRoughness || 0
    });
  }, [config, normalMap, emissiveMap, anisotropicMap, thicknessMap, aoMap]);  useEffect(() => {
    return () => {
      material.dispose();
      [normalMap, emissiveMap, anisotropicMap, thicknessMap, aoMap, roughnessMap, metallicMap]
        .forEach(tex => tex?.dispose());
    };
  }, []);

  return (
    <mesh ref={meshRef} visible={active}>
      <sphereGeometry args={[0.7, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function CameraControl() {
  const { camera } = useThree();
  
  useFrame(() => {
    const time = Date.now() * 0.001;
    camera.position.x = Math.cos(time * 0.5) * 3;
    camera.position.z = Math.sin(time * 0.5) * 3;
    camera.position.y = 1.5;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

interface SphereBenchmarkProps {
  activeMaterial?: number;
}

export default function SphereBenchmark({ activeMaterial = 0 }: SphereBenchmarkProps) {
  return (
    <Canvas camera={{ position: [0, 1.5, 3] }} shadows>
      <color attach="background" args={["#1a1a1a"]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 5, 5]} intensity={1} />
      
      {materialConfigs.map((mat, idx) => (
        <SingleBenchmark 
          key={mat.id}
          config={mat.config}
          active={activeMaterial === idx}
        />
      ))}
      
      <CameraControl />
      <Environment preset="sunset" />
      <Stats />
    </Canvas>
  );
}

export { materialConfigs };