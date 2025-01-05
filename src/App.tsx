import { Canvas, useFrame, useThree } from "@react-three/fiber";
import "./App.css";
import { Shirt } from "./Canvas/Shirt";
import { Caustics, OrbitControls, Sphere, Stats } from "@react-three/drei";
import { useControls } from "leva";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";
import BenchmarkSpheres from "./Canvas/Benchmarks/BenchmarkSpheres";
import { Chess } from "./Canvas/Benchmarks/Chess/ChessMerged";
import { CornellBoxScene } from "./Canvas/Benchmarks/CornellBox/CornellBoxScene";
import { useEffect } from "react";
import AutomatedBenchmark from "./Canvas/Benchmarks/AutomatedBenchmark";
import SphereBenchmark from "./Canvas/Benchmarks/SphereInd";

function FpsGrabber() {
  let count = 0;
  let start = new Date().getTime();
  let firstFrame = new Date().getTime();
  let Frames: number[] = [];
  let Max = 0;
  let Min = Infinity;
  useFrame((state, delta, xrFrame) => {
    count++;
    if (new Date().getTime() - start >= 1000) {
      start = new Date().getTime();
      Frames.push(count);
      console.log("FPS: ", count);
      count = 0;
    }
    if (new Date().getTime() - firstFrame >= 5000) {
      console.log(
        "Average FPS: ",
        Frames.reduce((a, b) => a + b, 0) / Frames.length
      );
      Frames = [];
      firstFrame = new Date().getTime();
    }
  });
  return <></>;
}
function BenchmarkSelection({ Choice }: { Choice: number }) {
  switch (Choice) {
    case 0:
      return <CornellBoxScene Choice={Choice} camerapos={0} />;
    case 1:
      return <CornellBoxScene Choice={Choice} camerapos={0} />;
    case 2:
      return <CornellBoxScene Choice={Choice} camerapos={0} />;
    case 3:
      return <CornellBoxScene Choice={Choice} camerapos={0} />;
    case 4:
      return <CornellBoxScene Choice={Choice} camerapos={0} />;
      case 5:
      return <BenchmarkSpheres />;
    case 6:
      return <Chess />;
    default:
      return null;
  }
}
function CameraReset({ Choice }: { Choice: number }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.5, 5); 
    camera.lookAt(0, 0, 0);
  }, [Choice, camera]);

  return null;
}
function App() {
  const BenchmarkChoice = useControls({
    flag: {
      value: 0,
      options: {
        ClassicCornellBox: 0,
        EmissiveCornellBox:1,
        MetallicCornellBox:2,
        SubsurfaceCornellBox:3,
        CausticsCornellBox:4,
        Spheres: 5, 
        Chess: 6,        
      },
    },
  });
  return (
    <div className="App">
      <AutomatedBenchmark />
      {/* <Canvas frameloop={"always"} gl={{powerPreference:"high-performance"}} className="Canvas" camera={{fov:60}}> */}
        {/* <FpsGrabber /> */}
        {/* <Stats />         */}
        {/* <CameraReset Choice={BenchmarkChoice.flag} /> */}
        {/* <BenchmarkSelection Choice={BenchmarkChoice.flag}/> */}
        {/* <CornellBoxScene Choice={0} /> */}
        {/* <BenchmarkSpheres Visible= {5}/> */}
      {/* </Canvas> */}
    </div>
  );
}

export default App;
