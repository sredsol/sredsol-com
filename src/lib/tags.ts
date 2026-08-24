import { slugify } from "./utils";

export type TaggedItem =
  | { tags?: string[] | null }
  | { data: { tags?: string[] | null } };

function extractTags(item: TaggedItem): string[] {
  if ("data" in item && item.data && Array.isArray(item.data.tags)) {
    return item.data.tags;
  }
  if ("tags" in item && Array.isArray(item.tags)) {
    return item.tags;
  }
  return [];
}

export function countTags(entries: TaggedItem[]) {
  return entries.reduce<Record<string, number>>((counts, entry) => {
    for (const tag of extractTags(entry)) {
      counts[tag] = (counts[tag] ?? 0) + 1;
    }
    return counts;
  }, {});
}

export function sortTagsByCount(tagCounts: Record<string, number>) {
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function slugifyTag(tag: string) {
  return slugify(tag);
}

export function filterByTag<T extends TaggedItem>(
  entries: T[],
  tag: string,
) {
  return entries.filter((entry) =>
    extractTags(entry).some(
      (entryTag) => slugifyTag(entryTag) === slugifyTag(tag),
    ),
  );
}
