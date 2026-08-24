# Phase 3 Implementation Plan: Sections & Page Reconstruction

> **Reference Documents:**
> - Strategic Vision: [`devdocs/idea.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/devdocs/idea.md)
> - Architectural Summary: [`devdocs/summary.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/devdocs/summary.md)
> - Phase 1 Foundation: [`devdocs/phase1.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/devdocs/phase1.md)
> - Phase 2 Design Primitives: [`devdocs/phase2.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/devdocs/phase2.md)
> - Canonical System Knowledge: [`system/globals/`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/system/globals/)

---

## 1. Executive Summary & Intent

### The Goal
In **Phase 3**, we assemble our Tier 1 primitives (`GridBackground`, `NodeIndicator`, `SignalBadge`, `ScopeGauge`, `SystemLayer`, `ExplorationCard`) into **Tier 2 Sections** and reconstruct the core **Tier 3 Pages** (`/`, `/explorations`, `/technology`, `/thinking`, `/lab`, `/company`).

The SREDSOL digital platform will no longer present generic SaaS marketing blocks (e.g. pricing tiers, logo clouds, generic features). Instead, every section immerses visitors in SREDSOL's computational visual grammar: active coordinate grids, node field graphs, telemetry stream badges, waveform scopes, and vertical architecture layer progression.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       PHASE 3 THREE-TIER INTEGRATION                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  TIER 1 (Primitives)                                                        │
│  <GridBackground />, <NodeIndicator />, <SignalBadge />,                   │
│  <ScopeGauge />, <SystemLayer />, <ExplorationCard />                       │
│                                │                                            │
│                                ▼                                            │
│  TIER 2 (Sections - src/components/sections/)                              │
│  • <HeroNodeField />        — Spatial canvas, node field & telemetry       │
│  • <DomainGrid />           — 4 Core Domains (Computation, Physical, etc.)  │
│  • <ExplorationsGrid />     — Studio showcase cards with scope previews     │
│  • <SystemsLayerDiagram />  — Vertical stack progression with wires         │
│  • <ThinkingDigest />       — Research notes & engineering essays           │
│  • <LabCTA />               — Inverted surface lab invitation band          │
│                                │                                            │
│                                ▼                                            │
│  TIER 3 (Pages - src/pages/)                                               │
│  • src/pages/index.astro        — SREDSOL flagship homepage                 │
│  • src/pages/explorations.astro — Studio directory (Physical, LearningOS)   │
│  • src/pages/technology.astro   — Architectural stack & computational model │
│  • src/pages/thinking.astro     — Research notes & thinking collection      │
│  • src/pages/lab.astro          — Interactive simulation sandbox & demos    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Section Specifications (`src/components/sections/`)

### 1. `HeroNodeField` (`src/components/sections/HeroNodeField.astro`)
* **Purpose**: Flagship hero section that immediately establishes SREDSOL’s computational identity.
* **Composition**:
  - Background: `<GridBackground variant="crosshairs" glow glowPosition="top" />`
  - Eyebrow: `NodeIndicator` showing `SREDSOL COMPUTATIONAL SYSTEMS // VER. 2026` with live pulsing telemetry indicator.
  - Headline: *“We build systems that make exploration possible.”*
  - Subheadline: *“Computational environments, interactive instruments, and intelligent tools for learning, observation, and creation.”*
  - Actions: Primary `[ Explore Systems → ]` (`/explorations`), Secondary `[ ↗ Enter Lab ]` (`/lab`).
  - Interactive Node Field Visualizer: SVG/CSS node-graph with animated coordinate nodes, vertex connection lines, and coordinate badges.
  - Live Status Telemetry Bar: Protocol tags `[I2C]`, `[WEBSOCKET]`, `[STREAMING]`, and operational status indicator.
* **Props Interface**:
  ```typescript
  export interface Props {
    locale?: string;
    class?: string;
  }
  ```

---

### 2. `DomainGrid` (`src/components/sections/DomainGrid.astro`)
* **Purpose**: Details SREDSOL’s 4 core exploration domains.
* **Composition**:
  - Section Header: Eyebrow *“WHAT WE EXPLORE”*, Title *“Four Pillars of Computational Exploration”*.
  - 4 Domain Cards:
    1. **COMPUTATION** (`COMP-01`): Mathematics, simulation, visualization, algorithmic systems, discrete geometry.
    2. **PHYSICAL SYSTEMS** (`PHYS-02`): Circuits, robotics, sensor networks, edge microcontrollers, hardware-software bridges.
    3. **OBSERVATION** (`OBS-03`): Data telemetry, scientific instruments, geography (OxiGeo), astronomy, time-series streams.
    4. **LEARNING** (`LEARN-04`): Interactive cognitive environments, unified learning spaces, **LearningOS**.
  - Each card features a domain badge, monospace code prefix, embedded `<ScopeGauge />` mini-visualizer, technology tags, and explore link.
