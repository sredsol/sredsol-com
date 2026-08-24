import { defineConfig, envField } from "astro/config";
import node from "@astrojs/node";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import emdash, { local, s3 } from "emdash/astro";
import { sqlite } from "emdash/db";
import { existsSync, readFileSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { join, extname, basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { siteConfig } from "./src/config/site.config";

// Load .env into process.env for local development
if (existsSync("./.env")) {
  try {
    if (typeof process.loadEnvFile === "function") {
      process.loadEnvFile("./.env");
    } else {
      const raw = readFileSync("./.env", "utf8");
      for (const line of raw.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          const val = trimmed.slice(eqIdx + 1).trim();
          if (process.env[key] === undefined) {
            process.env[key] = val;
          }
        }
      }
    }
  } catch {
    // Ignore .env loading errors
  }
}

// Database: SQLite everywhere. Locally this is a file in ./data; on Dokploy the
// same path is backed by a persistent volume (/app/data). Override with DATABASE_URL.
const defaultDbPath =
  process.env.NODE_ENV === "production"
    ? "/app/data/emdash.db"
    : resolve(process.cwd(), "./data/emdash.db");
const databaseUrl = process.env.DATABASE_URL
  ? (process.env.DATABASE_URL.startsWith("file:")
      ? process.env.DATABASE_URL
      : `file:${process.env.DATABASE_URL}`)
  : `file:${defaultDbPath}`;

// Media storage: in production (the Docker/Dokploy image build sets
// NODE_ENV=production) use S3-compatible storage for Cloudflare R2. `s3()`
// resolves every S3_* value from the environment WHEN THE CONTAINER STARTS
// (S3_ENDPOINT, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_REGION,
// S3_PUBLIC_URL), so credentials must NOT be read here — astro.config runs at
// build time, where runtime env vars are absent (reading them here is exactly
// why media previously fell back to local). In local dev it uses the
// filesystem unless S3_BUCKET is present in the shell environment.
const useS3 =
  process.env.NODE_ENV === "production" || Boolean(process.env.S3_BUCKET);
const emdashStorage = useS3
  ? s3({
      endpoint: process.env.S3_ENDPOINT,
      bucket: process.env.S3_BUCKET,
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      region: process.env.S3_REGION || "auto",
    })
  : local({
      directory: "./data/uploads",
      baseUrl: "/_emdash/api/media/file",
    });

// Email provider: always compile the Resend transport into the build. Whether
// it actually registers the email:deliver hook is decided at runtime inside the
// plugin based on RESEND_API_KEY / EMAIL_FROM (see src/emdash/resend-email.ts) —
// this must NOT be gated here, because astro.config runs at build time (in the
// Docker image build) where runtime env vars are not yet present. When the env
// is set, EmDash auto-selects the sole provider; otherwise it falls back to
// copy-link invites (and the dev console in `astro dev`).
const smtpPluginEntry = fileURLToPath(
  new URL("./src/emdash/smtp-email.ts", import.meta.url),
).replace(/\\/g, "/");

const resendPluginEntry = fileURLToPath(
  new URL("./src/emdash/resend-email.ts", import.meta.url),
).replace(/\\/g, "/");

const sredsolExplorationsEntry = fileURLToPath(
  new URL("./src/emdash/sredsol-explorations.ts", import.meta.url),
).replace(/\\/g, "/");

const sredsolSeoEntry = fileURLToPath(
  new URL("./src/emdash/sredsol-seo.ts", import.meta.url),
).replace(/\\/g, "/");

const sredsolRelationshipsEntry = fileURLToPath(
  new URL("./src/emdash/sredsol-relationships.ts", import.meta.url),
).replace(/\\/g, "/");

const emdashPlugins = [
  {
    id: "smtp-email",
    version: "1.0.0",
    capabilities: ["hooks.email-transport:register"],
    entrypoint: smtpPluginEntry,
    preferred: ["email:deliver"],
  },
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


// EmDash sets a strict `connect-src 'self'` CSP on /_emdash routes (prod only)
// with no allowlist option. That blocks the browser from PUTting media to the
// presigned Cloudflare R2 URL, so uploads stay stuck "pending". This integration
// registers an outermost (`order: "pre"`, declared before emdash() below) middleware
// that appends the R2 origin (from S3_ENDPOINT) to connect-src at runtime.
const emdashCspEntry = fileURLToPath(
  new URL("./src/middleware/emdash-csp.ts", import.meta.url),
).replace(/\\/g, "/");

function emdashCspIntegration() {
  return {
    name: "emdash-csp-connect-src",
    hooks: {
      "astro:config:setup": ({
        addMiddleware,
      }: {
        addMiddleware: (params: { entrypoint: string; order: "pre" | "post" }) => void;
      }) => {
        addMiddleware({ entrypoint: emdashCspEntry, order: "pre" });
      },
    },
  };
}

// Sends real security headers (CSP, HSTS, X-Frame-Options, …) on the public
// site. The CSP auto-hashes inline scripts from the emitted HTML so it stays
// strict without `'unsafe-inline'`; `/_emdash` is left to EmDash's own CSP.
// Disable with DISABLE_SECURITY_HEADERS=1. See src/middleware/security-headers.ts.
const securityHeadersEntry = fileURLToPath(
  new URL("./src/middleware/security-headers.ts", import.meta.url),
).replace(/\\/g, "/");

function securityHeadersIntegration() {
  return {
    name: "security-headers",
    hooks: {
      "astro:config:setup": ({
        addMiddleware,
      }: {
        addMiddleware: (params: { entrypoint: string; order: "pre" | "post" }) => void;
      }) => {
        addMiddleware({ entrypoint: securityHeadersEntry, order: "pre" });
      },
    },
  };
}

async function collectFiles(dir: string, extensions: string[]): Promise<string[]> {
  const results: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await collectFiles(path, extensions)));
      continue;
    }

    if (extensions.includes(extname(entry.name))) {
      results.push(path);
    }
  }

  return results;
}

