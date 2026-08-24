# EmDash Plugins & Content Intelligence Guide — SREDSOL

## 1. Overview of EmDash Plugin Architecture

EmDash is a headless, embedded Content Intelligence engine powered by SQLite and Cloudflare R2. In SREDSOL's architecture, EmDash operates as the **Content Intelligence Layer** (*"What does SREDSOL know?"*), running isolated plugins in a secure, sandboxed runtime environment (`@emdash-cms/sandbox-workerd`).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             EMDASH CMS RUNTIME                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  SANDBOXED PLUGINS (src/emdash/)                                            │
│  ├── resend-email.ts          ──► Transactional Email Transport             │
│  ├── sredsol-explorations.ts  ──► Studio Exploration Catalog & Schemas      │
│  ├── sredsol-relationships.ts ──► Bidirectional Content Graph (Essays ↔ Studios) │
│  └── sredsol-seo.ts           ──► Structured JSON-LD (Software & TechArticle)│
│                                │                                            │
│                                ▼                                            │
│  CONTENT QUERY LAYER (src/lib/)                                             │
│  ├── lib/explorations.ts      ──► Typed queries for Studios & Instruments   │
│  └── lib/cms.ts               ──► Query layer for Thinking Research Notes   │
│                                │                                            │
│                                ▼                                            │
│  ASTRO FRONTEND PRESENTATION (src/pages/ & src/components/)                 │
│  ├── /explorations & /thinking/[slug]                                       │
│  └── HeroNodeField, ExplorationCard, ThinkingDigest                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Catalog of SREDSOL Plugins

### 1. `resend-email` (`src/emdash/resend-email.ts`)
* **ID**: `resend-email`
* **Version**: `1.0.0`
* **Capability**: `hooks.email-transport:register`
* **Purpose**: Provides automated transactional email delivery for the EmDash CMS authentication engine (magic login links, user invites, password resets) via Resend's HTTP REST API.
* **Configuration**:
  - `RESEND_API_KEY`: API token from Resend.
  - `EMAIL_FROM`: Verified sender address (e.g. `SREDSOL <noreply@sredsol.com>`).
  - *Fallback*: If environment variables are absent, EmDash automatically falls back to copyable invitation links in the admin UI and development console.

---