* **Props Interface**:
  ```typescript
  export interface Props {
    locale?: string;
    class?: string;
  }
  ```

---

### 3. `ExplorationsGrid` (`src/components/sections/ExplorationsGrid.astro`)
* **Purpose**: Showcases SREDSOL’s flagship studios and interactive tools.
* **Composition**:
  - Composes `<ExplorationCard />` primitives for:
    1. **Physical Computing Studio**: Interactive circuit sandbox, logic gates, and hardware telemetry simulator.
    2. **LearningOS**: Unified cognitive exploration operating system with offline-first local state.
    3. **Observation Studio**: Real-time sensor flows, telemetry stream processors, and astronomical monitors.
    4. **OxiGeo & MathArt**: Spatial topography, generative algorithms, and topology visualizers.
  - Each exploration card displays a live micro-preview scope, technology tags, and interactive arrow link.
* **Props Interface**:
  ```typescript
  export interface Props {
    title?: string;
    eyebrow?: string;
    limit?: number;
    showViewAll?: boolean;
    locale?: string;
    class?: string;
  }
  ```

---

### 4. `SystemsLayerDiagram` (`src/components/sections/SystemsLayerDiagram.astro`)
* **Purpose**: Visualizes the vertical architecture progression of SREDSOL systems.
* **Composition**:
  - Composes sequential `<SystemLayer />` primitives:
    - **Step 01 // MATHEMATICS**: Continuous & discrete mathematics, topology, numerical simulation.
    - **Step 02 // COMPUTATION**: High-performance algorithms, WebAssembly runtimes, compiled kernels.
    - **Step 03 // INTERACTION**: Real-time canvas environments, spatial UI, reactive state machines.
    - **Step 04 // PHYSICAL SYSTEMS**: Sensor telemetry, embedded microcontrollers, hardware bridges.
    - **Step 05 // OBSERVATION**: Multi-spectral data streams, geographic mapping, time-series feeds.
    - **Step 06 // LEARNING**: Cognitive mental models, guided discovery, **LearningOS**.
* **Props Interface**:
  ```typescript
  export interface Props {
    locale?: string;
    class?: string;
  }
  ```

---

### 5. `ThinkingDigest` (`src/components/sections/ThinkingDigest.astro`)
* **Purpose**: Presents research notes, technical essays, and engineering logs (powered by EmDash blog collection).
* **Composition**:
  - Section Header: Eyebrow *“RESEARCH & ESSAYS”*, Title *“Thinking”*, Lead *“Notes from the frontier of computational systems, hardware, and cognitive tools.”*
  - Research article cards featuring domain tags, published dates, read times, and author credentials.
  - Fallback articles if CMS collection is empty during initial setup:
    1. *“Why observation matters before explanation”*
    2. *“Designing interactive computational environments”*
    3. *“From simulation to physical experiment”*
    4. *“Building LearningOS offline-first”*
* **Props Interface**:
  ```typescript
  export interface Props {
    limit?: number;
    locale?: string;
    class?: string;
  }
  ```

---

### 6. `LabCTA` (`src/components/sections/LabCTA.astro`)
* **Purpose**: High-impact inverted surface band inviting visitors into SREDSOL’s experimental Lab.
* **Composition**:
  - Background: Inverted dark card surface with `<GridBackground variant="dots" />` and subtle glowing center spotlight.
  - Eyebrow: `<SignalBadge status="streaming" protocol="LAB" latency="LIVE" />`
  - Headline: *“There is always another system to build.”*
  - Lead: *“Step inside our active research sandboxes, test experimental algorithms, and explore computational prototypes.”*
  - Actions: Primary `[ Enter the Lab → ]` (`/lab`), Secondary `[ Read our Thinking ]` (`/thinking`).
* **Props Interface**:
  ```typescript
  export interface Props {
    locale?: string;
    class?: string;
  }
  ```

---

## 3. Page Reconstructions & Routing (`src/pages/`)

### 1. `src/pages/index.astro` (Homepage)
* **Structure**:
  ```astro
  <MarketingLayout title="Technology for Exploration" path="/">
    <HeroNodeField />
    <DomainGrid />
    <ExplorationsGrid limit={4} showViewAll={true} />
    <SystemsLayerDiagram />
    <ThinkingDigest limit={3} />
    <LabCTA />
  </MarketingLayout>
  ```

### 2. `src/pages/explorations.astro` (Directory)
* **Purpose**: Complete directory of SREDSOL studios, interactive instruments, and tools.
* **Structure**: Filterable exploration grid categorized by domain (`All`, `Computation`, `Physical Systems`, `Observation`, `Learning`), with active state indicators.

### 3. `src/pages/technology.astro` (Architecture & Tech Stack)
* **Purpose**: Deep architectural overview detailing the computational stack (WASM, WebGL/WebGPU, Svelte/Threlte, SQLite, EmDash, Cloudflare R2, Docker/Dokploy).
* **Structure**: SystemsLayerDiagram, Open Standards section, and hardware interface specifications.

