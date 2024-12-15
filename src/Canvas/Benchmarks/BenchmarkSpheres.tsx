"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Height, Radius, STOP_TIME } from "./Global/GlobalVars";
interface SphereProps {
  position: [number, number, number];
  color?: string;
  metalness?: number;
  roughness?: number;
  transmission?: number;
  ior?: number;
  speed?: number;
  isRealTimeMirror?: boolean;
  isNormalMap?: boolean;
  isEmissive?: boolean;
  isAnisotropic?: boolean;
  isIridescent?: boolean;
  isSubsurface?: boolean;
  clearcoatRoughness?: number;
  aoMapIntensity?: number;
  sheen?: number;
  attenuationDistance?: number;
  thickness?: number;
  emissiveIntensity?: number;
  anisotropyStrength?: number;
  sheenRoughness?: number;
  roughnessMap?: boolean;
  metallicMap?: boolean;
  clearcoat?: number;
}

function Sphere({
  position,
  color = "#ffffff",
  metalness = 0,
  roughness = 0.5,
  transmission = 0,
  ior = 1.5,
  speed = 1,
  isRealTimeMirror = false,
  isNormalMap = false,
  isEmissive = false,
  isAnisotropic = false,
  isIridescent = false,
  isSubsurface = false,
  ...props
}: SphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scene } = useThree();
  const startTimeRef = useRef<number | null>(null);

  const normalMap = useTexture("/Maps/Normal.jpg");
  const emissiveMap = useTexture("/Maps/Emmisive.jpg");
  const anisotropicMap = useTexture("/Maps/Anisotropy.jpg");
  const thicknessMap = useTexture("/Maps/Thickness.jpg");
  const aoMap = useTexture("/Maps/AO.jpg");
  const roughnessMap = useTexture("/Maps/Roughness.jpg");
  const metallicMap = useTexture("/Maps/Metallic.jpg");

  useFrame((state, delta) => {
    if (!startTimeRef.current) {
      startTimeRef.current = state.clock.elapsedTime;
    }

    if (
      meshRef.current &&
      state.clock.elapsedTime - startTimeRef.current >= STOP_TIME
    ) {
      meshRef.current.rotation.x += delta * 0.2 * speed;
      meshRef.current.rotation.y += delta * 0.3 * speed;
    }
  });

  const material = useMemo(() => {
    if (isRealTimeMirror) return null;
    if (isIridescent) {
      return new THREE.MeshPhysicalMaterial({
        color,
        metalness,
        roughness,
        transmission,
        ior,
        sheen: 1,
        sheenRoughness: props.sheenRoughness || 0.25,
        sheenColor: new THREE.Color(1, 1, 1),
      });
    }
    if (isSubsurface) {
      return new THREE.MeshPhysicalMaterial({
        color,
        metalness,
        roughness,
        transmission: 0.5,
        thickness: props.thickness || 0.5,
        thicknessMap,
        attenuationDistance: props.attenuationDistance || 0.5,
        attenuationColor: new THREE.Color(color).multiplyScalar(0.5),
      });
    }
    return new THREE.MeshPhysicalMaterial({
      color,
      metalness,
      roughness,
      transmission,
      ior,
      normalMap: isNormalMap ? normalMap : null,
      roughnessMap: props.roughnessMap ? roughnessMap : null,
      metalnessMap: props.metallicMap ? metallicMap : null,
      aoMap: props.aoMapIntensity ? aoMap : null,
      aoMapIntensity: props.aoMapIntensity || 0,
      emissive: isEmissive ? new THREE.Color(color) : new THREE.Color(0x000000),
      emissiveMap: isEmissive ? emissiveMap : null,
      emissiveIntensity: props.emissiveIntensity || 0,
      anisotropy: isAnisotropic ? props.anisotropyStrength || 1 : 0,
      anisotropyMap: isAnisotropic ? anisotropicMap : null,
      clearcoat: props.clearcoat || 0,
      clearcoatRoughness: props.clearcoatRoughness || 0,
    });
  }, [
    color,
    metalness,
    roughness,
    transmission,
    ior,
    isNormalMap,
    isEmissive,
    isAnisotropic,
    isIridescent,
    isSubsurface,
    normalMap,
    emissiveMap,
    anisotropicMap,
    thicknessMap,
    aoMap,
    roughnessMap,
    metallicMap,
    props.clearcoatRoughness,
    props.aoMapIntensity,
    props.emissiveIntensity,
    props.anisotropyStrength,
    props.thickness,
    props.attenuationDistance,
    props.clearcoat,
    props.sheenRoughness,
    props.roughnessMap,
    props.metallicMap,
  ]);

  useEffect(() => {
    return () => {
      [
        normalMap,
        emissiveMap,
        anisotropicMap,
        thicknessMap,
        aoMap,
        roughnessMap,
        metallicMap,
      ].forEach((texture) => texture?.dispose());
    };
  }, []);

  return (
    <mesh position={position} ref={meshRef} >
      <sphereGeometry args={[0.7, 64, 64]} />
      {material && <primitive object={material} attach="material" />}
    </mesh>
  );
}

