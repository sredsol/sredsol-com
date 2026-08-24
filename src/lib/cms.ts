/**
 * EmDash content access layer.
 *
 * The marketing/blog UI components were written against Astro content
 * collections (`CollectionEntry<"blog">` / `CollectionEntry<"pages">`). EmDash
 * is now the source of truth, so these helpers query EmDash live collections at
 * request time and adapt each entry into the shape those components already
 * expect. This keeps the presentation layer untouched while swapping the data
 * source from Markdown-in-Git to the CMS database.
 */
import { getEmDashCollection, getEmDashEntry, extractPlainText } from "emdash";
import type { CollectionEntry } from "astro:content";
import { slugify } from "./utils";

export type PortableBlock = Record<string, unknown>;

export interface PostHeading {
  depth: number;
  slug: string;
  text: string;
}

interface RawEntry {
  id: string;
  data: Record<string, unknown>;
}

function toDate(value: unknown): Date {
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return new Date(0);
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function blockText(block: PortableBlock): string {
  const children = (block as { children?: Array<{ text?: unknown }> }).children;
  if (!Array.isArray(children)) return "";
  return children
    .map((child) => (typeof child?.text === "string" ? child.text : ""))
    .join("");
}

function asPortableBlocks(value: unknown): PortableBlock[] {
  return Array.isArray(value) ? (value as PortableBlock[]) : [];
}

/** Derive a table-of-contents heading list from Portable Text blocks. */
export function extractHeadings(blocks: PortableBlock[]): PostHeading[] {
  const headings: PostHeading[] = [];
  for (const block of blocks) {
    if ((block as { _type?: string })._type !== "block") continue;
    const style = (block as { style?: string }).style;
    if (!style || !/^h[1-6]$/.test(style)) continue;
    const text = blockText(block).trim();
    if (!text) continue;
    headings.push({ depth: Number(style.slice(1)), slug: slugify(text), text });
  }
  return headings;
}

/** Slug/anchor id for a Portable Text heading block (matches extractHeadings). */
export function headingId(block: PortableBlock): string {
  return slugify(blockText(block).trim());
}

function adaptPost(entry: RawEntry): CollectionEntry<"blog"> {
  const d = entry.data ?? {};
  const content = d.content;
  const body =
    typeof content === "string"
      ? content
      : extractPlainText(asPortableBlocks(content) as never);

  return {
    id: entry.id,
    collection: "blog",
    body,
    data: {
      title: asString(d.title),
      description: asString(d.description),
      locale: "en",
      publishDate: toDate(d.publish_date),
      updatedAt: d.updatedAt ? toDate(d.updatedAt) : undefined,
      draft: false,
      featured: Boolean(d.featured),
      tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
      author: asString(d.author, "Admin"),
      svgSlug: typeof d.svg_slug === "string" ? d.svg_slug : undefined,
      faqs: Array.isArray(d.faqs)
        ? (d.faqs as { question: string; answer: string }[])
        : undefined,
    },
  } as unknown as CollectionEntry<"blog">;
}

const defaultThinkingPosts: RawEntry[] = [
  {
    id: "why-observation-matters-before-explanation",
    data: {
      title: "Why Observation Matters Before Explanation",
      description:
        "How direct physical and visual interaction with dynamic systems accelerates genuine comprehension far beyond text-first pedagogy.",
      publish_date: "2026-03-15T00:00:00.000Z",
      author: "SREDSOL Research",
      featured: true,
      tags: ["LEARNING", "PEDAGOGY", "EXPERIMENTATION"],
      content: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              text: "Traditional pedagogy often introduces formal mathematical definitions and abstract theorems before students have ever touched or observed the underlying phenomenon. At SREDSOL, our research suggests that genuine comprehension is accelerated when explorers first manipulate the system directly.",
            },
          ],
        },
        {
          _type: "block",
          style: "h2",
          children: [{ text: "The Gap Between Definition and Intuition" }],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              text: "When learners are given an interactive canvas where variables can be scrubbed in real-time, mathematical relationships transform from arbitrary rules into dynamic physical behaviors.",
            },
          ],
        },
        {
          _type: "block",
          style: "h2",
          children: [{ text: "Designing Exploratory Systems" }],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              text: "By pairing live oscilloscope gauges, sensory feedback loops, and visual simulation canvases, we build tools that invite continuous experimentation and cognitive self-correction.",
            },
          ],
        },
      ],
    },
  },
  {
    id: "designing-interactive-computational-environments",
    data: {
      title: "Designing Interactive Computational Environments",
      description:
        "Constructivist principles for building sovereign, local-first exploratory workspaces and cognitive tools.",
      publish_date: "2026-02-28T00:00:00.000Z",
      author: "SREDSOL Research",
      featured: true,
      tags: ["COMPUTATION", "LOCAL-FIRST", "WORKBENCH"],
      content: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              text: "Computers are not merely delivery devices for documents; they are dynamic computational media for constructing mental models.",
            },
          ],
        },
        {
          _type: "block",
          style: "h2",
          children: [{ text: "Local-First Computational Sovereignty" }],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              text: "A research environment must operate offline-first with zero latency. When computation lives on the client in WebAssembly and embedded SQLite, exploration is unbounded by network availability.",
            },
          ],
        },
      ],
    },
  },
  {
    id: "from-simulation-to-physical-experiment",
    data: {
      title: "From Simulation to Physical Experiment",
      description:
        "Bridging the gap between mathematical model spaces, sensor telemetry, and tangible microelectronic hardware.",
      publish_date: "2026-02-10T00:00:00.000Z",
      author: "SREDSOL Research",
      featured: false,
      tags: ["PHYSICAL-SYSTEMS", "TELEMETRY", "EMBEDDED"],
      content: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              text: "Simulations provide mathematical clarity, but physical experiments reveal the friction of reality. Our Physical Computing Studio creates bidirectional bridges between circuit models and real microcontrollers.",
            },
          ],
        },
        {
          _type: "block",
          style: "h2",
          children: [{ text: "Real-Time Telemetry Streaming" }],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              text: "By streaming I2C and WebSerial sensor feeds directly into the browser canvas, engineers can inspect physical circuit behavior alongside theoretical calculations.",
            },
          ],
        },
      ],
    },
  },
  {
    id: "building-learningos-offline-first",
    data: {
      title: "Building LearningOS: Offline-First Exploratory Computation",
      description:
        "Architecting a zero-latency canvas and embedded SQLite kernel for exploratory thinking.",
      publish_date: "2026-01-22T00:00:00.000Z",
      author: "SREDSOL Research",
      featured: false,
      tags: ["LEARNING-OS", "SQLITE", "CANVAS"],
      content: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              text: "LearningOS is engineered as a unified cognitive workbench. This article explores how we structured the local data schema, spatial canvas renderer, and node execution graph.",
            },
          ],
        },
        {
          _type: "block",
          style: "h2",
          children: [{ text: "Embedded State Engine" }],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              text: "Using client-side SQLite and lightweight reactive signals, LearningOS enables explorers to fork, snapshot, and reconstruct complex simulation states instantly.",
            },
          ],
        },
      ],
    },
  },
];