### 4. `src/pages/thinking.astro` (Research Notes)
* **Purpose**: The research and writing hub for SREDSOL.
* **Structure**: Full list of Thinking essays, tagged by domain with RSS feed link and search filter.

### 5. `src/pages/lab.astro` (Interactive Portal)
* **Purpose**: Direct gateway to experimental sandbox demos, waveform scopes, and live algorithm simulations.
* **Structure**: Lab terminal header, active instrument scopes, and prototype matrix.

### 6. `src/pages/about.astro` $\rightarrow$ `src/pages/company.astro`
* **Purpose**: SREDSOL philosophy, principles, mission, team, and contact channels.

---

## 4. File-by-File Implementation Plan

| File Path | Action | Description |
| :--- | :--- | :--- |
| [`src/components/sections/HeroNodeField.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/sections/HeroNodeField.astro) | **NEW** | SREDSOL Flagship Hero with interactive node canvas and telemetry bar. |
| [`src/components/sections/DomainGrid.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/sections/DomainGrid.astro) | **NEW** | 4 Core Domains showcase with ScopeGauge previews and domain tags. |
| [`src/components/sections/ExplorationsGrid.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/sections/ExplorationsGrid.astro) | **NEW** | Studio exploration showcase cards with micro-scene slots. |
| [`src/components/sections/SystemsLayerDiagram.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/sections/SystemsLayerDiagram.astro) | **NEW** | Sequential architecture progression stack with node indicator wires. |
| [`src/components/sections/ThinkingDigest.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/sections/ThinkingDigest.astro) | **NEW** | Research notes & thinking digest linked to EmDash content. |
| [`src/components/sections/LabCTA.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/sections/LabCTA.astro) | **NEW** | Inverted surface Lab invitation band with live telemetry stream badge. |
| [`src/components/sections/index.ts`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/sections/index.ts) | **MODIFY** | Export all SREDSOL sections from the section barrel. |
| [`src/pages/index.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/pages/index.astro) | **MODIFY** | Rebuild homepage using SREDSOL sections and computational branding. |
| [`src/pages/explorations.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/pages/explorations.astro) | **NEW** | Full explorations directory page. |
| [`src/pages/technology.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/pages/technology.astro) | **NEW** | Technology stack and architectural layers page. |
| [`src/pages/thinking.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/pages/thinking.astro) | **NEW** | Thinking and research notes publication page. |
| [`src/pages/lab.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/pages/lab.astro) | **NEW** | Interactive Lab and experimental sandbox portal page. |
| [`src/pages/company.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/pages/company.astro) | **NEW** | SREDSOL company philosophy, principles, and team page. |
| [`src/registry.json`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/registry.json) | **MODIFY** | Register new sections and pages in the machine-readable catalog. |
| [`system/globals/components.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/system/globals/components.md) | **MODIFY** | Update canonical section and page reference guides. |

---

## 5. Verification & Quality Guardrails

Every new section and page must pass the full automated quality suite:

```bash
# 1. I18n translation key integrity
node scripts/validate-i18n.js

# 2. Design token compliance (0 hardcoded hex or Tailwind palette utilities)
node scripts/check-kpis.mjs

# 3. Stylelint CSS compliance
npx stylelint "src/styles/**/*.css"

# 4. Vitest unit tests
npx vitest run

# 5. TypeScript typecheck across all pages and sections
ASTRO_TELEMETRY_DISABLED=1 npx astro check

# 6. Full Astro SSR build & Pagefind search index generation
ASTRO_TELEMETRY_DISABLED=1 npx astro build
```

---

## 6. Execution Checklist

- [ ] **Step 1**: Build `HeroNodeField.astro` with spatial grid, node field graph, and telemetry bar.
- [ ] **Step 2**: Build `DomainGrid.astro` showcasing the 4 core domains with `ScopeGauge` previews.
- [ ] **Step 3**: Build `ExplorationsGrid.astro` composing `ExplorationCard` for all SREDSOL studios.
- [ ] **Step 4**: Build `SystemsLayerDiagram.astro` with vertical step progression and connection wires.
- [ ] **Step 5**: Build `ThinkingDigest.astro` for research essays and technical notes.
- [ ] **Step 6**: Build `LabCTA.astro` with inverted surface styling and live stream badge.
- [ ] **Step 7**: Update `src/components/sections/index.ts` barrel export.
- [ ] **Step 8**: Reconstruct `src/pages/index.astro` with SREDSOL sections.
- [ ] **Step 9**: Create pages: `/explorations`, `/technology`, `/thinking`, `/lab`, `/company`.
- [ ] **Step 10**: Update `src/registry.json` and `system/globals/components.md`.
- [ ] **Step 11**: Run full verification suite (`validate-i18n`, `check:kpis`, `stylelint`, `vitest`, `astro check`, `astro build`).