function parseFrontmatter(source: string) {
  const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  return match[1].split(/\r?\n/).reduce<Record<string, string>>((acc, line) => {
    const pair = line.match(/^\s*([A-Za-z0-9_-]+):\s*(.*)\s*$/);
    if (!pair) return acc;
    acc[pair[1]] = pair[2].replace(/^["']|["']$/g, "");
    return acc;
  }, {});
}

function validateDuplicates(entries: Array<{ id: string; data?: { uid?: string; locale?: string } }>, supportedLocales: string[]) {
  const seenIds = new Set<string>();
  const seenUids = new Map<string, string>();

  for (const entry of entries) {
    if (seenIds.has(entry.id)) {
      console.warn(`[content-validation] Duplicate slug detected: "${entry.id}"`);
    } else {
      seenIds.add(entry.id);
    }

    const uid = entry.data?.uid;
    if (uid) {
      const previous = seenUids.get(uid);
      if (previous) {
        console.warn(`[content-validation] Duplicate uid detected: "${uid}" (${previous} and ${entry.id})`);
      } else {
        seenUids.set(uid, entry.id);
      }
    }

    const locale = entry.data?.locale;
    if (locale && !supportedLocales.includes(locale)) {
      console.warn(`[content-validation] Unsupported locale "${locale}" on entry "${entry.id}"`);
    }
  }
}

function contentValidationIntegration() {
  return {
    name: "content-validation",
    hooks: {
      "astro:build:start": async () => {
        const contentBase = join(process.cwd(), "src", "content");
        const collections = [
          { dir: join(contentBase, "blog"), extensions: [".md", ".mdx"] },
          { dir: join(contentBase, "services"), extensions: [".md", ".mdx"] },
          { dir: join(contentBase, "pages"), extensions: [".md"] },
          { dir: join(contentBase, "faqs"), extensions: [".json"] },
          { dir: join(contentBase, "stack"), extensions: [".md", ".mdx"] },
        ];

        const entries = await Promise.all(
          collections.map(async ({ dir, extensions }) =>
            Promise.all(
              (await collectFiles(dir, extensions)).map(async (file) => ({
                id: basename(file).replace(/\.[^/.]+$/, ""),
                data: parseFrontmatter(await readFile(file, "utf8")),
              })),
            ),
          ),
        );

        const supportedLocales = ["en"];
        for (const collection of entries) {
          validateDuplicates(collection, supportedLocales);
        }
      },
    },
  };
}

export default defineConfig({
  site: siteConfig.url,
  // EmDash renders content on demand from the database, so the site runs as a
  // server (Node standalone) rather than a fully static build.
  output: "server",
  adapter: node({ mode: "standalone" }),
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
    prefixDefaultLocale: false,
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    // Registered first so its `pre` middleware is the outermost in the chain and
    // runs its post-next() CSP patch AFTER EmDash's auth middleware sets the CSP.
    emdashCspIntegration(),
    // Public-site security headers (CSP/HSTS/etc.); self-excludes /_emdash.
    securityHeadersIntegration(),
    emdash({
      database: sqlite({ url: databaseUrl }),
      storage: emdashStorage,
      plugins: emdashPlugins,
      sandbox: false,
    }),

    starlight({
      title: siteConfig.name,
      customCss: ["./src/styles/starlight.css"],
      components: {
        SiteTitle: "./src/components/docs/SiteTitle.astro",
      },
      editLink: {
        baseUrl: "https://github.com/sredsol/sredsol-site/edit/main",
      },
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/sredsol" },
      ],

      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Overview", slug: "docs/getting-started/overview" },
            { label: "Quick Start", slug: "docs/getting-started/quick-start" },
            { label: "Project Structure", slug: "docs/getting-started/project-structure" },
          ],
        },
        {
          label: "Guides",
          items: [
            { label: "Content Management", slug: "docs/guides/content-management" },
            { label: "Internationalization", slug: "docs/guides/internationalization" },
            { label: "Customization", slug: "docs/guides/customization" },
            { label: "AI-assisted development", slug: "docs/guides/ai-assisted-development" },
          ],
        },
        {
          label: "Deployment",
          items: [
            { label: "Dokploy (Docker)", slug: "docs/deployment/dokploy" },
            { label: "Environment Variables", slug: "docs/deployment/environment-variables" },
          ],
        },
      ],
    }),
    mdx(),
    contentValidationIntegration(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
        },
      },
    }),
    react(),
    icon(),
  ],
  env: {
    schema: {
      SITE_URL: envField.string({ context: "server", access: "public", default: "http://localhost:4321" }),
      GOOGLE_SITE_VERIFICATION: envField.string({ context: "server", access: "public", optional: true }),
      BING_SITE_VERIFICATION: envField.string({ context: "server", access: "public", optional: true }),
      PUBLIC_GA_MEASUREMENT_ID: envField.string({ context: "client", access: "public", optional: true }),
      PUBLIC_GTM_ID: envField.string({ context: "client", access: "public", optional: true }),
      PUBLIC_CONSENT_ENABLED: envField.boolean({ context: "client", access: "public", optional: true, default: false }),
      PUBLIC_PRIVACY_POLICY_URL: envField.string({ context: "client", access: "public", optional: true }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: "directory",
    // Inline all CSS into the document instead of emitting render-blocking
    // <link rel="stylesheet"> tags. Lighthouse flagged ~350ms of render-blocking
    // CSS (BaseLayout ~53KB + ui + index); inlining removes those blocking
    // round-trips so FCP/Speed-Index improve. The inlined CSS is part of the
    // HTML response, which Traefik gzip/Brotli-compresses (see Dokploy docs), so
    // the first-paint payload stays small.
    inlineStylesheets: "always",
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
  image: {
    layout: "constrained",
  },
  security: {
    checkOrigin: true,
  },
});