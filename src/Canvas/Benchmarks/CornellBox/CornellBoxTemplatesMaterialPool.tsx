import * as THREE from 'three';
import CornellBox from './CornellBox';
import { CastShadow, pointLightCausticsIntensity, pointLightClassicIntensity, pointLightEmissiveIntensity, pointLightMetallicIntensity, pointLightSubsurfaceIntensity, ReceiveShadow } from '../Global/GlobalVars';

const materialPool = {
    whiteRough: new THREE.MeshStandardMaterial({ color: 'white', roughness: 0.8 }),
    causticsHigh: new THREE.MeshPhysicalMaterial({ transmission: 1, thickness: 0.5, roughness: 0, ior: 1.5, transparent: true }),
    metallic: new THREE.MeshPhysicalMaterial({ color: '#ffffff', metalness: 1, roughness: 0.15 }),
    emissive: new THREE.MeshPhysicalMaterial({ emissive: '#ff00ff', emissiveIntensity: 2 }),
    subsurface: new THREE.MeshPhysicalMaterial({ color: '#ff0000', roughness: 0.3, metalness: 0, transparent: true, thickness: 2, transmission: 0.7, ior: 1.2 })
  };
export function ClassicCornellBoxMatPool() {
  return (
    <CornellBox leftWallColor="#ff0000" rightWallColor="#00ff00" lightIntensity={pointLightClassicIntensity}>

          <mesh position={[-1, -1.5, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <boxGeometry args={[1.5, 1, 1.5]} />
            <primitive object={materialPool.whiteRough} />
            </mesh>
          <mesh position={[1, -1, 0]} rotation={[0, Math.PI/4, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <boxGeometry args={[1, 2, 1]} />
            <primitive object={materialPool.whiteRough} />
          </mesh>
          <mesh position={[0, 0.5, 0]} rotation={[Math.PI/6, Math.PI/4, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <primitive object={materialPool.whiteRough} />
          </mesh>
    </CornellBox>
  );
}

export function CausticsBoxMatPool() {
  return (
    <CornellBox leftWallColor="#4444ff" rightWallColor="#44ff44" lightIntensity={pointLightCausticsIntensity}>
          <mesh position={[1, 0.4, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <sphereGeometry args={[1, 32, 32]} />
            <primitive object={materialPool.causticsHigh} />
          </mesh>
          <mesh position={[-1, -0.5, 1.1]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <sphereGeometry args={[0.6, 32, 32]} />
            <primitive object={materialPool.causticsHigh} />
          </mesh>
    </CornellBox>
  );
}
export function MetallicBoxMatPool() {
  return (
    <CornellBox leftWallColor="#888888" rightWallColor="#444444"  lightIntensity={pointLightMetallicIntensity}>
          <mesh position={[-1, -1, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <torusKnotGeometry args={[0.5, 0.2, 128, 32]} />
            <primitive object={materialPool.metallic} />
          </mesh>
          <mesh position={[1, -1, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <primitive object={materialPool.metallic} />
          </mesh>
          <mesh position={[0, 0.5, 0]} rotation={[Math.PI/3, 0, Math.PI/4]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <primitive object={materialPool.metallic} />
          </mesh>
    </CornellBox>
  );
}

export function EmissiveBoxMatPool() {
  return (
    <CornellBox leftWallColor="#222222" rightWallColor="#222222" lightIntensity={pointLightEmissiveIntensity}>
          <mesh position={[-1, 0, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <primitive object={materialPool.emissive} />
          </mesh>
          <mesh position={[1, 0, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <primitive object={materialPool.emissive} />
          </mesh>
          <mesh position={[0, 1, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <torusGeometry args={[0.4, 0.2, 16, 32]} />
            <primitive object={materialPool.emissive} />
          </mesh>
    </CornellBox>
  );
}

export function SubsurfaceBoxMatPool() {
  return (
    <CornellBox leftWallColor="#ffcccc" rightWallColor="#ccffcc" lightIntensity={pointLightSubsurfaceIntensity}>
          <mesh position={[0, -1, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <sphereGeometry args={[1, 32, 32]} />
            <primitive object={materialPool.subsurface} />
          </mesh>
          <mesh position={[-1.5, -1, 0]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <cylinderGeometry args={[0.5, 0.5, 2]} />
            <primitive object={materialPool.subsurface} />
          </mesh>
          <mesh position={[1, 0, 0]} rotation={[Math.PI/6, 0, Math.PI/6]} castShadow={CastShadow} receiveShadow={ReceiveShadow}>
            <boxGeometry args={[0.7, 0.7, 0.7]} />
            <primitive object={materialPool.subsurface} />
          </mesh>
    </CornellBox>
  );
}