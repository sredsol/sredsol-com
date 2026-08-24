// To add a language: extend this union (e.g. "en" | "id"), add the code to
// SITE_CONFIG.locales, add label/prefix entries below, create a matching
// translations file in src/i18n, and add localized content + [locale] routes.
export type Locale = "en";

export const SITE_CONFIG = {
  url: "https://sredsol.com",
  /** Default locale for fallback. */
  defaultLocale: "en" as const,
  /** Supported locales. */
  locales: ["en"] as const,
  /** Human-readable locale labels. */
  localeLabels: {
    en: "English",
  } as const,
  /** Short locale codes for URL prefixes. */
  localePrefixes: {
    en: "en",
  } as const,
  /** Site name for metadata and JSON-LD. */
  name: "SREDSOL",
  /** Short description for metadata. */
  description:
    "Technology for Exploration — We build computational systems, interactive instruments, and intelligent tools for learning, observation, and creation.",
} as const;

