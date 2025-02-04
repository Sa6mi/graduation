import * as THREE from "three";
import { Detailed, useGLTF } from "@react-three/drei";
import {
  BustCount,
  CastShadow,
  ReceiveShadow,
} from "../Global/GlobalVars";

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


export function BustSceneLOD() {
  return (
    <group>
      {positions.map((props, i) => (
        <Bust key={i} position={props.position} rotation={props.rotation} />
      ))}
    </group>
  );
}

function Bust(props: any) {
  const levels = useGLTF([
    "/bust/bust-1-d.glb",
    "/bust/bust-2-d.glb",
    "/bust/bust-3-d.glb",
  ]);
  return (
    <group>
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
    </group>
  );
}
