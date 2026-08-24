import { definePlugin } from "emdash";

export interface ExplorationRelationships {
  explores: string;
  connects: string[];
  relatedStudio: string;
}

export interface ExplorationRecord {
  id: string;
  slug: string;
  title: string;
  domain: "computation" | "physical" | "observation" | "learning";
  domainLabel: string;
  status: "active" | "lab" | "archived";
  description: string;
  actionPipeline?: string;
  sceneId: string;
  technologies: string[];
  featured: boolean;
  order: number;
  relatedArticles?: string[];
  relationships?: ExplorationRelationships;
}

export const defaultExplorations: ExplorationRecord[] = [
  {
    id: "exp-01",
    slug: "physical-computing",
    title: "Physical Computing Studio",
    domain: "physical",
    domainLabel: "PHYSICAL SYSTEMS // 02",
    status: "active",
    description:
      "Interactive computational environment for constructing, simulating, and testing physical hardware-software systems, sensor bridges, and embedded microcontrollers.",
    actionPipeline: "Build → Connect → Program → Observe",
    sceneId: "CIRCUIT-SIM-01",
    technologies: ["Rust", "WASM", "WebSerial", "I2C", "Embedded C++", "MicroPython"],
    featured: true,
    order: 1,
    relatedArticles: ["from-simulation-to-physical-experiment"],
    relationships: {
      explores: "Physical Systems & Embedded Telemetry",
      connects: ["Simulation", "MicroPython", "Sensor Buses"],
      relatedStudio: "LearningOS",
    },
  },
  {
    id: "exp-02",
    slug: "learning-os",
    title: "LearningOS",
    domain: "learning",
    domainLabel: "LEARNING // 04",
    status: "active",
    description:
      "Constructivist cognitive workbench for modeling complex concepts through dynamic computational simulations, offline-first SQLite state, and interactive knowledge graphs.",
    actionPipeline: "Model → Explore → Construct → Reflect",
    sceneId: "COGNITIVE-GRAPH-02",
    technologies: ["TypeScript", "Canvas API", "Local SQLite", "Reactive Signals", "State Machines"],
    featured: true,
    order: 2,
    relatedArticles: [
      "why-observation-matters-before-explanation",
      "building-learningos-offline-first",
    ],
    relationships: {
      explores: "Cognitive Synthesis & Interactive Mental Models",
      connects: ["Local SQLite", "Reactive State", "Canvas Physics"],
      relatedStudio: "Observation Studio",
    },
  },
  {
    id: "exp-03",
    slug: "observation-studio",
    title: "Observation Studio",
    domain: "observation",
    domainLabel: "OBSERVATION // 03",
    status: "active",
    description:
      "Scientific instrumentation platform for streaming live time-series telemetry, spectral analysis, and multi-channel hardware observation.",
    actionPipeline: "Ingest → Stream → Analyze → Calibrate",
    sceneId: "TELEMETRY-STREAM-03",
    technologies: ["WebSockets", "Data Shaders", "Spectral FFT", "Time-Series", "GIS Telemetry"],
    featured: true,
    order: 3,
    relatedArticles: ["from-simulation-to-physical-experiment"],
    relationships: {
      explores: "Multi-Spectral Telemetry & Empirical Streams",
      connects: ["WebSockets", "FFT Analysis", "Time-Series"],
      relatedStudio: "Physical Computing Studio",
    },
  },
  {
    id: "exp-04",
    slug: "oxigeo",
    title: "OxiGeo",
    domain: "computation",
    domainLabel: "COMPUTATION // 01",
    status: "active",
    description:
      "Geographic and spatial computing engine for processing multi-dimensional vector topologies, GIS coordinate geometries, and spatial data transformations.",
    actionPipeline: "Map → Project → Compute → Transform",
    sceneId: "TOPOLOGY-VIZ-04",
    technologies: ["Rust", "WASM Matrix", "GIS Spatial Engine", "Topology", "GeoJSON"],
    featured: true,
    order: 4,
    relatedArticles: ["designing-interactive-computational-environments"],
    relationships: {
      explores: "Continuous Spatial Geometries & Vector Topology",
      connects: ["GIS Data", "WASM Kernels", "Matrix Operations"],
      relatedStudio: "MathArt",
    },
  },
  {
    id: "exp-05",
    slug: "math-art",
    title: "MathArt",
    domain: "computation",
    domainLabel: "COMPUTATION // 01",
    status: "lab",
    description:
      "Generative mathematical workbench transforming topological equations, attractor dynamics, and differential forms into interactive computational models.",
    actionPipeline: "Define → Compute → Visualize → Synthesize",
    sceneId: "TOPOLOGY-VIZ-04",
    technologies: ["WebGL", "GLSL Shaders", "Dynamical Systems", "Topology", "WASM Matrix"],
    featured: true,
    order: 5,
    relatedArticles: ["designing-interactive-computational-environments"],
    relationships: {
      explores: "Continuous Mathematics & Generative Topology",
      connects: ["WebGL Shaders", "Matrix Kernels", "Dynamical Systems"],
      relatedStudio: "Physical Computing Studio",
    },
  },
];

export function createPlugin() {
  return definePlugin({
    id: "sredsol-explorations",
    version: "1.0.0",
    capabilities: ["content:read", "content:write"],
  });
}
