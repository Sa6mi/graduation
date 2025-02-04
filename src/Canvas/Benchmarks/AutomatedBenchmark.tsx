import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CornellBoxScene } from "./CornellBox/CornellBoxScene";
import { useEffect, useRef, useState } from "react";
import {Stats} from "@react-three/drei";
import {
  SCENE_DURATION,
  SCENE_SCREENSHOT_DELAY,
  SCENE_TAKE_SCREENSHOTS,
  STOP_TIME,
  TOTAL_SCENES,
} from "./Global/GlobalVars";
import { BustSceneLoader } from "./RandomBench/BustSceneLoader";
import { ChessLoader } from "./Chess/ChessLoader";

const sceneNames = [
  "Classic Cornell Box Camera1",
  "Emissive Box Camera1",
  "Metallic Box Camera1",
  "Subsurface Box Camera1",
  "Caustics Box Camera1",
  "Classic Cornell Box Compressed Camera1",
  "Emissive Box Compressed Camera1",
  "Metallic Box Compressed Camera1",
  "Subsurface Box Compressed Camera1",
  "Caustics Box Compressed Camera1",
  "Classic Cornell Box LOD Camera1",
  "Emissive Box LOD Camera1",
  "Metallic Box LOD Camera1",
  "Subsurface Box LOD Camera1",
  "Caustics Box LOD Camera1",
  "Classic Cornell Box Material Pool Camera1",
  "Emissive Box Material Pool Camera1",
  "Metallic Box Material Pool Camera1",
  "Subsurface Box Material Pool Camera1",
  "Caustics Box Material Pool Camera1",
  "Classic Cornell Box Camera2",
  "Emissive Box Camera2",
  "Metallic Box Camera2",
  "Subsurface Box Camera2",
  "Caustics Box Camera2",
  "Classic Cornell Box Compressed Camera2",
  "Emissive Box Compressed Camera2",
  "Metallic Box Compressed Camera2",
  "Subsurface Box Compressed Camera2",
  "Caustics Box Compressed Camera2",
  "Classic Cornell Box LOD Camera2",
  "Emissive Box LOD Camera2",
  "Metallic Box LOD Camera2",
  "Subsurface Box LOD Camera2",
  "Caustics Box LOD Camera2",
  "Classic Cornell Box Material Pool Camera2",
  "Emissive Box Material Pool Camera2",
  "Metallic Box Material Pool Camera2",
  "Subsurface Box Material Pool Camera2",
  "Caustics Box Material Pool Camera2",
  "Classic Cornell Box Camera3",
  "Emissive Box Camera3",
  "Metallic Box Camera3",
  "Subsurface Box Camera3",
  "Caustics Box Camera3",
  "Classic Cornell Box Compressed Camera3",
  "Emissive Box Compressed Camera3",
  "Metallic Box Compressed Camera3",
  "Subsurface Box Compressed Camera3",
  "Caustics Box Compressed Camera3",
  "Classic Cornell Box LOD Camera3",
  "Emissive Box LOD Camera3",
  "Metallic Box LOD Camera3",
  "Subsurface Box LOD Camera3",
  "Caustics Box LOD Camera3",
  "Classic Cornell Box Material Pool Camera3",
  "Emissive Box Material Pool Camera3",
  "Metallic Box Material Pool Camera3",
  "Subsurface Box Material Pool Camera3",
  "Caustics Box Material Pool Camera3",
  "Bust Scene Camera1",
  "Bust Scene LOD Camera1",
  "Bust Instanced Camera1",
  "Bust Scene Camera2",
  "Bust Scene LOD Camera2",
  "Bust Instanced Camera2",
  "Chess",
  "Chess Merged",
  "Chess Instanced",
  "Chess Layered",
  "Chess MipMap",
  "Chess Normal Compressed",
];

interface BenchmarkMetric {
  sceneId: number;
  fps: number;
  frameTime: number;
  drawCalls: number;
  triangles: number;
  textureCount: number;
  memoryUsage: number;
}


