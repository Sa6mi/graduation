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

export function RandomBenchmark() {
    const { nodes, materials } = useGLTF("/bust/bust-1-d.glb");
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const matrix = useMemo(() => new THREE.Matrix4(), []);
  
    useEffect(() => {
      if (meshRef.current) {
        positions.forEach((data, i) => {
          matrix.makeRotationFromEuler(
            new THREE.Euler(...data.rotation)
          );
          matrix.setPosition(...data.position);
          meshRef.current?.setMatrixAt(i, matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
      }
    }, [matrix]);
  
    return (
      <group>
        <instancedMesh
          ref={meshRef}
          args={[(nodes.Mesh_0001 as THREE.Mesh).geometry, 
                 materials.default, 
                 BustCount]}
          receiveShadow={ReceiveShadow}
          castShadow={CastShadow}
          material-envMapIntensity={0.25}
        />
      </group>
    );
  }