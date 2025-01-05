import * as THREE from 'three'
import React, { useRef } from 'react'
import { Environment, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    King_B: THREE.Mesh
    King_W: THREE.Mesh
    Queen_B: THREE.Mesh
    Queen_W: THREE.Mesh
    Chessboard: THREE.Mesh
    Pawn_Body_W1: THREE.Mesh
    Pawn_Top_W1: THREE.Mesh
    Pawn_Body_W2: THREE.Mesh
    Pawn_Top_W2: THREE.Mesh
    Pawn_Body_W3: THREE.Mesh
    Pawn_Top_W3: THREE.Mesh
    Pawn_Body_W4: THREE.Mesh
    Pawn_Top_W4: THREE.Mesh
    Pawn_Body_W5: THREE.Mesh
    Pawn_Top_W5: THREE.Mesh
    Pawn_Body_W6: THREE.Mesh
    Pawn_Top_W6: THREE.Mesh
    Pawn_Body_W7: THREE.Mesh
    Pawn_Top_W7: THREE.Mesh
    Pawn_Body_W8: THREE.Mesh
    Pawn_Top_W8: THREE.Mesh
    Pawn_Body_B1: THREE.Mesh
    Pawn_Top_B1: THREE.Mesh
    Pawn_Body_B2: THREE.Mesh
    Pawn_Top_B2: THREE.Mesh
    Pawn_Body_B3: THREE.Mesh
    Pawn_Top_B3: THREE.Mesh
    Pawn_Body_B4: THREE.Mesh
    Pawn_Top_B4: THREE.Mesh
    Pawn_Body_B5: THREE.Mesh
    Pawn_Top_B5: THREE.Mesh
    Pawn_Body_B6: THREE.Mesh
    Pawn_Top_B6: THREE.Mesh
    Pawn_Body_B7: THREE.Mesh
    Pawn_Top_B7: THREE.Mesh
    Pawn_Body_B8: THREE.Mesh
    Pawn_Top_B8: THREE.Mesh
    Castle_B1: THREE.Mesh
    Castle_B2: THREE.Mesh
    Castle_W1: THREE.Mesh
    Castle_W2: THREE.Mesh
    Knight_B1: THREE.Mesh
    Knight_B2: THREE.Mesh
    Knight_W1: THREE.Mesh
    Knight_W2: THREE.Mesh
    Bishop_B1: THREE.Mesh
    Bishop_B2: THREE.Mesh
    Bishop_W1: THREE.Mesh
    Bishop_W2: THREE.Mesh
  }
  materials: {
    King_Black: THREE.MeshStandardMaterial
    King_White: THREE.MeshStandardMaterial
    Queen_Black: THREE.MeshStandardMaterial
    Queen_White: THREE.MeshStandardMaterial
    Chessboard: THREE.MeshStandardMaterial
    Pawn_Body_White: THREE.MeshStandardMaterial
    Pawn_Top_White: THREE.MeshPhysicalMaterial
    Pawn_Body_Black: THREE.MeshStandardMaterial
    Pawn_Top_Black: THREE.MeshPhysicalMaterial
    Castle_Black: THREE.MeshStandardMaterial
    Castle_White: THREE.MeshStandardMaterial
    Knight_Black: THREE.MeshStandardMaterial
    Knight_White: THREE.MeshStandardMaterial
    Bishop_Black: THREE.MeshStandardMaterial
    Bishop_White: THREE.MeshStandardMaterial
  }
}
export function Chess(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('BenchmarkModels/ChessMerged.gltf') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.King_B.geometry}
        material={materials.King_Black}
        position={[-0.031, 0.017, 0.22]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.King_W.geometry}
        material={materials.King_White}
        position={[-0.032, 0.017, -0.22]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Queen_B.geometry}
        material={materials.Queen_Black}
        position={[0.031, 0.018, 0.22]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Queen_W.geometry}
        material={materials.Queen_White}
        position={[0.031, 0.017, -0.22]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Chessboard.geometry}
        material={materials.Chessboard}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pawn_Body_W1.geometry}
        material={materials.Pawn_Body_White}
        position={[0.218, 0.015, -0.156]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pawn_Top_W1.geometry}
          material={materials.Pawn_Top_White}
          position={[-0.031, -0.015, 0.031]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pawn_Body_W2.geometry}
        material={materials.Pawn_Body_White}
        position={[0.156, 0.015, -0.156]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pawn_Top_W2.geometry}
          material={materials.Pawn_Top_White}
          position={[-0.031, -0.015, 0.031]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pawn_Body_W3.geometry}
        material={materials.Pawn_Body_White}
        position={[0.094, 0.015, -0.094]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pawn_Top_W3.geometry}
          material={materials.Pawn_Top_White}
          position={[-0.031, -0.015, 0.031]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pawn_Body_W4.geometry}
        material={materials.Pawn_Body_White}
        position={[0.031, 0.015, -0.031]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pawn_Top_W4.geometry}
          material={materials.Pawn_Top_White}
          position={[-0.031, -0.015, 0.031]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pawn_Body_W5.geometry}
        material={materials.Pawn_Body_White}
        position={[-0.031, 0.015, -0.156]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pawn_Top_W5.geometry}
          material={materials.Pawn_Top_White}
          position={[-0.031, -0.015, 0.031]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pawn_Body_W6.geometry}
        material={materials.Pawn_Body_White}
        position={[-0.094, 0.015, -0.156]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pawn_Top_W6.geometry}
          material={materials.Pawn_Top_White}
          position={[-0.031, -0.015, 0.031]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pawn_Body_W7.geometry}
        material={materials.Pawn_Body_White}
        position={[-0.156, 0.015, -0.156]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pawn_Top_W7.geometry}
          material={materials.Pawn_Top_White}
          position={[-0.031, -0.015, 0.031]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pawn_Body_W8.geometry}
        material={materials.Pawn_Body_White}
        position={[-0.219, 0.015, -0.156]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pawn_Top_W8.geometry}
          material={materials.Pawn_Top_White}
          position={[-0.031, -0.015, 0.031]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pawn_Body_B1.geometry}
        material={materials.Pawn_Body_Black}
        position={[-0.219, 0.015, 0.156]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pawn_Top_B1.geometry}
          material={materials.Pawn_Top_Black}
          position={[-0.031, -0.015, 0.031]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pawn_Body_B2.geometry}
        material={materials.Pawn_Body_Black}
        position={[-0.157, 0.015, 0.156]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pawn_Top_B2.geometry}
          material={materials.Pawn_Top_Black}
          position={[-0.031, -0.015, 0.031]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pawn_Body_B3.geometry}
        material={materials.Pawn_Body_Black}
        position={[-0.094, 0.015, 0.156]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pawn_Top_B3.geometry}
          material={materials.Pawn_Top_Black}
          position={[-0.031, -0.015, 0.031]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pawn_Body_B4.geometry}
        material={materials.Pawn_Body_Black}
        position={[-0.031, 0.015, 0.094]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pawn_Top_B4.geometry}
          material={materials.Pawn_Top_Black}
          position={[-0.031, -0.015, 0.031]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pawn_Body_B5.geometry}
        material={materials.Pawn_Body_Black}
        position={[0.031, 0.015, 0.156]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pawn_Top_B5.geometry}
          material={materials.Pawn_Top_Black}
          position={[-0.031, -0.015, 0.031]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pawn_Body_B6.geometry}
        material={materials.Pawn_Body_Black}
        position={[0.094, 0.015, 0.156]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pawn_Top_B6.geometry}
          material={materials.Pawn_Top_Black}
          position={[-0.031, -0.015, 0.031]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pawn_Body_B7.geometry}
        material={materials.Pawn_Body_Black}
        position={[0.156, 0.015, 0.156]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pawn_Top_B7.geometry}
          material={materials.Pawn_Top_Black}
          position={[-0.031, -0.015, 0.031]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pawn_Body_B8.geometry}
        material={materials.Pawn_Body_Black}
        position={[0.219, 0.015, 0.156]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pawn_Top_B8.geometry}
          material={materials.Pawn_Top_Black}
          position={[-0.031, -0.015, 0.031]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Castle_B1.geometry}
        material={materials.Castle_Black}
        position={[-0.219, 0.018, 0.22]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Castle_B2.geometry}
        material={materials.Castle_Black}
        position={[0.22, 0.018, 0.22]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Castle_W1.geometry}
        material={materials.Castle_White}
        position={[0.22, 0.017, -0.22]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Castle_W2.geometry}
        material={materials.Castle_White}
        position={[-0.219, 0.017, -0.22]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Knight_B1.geometry}
        material={materials.Knight_Black}
        position={[-0.157, 0.017, 0.22]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Knight_B2.geometry}
        material={materials.Knight_Black}
        position={[0.158, 0.017, 0.22]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Knight_W1.geometry}
        material={materials.Knight_White}
        position={[0.158, 0.017, -0.221]}
        rotation={[Math.PI, 0, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Knight_W2.geometry}
        material={materials.Knight_White}
        position={[-0.157, 0.017, -0.22]}
        rotation={[Math.PI, 0, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bishop_B1.geometry}
        material={materials.Bishop_Black}
        position={[-0.094, 0.017, 0.219]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bishop_B2.geometry}
        material={materials.Bishop_Black}
        position={[0.09, 0.017, 0.22]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bishop_W1.geometry}
        material={materials.Bishop_White}
        position={[0.09, 0.017, -0.218]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bishop_W2.geometry}
        material={materials.Bishop_White}
        position={[-0.094, 0.017, -0.221]}
      />
    </group>
      )
}
