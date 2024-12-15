import * as THREE from "three";
import { Environment, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  CausticsBox,
  ClassicCornellBox,
  EmissiveBox,
  MetallicBox,
  SubsurfaceBox,
} from "./CornellBoxTemplates";
import { ambientLightIntensity, lightIntensity } from "../Global/GlobalVars";

interface CornellSelectionProps {
  Choice: number;
}

function CornellSelection({ Choice }: CornellSelectionProps) {
  return (
    <>
        <group visible={Choice === 0}>
          <ambientLight intensity={ambientLightIntensity}></ambientLight>
          <spotLight
            position={[0, 4, 0]}
            angle={Math.PI / 4}
            penumbra={0.1}
            intensity={lightIntensity}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <ClassicCornellBox />
        </group>
        <group visible={Choice === 1}>
          <EmissiveBox />
          </group>
        <group visible={Choice === 2}>
          <ambientLight intensity={ambientLightIntensity}></ambientLight>
          <spotLight
            position={[0, 4, 0]}
            angle={Math.PI / 4}
            penumbra={0.1}
            intensity={lightIntensity}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <MetallicBox />
        </group>
        <group visible={Choice === 3}>
          <ambientLight intensity={ambientLightIntensity}></ambientLight>
          <spotLight
            position={[0, 4, 0]}
            angle={Math.PI / 4}
            penumbra={0.1}
            intensity={lightIntensity}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <SubsurfaceBox />
        </group>
          <group visible={Choice === 4}>
            <ambientLight intensity={ambientLightIntensity}></ambientLight>
            <spotLight
              position={[0, 4, 0]}
              angle={Math.PI / 4}
              penumbra={0.1}
              intensity={lightIntensity}
              castShadow
              shadow-mapSize={[2048, 2048]}
            />
            <CausticsBox />
          </group>
          </>
  );
}

export function CornellBoxScene(props: CornellSelectionProps) {
  return (
    <>
      <CornellSelection Choice={props.Choice} />
    </>
  );
}
