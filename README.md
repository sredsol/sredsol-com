# SREDSOL Website — Computational Exploration Gateway

The official web platform and interactive gateway for **[SREDSOL](https://sredsol.com)** (*Technology for Exploration*). SREDSOL creates computational environments, interactive instruments, and intelligent tools for learning, observation, and creation.

Built with **Astro 7 (SSR)**, **EmDash CMS** (SQLite + Cloudflare R2), and a lightweight **Svelte / Threlte / Canvas** interactive simulation layer.

---

## 🧭 Core Domains

| Domain | Focus | Key Exploration Systems |
| :--- | :--- | :--- |
| **COMPUTATION** | Mathematics, simulation, visualization, algorithmic systems, generative models | MathArt, Algorithm Visualizer |
| **PHYSICAL SYSTEMS** | Circuits, robotics, sensors, edge devices, hardware-software bridges | Physical Computing Studio |
| **OBSERVATION** | Data telemetry, scientific experiments, geography, astronomy, time-series streams | Observation Studio, OxiGeo |
| **LEARNING** | Interactive cognitive environments, unified learning spaces | **LearningOS** |

---

## 🏛️ Architecture & Tech Stack

```
Components (src/components/ui/**) → Sections (src/components/sections/**) → Pages (src/pages/**)
```

1. **Presentation Layer (Astro 7 SSR)**:
   - Server-rendered output via `@astrojs/node` standalone adapter.
   - Zero-JS baseline for public content, dynamic OpenGraph generation, semantic HTML, and Pagefind full-text search.
   - Strict design tokens (`src/styles/tokens/`) with Tailwind CSS v4 and monochrome/spatial dark canvas aesthetic.
2. **Knowledge & Content Engine (EmDash CMS)**:
   - Headless CMS backed by SQLite (`better-sqlite3`) with media hosted on Cloudflare R2 via private S3 proxy.
   - Structured collections for research essays (**Thinking**), dynamic pages, and taxonomies rendered via `<PortableText>`.
   - Sandboxed plugin ecosystem (`sredsol-explorations`, `sredsol-seo`, `sredsol-relationships`).
3. **Interactive & Simulation Layer (Svelte / Threlte / Canvas)**:
   - Cursor-reactive Hero node field, telemetry scope gauges, and exploration card micro-scenes.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: `24.x` (LTS) or higher
- **pnpm**: `10.x` or higher

### Local Development

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment (optional locally)
cp .env.example .env

# 3. Start dev server (auto-runs migrations and seeds database)
pnpm dev
```

Then open:
- **Site**: [http://localhost:4321](http://localhost:4321)
- **EmDash Admin**: [http://localhost:4321/_emdash/admin](http://localhost:4321/_emdash/admin)

> On first visit to the admin panel, EmDash guides you through creating the initial owner account. SQLite (`./data/emdash.db`) and local media storage (`./data/uploads`) work out of the box with zero external configuration.

---

## 📁 Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── ui/               # Design system primitives (Button, Badge, ScopeGauge, SignalBadge, NodeIndicator)
│   │   ├── sections/         # High-level page sections (HeroNodeField, DomainGrid, ExplorationsGrid, SystemsLayerDiagram)
│   │   ├── interactive/      # Interactive instruments and preview canvases
│   │   └── layout/           # Header, Footer, Navigation, Container
│   ├── config/
│   │   ├── site.config.ts    # Single source of truth for site metadata & branding
│   │   └── nav.config.ts     # Main navigation & footer structure
│   ├── emdash/               # EmDash CMS plugins & email transports
│   ├── pages/                # Astro routes (/explorations, /technology, /thinking, /company, /lab)
│   ├── styles/               # CSS design tokens, typography, and OKLCH palette
│   └── lib/                  # CMS adapters, exploration metadata, and schema utilities
├── data/                     # Local SQLite database & uploaded media (gitignored)
├── devdocs/                  # Architecture blueprints & transformation documentation
├── scripts/                  # KPI audits, secret validators, and i18n checks
├── seed/                     # Seed collections and initial CMS content
└── system/                   # Canonical design rules (globals/) & verification prompts
```

---

## 🛠️ Development Scripts

| Command | Purpose |
| :--- | :--- |
| `pnpm dev` | Start Astro + EmDash dev server (auto-migrates & seeds DB) |
| `pnpm build` | Production build to `dist/` (Astro SSR Node adapter) |
| `pnpm start` | Run the standalone production Node server (`node ./dist/server/entry.mjs`) |
| `pnpm preview` | Preview the production build locally |
| `pnpm test` | Run unit test suite with Vitest |
| `pnpm test:e2e` | Run end-to-end test suite with Playwright |
| `pnpm lint` | Run full validation suite (JS/TS, CSS, types, KPIs, i18n, secrets) |
| `pnpm run check:kpis` | Verify no off-system styling or hardcoded palette classes |
| `pnpm run type-check` | Validate TypeScript and Astro component types (`astro check`) |
| `pnpm run validate:i18n` | Validate translation key completeness across locales |
| `pnpm run validate:secrets` | Scan codebase for accidental credential leakage |
| `pnpm types:cms` | Regenerate TypeScript definitions for EmDash collections |
| `pnpm export-seed` | Export current SQLite CMS content to `seed/seed.json` |

---

## 🎨 Design Rules & Studio Visual Grammar

All UI development must adhere to the canonical system rules in [`AGENTS.md`](AGENTS.md) and [`system/globals/`](system/globals/):

1. **Tokens Only**: Colors, spacing, typography, and borders must use semantic CSS tokens (`src/styles/tokens/`). Avoid hardcoded hex/rgb and arbitrary palette utility classes.
2. **Dark Mode Integrity**: Dark theme is powered by `.dark` class strategy on `<html>`. Never manually invert colors with ad-hoc conditionals.
3. **Motion & Accessibility**: All animations and canvas interactions must respect `@media (prefers-reduced-motion: reduce)` guards. Interactive controls require visible `--ring` focus rings and descriptive ARIA labels.

---

## 🚢 Deployment

The application is containerized via the included [`Dockerfile`](Dockerfile) and configured for self-hosting on **Dokploy** or any Docker environment with Node 24+:

1. **Persistent Volume**: Mount `/app/data` to persist SQLite database (`emdash.db`) and local files across deployments.
2. **Media Storage**: Set `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, and `S3_SECRET_ACCESS_KEY` to connect Cloudflare R2 for asset storage. Media is served securely via EmDash's same-origin proxy.
3. **Compression**: Enable gzip/Brotli compression at the reverse proxy (Traefik) for optimal Core Web Vitals performance.

Detailed deployment instructions are in [`SETUP.md`](SETUP.md).

---

## 📚 Related Documentation

- [`AGENTS.md`](AGENTS.md) — Comprehensive AI agent instructions, brand grammar, and system constraints
- [`SETUP.md`](SETUP.md) — Environment setup, SQLite persistence, and Dokploy deployment guide
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — Contribution guidelines and conventional commit workflow
- [`devdocs/summary.md`](devdocs/summary.md) — SREDSOL transformation blueprint and architectural strategy
- [`devdocs/idea.md`](devdocs/idea.md) — Core brand philosophy and studio concepts

---

## 📄 License

[MIT](LICENSE) © SREDSOL
