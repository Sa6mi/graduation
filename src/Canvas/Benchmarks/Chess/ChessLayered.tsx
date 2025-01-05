import * as THREE from 'three'
import React, { useRef, useEffect } from 'react'
import { Environment, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { Canvas, useFrame, useThree } from '@react-three/fiber'


type GLTFResult = GLTF & {
    nodes: { [key: string]: THREE.Mesh }
    materials: { [key: string]: THREE.MeshStandardMaterial }
  }
  
  const compareStates = (a: THREE.Material, b: THREE.Material): number => {
    if (a.blending !== b.blending) {
      return a.blending - b.blending;
    }
    
    if (a.transparent !== b.transparent) {
      return a.transparent ? 1 : -1;
    }
    
    if (a.depthTest !== b.depthTest) {
      return a.depthTest ? -1 : 1;
    }
    
    return 0;
  };
  
  export function Chess(props: JSX.IntrinsicElements['group']) {
    const { scene, nodes, materials } = useGLTF('BenchmarkModels/Chess/untitled.gltf') as GLTFResult;
    const { gl } = useThree();
  
    useEffect(() => {
      const meshes: THREE.Mesh[] = [];
      
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh && object.material instanceof THREE.Material) {
          meshes.push(object);
        }
      });
  
      meshes.sort((a, b) => {
        const matA = a.material as THREE.Material;
        const matB = b.material as THREE.Material;
        return compareStates(matA, matB);
      });
  
      meshes.forEach((mesh, index) => {
        mesh.renderOrder = index;
      });
  
      gl.state.reset();
    }, [scene, gl]);
  
    return (
        <group {...props} dispose={null}>
          <primitive object={scene} />
        </group>
    );
  }
  