# Phase 4 Implementation Plan: Plugins & Interactive Layer

> **Reference Documents:**
> - Strategic Vision: [`devdocs/idea.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/devdocs/idea.md)
> - Architectural Summary: [`devdocs/summary.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/devdocs/summary.md)
> - Phase 1 Foundation: [`devdocs/phase1.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/devdocs/phase1.md)
> - Phase 2 Design Primitives: [`devdocs/phase2.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/devdocs/phase2.md)
> - Phase 3 Page & Section Reconstruction: [`devdocs/phase3.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/devdocs/phase3.md)
> - Canonical System Knowledge: [`system/globals/`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/system/globals/)

---

## 1. Executive Summary & Intent

### The Goal
In **Phase 4**, we implement the **Content Intelligence & Interactive Computation Layer** of the SREDSOL digital platform:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       PHASE 4 ARCHITECTURAL INTEGRATION                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. EMDASH SANDBOXED PLUGINS (src/emdash/)                                  │
│     • sredsol-explorations   — Typed exploration catalog in SQLite/CMS      │
│     • sredsol-seo            — Dynamic JSON-LD schema enrichment            │
│     • sredsol-relationships  — Bidirectional graph linking Thinking & Labs │
│                                │                                            │
│                                ▼                                            │
│  2. CONTENT ACCESS & CMS DATA ACCESS LAYER (src/lib/)                       │
│     • src/lib/explorations.ts — Typed exploration queries with fallbacks    │
│     • src/lib/cms.ts         — Extended to query Thinking & Explorations    │
│                                │                                            │
│                                ▼                                            │
│  3. DYNAMIC CONTENT ROUTING (src/pages/)                                    │
│     • src/pages/thinking/[slug].astro — Full editorial research view        │
│     • ThinkingDigest.astro & /thinking.astro query live CMS database        │
│                                │                                            │
│                                ▼                                            │
│  4. INTERACTIVE COMPUTATIONAL SCENES (Designated Spots)                     │
│     • Interactive Node Field Canvas in Hero (cursor physics & signals)      │
│     • Interactive Waveform Scope in Lab                                     │
│     • Micro-Scene preview renders in Exploration Cards                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. EmDash Sandboxed Plugins Specification

All EmDash plugins are defined using `definePlugin` from `emdash` and registered in `astro.config.ts`.

### 1. `sredsol-explorations` (`src/emdash/sredsol-explorations.ts`)
* **Purpose**: Maintains the structured, database-backed catalog of SREDSOL studios and exploration projects in SQLite.
* **Schema Definition**:
  ```typescript
  export interface ExplorationEntry {
    id: string;
    slug: string;
    title: string;
    domain: "computation" | "physical" | "observation" | "learning";
    domainLabel: string;
    status: "active" | "lab" | "archived";
    description: string;
    sceneId: string;
    technologies: string[];
    featured: boolean;
    order: number;
    relatedArticles?: string[];
  }
  ```
* **Plugin Capabilities**:
  - Registers the `content:schema` and `content:validate` hooks for the `explorations` collection.
  - Exposes typed query helpers for SSR rendering with fallback data for offline development.

---

### 2. `sredsol-seo` (`src/emdash/sredsol-seo.ts`)
* **Purpose**: Enhances page and article metadata with structured JSON-LD schemas:
  - `SoftwareApplication` for SREDSOL Studios (Physical Computing Studio, LearningOS, Observation Studio).
  - `TechArticle` / `ScholarlyArticle` for Thinking research publications.
  - `Organization` with exploration domain mappings.

---

### 3. `sredsol-relationships` (`src/emdash/sredsol-relationships.ts`)
* **Purpose**: Hooks into `content:afterSave` to build bidirectional cross-references between Thinking research essays and active Explorations/Domains.

---

## 3. Interactive Computational Layer (2–4 Designated Spots)

As specified in [`AGENTS.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/AGENTS.md), visitors experience SREDSOL through lightweight, purposeful interactive 2D/3D canvas scenes in designated spots without bloated client bundles:

### 1. Interactive Hero Node Field (`src/components/interactive/NodeCanvas.astro`)
* **Spot**: `<HeroNodeField />` on the homepage.
* **Behavior**:
  - Interactive cursor proximity field: nodes respond subtly to pointer movements.
  - Real-time particle connection wires with animated signal pulses.
  - Automatically respects `@media (prefers-reduced-motion: reduce)` by falling back to static coordinate geometry.

### 2. Interactive Instrument Bench (`src/components/interactive/InstrumentScope.astro`)
* **Spot**: `/lab` and `<ScopeGauge />`.
* **Behavior**:
  - Real-time sine wave and harmonic frequency visualizer with slider controls for frequency (`Hz`) and amplitude (`V`).
  - Pure zero-dependency Canvas API renderer running at smooth 60 FPS.

### 3. Micro-Scene Canvas Previews (`src/components/interactive/StudioPreview.astro`)
* **Spot**: `<ExplorationCard />` preview slots.
* **Behavior**:
  - Visualizes active circuit logic simulation, cognitive state graph, or telemetry topography depending on `sceneId`.