/** Published blog posts, newest first. */
export async function getAllPosts(): Promise<CollectionEntry<"blog">[]> {
  try {
    const { entries, error } = await getEmDashCollection("posts", {
      status: "published",
      limit: 500,
    });
    if (!error && entries && entries.length > 0) {
      return entries
        .map((entry) => adaptPost(entry as RawEntry))
        .sort(
          (a, b) =>
            new Date(b.data.publishDate).getTime() -
            new Date(a.data.publishDate).getTime(),
        );
    }
  } catch {
    // Fallback to default posts
  }

  return defaultThinkingPosts
    .map((entry) => adaptPost(entry))
    .sort(
      (a, b) =>
        new Date(b.data.publishDate).getTime() -
        new Date(a.data.publishDate).getTime(),
    );
}

export interface PostDetail {
  post: CollectionEntry<"blog">;
  content: PortableBlock[];
  headings: PostHeading[];
}

/** A single published post plus its Portable Text body and headings. */
export async function getPostEntry(slug: string): Promise<PostDetail | null> {
  try {
    const { entry } = await getEmDashEntry("posts", slug);
    if (entry) {
      const raw = entry as RawEntry;
      const content = asPortableBlocks(raw.data?.content);
      return {
        post: adaptPost(raw),
        content,
        headings: extractHeadings(content),
      };
    }
  } catch {
    // Fallback
  }

  const fallback = defaultThinkingPosts.find((p) => p.id === slug);
  if (fallback) {
    const content = asPortableBlocks(fallback.data.content);
    return {
      post: adaptPost(fallback),
      content,
      headings: extractHeadings(content),
    };
  }

  return null;
}


export interface CmsFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface CmsPage {
  id: string;
  data: {
    slug: string;
    title: string;
    description?: string;
    hero: { title?: string; subtitle?: string } | null;
    featuresTitle?: string;
    features: CmsFeature[];
    cta: {
      title?: string;
      text?: string;
      button?: string;
      href?: string;
    } | null;
    isLegal: boolean;
  };
  content: PortableBlock[];
}

function adaptPage(entry: RawEntry): CmsPage {
  const d = entry.data ?? {};

  const heroTitle = asString(d.hero_title);
  const heroSubtitle = asString(d.hero_subtitle);
  const hero =
    heroTitle || heroSubtitle
      ? { title: heroTitle || undefined, subtitle: heroSubtitle || undefined }
      : null;

  const features: CmsFeature[] = Array.isArray(d.features)
    ? (d.features as Record<string, unknown>[]).map((f) => ({
        title: asString(f.title),
        description: asString(f.description),
        icon: typeof f.icon === "string" && f.icon ? f.icon : undefined,
      }))
    : [];

  const ctaTitle = asString(d.cta_title);
  const ctaText = asString(d.cta_text);
  const ctaButton = asString(d.cta_button);
  const ctaHref = asString(d.cta_href);
  const cta =
    ctaTitle || ctaText || ctaButton || ctaHref
      ? {
          title: ctaTitle || undefined,
          text: ctaText || undefined,
          button: ctaButton || undefined,
          href: ctaHref || undefined,
        }
      : null;

  return {
    id: entry.id,
    data: {
      slug: asString(d.slug, entry.id),
      title: asString(d.title),
      description:
        typeof d.description === "string" ? d.description : undefined,
      hero,
      featuresTitle: asString(d.features_title) || undefined,
      features,
      cta,
      isLegal: Boolean(d.is_legal),
    },
    content: asPortableBlocks(d.content),
  };
}

/** A single published page by slug. */
export async function getPage(slug: string): Promise<CmsPage | null> {
  const { entry } = await getEmDashEntry("pages", slug);
  if (!entry) return null;
  return adaptPage(entry as RawEntry);
}

/** All published pages. */
export async function getAllPages(): Promise<CmsPage[]> {
  const { entries, error } = await getEmDashCollection("pages", {
    status: "published",
    limit: 500,
  });
  if (error) console.warn(`[cms] getAllPages: ${error.message}`);
  return entries.map((entry) => adaptPage(entry as RawEntry));
}
