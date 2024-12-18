import * as THREE from "three";
import { Environment, Shadow, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  CausticsBox,
  ClassicCornellBox,
  EmissiveBox,
  MetallicBox,
  SubsurfaceBox,
} from "./CornellBoxTemplates";
import { ambientLightIntensity, lightIntensity, shadowMapSize } from "../Global/GlobalVars";

interface CornellSelectionProps {
  Choice: number;
}
interface CornellScene {
  Choice: number;
  camerapos: number;
}
const cameraPositions = [
  { x: 0, y: 0, z: 5 },
  { x: 0, y: 0, z: 10 },
  { x: 0, y: 0, z: 16 },
]

function CameraRig({ camerapos }: { camerapos: number }) {
  useThree(({ camera }) => {
    camera.position.set(cameraPositions[camerapos].x, cameraPositions[camerapos].y, cameraPositions[camerapos].z);
  });
  return null;
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
            shadow-mapSize={shadowMapSize}
          />
          <ClassicCornellBox/>
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
            shadow-mapSize={shadowMapSize}
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
            shadow-mapSize={shadowMapSize}
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
              shadow-mapSize={shadowMapSize}
              />
            <CausticsBox />
          </group>
          </>
  );
}

export function CornellBoxScene(props: CornellScene) {
  return (
    <>
      <CornellSelection Choice={props.Choice}/>
      <CameraRig camerapos={props.camerapos} />
    </>
  );
}
