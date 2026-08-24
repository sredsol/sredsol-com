## AI Development System — SREDSOL Website

This repository is the official codebase for **SREDSOL** ([sredsol.com](https://sredsol.com)), built to be operated by AI coding agents. Stay **on-system**.

---

### 1. Brand Identity & Purpose

SREDSOL builds computational systems that make exploration possible. The website is **not a generic marketing SaaS landing page**, but an interactive gateway into the computational environments, interactive instruments, and intelligent tools that SREDSOL creates.

* **Core Proposition**: *“Technology for Exploration — We build systems that make exploration possible.”*
* **Core Domains**:
  1. **COMPUTATION**: Mathematics, simulation, visualization, algorithmic systems.
  2. **PHYSICAL SYSTEMS**: Circuits, robotics, sensors, edge devices, hardware-software bridges.
  3. **OBSERVATION**: Data telemetry, scientific experiments, geography, astronomy, time-series streams.
  4. **LEARNING**: Interactive cognitive environments, unified learning spaces, **LearningOS**.
* **Studio Visual Grammar**: Abstract the visual language of SREDSOL Studios (Physical Computing Studio, Observation Studio, LearningOS, OxiGeo, MathArt) into spatial dark canvases, fine grids, node/wire connections, instrument scopes, and telemetry signals.

---

### 2. Three-Tier Architecture & Separation of Concerns

```
Components (src/components/ui/**) → Sections (src/components/sections/**) → Pages (src/pages/**)
```

1. **EmDash CMS**: *What does SREDSOL know?*
   - Manages content intelligence: structured blog/research articles (Thinking), exploration metadata, media on Cloudflare R2, and SQLite database storage.
   - Utilizes Sandboxed Plugins (`sredsol-explorations`, `sredsol-seo`, `sredsol-relationships`) running isolated in `@emdash-cms/sandbox-workerd`.
2. **Astro**: *How does SREDSOL present it?*
   - Server-rendered output (`@astrojs/node` in Docker/Dokploy) with zero-JS baseline for public content.
   - Enforces design tokens, semantic HTML, WCAG AA accessibility, i18n routing, and Pagefind search.
3. **Svelte / Threlte**: *How do visitors experience it?*
   - Powers lightweight, purposeful interactive 3D and canvas scenes in 2–4 designated spots (Hero node field, Exploration card previews, Lab portal).

---

### 3. Canonical Design Knowledge (Must Read Before Editing UI)

- `system/globals/` — Canonical design knowledge (colors, typography, spacing, interaction, imagery, effects, responsiveness, accessibility, components, patterns).
- `devdocs/summary.md` & `devdocs/idea.md` — Detailed transformation blueprint and architectural strategy.
- `src/config/site.config.ts` — Single source of truth for SREDSOL site metadata and branding tokens.
- `src/config/nav.config.ts` — Navigation structure: `Explorations` · `Technology` · `Thinking` · `Company` · `[ ↗ LAB ]`.
- `src/registry.json` — Machine-readable catalog of components, sections, and pages.

---

### 4. Hard Rules (Enforced by CI & Linters)

1. **Tokens Only**: Colors, spacing, typography, and borders come from design tokens only (`src/styles/tokens/`). No hardcoded hex/rgb in markup and **no Tailwind palette utilities** (`bg-blue-500`, `text-zinc-400`). Use semantic tokens (`bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border`).
2. **Dark Mode Integrity**: Dark mode uses the class strategy (`.dark` on `<html>`). Never manually invert colors with ad-hoc conditionals.
3. **Preserve Full System Capabilities**:
   - Multi-language routing (`src/pages/[locale]/` and `src/i18n/`).
   - Server-side rendering (`@astrojs/node`, self-hosted via Docker / Dokploy).
   - Dynamic OpenGraph image generation (`src/pages/og/`).
   - SEO / RSS / Sitemap generation and Pagefind search.
4. **Dynamic CMS Integration**: Blog posts, research notes ("Thinking"), and dynamic pages belong in EmDash collections — do not hardcode copy that belongs in the CMS.
5. **Reduced Motion & Accessibility**: All transitions and interactive animations must be wrapped in `@media (prefers-reduced-motion: reduce)` guards. Interactive controls must have visible `--ring` focus indicators and descriptive ARIA labels.

---

### 5. Verification Checklist (Run Before Completing Any Task)

```bash
pnpm build              # Validates Astro SSR build
pnpm lint               # Runs JS/TS linting, KPI checks, i18n & secret validation
pnpm run check:kpis     # Verifies no off-system styling or hardcoded palette classes
pnpm run lint:css       # Verifies CSS compliance with Stylelint
```

*Self-audit prompts are available in `system/prompts/`.*
