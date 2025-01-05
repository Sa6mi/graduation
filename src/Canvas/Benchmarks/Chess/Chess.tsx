import * as THREE from 'three'
import React, { useRef } from 'react'
import { Environment, useGLTF } from '@react-three/drei'
import { GLTF, GLTFLoader } from 'three-stdlib'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'

export function Chess(props: JSX.IntrinsicElements['group']) {
  const Scene = useLoader(GLTFLoader,'BenchmarkModels/Chess/untitled.gltf');
  return (
    <group>
    <primitive object={Scene.scene} {...props} />
    </group>
  )
}