import { definePlugin } from "emdash";

export interface SredsolJsonLdSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  applicationCategory?: string;
  operatingSystem?: string;
  author?: {
    "@type": string;
    name: string;
    url: string;
  };
}

export function generateSoftwareSchema(params: {
  name: string;
  description: string;
  url: string;
  category?: string;
}): SredsolJsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: params.name,
    description: params.description,
    applicationCategory: params.category || "EducationalApplication",
    operatingSystem: "WebBrowser, Cross-platform",
    author: {
      "@type": "Organization",
      name: "SREDSOL",
      url: "https://sredsol.com",
    },
  };
}

export function createPlugin() {
  return definePlugin({
    id: "sredsol-seo",
    version: "1.0.0",
    capabilities: ["content:read"],
  });
}