function CameraRig() {
  const camera = useThree((state) => state.camera);
  const angleRef = useRef(Math.PI / 2);
  const startTimeRef = useRef<number | null>(null);
  useFrame((state, delta) => {
    if (!startTimeRef.current) {
      startTimeRef.current = state.clock.elapsedTime;
    }
    if (state.clock.elapsedTime - startTimeRef.current >= STOP_TIME) {
      angleRef.current += 0.4 * delta;
      const x = Radius * Math.cos(angleRef.current);
      const z = Radius * Math.sin(angleRef.current);
      camera.position.set(x, Height, z);
    } else {
      camera.position.set(0, 5, Radius);
    }
    camera.lookAt(0, 0, 0);
  });

  return null;
}
export default function BenchmarkSpheres({
  onCameraAngle,
  Visible,
}: {
  onCameraAngle?: (degrees: number) => void;
  Visible?: number;
}) {
  const sphereConfigs = [
    { color: "#FF1493", metalness: 0, roughness: 1 }, // Baseline diffuse
    { color: "#FF4500", metalness: 0.5, roughness: 0.5 }, // Mixed material
    { color: "#FFD700", metalness: 1, roughness: 0.05 }, // Perfect metal reflection
    {
      color: "#32CD32",
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    }, // Clearcoat
    { color: "#1E90FF", metalness: 0, roughness: 0, transmission: 1, ior: 2.7 }, // Diamond-like glass

    {
      color: "#8A2BE2",
      metalness: 1,
      roughness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.3,
    }, // Metal + rough clearcoat
    {
      color: "#FFFFFF",
      metalness: 0,
      roughness: 0.05,
      transmission: 0.98,
      ior: 1.5,
    }, // Thin glass
    {
      color: "#FFFFFF",
      metalness: 0.5,
      roughness: 0.1,
      transmission: 0.5,
      ior: 2.0,
    }, // Complex mixed
    {
      color: "#4169E1",
      isNormalMap: true,
      metalness: 0.8,
      roughness: 0.2,
      aoMapIntensity: 1.0,
    }, // Normal + AO

    { color: "#00FF00", isEmissive: true, emissiveIntensity: 5.0 }, // Bright emission
    {
      color: "#FFA500",
      isAnisotropic: true,
      anisotropyStrength: 0.8,
      roughness: 0.2,
    }, // Brushed metal
    { color: "#4B0082", isIridescent: true, sheenRoughness: 0.05, sheen: 1.0 }, // Sharp iridescence

    {
      color: "#FF6347",
      isSubsurface: true,
      thickness: 2.0,
      attenuationDistance: 0.2,
    }, // Deep subsurface
    {
      color: "#555555",
      isNormalMap: true,
      roughness: 0.3,
      transmission: 0.8,
      ior: 1.4,
    }, // Textured glass
    {
      color: "#800080",
      isNormalMap: true,
      aoMapIntensity: 1.0,
      metalness: 0.7,
      roughness: 0.2,
    }, // Multi-layered
  ];
  const visible = Visible;

  return (
    <group visible={Visible === 5}>
      {Visible === 5 && <CameraRig />}
      <color attach="background" args={["#222222"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={5} />
      <Sphere position={[-4, 4, 0]} {...sphereConfigs[0]}/>
      <Sphere position={[-2, 4, 0]} {...sphereConfigs[1]} />
      <Sphere position={[0, 4, 0]} {...sphereConfigs[2]} />
      <Sphere position={[2, 4, 0]} {...sphereConfigs[3]} />
      <Sphere position={[4, 4, 0]} {...sphereConfigs[4]} />

      <Sphere position={[-3, 2, 0]} {...sphereConfigs[5]} />
      <Sphere position={[-1, 2, 0]} {...sphereConfigs[6]} />
      <Sphere position={[1, 2, 0]} {...sphereConfigs[7]} />
      <Sphere position={[3, 2, 0]} {...sphereConfigs[8]} />

      <Sphere position={[-2, 0, 0]} {...sphereConfigs[9]} />
      <Sphere position={[0, 0, 0]} {...sphereConfigs[10]} />
      <Sphere position={[2, 0, 0]} {...sphereConfigs[11]} />

      <Sphere position={[-1, -2, 0]} {...sphereConfigs[12]} />
      <Sphere position={[1, -2, 0]} {...sphereConfigs[13]} />
      <Sphere position={[0, -4, 0]} {...sphereConfigs[14]} />
      {visible === 5 && <Environment files={"/HDRI/lilienstein_1k.hdr"} />}
    </group>
  );
}
