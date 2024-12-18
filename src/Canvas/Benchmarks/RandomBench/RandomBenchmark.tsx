import * as THREE from "three";
import { Detailed, Environment, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import {
  BustCount,
  CastShadow,
  InstancedMesh,
  LOD,
  ReceiveShadow,
} from "../Global/GlobalVars";
import { Instances, Model } from "./Bust";

function seededRandom(seed: number) {
  return function () {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const random = seededRandom(2001);

const positions = Array.from({ length: BustCount }, () => ({
  position: [40 - random() * 80, 40 - random() * 80, 40 - random() * 80] as [
    number,
    number,
    number
  ],
  rotation: [
    random() * Math.PI * 2,
    random() * Math.PI * 2,
    random() * Math.PI * 2,
  ] as [number, number, number],
}));
const cameraPositions = [
  { x: 0, y: 0, z: 40 },
  { x: 0, y: 0, z: 60 },
  { x: 0, y: 0, z: 80 },
  { x: 0, y: 0, z: 100 },
];
interface BustSceneProps {
  camerapos: number;
}
function InstanceScene() {
  return (
    <Instances
      frames={1}
      position={[0.6, 0, 2]}
      receiveShadow={ReceiveShadow}
      castShadow={CastShadow}
    >
      {positions.map((props, i) => (
        <Model key={i} position={props.position} rotation={props.rotation} />
      ))}
    </Instances>
  );
}
export function BustScene({ camerapos }: BustSceneProps) {
  const camera = useThree().camera;
  useState(() => {
    camera.position.set(
      cameraPositions[camerapos].x,
      cameraPositions[camerapos].y,
      cameraPositions[camerapos].z
    );
  });

  return (
    <group>
      {InstancedMesh ? (
        <InstanceScene />
      ) : (
        positions.map((props, i) => (
          <Bust key={i} position={props.position} rotation={props.rotation} />
        ))
      )}
      <pointLight position={[0, 0, 0]} intensity={10} castShadow />
      <spotLight intensity={2.5} position={[50, 50, 50]} castShadow />
      <Environment files={"/HDRI/lilienstein_1k.hdr"} />
    </group>
  );
}

function Bust(props: any) {
  const { nodes, materials } = useGLTF("/bust/bust-1-d.glb");
  const levels = useGLTF([
    "/bust/bust-1-d.glb",
    "/bust/bust-2-d.glb",
    "/bust/bust-3-d.glb",
  ]);
  return (
    <group>
      {LOD ? (
        <Detailed distances={[0, 20, 40]} {...props}>
          {levels.map(({ nodes, materials }, index) => (
            <mesh
              receiveShadow={ReceiveShadow}
              castShadow={CastShadow}
              key={index}
              geometry={(nodes.Mesh_0001 as THREE.Mesh).geometry}
              material={materials.default}
              material-envMapIntensity={0.25}
            />
          ))}
        </Detailed>
      ) : (
        <mesh
          receiveShadow={ReceiveShadow}
          castShadow={CastShadow}
          geometry={(nodes.Mesh_0001 as THREE.Mesh).geometry}
          material={materials.default}
          material-envMapIntensity={0.25}
          {...props}
        />
      )}
    </group>
  );
}
