# SREDSOL Website — Next Phase Implementation Plan & Refinement Blueprint

## 1. Executive Summary & Strategic Context

Based on the **Phase 1 Review (Rating: 8.5/10)** documented in [`devdocs/SREDSOL_Website_Phase1_Review_and_next_Refinement.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/devdocs/SREDSOL_Website_Phase1_Review_and_next_Refinement.md), the core visual direction of SREDSOL is **frozen**:
* Light architectural canvas, fine structural grids, dark instrument previews, restrained typography, and subtle telemetry signals.
* Central Brand Proposition: **“We build systems that make exploration possible.”**

The next phase shifts focus from visual exploration to **semantic content modeling, spatial layout variety, custom email infrastructure, and dynamic CMS data binding**.

---

## 2. Core Taxonomy & Conceptual Model

The site architecture formalizes four foundational content entities:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SREDSOL KNOWLEDGE GRAPH                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  EXPLORATION (Phenomenon / Problem / Scientific Direction)                  │
│  ├── title: "Physical Computing"                                            │
│  ├── domain: "physical"                                                     │
│  └── status: "active"                                                       │
│         ▲                                                                   │
│         │ Implemented by                                                    │
│         ▼                                                                   │
│  STUDIO (Working Environment / Interactive Instrument)                      │
│  ├── title: "Physical Computing Studio"                                     │
│  ├── sceneId: "CIRCUIT-SIM-01"                                              │
│  └── technologies: ["Rust", "WASM", "WebSerial", "I2C"]                     │
│         ▲                                                                   │
│         │ Powered by                                                        │
│         ▼                                                                   │
│  TECHNOLOGY (Execution Kernels & Computational Protocols)                   │
│  └── ["WebAssembly", "Linear Algebra", "SQLite", "Data Shaders"]            │
│         ▲                                                                   │
│         │ Documented in                                                     │
│         ▼                                                                   │
│  THINKING (Research Essays, Architecture Logs & Observations)               │
│  └── "From Simulation to Physical Experiment"                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Work Packages & Implementation Plan

### Work Package 1: Four Pillars Action Framing
**Target File**: [`src/components/sections/DomainGrid.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/sections/DomainGrid.astro)

Refine the four domains into **modes of exploration** with action-oriented tri-verbs:
1. **01 // COMPUTATION**: `Model · Simulate · Calculate`
   - *Scope*: Kernel latency benchmark (`0.42 ms` WASM execution).
2. **02 // PHYSICAL SYSTEMS**: `Build · Connect · Control`
   - *Scope*: I2C / SPI peripheral clock bus (`400 kHz`).
3. **03 // OBSERVATION**: `Measure · Visualize · Interpret`
   - *Scope*: Telemetry stream grid (`16/16 CH` live capture).
4. **04 // LEARNING**: `Explore · Construct · Reflect`
   - *Scope*: Cognitive model calibration (`OPTIMAL`).

---

### Work Package 2: Layout Variety & Spatial Storytelling (Reduce Card Repetition)
**Problem**: Consecutive sections sharing identical 3-column card layouts risk making the site look like a generic SaaS marketing template.

**Solution**: Diversify layout grammars by purpose:
* **Domain Grid**: Compact 4-column instrument console with miniature scope gauges.
* **Explorations Grid**: 2-column featured studio workbench cards with live interactive Canvas 2D previews.
* **Systems Layer Diagram**: Vertical schematic stack with glowing flowchart connectors illustrating the 6-stage computational pipeline:
  $$\text{01 Mathematics} \longrightarrow \text{02 Kernels} \longrightarrow \text{03 Interfaces} \longrightarrow \text{04 Hardware Bridges} \longrightarrow \text{05 Telemetry Streams} \longrightarrow \text{06 LearningOS}$$
* **Thinking Digest**: Clean editorial research publication feed with monospace metadata and domain badges.
* **Lab CTA**: Focused terminal-style gateway establishing the dual paths:
  $$\text{BUILD / EXPLORE (Lab)} \quad \longleftrightarrow \quad \text{THINK / UNDERSTAND (Thinking)}$$

---

### Work Package 3: Custom SMTP Email Transport Plugin
**Target Files**:
* [`src/emdash/smtp-email.ts`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/emdash/smtp-email.ts) [NEW]
* [`astro.config.ts`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/astro.config.ts) [MODIFY]
* [`package.json`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/package.json) [MODIFY]

**Scope**:
1. Install `nodemailer` and `@types/nodemailer`.
2. Implement `smtp-email.ts` with connection pooling, TLS/STARTTLS support, and graceful local development fallback.
3. Replace `resend-email` in `astro.config.ts` so EmDash routes auth invitations and password resets directly to the corporate mail server.

---

### Work Package 4: Dynamic EmDash Data Binding & Content Schema
**Target Files**:
* [`src/lib/explorations.ts`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/lib/explorations.ts)
* [`src/lib/cms.ts`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/lib/cms.ts)
* [`src/emdash/sredsol-relationships.ts`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/emdash/sredsol-relationships.ts)

**Scope**:
1. Enhance query helpers to retrieve linked entities across collections.
2. Ensure `/thinking/[slug]` renders real-time references to related studios.
3. Maintain SQLite local persistence and Cloudflare R2 media uploads for deployment on Dokploy.

---

### Work Package 5: Purposeful Interactive Instruments (Threlte / Canvas Policy)
**Guiding Principle**: *"If an interactive element does not communicate an actual SREDSOL concept, do not add it."*

**Designated Spots**:
1. **Hero Node Field**: Live 2D Canvas constellation with Master Hubs (`01 COMP`, `02 PHYS`, `03 OBS`, `04 LEARN`) and particle interconnects (*Completed & verified*).
2. **Studio Previews**: Micro-scenes for Physical Computing, LearningOS, Observation, and OxiGeo (*Completed & verified*).
3. **Systems Layer Pipeline**: Dynamic data pulse traveling down the 6-stage architecture diagram.
4. **Lab Portal**: Interactive WebGL instrument sandbox on `/lab`.

---

## 4. Implementation Schedule & Checklist

| Step | Work Item | Status |
| :--- | :--- | :--- |
| **1** | Refine 4 Pillars action subtitles (`Model · Simulate · Calculate`, etc.) in `DomainGrid.astro` | Ready |
| **2** | Enhance `SystemsLayerDiagram.astro` with spatial interconnect schematics | Ready |
| **3** | Install `nodemailer` and implement `src/emdash/smtp-email.ts` | Ready |
| **4** | Register `smtp-email` in `astro.config.ts` | Ready |
| **5** | Add unit tests for SMTP transport in `tests/smtp-plugin.test.ts` | Ready |
| **6** | Run full verification suite (`pnpm lint && pnpm check:kpis && pnpm test && pnpm build`) | Ready |

---

## 5. Verification & Quality Gates

Every change in this phase must satisfy the following automated checks:
1. `node scripts/validate-i18n.js` — All UI strings must use dictionary translation keys.
2. `node scripts/check-kpis.mjs` — Zero hardcoded hex colors or Tailwind palette utility classes (`bg-blue-500`, etc.).
3. `npx stylelint "src/styles/**/*.css"` — Full CSS compliance with tokens.
4. `npx vitest run` — All unit tests passing.
5. `ASTRO_TELEMETRY_DISABLED=1 npx astro check` — Zero TypeScript compilation errors.
6. `ASTRO_TELEMETRY_DISABLED=1 npx astro build` — Clean SSR server build and Pagefind search index generation.
