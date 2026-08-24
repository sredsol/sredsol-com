import sharp from "sharp";
import { siteConfig } from "../config/site.config";

export interface BuildOGOptions {
  title: string;
  description?: string;
  siteName: string;
  bgColor?: string;
  textColor?: string;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function truncate(value: string, limit = 120) {
  return value.length > limit
    ? `${value.slice(0, limit - 1).trimEnd()}…`
    : value;
}

export function buildOGSVG({
  title,
  description = siteConfig.description,
  siteName = siteConfig.name,
  bgColor = "#0d0d0d",
  textColor = "#f5f5f5",
}: BuildOGOptions) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgColor}" />
      <stop offset="100%" stop-color="#171717" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#grid)" />
  <circle cx="1020" cy="140" r="220" fill="rgba(255,255,255,0.03)" />
  <circle cx="1120" cy="540" r="260" fill="rgba(255,255,255,0.02)" />
  
  <!-- SREDSOL Badge Header -->
  <g transform="translate(80, 80)">
    <rect width="36" height="36" rx="6" fill="#262626" stroke="#404040" stroke-width="1"/>
    <text x="18" y="24" fill="#ffffff" font-size="16" font-family="JetBrains Mono, monospace" font-weight="700" text-anchor="middle">S</text>
    <text x="50" y="24" fill="rgba(255,255,255,0.92)" font-size="22" font-family="Outfit, Arial, sans-serif" font-weight="700" letter-spacing="1">${escapeXml(siteName)}</text>
    <text x="160" y="24" fill="rgba(255,255,255,0.4)" font-size="14" font-family="JetBrains Mono, monospace">// TECHNOLOGY FOR EXPLORATION</text>
  </g>
  
  <!-- Title & Description -->
  <text x="80" y="260" fill="${textColor}" font-size="56" font-family="Outfit, Arial, sans-serif" font-weight="800">${escapeXml(truncate(title, 70))}</text>
  <text x="80" y="340" fill="rgba(255,255,255,0.72)" font-size="24" font-family="Manrope, Arial, sans-serif" font-weight="400" line-height="1.5">${escapeXml(truncate(description, 130))}</text>
  
  <!-- Bottom bar -->
  <line x1="80" y1="500" x2="1120" y2="500" stroke="#333333" stroke-width="1" />
  <text x="80" y="545" fill="rgba(255,255,255,0.5)" font-size="16" font-family="JetBrains Mono, monospace">${escapeXml(siteConfig.url.replace(/^https?:\/\//, ""))}</text>
  <text x="1120" y="545" fill="rgba(255,255,255,0.4)" font-size="14" font-family="JetBrains Mono, monospace" text-anchor="end">SYSTEM STATUS: OPERATIONAL</text>
</svg>`;
}


export async function renderOGImage(svg: string) {
  return sharp(Buffer.from(svg)).png().toBuffer();
}

export async function buildOGResponse(svg: string) {
  const png = await renderOGImage(svg);
  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
