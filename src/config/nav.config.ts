/**
 * Navigation configuration — Centralized navigation structure
 * Defines main navigation links and footer sections
 * Used by Header and Footer components for consistent navigation
 */

export interface NavItem {
  /** Navigation link URL */
  href: string;
  /** Translation key for localized label */
  labelKey: string;
  /** Optional icon name for icon-only navigation items */
  icon?: string;
  /** Whether this is an external link (opens in new tab) */
  external?: boolean;
  /** Sub-navigation items for dropdown menus */
  children?: NavItem[];
}

/** Main navigation items for header */
export const mainNav: NavItem[] = [
  { href: "/explorations", labelKey: "nav.explorations" },
  { href: "/technology", labelKey: "nav.technology" },
  { href: "/thinking", labelKey: "nav.thinking" },
  { href: "/company", labelKey: "nav.company" },
] as const;

/** Footer navigation grouped by section */
export const footerNav = {
  /** SREDSOL exploration systems */
  explorations: [
    { href: "/explorations/learning-os", labelKey: "footer.learningOs" },
    { href: "/explorations/physical-computing", labelKey: "footer.physicalComputing" },
    { href: "/explorations/observation-studio", labelKey: "footer.observationStudio" },
    { href: "/explorations/oxigeo", labelKey: "footer.oxigeo" },
    { href: "/explorations/math-art", labelKey: "footer.mathArt" },
  ] as const,
  /** Product alias for backwards compatibility */
  product: [
    { href: "/explorations", labelKey: "nav.explorations" },
    { href: "/technology", labelKey: "nav.technology" },
  ] as const,
  /** Company & Research links */
  company: [
    { href: "/company", labelKey: "footer.about" },
    { href: "/technology", labelKey: "footer.technology" },
    { href: "/thinking", labelKey: "footer.thinking" },
    { href: "/company#contact", labelKey: "footer.contact" },
  ] as const,
  /** Legal pages and terms */
  legal: [
    { href: "/privacy", labelKey: "footer.privacy" },
    { href: "/terms", labelKey: "footer.terms" },
  ] as const,
  /** Social media and ecosystem links */
  social: [
    {
      href: "https://github.com/sredsol",
      labelKey: "footer.github",
    },
    { href: "https://x.com/sredsol", labelKey: "footer.twitter" },
    {
      href: "https://linkedin.com/company/sredsol",
      labelKey: "footer.linkedin",
    },
    { href: "/lab", labelKey: "footer.lab" },
  ] as const,
} as const;

/** Helper function to get navigation items by section */
export function getFooterNav(section: keyof typeof footerNav): NavItem[] {
  return footerNav[section] as unknown as NavItem[];
}

