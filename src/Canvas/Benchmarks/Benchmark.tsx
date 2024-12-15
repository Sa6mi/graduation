import { useFrame } from "@react-three/fiber";
import { Face } from "../Face";
import { useState } from "react";

function Benchmark(props: any) {
  const facePositions = [
    [0, 0, 0],
    [0, 0, -2],
    [0, 0, -4],
    [0, 0, -6],
    [2, 0, 0],
    [2, 0, -2],
    [2, 0, -4],
    [2, 0, -6],
    [-2, 0, 0],
    [-2, 0, -2],
    [-2, 0, -4],
    [-2, 0, -6],
    [-4, 0, 0],
    [-4, 0, -2],
    [-4, 0, -4],
    [-4, 0, -6],
    [4, 0, 0],
    [4, 0, -2],
    [4, 0, -4],
    [4, 0, -6],
  ];
  
  return (
    <>
      {facePositions.map((position, index) => (
        <Face key={index} position={position} {...props} />
      ))}
      </>
  );
}

export default Benchmark;
