import {useGLTF } from '@react-three/drei'


export function Chess(props: JSX.IntrinsicElements['group']) {
  const Scene = useGLTF('/BenchmarkModels/Chess/untitled.gltf');

  return (
    <group>
      <primitive object={Scene.scene} {...props} />
    </group>
  )
}

useGLTF.preload('/BenchmarkModels/Chess/untitled.gltf')