### 2. `sredsol-explorations` (`src/emdash/sredsol-explorations.ts`)
* **ID**: `sredsol-explorations`
* **Version**: `1.0.0`
* **Capabilities**: `content:read`, `content:write`
* **Purpose**: Defines the data schema, metadata, and active catalog of SREDSOL computational studios and instruments:
  - `Physical Computing Studio` (`CIRCUIT-SIM-01` // `PHYSICAL SYSTEMS // 02`)
  - `LearningOS` (`COGNITIVE-GRAPH-02` // `LEARNING // 04`)
  - `Observation Studio` (`TELEMETRY-STREAM-03` // `OBSERVATION // 03`)
  - `OxiGeo & MathArt` (`TOPOLOGY-VIZ-04` // `COMPUTATION // 01`)
* **Record Structure**:
  ```typescript
  export interface ExplorationRecord {
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

---

### 3. `sredsol-relationships` (`src/emdash/sredsol-relationships.ts`)
* **ID**: `sredsol-relationships`
* **Version**: `1.0.0`
* **Capabilities**: `content:read`, `content:write`
* **Purpose**: Maintains a bidirectional knowledge graph linking Thinking research essays with active exploration studios.
* **Key Functions**:
  - `getRelatedExplorations(articleSlug: string): string[]` — Finds all studios implemented by a given research note.
  - `getRelatedArticles(explorationSlug: string): string[]` — Finds all research notes documenting a given studio.

---

### 4. `sredsol-seo` (`src/emdash/sredsol-seo.ts`)
* **ID**: `sredsol-seo`
* **Version**: `1.0.0`
* **Capability**: `content:read`
* **Purpose**: Programmatically constructs Google and Schema.org structured JSON-LD specifications for software applications, computational tools, and technical articles.
* **Output Schema**:
  ```typescript
  export interface SredsolJsonLdSchema {
    "@context": "https://schema.org";
    "@type": "SoftwareApplication" | "TechArticle" | "Organization";
    name: string;
    description: string;
    applicationCategory?: string;
    operatingSystem?: string;
    author?: { "@type": "Organization"; name: "SREDSOL"; url: "https://sredsol.com" };
  }
  ```

---

## 3. Plugin Registration & Configuration

Plugins are registered in [`astro.config.ts`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/astro.config.ts) within the `emdash()` integration block:

```typescript
// astro.config.ts
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";
import { createPlugin as resendPluginEntry } from "./src/emdash/resend-email";
import { createPlugin as sredsolExplorationsEntry } from "./src/emdash/sredsol-explorations";
import { createPlugin as sredsolSeoEntry } from "./src/emdash/sredsol-seo";
import { createPlugin as sredsolRelationshipsEntry } from "./src/emdash/sredsol-relationships";

const emdashPlugins = [
  {
    id: "resend-email",
    version: "1.0.0",
    capabilities: ["hooks.email-transport:register"],
    entrypoint: resendPluginEntry,
  },
  {
    id: "sredsol-explorations",
    version: "1.0.0",
    capabilities: ["content:read", "content:write"],
    entrypoint: sredsolExplorationsEntry,
  },
  {
    id: "sredsol-seo",
    version: "1.0.0",
    capabilities: ["content:read"],
    entrypoint: sredsolSeoEntry,
  },
  {
    id: "sredsol-relationships",
    version: "1.0.0",
    capabilities: ["content:read", "content:write"],
    entrypoint: sredsolRelationshipsEntry,
  },
];

export default defineConfig({
  integrations: [
    emdash({
      plugins: emdashPlugins,
    }),
  ],
});
```

---

## 4. How to Use Plugins from the EmDash Admin UI

### Accessing the Dashboard
1. Start the development server:
   ```bash
   pnpm dev
   ```
2. Navigate to:
   ```
   http://localhost:4321/_emdash
   ```

---

### Admin Workflows

#### 1. Managing Research Essays (Thinking)
* **Creating Content**: Click **Posts** $\rightarrow$ **New Post**.
* **Rich Editing**: Author formatted essays with headings, code snippets, inline math, and diagrams using the Portable Text editor.
* **Categorization & Metadata**: Assign domain tags (`COMPUTATION`, `PHYSICAL SYSTEMS`, `OBSERVATION`, `LEARNING`).
* **Cross-Linking**:
  When an article slug matches a registered relationship (e.g. `why-observation-matters-before-explanation`), the system automatically displays the connected **LearningOS** studio card on the article's public research page at `/thinking/[slug]`.

#### 2. Managing Media on Cloudflare R2
* **Uploading Assets**: Go to the **Media** tab to upload circuit schematics, interactive canvas textures, or OpenGraph images.
* **Storage**: Uploaded assets stream directly to your Cloudflare R2 bucket with automated CDN caching.

#### 3. Inviting Collaborators & Team Authentication
* **Sending Invites**: Navigate to **Settings** $\rightarrow$ **Team & Users** $\rightarrow$ **Invite User**.
* **Email Delivery**: The `resend-email` plugin handles delivering the secure invite email. If testing locally without API keys, EmDash displays a direct copyable URL in the console.

---

## 5. Programmatic Query Layer

Astro components and server routes interact with the plugins and CMS through typed query helpers in [`src/lib/`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/lib/):

```typescript
// Querying Exploration Studios
import { getAllExplorations, getFeaturedExplorations, getExplorationBySlug } from "../lib/explorations";

const allStudios = await getAllExplorations();
const featuredStudios = await getFeaturedExplorations();
const learningOS = await getExplorationBySlug("learning-os");
```

```typescript
// Querying Thinking Research Essays
import { getAllPosts, getPostBySlug } from "../lib/cms";

const posts = await getAllPosts();
const currentEssay = await getPostBySlug("from-simulation-to-physical-experiment");
```

```typescript
// Querying Relationship Connections
import { getRelatedExplorations } from "../emdash/sredsol-relationships";

const linkedStudios = getRelatedExplorations("why-observation-matters-before-explanation");
// Returns: ["learning-os"]
```

---

## 6. Creating New EmDash Plugins

To create a new sandboxed plugin:

1. Create a TypeScript file in `src/emdash/my-new-plugin.ts`.
2. Export a `createPlugin()` factory function returning `definePlugin()`:
   ```typescript
   import { definePlugin } from "emdash";

   export function createPlugin() {
     return definePlugin({
       id: "my-new-plugin",
       version: "1.0.0",
       capabilities: ["content:read"],
       // Optional lifecycle hooks or custom handlers
     });
   }
   ```
3. Register the plugin in `astro.config.ts` under `emdashPlugins`.
4. Run verification checks:
   ```bash
   pnpm build
   pnpm check:kpis
   ```
