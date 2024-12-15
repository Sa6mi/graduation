import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function Face(props: any) {
  const { nodes, materials } = useGLTF('/stylized_anime_female_head.glb')
  const vertex = `
  varying vec3 vColor;

void main() {
    vec3 Transformednormal = normalize(normalMatrix * normal);
    vec3 lightDirection = normalize(vec3(0.2, 1.0, 1.0));
    float diff = max(dot(Transformednormal, lightDirection), 0.0);
    vec3 diffuse = diff * vec3(1.0, 1.0, 1.0); 
    vColor = diffuse;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragment = `
varying vec3 vColor;

void main() {
    gl_FragColor = vec4(vColor, 1.0);
}
`;
let Material: any = true;
if (props.flag) {
   Material = new THREE.MeshStandardMaterial({ color: 'red' })
}
else{
     Material = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        side: THREE.DoubleSide
    })
}
console.log(materials)
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} position={props.position}>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Object_2 as THREE.Mesh).geometry}
          material={Material} 
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Object_3 as THREE.Mesh).geometry}
          material={Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Object_4 as THREE.Mesh).geometry}
          material={Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Object_5 as THREE.Mesh).geometry}
          material={Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Object_6 as THREE.Mesh).geometry}
          material={Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Object_7 as THREE.Mesh).geometry}
          material={Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Object_8 as THREE.Mesh).geometry}
          material={Material}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/stylized_anime_female_head.glb')