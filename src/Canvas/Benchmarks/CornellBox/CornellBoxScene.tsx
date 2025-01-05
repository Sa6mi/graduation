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

import {
  ambientLightIntensity,
  lightIntensity,
  shadowMapSize,
} from "../Global/GlobalVars";
import { CausticsBoxCompressed, ClassicCornellBoxCompressed, EmissiveBoxCompressed, MetallicBoxCompressed, SubsurfaceBoxCompressed } from "./CornellBoxTemplatesCompressed";
import { CausticsBoxLOD, ClassicCornellBoxLOD, EmissiveBoxLOD, MetallicBoxLOD, SubsurfaceBoxLOD } from "./CornellBoxTemplatesLod";
import { CausticsBoxMatPool, ClassicCornellBoxMatPool, EmissiveBoxMatPool, MetallicBoxMatPool, SubsurfaceBoxMatPool } from "./CornellBoxTemplatesMaterialPool";

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
];

function CameraRig({ camerapos }: { camerapos: number }) {
  useThree(({ camera }) => {
    camera.position.set(
      cameraPositions[camerapos].x,
      cameraPositions[camerapos].y,
      cameraPositions[camerapos].z
    );
  });
  return null;
}
function CornellSelection({ Choice }: CornellSelectionProps) {
  return (
    <>
      <group visible={Choice === 0}>
        <ClassicCornellBox />
      </group>
      <group visible={Choice === 1}>
        <EmissiveBox />
      </group>
      <group visible={Choice === 2}>
        <MetallicBox />
      </group>
      <group visible={Choice === 3}>
        <SubsurfaceBox />
      </group>
      <group visible={Choice === 4}>
        <CausticsBox />
      </group>
      <group visible={Choice === 5}>
        <ClassicCornellBoxCompressed />
      </group>
      <group visible={Choice === 6}>
        <EmissiveBoxCompressed />
      </group>
      <group visible={Choice === 7}>
        <MetallicBoxCompressed />
      </group>
      <group visible={Choice === 8}>
        <SubsurfaceBoxCompressed />
      </group>
      <group visible={Choice === 9}>
        <CausticsBoxCompressed />
      </group>
      <group visible={Choice === 10}>
        <ClassicCornellBoxLOD />
      </group>
      <group visible={Choice === 11}>
        <EmissiveBoxLOD />
      </group>
      <group visible={Choice === 12}>
        <MetallicBoxLOD />
      </group>
      <group visible={Choice === 13}>
        <SubsurfaceBoxLOD />
      </group>
      <group visible={Choice === 14}>
        <CausticsBoxLOD />
      </group>
      <group visible={Choice === 15}>
        <ClassicCornellBoxMatPool />
      </group>
      <group visible={Choice === 16}>
        <EmissiveBoxMatPool />
      </group>
      <group visible={Choice === 17}>
        <MetallicBoxMatPool />
      </group>
      <group visible={Choice === 18}>
        <SubsurfaceBoxMatPool />
      </group>
      <group visible={Choice === 19}>
        <CausticsBoxMatPool />
      </group>
    </>
  );
}

export function CornellBoxScene(props: CornellScene) {
  return (
    <>
      <group visible={props.Choice >= 0 && props.Choice <=19 }>
      <ambientLight intensity={ambientLightIntensity}></ambientLight>
      <spotLight
        position={[0, 4, 0]}
        angle={Math.PI / 4}
        penumbra={0.1}
        intensity={lightIntensity}
        castShadow
        shadow-mapSize={shadowMapSize}
      />
      </group>
      <CornellSelection Choice={props.Choice} />
      {(props.Choice >= 0 && props.Choice <= 19) && <CameraRig camerapos={props.camerapos} />
    }
    </>
  );
}
