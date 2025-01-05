import * as THREE from 'three';
import { Environment } from '@react-three/drei';
import { useThree,useFrame } from '@react-three/fiber';
import { Chess } from './Chess';
import { Chess as ChessInstanced } from './ChessInstancing';
import { Chess as ChessLayered } from './ChessLayered';
import { Chess as ChessMipMap } from './ChessMipMap';
import { Chess as ChessNormalCompress } from './ChessNormalCompress';
import { Chess as ChessMerged } from './ChessMerged';
import { useRef } from 'react';
import { STOP_TIME } from '../Global/GlobalVars';

interface ChessSelectionProps {
  Choice: number;
}

interface ChessScene {
  Choice: number;
}
const Scale = 6;

function CameraRig() {
  const camera = useThree((state) => state.camera);
  const startTimeRef = useRef<number | null>(null);

  var x = 0;
  var z = 0;
  var radius = 5;
  var angle = 0;
  useFrame((state, delta) => {
    if (!startTimeRef.current) {
      startTimeRef.current = state.clock.elapsedTime;
    }
    if (state.clock.elapsedTime - startTimeRef.current >= STOP_TIME) {

    camera.lookAt(new THREE.Vector3(0, 0, 0));
    angle = angle + (0.5 * delta);
    x = radius * Math.cos(angle);
    z = radius * Math.sin(angle);
    camera.position.set(x, 5, z);
  }});
  return null;
}

function ChessSelection({ Choice }: ChessSelectionProps) {
  return (
    <>
      <group visible={Choice === 23} scale={[Scale, Scale, Scale]}>
        <Chess />
      </group>
      <group visible={Choice === 24} scale={[Scale, Scale, Scale]}>
        <ChessMerged />
        </group>
      <group visible={Choice === 25} scale={[Scale, Scale, Scale]}>
        <ChessInstanced />
      </group>
      <group visible={Choice === 26} scale={[Scale, Scale, Scale]}>
        <ChessLayered />
      </group>
      <group visible={Choice === 27} scale={[Scale, Scale, Scale]}>
        <ChessMipMap />
      </group>
      <group visible={Choice === 28} scale={[Scale, Scale, Scale]}>
        <ChessNormalCompress />
      </group>
    </>
  );
}

export function ChessLoader(props: ChessScene) {
  return (
    <>
      <ChessSelection Choice={props.Choice} />
      {(props.Choice >= 24 && props.Choice <= 28) && (
        <>
          <CameraRig />
          <Environment preset="city" />
          <pointLight position={[0, 10, 0]} intensity={1} castShadow />
          <spotLight intensity={0.5} position={[10, 10, 10]} castShadow />
        </>
      )}
    </>
  );
}