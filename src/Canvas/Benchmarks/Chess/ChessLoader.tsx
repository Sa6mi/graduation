import * as THREE from "three";
import { Environment } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { Chess } from "./Chess";
import { Chess as ChessInstanced } from "./ChessInstancing";
import { Chess as ChessLayered } from "./ChessLayered";
import { Chess as ChessMipMap } from "./ChessMipMap";
import { Chess as ChessNormalCompress } from "./ChessNormalCompress";
import { Chess as ChessMerged } from "./ChessMerged";
import { useEffect, useRef } from "react";
import { STOP_TIME } from "../Global/GlobalVars";

interface ChessSelectionProps {
  Choice: number;
}

interface ChessScene {
  Choice: number;
}
const Scale = 6;
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
      {props.Choice >= 23 && props.Choice <= 28 && (
        <>
          <Environment preset="city" />
          <pointLight position={[0, 10, 0]} intensity={1} castShadow />
          <spotLight intensity={0.5} position={[10, 10, 10]} castShadow />
        </>
      )}
    </>
  );
}
