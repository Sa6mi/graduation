import * as THREE from "three";
import React, { useRef } from "react";
import { Environment, useGLTF } from "@react-three/drei";
import { GLTF, GLTFLoader } from "three-stdlib";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";

const textureLoader = new THREE.TextureLoader();
const loadTextureWithMipmaps = (url: string) => {
  const texture = textureLoader.load(url);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
};

export function Chess(props: JSX.IntrinsicElements["group"]) {
  const Scene = useLoader(GLTFLoader, "BenchmarkModels/Chess/untitled.gltf");
  const bishopBlackTexture = loadTextureWithMipmaps(
    "/BenchmarkModels/Chess/bishop_black_base_color.jpg"
  );
  const bishopWhiteTexture = loadTextureWithMipmaps(
    "/BenchmarkModels/Chess/bishop_white_base_color.jpg"
  );
  const castleBlackTexture = loadTextureWithMipmaps(
    "/BenchmarkModels/Chess/castle_black_base_color.jpg"
  );
  const castleWhiteTexture = loadTextureWithMipmaps(
    "/BenchmarkModels/Chess/castle_white_base_color.jpg"
  );
  const chessboardTexture = loadTextureWithMipmaps(
    "/BenchmarkModels/Chess/chessboard_base_color.jpg"
  );
  const kingBlackTexture = loadTextureWithMipmaps(
    "/BenchmarkModels/Chess/king_black_base_color.jpg"
  );
  const kingWhiteTexture = loadTextureWithMipmaps(
    "/BenchmarkModels/Chess/king_White_base_color.jpg"
  );
  const knightBlackTexture = loadTextureWithMipmaps(
    "/BenchmarkModels/Chess/knight_black_base_color.jpg"
  );
  const knightWhiteTexture = loadTextureWithMipmaps(
    "/BenchmarkModels/Chess/knight_white_base_color.jpg"
  );
  const pawnBlackTexture = loadTextureWithMipmaps(
    "/BenchmarkModels/Chess/pawn_black_base_color.jpg"
  );
    const pawnWhiteTexture = loadTextureWithMipmaps(
        "/BenchmarkModels/Chess/pawn_white_base_color.jpg"
    );
  const queenBlackTexture = loadTextureWithMipmaps(
    "/BenchmarkModels/Chess/queen_black_base_color.jpg"
  );
  const queenWhiteTexture = loadTextureWithMipmaps(
    "/BenchmarkModels/Chess/queen_white_base_color.jpg"
  );
  Scene.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.name.includes("bishop_black")) {
        child.material.map = bishopBlackTexture;
      } else if (child.name.includes("bishop_white")) {
        child.material.map = bishopWhiteTexture;
      } else if (child.name.includes("castle_black")) {
        child.material.map = castleBlackTexture;
      } else if (child.name.includes("castle_white")) {
        child.material.map = castleWhiteTexture;
      } else if (child.name.includes("chessboard")) {
        child.material.map = chessboardTexture;
      } else if (child.name.includes("king_black")) {
        child.material.map = kingBlackTexture;
      } else if (child.name.includes("king_white")) {
        child.material.map = kingWhiteTexture;
      } else if (child.name.includes("knight_black")) {
        child.material.map = knightBlackTexture;
      } else if (child.name.includes("knight_white")) {
        child.material.map = knightWhiteTexture;
      } else if (child.name.includes("pawn_black")) {
        child.material.map = pawnBlackTexture;
      } else if (child.name.includes("pawn_white")) {
        child.material.map = pawnWhiteTexture;
      } else if (child.name.includes("queen_black")) {
        child.material.map = queenBlackTexture;
      } else if (child.name.includes("queen_white")) {
        child.material.map = queenWhiteTexture;
      }
    }
  }
    );

  return (
      <group>
        <primitive object={Scene.scene} {...props} />
      </group>
  );
}
