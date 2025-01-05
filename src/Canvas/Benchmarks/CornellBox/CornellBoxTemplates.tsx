// CornellBoxVariants.tsx
import React from 'react';
import { MeshPhysicalMaterial } from 'three';
import CornellBox from './CornellBox';
import { CastShadow, pointLightCausticsIntensity, pointLightClassicIntensity, pointLightEmissiveIntensity, pointLightMetallicIntensity, pointLightSubsurfaceIntensity, ReceiveShadow } from '../Global/GlobalVars';
import { Detailed } from "@react-three/drei";
import { LOD } from '../Global/GlobalVars';

export function ClassicCornellBox() {
  return (
    <CornellBox leftWallColor="#ff0000" rightWallColor="#00ff00" lightIntensity={pointLightClassicIntensity}>

          <mesh position={[-1, -1.5, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <boxGeometry args={[1.5, 1, 1.5]} />
            <meshStandardMaterial color="white" roughness={0.8} />
          </mesh>
          <mesh position={[1, -1, 0]} rotation={[0, Math.PI/4, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <boxGeometry args={[1, 2, 1]} />
            <meshStandardMaterial color="white" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.5, 0]} rotation={[Math.PI/6, Math.PI/4, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial color="white" roughness={0.5} />
          </mesh>
    </CornellBox>
  );
}

export function CausticsBox() {
  return (
    <CornellBox leftWallColor="#4444ff" rightWallColor="#44ff44" lightIntensity={pointLightCausticsIntensity}>
          <mesh position={[1, 0.4, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial 
              transmission={1}
              thickness={0.5}
              roughness={0}
              ior={1.5}
              transparent
            />
          </mesh>
          <mesh position={[-1, -0.5, 1.1]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshPhysicalMaterial 
              transmission={1}
              thickness={0.3}
              roughness={0}
              ior={1.7}
              transparent
            />
          </mesh>
    </CornellBox>
  );
}
export function MetallicBox() {
  return (
    <CornellBox leftWallColor="#888888" rightWallColor="#444444"  lightIntensity={pointLightMetallicIntensity}>
          <mesh position={[-1, -1, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <torusKnotGeometry args={[0.5, 0.2, 128, 32]} />
            <meshPhysicalMaterial 
              color="#ffffff"
              metalness={1}
              roughness={0.15}
            />
          </mesh>
          <mesh position={[1, -1, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshPhysicalMaterial 
              color="#ffffff"
              metalness={1}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0, 0.5, 0]} rotation={[Math.PI/3, 0, Math.PI/4]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshPhysicalMaterial 
              color="#ffffff"
              metalness={1}
              roughness={0.15}
            />
          </mesh>
    </CornellBox>
  );
}

export function EmissiveBox() {
  return (
    <CornellBox leftWallColor="#222222" rightWallColor="#222222" lightIntensity={pointLightEmissiveIntensity}>
          <mesh position={[-1, 0, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshPhysicalMaterial 
              color="#000000"
              emissive="#0ffff0"
              emissiveIntensity={1.0}
              clearcoat={1}
              clearcoatRoughness={0.5}
              specularIntensity={6}
            />
          </mesh>
          <mesh position={[1, 0, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshPhysicalMaterial 
              emissive="#ff00ff"
              emissiveIntensity={2}
            />
          </mesh>
          <mesh position={[0, 1, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <torusGeometry args={[0.4, 0.2, 16, 32]} />
            <meshPhysicalMaterial 
              emissive="#00ffff"
              emissiveIntensity={3}
            />
          </mesh>
    </CornellBox>
  );
}

export function SubsurfaceBox() {
  return (
    <CornellBox leftWallColor="#ffcccc" rightWallColor="#ccffcc" lightIntensity={pointLightSubsurfaceIntensity}>
          <mesh position={[0, -1, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial 
              color="#ff6b6b"
              transmission={0.5}
              thickness={0.5}
              roughness={0.2}
              ior={1.5}
              attenuationColor="#ff0000"
              attenuationDistance={0.5}
            />
          </mesh>
          <mesh position={[-1.5, -1, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <cylinderGeometry args={[0.5, 0.5, 2]} />
            <meshPhysicalMaterial 
              color="#ffffff"
              transmission={0.8}
              thickness={0.8}
              roughness={0.1}
              ior={1.4}
              attenuationColor="#ffffff"
              attenuationDistance={1}
            />
          </mesh>
          <mesh position={[1, 0, 0]} rotation={[Math.PI/6, 0, Math.PI/6]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <boxGeometry args={[0.7, 0.7, 0.7]} />
            <meshPhysicalMaterial 
              color="#ff9999"
              transmission={0.6}
              thickness={0.4}
              roughness={0.1}
              ior={1.6}
              attenuationColor="#ff6666"
              attenuationDistance={0.3}
            />
          </mesh>
    </CornellBox>
  );
}