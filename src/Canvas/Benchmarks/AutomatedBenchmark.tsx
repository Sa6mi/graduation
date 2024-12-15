import { Canvas, useFrame } from "@react-three/fiber";
import { CornellBoxScene } from "./CornellBox/CornellBoxScene";
import BenchmarkSpheres from "./BenchmarkSpheres";
import { useEffect, useRef, useState } from "react";
import { Stats } from "@react-three/drei";
import SphereBenchmark from "./SphereInd";
import { SCENE_DURATION, TOTAL_SCENES } from "./Global/GlobalVars";

const benchmarkResults: Array<{ sceneId: number; fps: number }> = [];

function FpsGrabber({ sceneId }: { sceneId: number }) {
  const data = useRef({
    frameCount: 0,
    lastCount: performance.now(),
    sceneStart: performance.now(),
    complete: false,
  });

  useFrame(() => {
    data.current.frameCount++;
    const now = performance.now();

    if (now - data.current.lastCount >= 1000) {
      const fps = data.current.frameCount;
      benchmarkResults.push({ sceneId, fps });
      console.log(`Scene ${sceneId} Current FPS: ${fps}`);
      data.current.frameCount = 0;
      data.current.lastCount = now;
    }
  });

  useEffect(() => {
    return () => {
      if (sceneId >= TOTAL_SCENES - 1) {
        const results = benchmarkResults.reduce((acc, { sceneId, fps }) => {
          if (!acc[sceneId]) acc[sceneId] = [];
          acc[sceneId].push(fps);
          return acc;
        }, {} as Record<number, number[]>);

        console.log("Benchmark Complete - Final Results:");
        Object.entries(results).forEach(([scene, readings]) => {
          console.log(`Scene ${scene}:`, {
            min: Math.min(...readings),
            max: Math.max(...readings),
            avg: (readings.reduce((a, b) => a + b) / readings.length).toFixed(
              2
            ),
          });
        });
      }
    };
  }, [sceneId]);

  if (sceneId >= TOTAL_SCENES) return null;
  return null;
}

function Switcher() {
  const sceneRef = useRef({
    currentScene: 0,
    complete: false,
  });
  const [, forceUpdate] = useState({});
  const benchmarkStartTime = useRef(performance.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = performance.now() - benchmarkStartTime.current;
      const sceneIndex = Math.floor(elapsed / SCENE_DURATION);

      if (sceneIndex !== sceneRef.current.currentScene) {
        if (sceneIndex >= TOTAL_SCENES) {
          sceneRef.current.complete = true;
          forceUpdate({});
          clearInterval(interval);
          return;
        }
        sceneRef.current.currentScene = sceneIndex;
        forceUpdate({});
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (sceneRef.current.complete) return null;

  const renderScene = () => {
    return (
      <>
        <CornellBoxScene Choice={sceneRef.current.currentScene} />;
        <BenchmarkSpheres Visible={sceneRef.current.currentScene} />;
      </>
    );
  };

  return (
    <>
      {renderScene()}
      <FpsGrabber sceneId={sceneRef.current.currentScene} />
    </>
  );
}

function AutomatedBenchmark() {
  return (
    <Canvas
      frameloop="always"
      className="Canvas"
      camera={{ fov: 60 }}
      flat={true}
      dpr={2}
      legacy={false}
      gl={{ powerPreference: "high-performance", antialias: false }}
      shadows
    >
      <Stats />
      <Switcher />
    </Canvas>
  );
}

export default AutomatedBenchmark;
