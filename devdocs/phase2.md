# Phase 2 Implementation Plan: SREDSOL Primitives & Studio Design System

> **Reference Documents:**
> - Strategic Vision: [`devdocs/idea.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/devdocs/idea.md)
> - Architectural Summary: [`devdocs/summary.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/devdocs/summary.md)
> - Phase 1 Foundation: [`devdocs/phase1.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/devdocs/phase1.md)
> - Canonical System Knowledge: [`system/globals/`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/system/globals/)

---

## 1. Executive Summary & Design System Intent

### The Vision
In **Phase 2**, we build the foundational design primitives that translate the computational visual grammar of SREDSOL Studios (Physical Computing Studio, Observation Studio, LearningOS, OxiGeo, MathArt) into an on-system, token-governed UI library.

As established in [`devdocs/idea.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/devdocs/idea.md), SREDSOL’s identity originates from the actual software systems it builds. We do not invent generic marketing decoration; we abstract the computational interface elements into web primitives:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STUDIO TO WEBSITE DESIGN VOCABULARY                      │
├──────────────────────────┬──────────────────────────┬───────────────────────┤
│ Studio Concept           │ Website Grammar          │ Primitive Component   │
├──────────────────────────┼──────────────────────────┼───────────────────────┤
│ Dark Canvas & Grid       │ Spatial Backdrop Canvas  │ <GridBackground />    │
│ Concept Node & Vertices  │ Topic & Module Anchors   │ <NodeIndicator />     │
│ Telemetry & State Stream │ Status & Signal Badges   │ <SignalBadge />       │
│ Measurement & Scopes     │ Waveform & Dial Gauges   │ <ScopeGauge />        │
│ Layered Pipeline / Wires │ Architecture Stacks      │ <SystemLayer />       │
│ Studio Application Block │ Exploration Cards        │ <ExplorationCard />   │
└──────────────────────────┴──────────────────────────┴───────────────────────┘
```

---

## 2. Component Taxonomy & Architectural Placement

All new primitives belong to **Tier 1 (Components)** within our three-tier architecture:

```
Components (src/components/ui/**)  →  Sections (src/components/sections/**)  →  Pages (src/pages/**)
```

```
src/components/ui/
├── layout/
│   ├── GridBackground/        # [NEW] Spatial grid canvas with radial vignettes & glow
│   └── SystemLayer/           # [NEW] Pipeline flow and architectural layer progression
├── data-display/
│   ├── NodeIndicator/         # [NEW] Computational concept node with status ring & code
│   ├── SignalBadge/           # [NEW] Live telemetry, protocol & status signal indicator
│   ├── ScopeGauge/            # [NEW] Oscilloscope, waveform, and measurement dial visualizer
│   └── ExplorationCard/       # [NEW] Studio exploration card with scene slot & state
└── index.ts                   # Export barrel for all primitives
```

---

## 3. Detailed Component Specifications

### 1. `GridBackground` (`src/components/ui/layout/GridBackground/GridBackground.astro`)
* **Purpose**: Creates the spatial backdrop that characterizes SREDSOL computational workspaces.
* **Props Interface**:
  ```typescript
  export interface Props {
    variant?: "grid" | "dots" | "crosshairs" | "isometric";
    glow?: boolean;
    glowPosition?: "top" | "center" | "bottom";
    mask?: "radial" | "top" | "bottom" | "none";
    class?: string;
  }
  ```
* **Design & Tokens**:
  - Grid lines use `color-mix(in srgb, var(--foreground) 6%, transparent)`.
  - Dots/crosshairs use `color-mix(in srgb, var(--foreground) 10%, transparent)`.
  - Ambient monochrome spotlight `.bg-glow` with `@media (prefers-reduced-motion: reduce)` guards.
  - Fully `aria-hidden="true"` and `pointer-events: none`.

---

### 2. `NodeIndicator` (`src/components/ui/data-display/NodeIndicator/NodeIndicator.astro`)
* **Purpose**: Represents a computational concept vertex, module anchor, or system node.
* **Props Interface**:
  ```typescript
  export interface Props {
    label: string;
    code?: string; // e.g. "COMP-01", "OBS-04", "MATH-PI"
    domain?: "computation" | "physical" | "observation" | "learning";
    status?: "active" | "lab" | "streaming" | "idle";
    size?: "sm" | "md" | "lg";
    interactive?: boolean;
    class?: string;
  }
  ```
* **Design & Tokens**:
  - Monospace font for `code` (`--font-mono`), semantic `--card` surface, `--border` hairline.
  - Micro-status indicator pip using functional chromatic tokens (`--success` for active, `--info` for streaming, `--warning` for lab).
  - Subtle focus rings (`--ring`) when `interactive` is enabled.

---

### 3. `SignalBadge` (`src/components/ui/data-display/SignalBadge/SignalBadge.astro`)
* **Purpose**: Displays live telemetry states, communication protocols (`I2C`, `SPI`, `WEBSOCKET`, `UART`), and execution indicators.
* **Props Interface**:
  ```typescript
  export interface Props {
    protocol?: string; // e.g. "I2C", "WEBSOCKET", "TELEMETRY"
    status?: "operational" | "streaming" | "calibrating" | "lab" | "offline";
    latency?: string; // e.g. "12ms", "60fps"
    variant?: "pill" | "terminal" | "minimal";
    class?: string;
  }
  ```
* **Design & Tokens**:
  - Monospace typography with tight letter-spacing.
  - Live pulse animation for `streaming` / `operational` statuses, disabled under `prefers-reduced-motion`.
  - Border and surface derived from `--color-bg-secondary` and `--color-border`.

---

### 4. `ScopeGauge` (`src/components/ui/data-display/ScopeGauge/ScopeGauge.astro`)
* **Purpose**: Pure SVG/CSS computational instrument visualizer that simulates oscilloscope waveforms, sensor telemetry dials, or signal frequencies without heavy JavaScript graphing dependencies.
* **Props Interface**:
  ```typescript
  export interface Props {
    variant?: "waveform" | "dial" | "frequency" | "matrix";
    label: string;
    value?: string | number;
    unit?: string; // e.g. "Hz", "V", "FPS", "ms"
    channel?: string; // e.g. "CH-A", "SCOPE-01"
    animated?: boolean;
    class?: string;
  }
  ```
* **Design & Tokens**:
  - Deterministic SVG geometry stroked with `currentColor` / `--color-brand-primary`.
  - Subdued background grid lines inside the scope window.
  - Monospace coordinate readouts with high legibility.

---

### 5. `SystemLayer` (`src/components/ui/layout/SystemLayer/SystemLayer.astro`)
* **Purpose**: Visualizes SREDSOL’s vertical architectural stack: *Mathematics $\rightarrow$ Computation $\rightarrow$ Interactive Systems $\rightarrow$ Physical Systems $\rightarrow$ Observation $\rightarrow$ Learning*.
* **Props Interface**:
  ```typescript
  export interface Props {
    step: number;
    code: string; // e.g. "01 // MATH", "02 // COMP"
    title: string;
    domain: "computation" | "physical" | "observation" | "learning";
    description: string;
    technologies?: string[];
    isLast?: boolean;
    class?: string;
  }
  ```
* **Design & Tokens**:
  - Relational connection wire (vertical SVG/CSS pipeline with node connector).
  - Hover state reveals computational details with smooth CSS transition.

---

### 6. `ExplorationCard` (`src/components/ui/data-display/ExplorationCard/ExplorationCard.astro`)
* **Purpose**: Specialized card primitive for SREDSOL studios and exploration projects (LearningOS, Physical Computing Studio, Observation Studio, OxiGeo, MathArt).
* **Props Interface**:
  ```typescript
  export interface Props {
    title: string;
    slug: string;
    domain: "computation" | "physical" | "observation" | "learning";
    domainLabel: string;
    status: "active" | "lab" | "archived";
    description: string;
    sceneId?: string;
    technologies?: string[];
    href: string;
    class?: string;
  }
  ```
* **Design & Tokens**:
  - Composes the base `Card` primitive.
  - Named slot `preview` for micro-scene or scope preview.
  - Named slot `badge` for domain and status badges.
  - Monospace footer showing system status and hover arrow link (`&rarr;`).

---

## 4. Token & Style Enhancements

### 1. Token Extensions ([`src/styles/tokens/colors.css`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/styles/tokens/colors.css))
* Ensure semantic tokens support telemetry status signals:
  * `--success` (`oklch(0.7 0.15 150deg)` in dark mode): Live streams & operational state.
  * `--info` (`oklch(0.708 0 0deg)`): Neutral telemetry channels.
  * `--warning` (`oklch(0.8 0.15 80deg)`): Experimental Lab states.
* Add scope waveform tokens:
  * `--scope-grid`: `color-mix(in srgb, var(--foreground) 8%, transparent)`.
  * `--scope-trace`: `var(--primary)`.

### 2. Global CSS Additions ([`src/styles/global.css`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/styles/global.css))
* Add `.bg-grid--dots` and `.bg-grid--crosshairs` pattern utilities.
* Add `.waveform-pulse` keyframe animation with reduced-motion fallback.

---

## 5. System Documentation & Registry Updates

1. **Machine-Readable Registry** ([`src/registry.json`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/registry.json)):
   - Register all 6 new primitives with their props and tier assignments.
2. **Canonical Components Knowledge** ([`system/globals/components.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/system/globals/components.md)):
   - Document SREDSOL studio primitives under the Tier 1 table.
3. **Canonical Patterns Knowledge** ([`system/globals/patterns.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/system/globals/patterns.md)):
   - Add recipes for Scope Scope Window, Node Graph Vertex, and Architecture Layer Connectors.

---

## 6. Detailed File-by-File Implementation Plan

| File Path | Action | Description & Rationale |
| :--- | :--- | :--- |
| [`src/components/ui/layout/GridBackground/GridBackground.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/ui/layout/GridBackground/GridBackground.astro) | **NEW** | Spatial grid canvas backdrop with dots, crosshairs, and vignette options. |
| [`src/components/ui/data-display/NodeIndicator/NodeIndicator.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/ui/data-display/NodeIndicator/NodeIndicator.astro) | **NEW** | Computational concept node with status ring, domain pill, and code prefix. |
| [`src/components/ui/data-display/SignalBadge/SignalBadge.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/ui/data-display/SignalBadge/SignalBadge.astro) | **NEW** | Telemetry protocol and live signal status badge. |
| [`src/components/ui/data-display/ScopeGauge/ScopeGauge.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/ui/data-display/ScopeGauge/ScopeGauge.astro) | **NEW** | Oscilloscope waveform and dial gauge measurement component. |
| [`src/components/ui/layout/SystemLayer/SystemLayer.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/ui/layout/SystemLayer/SystemLayer.astro) | **NEW** | Architecture stack step with vertical connector wire. |
| [`src/components/ui/data-display/ExplorationCard/ExplorationCard.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/ui/data-display/ExplorationCard/ExplorationCard.astro) | **NEW** | Studio exploration card primitive with scene preview slot. |
| [`src/components/ui/index.ts`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/ui/index.ts) | **MODIFY** | Re-export all new primitives from the UI barrel. |
| [`src/styles/global.css`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/styles/global.css) | **MODIFY** | Add studio grid patterns, scope canvas utilities, and waveform animations. |
| [`src/registry.json`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/registry.json) | **MODIFY** | Register new components in the catalog. |
| [`system/globals/components.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/system/globals/components.md) | **MODIFY** | Update canonical component guide with SREDSOL primitives. |
| [`system/globals/patterns.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/system/globals/patterns.md) | **MODIFY** | Add recipes for studio scopes, node vertices, and pipeline wires. |

---

## 7. Verification & Quality Guardrails

Every new component must pass all automated verification checks:

```bash
# 1. KPI & Design Token verification (ensures zero hardcoded hex or Tailwind palette utilities)
node scripts/check-kpis.mjs

# 2. Stylelint CSS token checking
npx stylelint "src/styles/**/*.css"

# 3. Vitest unit tests
npx vitest run

# 4. TypeScript type-checking across all components
ASTRO_TELEMETRY_DISABLED=1 npx astro check

# 5. Full Astro build validation
ASTRO_TELEMETRY_DISABLED=1 npx astro build
```

---

## 8. Execution Checklist

- [ ] **Step 1**: Create `GridBackground.astro` with grid, dots, and crosshair variants.
- [ ] **Step 2**: Create `NodeIndicator.astro` with computational domain and status indicators.
- [ ] **Step 3**: Create `SignalBadge.astro` with live telemetry indicator and protocol tags.
- [ ] **Step 4**: Create `ScopeGauge.astro` with SVG oscilloscope waveform and measurement dials.
- [ ] **Step 5**: Create `SystemLayer.astro` with pipeline connector wires.
- [ ] **Step 6**: Create `ExplorationCard.astro` for SREDSOL studio showcases.
- [ ] **Step 7**: Update `src/components/ui/index.ts` barrel exports.
- [ ] **Step 8**: Add spatial grid and waveform utilities to `src/styles/global.css`.
- [ ] **Step 9**: Update `src/registry.json`, `system/globals/components.md`, and `system/globals/patterns.md`.
- [ ] **Step 10**: Run complete validation suite (`check:kpis`, `stylelint`, `vitest`, `astro check`, `astro build`).
