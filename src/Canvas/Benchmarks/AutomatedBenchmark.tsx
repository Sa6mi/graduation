import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CornellBoxScene } from "./CornellBox/CornellBoxScene";
import { useEffect, useRef, useState } from "react";
import { OrbitControls, Stats } from "@react-three/drei";
import {
  SCENE_DURATION,
  SCENE_SCREENSHOT_DELAY,
  SCENE_TAKE_SCREENSHOTS,
  TOTAL_SCENES,
} from "./Global/GlobalVars";
import { BustSceneLoader } from "./RandomBench/BustSceneLoader";
import { ChessLoader } from "./Chess/ChessLoader";

const sceneNames = [
  'Classic Cornell Box',
  'Emissive Box',
  'Metallic Box',
  'Subsurface Box',
  'Caustics Box',
  'Classic Cornell Box Compressed',
  'Emissive Box Compressed',
  'Metallic Box Compressed',
  'Subsurface Box Compressed',
  'Caustics Box Compressed',
  'Classic Cornell Box LOD',
  'Emissive Box LOD',
  'Metallic Box LOD',
  'Subsurface Box LOD',
  'Caustics Box LOD',
  'Classic Cornell Box Material Pool',
  'Emissive Box Material Pool',
  'Metallic Box Material Pool',
  'Subsurface Box Material Pool',
  'Caustics Box Material Pool',
  'Bust Scene',
  'Bust Scene LOD',
  'Bust Instanced',
  'Chess',
  'Chess Merged',
  'Chess Instanced',
  'Chess Layered',
  'Chess MipMap',
  'Chess Normal Compressed'
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
const downloadBenchmarkResults = (results: Record<number, Record<string, number[]>>) => {
  let content = "Benchmark Results\n==================\n\n";
  
  Object.entries(results).forEach(([scene, metrics]) => {
    content += `${sceneNames[parseInt(scene)]}\n${'-'.repeat(sceneNames[parseInt(scene)].length)}\n`;
    content += `FPS: min=${Math.min(...metrics.fps)}, max=${Math.max(...metrics.fps)}, avg=${(metrics.fps.reduce((a, b) => a + b) / metrics.fps.length).toFixed(2)}\n`;
    content += `Frame Time: min=${Math.min(...metrics.frameTime).toFixed(2)}ms, max=${Math.max(...metrics.frameTime).toFixed(2)}ms, avg=${(metrics.frameTime.reduce((a, b) => a + b) / metrics.frameTime.length).toFixed(2)}ms\n`;
    content += `Draw Calls: avg=${(metrics.drawCalls.reduce((a, b) => a + b) / metrics.drawCalls.length).toFixed(0)}\n`;
    content += `Triangles: avg=${(metrics.triangles.reduce((a, b) => a + b) / metrics.triangles.length).toFixed(0)}\n`;
    content += `Textures: avg=${(metrics.textureCount.reduce((a, b) => a + b) / metrics.textureCount.length).toFixed(0)}\n`;
    content += `Memory Usage: avg=${(metrics.memoryUsage.reduce((a, b) => a + b) / metrics.memoryUsage.length).toFixed(0)}\n\n`;
  });

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `benchmark-results-${new Date().toISOString().split('T')[0]}.txt`;
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
    requestAnimationFrame(() => {
      if (canvas) {
        const link = document.createElement("a");
        link.setAttribute("download", `scene-${sceneId}.png`);
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
    return (
      <>
        <CornellBoxScene Choice={sceneRef.current.currentScene} camerapos={0} />;
        <BustSceneLoader Choice={sceneRef.current.currentScene} camerapos={0} />;        
        <ChessLoader Choice={sceneRef.current.currentScene} />;
        {/* <OrbitControls /> */}
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