const benchmarkResults: BenchmarkMetric[] = [];
const downloadBenchmarkResults = (
  results: Record<number, Record<string, number[]>>
) => {
  let content = "Benchmark Results\n==================\n\n";

  Object.entries(results).forEach(([scene, metrics]) => {
    content += `${sceneNames[parseInt(scene)]}\n${"-".repeat(
      sceneNames[parseInt(scene)].length
    )}\n`;
    content += `FPS: min=${Math.min(...metrics.fps)}, max=${Math.max(
      ...metrics.fps
    )}, avg=${(
      metrics.fps.reduce((a, b) => a + b) / metrics.fps.length
    ).toFixed(2)}\n`;
    content += `Frame Time: min=${Math.min(...metrics.frameTime).toFixed(
      2
    )}ms, max=${Math.max(...metrics.frameTime).toFixed(2)}ms, avg=${(
      metrics.frameTime.reduce((a, b) => a + b) / metrics.frameTime.length
    ).toFixed(2)}ms\n`;
    content += `Draw Calls: avg=${(
      metrics.drawCalls.reduce((a, b) => a + b) / metrics.drawCalls.length
    ).toFixed(0)}\n`;
    content += `Triangles: avg=${(
      metrics.triangles.reduce((a, b) => a + b) / metrics.triangles.length
    ).toFixed(0)}\n`;
    content += `Textures: avg=${(
      metrics.textureCount.reduce((a, b) => a + b) / metrics.textureCount.length
    ).toFixed(0)}\n`;
    content += `Memory Usage: avg=${(
      metrics.memoryUsage.reduce((a, b) => a + b) / metrics.memoryUsage.length
    ).toFixed(0)}\n\n`;
  });

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `benchmark-results-${
    new Date().toISOString().split("T")[0]
  }.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

function FpsGrabber({ sceneId }: { sceneId: number }) {
  const { gl } = useThree();
  const data = useRef({
    frameCount: 0,
    lastCount: performance.now(),
    sceneStart: performance.now(),
    complete: false,
  });

  useFrame((state) => {
    data.current.frameCount++;
    const now = performance.now();
    const frameTime = now - data.current.lastCount;

    if (now - data.current.lastCount >= 1000) {
      const fps = data.current.frameCount;
      const info = gl.info;

      benchmarkResults.push({
        sceneId,
        fps,
        frameTime: frameTime / data.current.frameCount,
        drawCalls: info.render.calls,
        triangles: info.render.triangles,
        textureCount: info.memory.textures,
        memoryUsage: info.memory.geometries,
      });

      console.log(`${sceneNames[sceneId]} Metrics:`, {
        fps,
        frameTime: (frameTime / data.current.frameCount).toFixed(2),
        drawCalls: info.render.calls,
        triangles: info.render.triangles,
        textures: info.memory.textures,
        memory: info.memory.geometries,
      });

      data.current.frameCount = 0;
      data.current.lastCount = now;
    }
  });

  useEffect(() => {
    return () => {
      if (sceneId >= TOTAL_SCENES - 1) {
        const results = benchmarkResults.reduce((acc, metric) => {
          if (!acc[metric.sceneId]) {
            acc[metric.sceneId] = {
              fps: [],
              frameTime: [],
              drawCalls: [],
              triangles: [],
              textureCount: [],
              memoryUsage: [],
            };
          }
          acc[metric.sceneId].fps.push(metric.fps);
          acc[metric.sceneId].frameTime.push(metric.frameTime);
          acc[metric.sceneId].drawCalls.push(metric.drawCalls);
          acc[metric.sceneId].triangles.push(metric.triangles);
          acc[metric.sceneId].textureCount.push(metric.textureCount);
          acc[metric.sceneId].memoryUsage.push(metric.memoryUsage);
          return acc;
        }, {} as Record<number, Record<string, number[]>>);

        console.log("Benchmark Complete - Final Results:");
        Object.entries(results).forEach(([scene, metrics]) => {
          console.log(`${sceneNames[parseInt(scene)]}:`, {
            fps: {
              min: Math.min(...metrics.fps),
              max: Math.max(...metrics.fps),
              avg: (
                metrics.fps.reduce((a, b) => a + b) / metrics.fps.length
              ).toFixed(2),
            },
            frameTime: {
              min: Math.min(...metrics.frameTime),
              max: Math.max(...metrics.frameTime),
              avg: (
                metrics.frameTime.reduce((a, b) => a + b) /
                metrics.frameTime.length
              ).toFixed(2),
            },
            drawCalls: {
              avg: (
                metrics.drawCalls.reduce((a, b) => a + b) /
                metrics.drawCalls.length
              ).toFixed(0),
            },
            triangles: {
              avg: (
                metrics.triangles.reduce((a, b) => a + b) /
                metrics.triangles.length
              ).toFixed(0),
            },
            textureCount: {
              avg: (
                metrics.textureCount.reduce((a, b) => a + b) /
                metrics.textureCount.length
              ).toFixed(0),
            },
            memoryUsage: {
              avg: (
                metrics.memoryUsage.reduce((a, b) => a + b) /
                metrics.memoryUsage.length
              ).toFixed(0),
            },
          });
        });
        downloadBenchmarkResults(results);
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
    screenshotTaken: false,
  });
  const [, forceUpdate] = useState({});
  const benchmarkStartTime = useRef(performance.now());
  const { gl } = useThree();

  const takeScreenshot = (sceneId: number) => {
    const canvas = gl.domElement;
    const sceneName = sceneNames[sceneId] || `scene-${sceneId}`;
    requestAnimationFrame(() => {
      if (canvas) {
        const link = document.createElement("a");
        link.setAttribute("download", `scene-${sceneName}.png`);
        link.setAttribute(
          "href",
          canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream")
        );
        link.click();
      }
    });
  };

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
        sceneRef.current.screenshotTaken = false;
        forceUpdate({});
      }
      if (
        SCENE_TAKE_SCREENSHOTS &&
        !sceneRef.current.screenshotTaken &&
        elapsed >= sceneIndex * SCENE_DURATION + SCENE_SCREENSHOT_DELAY * 1000
      ) {
        takeScreenshot(sceneIndex);
        sceneRef.current.screenshotTaken = true;
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);
  if (sceneRef.current.complete) return null;
  const renderScene = () => {
    const scene = sceneRef.current.currentScene;
    return (
      <>
        <CornellBoxScene
          Choice={scene >= 40 ? scene - 40 : scene >= 20 ? scene - 20 : scene}
        />
        <BustSceneLoader Choice={scene >= 60 ? scene - 43 : scene - 40} />
        <ChessLoader Choice={scene - 43} />
        <CameraRig sceneId={scene} />
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
const SCENE_RANGES = {
  CORNELL_1: { start: 0, end: 19, height: 0, distance: 5 },
  CORNELL_2: { start: 20, end: 39, height: 0, distance: 10 },
  CORNELL_3: { start: 40, end: 59, height: 0, distance: 16 },
  BUST_1: { start: 60, end: 62, height: 0, distance: 30 },
  BUST_2: { start: 63, end: 65, height: 0, distance: 50 },
  CHESS: { start: 66, end: 71, height: 5, distance: 5 },
};

function CameraRig({ sceneId }: { sceneId: number }) {
  const camera = useThree((state) => state.camera);
  const startTimeRef = useRef<number | null>(null);
  const angleRef = useRef(0);
  const currentSceneRef = useRef(sceneId);

  useEffect(() => {
    if (currentSceneRef.current !== sceneId) {
      startTimeRef.current = null;
      angleRef.current = 0;
      currentSceneRef.current = sceneId;
      if (
        sceneId >= SCENE_RANGES.CORNELL_1.start &&
        sceneId <= SCENE_RANGES.CORNELL_1.end
      ) {
        camera.position.set(
          0,
          SCENE_RANGES.CORNELL_1.height,
          SCENE_RANGES.CORNELL_1.distance
        );
      } else if (
        sceneId >= SCENE_RANGES.CORNELL_2.start &&
        sceneId <= SCENE_RANGES.CORNELL_2.end
      ) {
        camera.position.set(
          0,
          SCENE_RANGES.CORNELL_2.height,
          SCENE_RANGES.CORNELL_2.distance
        );
      } else if (
        sceneId >= SCENE_RANGES.CORNELL_3.start &&
        sceneId <= SCENE_RANGES.CORNELL_3.end
      ) {
        camera.position.set(
          0,
          SCENE_RANGES.CORNELL_3.height,
          SCENE_RANGES.CORNELL_3.distance
        );
      } else if (
        sceneId >= SCENE_RANGES.BUST_1.start &&
        sceneId <= SCENE_RANGES.BUST_1.end
      ) {
        camera.position.set(
          0,
          SCENE_RANGES.BUST_1.height,
          SCENE_RANGES.BUST_1.distance
        );
      } else if (
        sceneId >= SCENE_RANGES.BUST_2.start &&
        sceneId <= SCENE_RANGES.BUST_2.end
      ) {
        camera.position.set(
          0,
          SCENE_RANGES.BUST_2.height,
          SCENE_RANGES.BUST_2.distance
        );
      } else if (
        sceneId >= SCENE_RANGES.CHESS.start &&
        sceneId <= SCENE_RANGES.CHESS.end
      ) {
        camera.position.set(
          0,
          SCENE_RANGES.CHESS.height,
          SCENE_RANGES.CHESS.distance
        );
      }
    }
  }, [sceneId, camera]);

  useFrame((state, delta) => {
    if (!startTimeRef.current) {
      startTimeRef.current = state.clock.elapsedTime;
      return;
    }

    const elapsedTime = state.clock.elapsedTime - startTimeRef.current;

    // Only animate camera for chess scenes
    if (
      sceneId >= SCENE_RANGES.CHESS.start &&
      sceneId <= SCENE_RANGES.CHESS.end &&
      elapsedTime >= STOP_TIME &&
      elapsedTime <= STOP_TIME + 5
    ) {
      angleRef.current += 0.5 * delta;
      const x = SCENE_RANGES.CHESS.distance * Math.cos(angleRef.current);
      const z = SCENE_RANGES.CHESS.distance * Math.sin(angleRef.current);
      camera.position.set(x, SCENE_RANGES.CHESS.height, z);
    }

    camera.lookAt(0, 0, 0);
  });

  return null;
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