---

## 4. Dynamic Content Routing & CMS Integration

### 1. Dynamic Research Route: `src/pages/thinking/[slug].astro`
* **Layout**: `BlogLayout` with SREDSOL research styling, Table of Contents, Author credentials, Domain tags, and Related Explorations.
* **Rendering**: Queries `getPostEntry(slug)` from `src/lib/cms.ts` and renders Portable Text content with semantic tokens.

### 2. Live CMS Data Access: `src/lib/explorations.ts`
* **Purpose**: Single source of truth for querying explorations from EmDash/SQLite, providing type safety and fallback data.
* **API**:
  - `getAllExplorations(domain?: string)`
  - `getFeaturedExplorations(limit?: number)`
  - `getExplorationBySlug(slug: string)`

### 3. Dynamic Section Updates
* Connect `ThinkingDigest.astro` and `src/pages/thinking.astro` to query live posts via `getAllPosts()` from `src/lib/cms.ts`.
* Connect `ExplorationsGrid.astro` and `src/pages/explorations.astro` to query `getAllExplorations()` from `src/lib/explorations.ts`.

---

## 5. File-by-File Implementation Plan

| File Path | Action | Description |
| :--- | :--- | :--- |
| [`src/emdash/sredsol-explorations.ts`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/emdash/sredsol-explorations.ts) | **NEW** | EmDash plugin for the typed SREDSOL exploration catalog. |
| [`src/emdash/sredsol-seo.ts`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/emdash/sredsol-seo.ts) | **NEW** | EmDash plugin for structured JSON-LD schemas (`SoftwareApplication`, `TechArticle`). |
| [`src/emdash/sredsol-relationships.ts`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/emdash/sredsol-relationships.ts) | **NEW** | EmDash plugin for bidirectional Thinking $\leftrightarrow$ Exploration linking. |
| [`src/lib/explorations.ts`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/lib/explorations.ts) | **NEW** | Typed content helper for SREDSOL exploration queries with fallbacks. |
| [`src/components/interactive/NodeCanvas.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/interactive/NodeCanvas.astro) | **NEW** | Interactive pointer-reactive node field canvas for the hero. |
| [`src/components/interactive/InstrumentScope.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/interactive/InstrumentScope.astro) | **NEW** | Interactive real-time waveform generator for Lab portal. |
| [`src/pages/thinking/[slug].astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/pages/thinking/[slug].astro) | **NEW** | Editorial research essay page rendering CMS Portable Text. |
| [`astro.config.ts`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/astro.config.ts) | **MODIFY** | Register `sredsol-explorations`, `sredsol-seo`, and `sredsol-relationships` in `emdashPlugins`. |
| [`src/components/sections/HeroNodeField.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/sections/HeroNodeField.astro) | **MODIFY** | Mount `NodeCanvas` interactive component. |
| [`src/components/sections/ThinkingDigest.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/sections/ThinkingDigest.astro) | **MODIFY** | Connect to live CMS posts via `getAllPosts()`. |
| [`src/components/sections/ExplorationsGrid.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/components/sections/ExplorationsGrid.astro) | **MODIFY** | Connect to `getAllExplorations()`. |
| [`src/pages/lab.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/pages/lab.astro) | **MODIFY** | Mount interactive `InstrumentScope` with real-time waveform generator. |

---

## 6. Verification & Quality Guardrails

Every new component, plugin, and route must pass the full automated quality suite:

```bash
# 1. I18n translation key integrity
node scripts/validate-i18n.js

# 2. Design token & KPI compliance (0 hardcoded hex or Tailwind palette utilities)
node scripts/check-kpis.mjs

# 3. Stylelint CSS compliance
npx stylelint "src/styles/**/*.css"

# 4. Vitest unit tests
npx vitest run

# 5. TypeScript typecheck across all pages, components, and plugins
ASTRO_TELEMETRY_DISABLED=1 npx astro check

# 6. Full Astro SSR build & Pagefind search index generation
ASTRO_TELEMETRY_DISABLED=1 npx astro build
```

---

## 7. Execution Checklist

- [x] **Step 1**: Implement `src/emdash/sredsol-explorations.ts`.
- [x] **Step 2**: Implement `src/emdash/sredsol-seo.ts`.
- [x] **Step 3**: Implement `src/emdash/sredsol-relationships.ts`.
- [x] **Step 4**: Implement `src/lib/explorations.ts` query layer.
- [x] **Step 5**: Register plugins in `astro.config.ts`.
- [x] **Step 6**: Create interactive `NodeCanvas.astro` and mount in `HeroNodeField.astro`.
- [x] **Step 7**: Create interactive `InstrumentScope.astro` and mount in `src/pages/lab.astro`.
- [x] **Step 8**: Create dynamic `src/pages/thinking/[slug].astro` editorial route.
- [x] **Step 9**: Connect `ThinkingDigest.astro` and `ExplorationsGrid.astro` to live data.
- [x] **Step 10**: Run complete validation suite (`validate-i18n`, `check:kpis`, `stylelint`, `vitest`, `astro check`, `astro build`).

