import * as THREE from "three";
import { Environment } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { BustScene } from "./RandomBenchmark";
import { BustSceneLOD } from "./RandomBenchmarkLOD";
import { RandomBenchmark } from "./RandomBenchmarkInstanced";

interface BustSelectionProps {
  Choice: number;
}

interface BustScene {
  Choice: number;
}

function BustSelection({ Choice }: BustSelectionProps) {
  return (
    <>
      <group visible={Choice === 20}>
        <BustScene />
      </group>
      <group visible={Choice === 21}>
        <BustSceneLOD />
      </group>
      <group visible={Choice === 22}>
        <RandomBenchmark />
        </group>
      </>
  );
}

export function BustSceneLoader(props: BustScene) {
  return (
    <>
      <BustSelection Choice={props.Choice} />
      {props.Choice >=20 && props.Choice <=23 && (<><Environment files={"/HDRI/lilienstein_1k.hdr"} />   
      <group visible={(props.Choice >=20 && props.Choice <=23 ) }>
      <pointLight position={[0, 0, 0]} intensity={10} castShadow />
      <spotLight intensity={2.5} position={[50, 50, 50]} castShadow />
      </group></>) }
    </>
  );
}
