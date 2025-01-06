import * as THREE from 'three'
import React, { useEffect } from 'react'
import { Environment, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'


const LAYERS = {
  OPAQUE: { renderOrder: 0, layer: 0 },
  ALPHA_TEST: { renderOrder: 1, layer: 1 },
  TRANSPARENT: { renderOrder: 2, layer: 2 }
};

const compareStates = (a: THREE.Material, b: THREE.Material): number => {
  // Sort by transparency
  if (a.transparent !== b.transparent) {
    return a.transparent ? 1 : -1;
  }
  // Sort by alpha test
  if (a.alphaTest !== b.alphaTest) {
    return a.alphaTest > 0 ? -1 : 1;
  }
  // Sort by blend mode
  if (a.blending !== b.blending) {
    return a.blending - b.blending;
  }
  return 0;
};

export function Chess(props: JSX.IntrinsicElements['group']) {
  const { scene } = useGLTF('BenchmarkModels/Chess/untitled.gltf');
  const { gl } = useThree();

  useEffect(() => {
    console.log('Scene loaded:', {
      exists: !!scene,
      children: scene?.children?.length
    });

    const meshes: THREE.Mesh[] = [];
    let meshCount = 0;
    let opaqueCount = 0;
    let transparentCount = 0;
    let alphaTestCount = 0;
    
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        meshCount++;
        const material = object.material as THREE.Material;
        console.log('Mesh:', {
          name: object.name,
          material: {
            type: material.type,
            transparent: material.transparent,
            alphaTest: material.alphaTest,
            blending: material.blending
          }
        });
        
        if (material.transparent) {
          transparentCount++;
          object.layers.set(LAYERS.TRANSPARENT.layer);
          object.renderOrder = LAYERS.TRANSPARENT.renderOrder;
        } else if (material.alphaTest > 0) {
          alphaTestCount++;
          object.layers.set(LAYERS.ALPHA_TEST.layer);
          object.renderOrder = LAYERS.ALPHA_TEST.renderOrder;
        } else {
          opaqueCount++;
          object.layers.set(LAYERS.OPAQUE.layer);
          object.renderOrder = LAYERS.OPAQUE.renderOrder;
        }
        
        meshes.push(object);
      }
    });

    console.log('Layer Statistics:', {
      totalMeshes: meshCount,
      opaque: opaqueCount,
      transparent: transparentCount,
      alphaTest: alphaTestCount
    });

  }, [scene, gl]);

  return scene ? (
    <>
      <group  {...props}>
        <primitive object={scene} />
      </group>
    </>
  ) : null;
}useGLTF.preload('BenchmarkModels/Chess/untitled.gltf');