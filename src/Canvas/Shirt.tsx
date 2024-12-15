import React, { useEffect, useRef } from "react";
import { Decal, PivotControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Texture = new THREE.TextureLoader().load("/image.png")
export function Shirt(props: any) {
  const { nodes, materials } = useGLTF("/shirt_baked_collapsed.glb");
  const decalRef = useRef<THREE.Mesh>(null);
  const [pos, setXYZ] = React.useState<[number, number, number]>([
    0, 0.08, 0.2,
  ]);
  const [rot, setRot] = React.useState<[number, number, number]>([0, 0, 0]);
  const [sca, setSca] = React.useState<[number, number, number]>([
    0.25, 0.25, 0.5,
  ]);

  const vertex = `
    varying vec3 vColor;

    void main() {
        vec3 Transformednormal = normalize(normalMatrix * normal);
        vec3 lightDirection = normalize(vec3(0.2, 1.0, 1.0));
        float diff = max(dot(Transformednormal, lightDirection), 0.0);
        vec3 diffuse = diff * vec3(0.8, 0.8, 0.8); 
        vColor = diffuse;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`;

  const fragment = `
    varying vec3 vColor;

    void main() {
        gl_FragColor = vec4(vColor, 1.0);
    }`;

  const Material = props.flag
    ? new THREE.MeshStandardMaterial({ color: "gray", side: THREE.DoubleSide })
    : new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        side: THREE.DoubleSide,
      });

  return (
    <group {...props} dispose={null}>
      <group position={[0, 0, 1]}>
        <PivotControls
          scale={0.2}
          activeAxes={[true, true, false]}
          onDrag={(local) => {
            const position = new THREE.Vector3(pos[0], pos[1], pos[2]);

            const scale = new THREE.Vector3(sca[0], sca[1], sca[2]);
            const quaternion = new THREE.Quaternion();
            local.decompose(position, quaternion, scale);
            const rotation = new THREE.Euler().setFromQuaternion(quaternion);
            setRot([rotation.x, rotation.y, rotation.z]);
            setSca([scale.x / 10, scale.y / 10, 0.5]);
            setXYZ([position.x, position.y, 0.2]);
          }}
        />
      </group>
      <mesh
        geometry={(nodes.T_Shirt_male as THREE.Mesh).geometry}
        position={[0, 0, 0]}
        scale={[2, 2, 2]}
        material={Material}
      >
        <Decal
          ref={decalRef}
          position={pos}
          rotation={rot}
          scale={sca}
          map={Texture}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/shirt_baked_collapsed.glb");
