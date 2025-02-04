import React from "react";
import * as THREE from "three";
import { ReceiveShadowWalls } from "../Global/GlobalVars";

interface WallProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  size?: [number, number];
}
const texture = new THREE.TextureLoader().load("/Maps/White-brick-wall-texture.jpg");

function Wall({ position, rotation = [0, 0, 0], color = "#ffffff", size = [4, 4] }: WallProps) {
  return (
    <mesh position={position} rotation={rotation} receiveShadow={ReceiveShadowWalls}>
      <planeGeometry args={[...size]} />
      <meshStandardMaterial color={color} side={THREE.DoubleSide}/>
    </mesh>
  );
}
function BackWall({ position, rotation = [0, 0, 0], color = "#ffffff", size = [4, 4] }: WallProps) {
  return (
    <mesh position={position} rotation={rotation} receiveShadow={ReceiveShadowWalls}>
      <planeGeometry args={[...size]} />
      <meshStandardMaterial color={color} side={THREE.DoubleSide} map={texture}/>
    </mesh>
  );
}
interface CornellBoxProps {
  children?: React.ReactNode;
  lightIntensity?: number;
  lightPosition?: [number, number, number];
  leftWallColor?: string;
  rightWallColor?: string;
  boxSize?: number;
}

export default function CornellBox({ 
  children,
  lightIntensity = 1,
  lightPosition = [0, 1, 2],
  leftWallColor = "#ff0000",
  rightWallColor = "#00ff00",
  boxSize = 4
}: CornellBoxProps) {
  return (
    <>
    <color attach="background" args={["#222222"]} />
      <pointLight position={lightPosition} intensity={lightIntensity} />
      <BackWall position={[0, 0, -2]} color="#ffffff" size={[boxSize, boxSize]} /> 
      <Wall position={[0, -2, 0]} rotation={[Math.PI/2, 0, 0]} color="#ffffff" size={[boxSize, boxSize]} />
      <Wall position={[-2, 0, 0]} rotation={[0, Math.PI/2, 0]} color={leftWallColor} size={[boxSize, boxSize]} /> 
      <Wall position={[2, 0, 0]} rotation={[0, -Math.PI/2, 0]} color={rightWallColor} size={[boxSize, boxSize]} /> 
      {children}
      </>
  );
}