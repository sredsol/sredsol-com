import { definePlugin } from "emdash";

export interface ContentRelation {
  sourceCollection: string;
  sourceSlug: string;
  targetCollection: string;
  targetSlug: string;
  type: "references" | "implements" | "expands";
}

export const defaultRelationships: ContentRelation[] = [
  {
    sourceCollection: "posts",
    sourceSlug: "why-observation-matters-before-explanation",
    targetCollection: "explorations",
    targetSlug: "learning-os",
    type: "implements",
  },
  {
    sourceCollection: "posts",
    sourceSlug: "designing-interactive-computational-environments",
    targetCollection: "explorations",
    targetSlug: "oxigeo",
    type: "implements",
  },
  {
    sourceCollection: "posts",
    sourceSlug: "designing-interactive-computational-environments",
    targetCollection: "explorations",
    targetSlug: "math-art",
    type: "implements",
  },
  {
    sourceCollection: "posts",
    sourceSlug: "from-simulation-to-physical-experiment",
    targetCollection: "explorations",
    targetSlug: "physical-computing",
    type: "implements",
  },
  {
    sourceCollection: "posts",
    sourceSlug: "from-simulation-to-physical-experiment",
    targetCollection: "explorations",
    targetSlug: "observation-studio",
    type: "implements",
  },
  {
    sourceCollection: "posts",
    sourceSlug: "building-learningos-offline-first",
    targetCollection: "explorations",
    targetSlug: "learning-os",
    type: "implements",
  },
];

export function getRelatedExplorations(articleSlug: string): string[] {
  return defaultRelationships
    .filter(
      (rel) =>
        rel.sourceSlug === articleSlug && rel.targetCollection === "explorations",
    )
    .map((rel) => rel.targetSlug);
}

export function getRelatedArticles(explorationSlug: string): string[] {
  return defaultRelationships
    .filter(
      (rel) =>
        rel.targetSlug === explorationSlug && rel.sourceCollection === "posts",
    )
    .map((rel) => rel.sourceSlug);
}

export function createPlugin() {
  return definePlugin({
    id: "sredsol-relationships",
    version: "1.0.0",
    capabilities: ["content:read", "content:write"],
  });
}


