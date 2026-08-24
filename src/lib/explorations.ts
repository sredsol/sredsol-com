import { getEmDashCollection, getEmDashEntry } from "emdash";
import {
  defaultExplorations,
  type ExplorationRecord,
} from "../emdash/sredsol-explorations";

export type { ExplorationRecord as ExplorationEntry };

const articleTitleMap: Record<string, string> = {
  "from-simulation-to-physical-experiment": "From Simulation to Physical Experiment",
  "why-observation-matters-before-explanation": "Why Observation Matters Before Explanation",
  "building-learningos-offline-first": "Building LearningOS: Offline-First Computation",
  "designing-interactive-computational-environments": "Designing Interactive Computational Environments",
};

export function getRelatedArticleTitle(slug?: string): string {
  if (!slug) return "";
  return articleTitleMap[slug] || "Read Research Paper";
}

function adaptExploration(entry: {
  id: string;
  data?: Record<string, unknown>;
}): ExplorationRecord {
  const d = entry.data || {};
  return {
    id: entry.id,
    slug: String(d.slug || entry.id),
    title: String(d.title || "Untitled Exploration"),
    domain: (d.domain as ExplorationRecord["domain"]) || "computation",
    domainLabel: String(d.domainLabel || "COMPUTATION // 01"),
    status: (d.status as ExplorationRecord["status"]) || "active",
    description: String(d.description || ""),
    actionPipeline: d.actionPipeline ? String(d.actionPipeline) : undefined,
    sceneId: String(d.sceneId || "CIRCUIT-SIM-01"),
    technologies: Array.isArray(d.technologies)
      ? (d.technologies as string[])
      : [],
    featured: Boolean(d.featured),
    order: typeof d.order === "number" ? d.order : 0,
    relatedArticles: Array.isArray(d.relatedArticles)
      ? (d.relatedArticles as string[])
      : [],
    relationships: d.relationships as ExplorationRecord["relationships"],
  };
}

/**
 * Retrieves all explorations, querying EmDash/SQLite if available,
 * and falling back gracefully to the default SREDSOL studio catalog.
 */
export async function getAllExplorations(
  domain?: string,
): Promise<ExplorationRecord[]> {
  try {
    const { entries, error } = await getEmDashCollection("explorations", {
      status: "published",
      limit: 100,
    });
    if (!error && entries && entries.length > 0) {
      const adapted = entries.map((entry) =>
        adaptExploration(entry as { id: string; data?: Record<string, unknown> }),
      );
      return domain
        ? adapted.filter((exp) => exp.domain === domain)
        : adapted.sort((a, b) => a.order - b.order);
    }
  } catch {
    // Graceful fallback to static seed data
  }

  const items = defaultExplorations;
  return domain
    ? items.filter((exp) => exp.domain === domain)
    : [...items].sort((a, b) => a.order - b.order);
}

/**
 * Retrieves featured explorations for the homepage and highlights.
 */
export async function getFeaturedExplorations(
  limit = 4,
): Promise<ExplorationRecord[]> {
  const all = await getAllExplorations();
  return all.filter((exp) => exp.featured).slice(0, limit);
}

/**
 * Retrieves a single exploration by its slug.
 */
export async function getExplorationBySlug(
  slug: string,
): Promise<ExplorationRecord | null> {
  try {
    const { entry } = await getEmDashEntry("explorations", slug);
    if (entry) {
      return adaptExploration(
        entry as { id: string; data?: Record<string, unknown> },
      );
    }
  } catch {
    // Graceful fallback
  }

  const normalizedSlug =
    slug === "physical-computing-studio"
      ? "physical-computing"
      : slug === "oxigeo-mathart"
        ? "oxigeo"
        : slug;

  const found = defaultExplorations.find(
    (exp) => exp.slug === normalizedSlug || exp.slug === slug,
  );
  return found || null;
}
