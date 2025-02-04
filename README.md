# WebGL Rendering Benchmark Project

## Overview
A comprehensive benchmarking tool for analyzing various WebGL rendering techniques using Three.js and React Three Fiber. This Project was made to help provide quantifiable metrics for a comprehinsive analysis on WebGL performance enhancing techniques my bachelor's graduation project evaluates different optimization strategies and their impact on rendering performance.

## Features
- Multiple scene types (Cornell Box, Bust, Chess)
- Various rendering techniques:
  - Material Pooling
  - Level of Detail (LOD)
  - Geometry Compression
  - Instancing
  - Texture Optimization
- Automated benchmarking process
- Performance metrics collection
- Screenshot capture
- Results export

## Scene Types
### Cornell Box Scenes
- Classic Cornell Box
- Emissive Box
- Metallic Box
- Subsurface Box
- Caustics Box
- With variations:
  - Compressed
  - LOD
  - Material Pool
  - Multiple camera positions (5, 10, 16 units)

### Bust Scenes
- Standard Bust
- LOD Bust
- Instanced Bust
- Multiple camera positions (30, 50 units)

### Chess Scenes
- Standard Chess
- Merged Chess
- Instanced Chess
- Layered Chess
- MipMap Chess
- Normal Compressed Chess

## Metrics Collected
- Frames Per Second (FPS)
- Frame Time
- Draw Calls
- Triangle Count
- Texture Count
- Memory Usage

## Setup
1. Clone the repository
2. Install dependencies: "npm install"

## Modify GlobalVariables If Needed
