#!/usr/bin/env node
/**
 * Regenerate README.md platform tables from Uwarp LaunchHub export JSON.
 * Usage: node scripts/sync-from-launch.mjs [path-to-launch-platforms.json]
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const TIER_ORDER = { A: 0, B: 1, C: 2, D: 3 };

const README_PATH = resolve(process.cwd(), "README.md");

function loadPlatforms(jsonPath) {
  const raw = readFileSync(jsonPath, "utf8");
  if (!raw.trim()) {
    throw new Error("JSON file is empty");
  }
  const data = JSON.parse(raw);
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.platforms)) return data.platforms;
  if (data.data && Array.isArray(data.data.platforms)) return data.data.platforms;
  throw new Error("Unrecognized JSON shape: expected array or { platforms: [] }");
}

function formatUnit(num, suffix) {
  const rounded = num >= 10 ? Math.round(num) : Math.round(num * 10) / 10;
  const text = Number.isInteger(rounded) ? String(rounded) : String(rounded);
  return `${text}${suffix}`;
}

function formatMonthlyPv(value) {
  if (value == null || value === "") return "—";
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return "—";
  if (n >= 1e9) return formatUnit(n / 1e9, "B");
  if (n >= 1e6) return formatUnit(n / 1e6, "M");
  if (n >= 1e3) return formatUnit(n / 1e3, "K");
  return String(Math.round(n));
}

function formatBool(value) {
  if (value === true || value === "true" || value === "yes" || value === "Yes") {
    return "Yes";
  }
  return "No";
}

function formatDofollow(platform) {
  if (platform.dofollowLabel != null && String(platform.dofollowLabel).trim() !== "") {
    return String(platform.dofollowLabel).trim();
  }
  const status = platform.dofollowStatus;
  if (status == null || status === "") return "?";
  const s = String(status).toLowerCase();
  if (s === "yes" || s === "dofollow") return "Yes";
  if (s === "nofollow" || s === "no") return "Nofollow";
  if (s === "conditional") return "Conditional";
  if (s === "unknown" || s === "?") return "?";
  return String(platform.dofollowStatus);
}

function formatWait(value) {
  if (value == null || value === "") return "—";
  return String(value).trim();
}

function normalizePricing(value) {
  const p = String(value ?? "").trim().toLowerCase();
  if (p === "free") return "Free";
  if (p === "freemium") return "Freemium";
  return String(value ?? "").trim();
}

function escapeCell(text) {
  return String(text).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function platformRow(platform) {
  const name = platform.name ?? "Unknown";
  const siteUrl = platform.siteUrl || platform.submitUrl || "#";
  const submitUrl = platform.submitUrl || platform.siteUrl || "#";
  const dr =
    platform.dr != null && platform.dr !== ""
      ? String(platform.dr)
      : "—";

  const cells = [
    `[${name}](${siteUrl})`,
    platform.category ?? "—",
    dr,
    formatMonthlyPv(platform.monthlyPv),
    platform.qualityTier ?? "—",
    normalizePricing(platform.pricing),
    formatDofollow(platform),
    formatBool(platform.badgeRequired),
    formatBool(platform.upvotesRequired),
    formatWait(platform.freeReviewWaitTime),
    `[Submit](${submitUrl})`,
  ].map(escapeCell);

  return `| ${cells.join(" | ")} |`;
}

function sortPlatforms(list) {
  return [...list].sort((a, b) => {
    const tierA = TIER_ORDER[String(a.qualityTier ?? "").toUpperCase()] ?? 99;
    const tierB = TIER_ORDER[String(b.qualityTier ?? "").toUpperCase()] ?? 99;
    if (tierA !== tierB) return tierA - tierB;
    const drA = Number(a.dr) || 0;
    const drB = Number(b.dr) || 0;
    return drB - drA;
  });
}

function filterByPricing(platforms, pricing) {
  return platforms.filter(
    (p) => normalizePricing(p.pricing).toLowerCase() === pricing.toLowerCase(),
  );
}

function renderTable(platforms) {
  const header =
    "| Platform | Category | DR | Est. Monthly PV | Quality | Pricing | Dofollow | Badge | Upvotes | Free Wait | Submit |";
  const separator =
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |";
  const rows = sortPlatforms(platforms).map(platformRow);
  return [header, separator, ...rows].join("\n");
}

function buildReadme(freePlatforms, freemiumPlatforms) {
  const freeCount = freePlatforms.length;
  const freemiumCount = freemiumPlatforms.length;

  return `# Free Backlink Sources for SEO (Product Launch Platforms & Directories)

A curated list of **free backlink sources** and **product launch platforms** for indie makers, startups, and SaaS founders. Use these directories to earn SEO backlinks, get early users, and launch your product.

## Live directory (my site)

Browse and track submissions here: **[https://www.uwarp.design/launch](https://www.uwarp.design/launch)** — LaunchHub on Uwarp Design (the interactive directory this list is based on).

## Why this list?

- **SEO backlinks** from directories and launch sites (check dofollow status per platform)
- **Free / freemium** submission paths — no paid placement required to start
- Sorted by **quality tier** (A best), then domain rating (DR)
- Covers Product Hunt, Hacker News, SaaS directories, AI tool directories, GitHub awesome lists, social posts, and more
- Full interactive directory: [https://www.uwarp.design/launch](https://www.uwarp.design/launch)

## Quick start

1. Open **[https://www.uwarp.design/launch](https://www.uwarp.design/launch)** to browse & track submissions
2. Start with **Tier A** free platforms (highest DR / traffic)
3. Prepare tagline, description, logo, and screenshots
4. Submit via each platform’s submit link
5. Track dofollow / badge / upvote requirements before you publish

## Maintaining this list

Platform tables are regenerated weekly from the public export at [launch-platforms.json](https://www.uwarp.design/launch-platforms.json) (workflow: \`.github/workflows/sync-from-launch.yml\`). The export must be deployed at that URL before the first successful sync; until then, this README reflects the last successful run or a manual snapshot.

## Free backlink sources (${freeCount})

${renderTable(freePlatforms)}

## Freemium platforms with free tiers (${freemiumCount})

These offer a free submission path with optional paid upgrades.

${renderTable(freemiumPlatforms)}

## Quality tiers

| Tier | Meaning |
| --- | --- |
| **A** | Established launch platforms and high-authority directories |
| **B** | Niche directories with moderate SEO / traffic value |
| **C** | Smaller or conditional listings |
| **D** | Generic web directories |

## Notes on dofollow & SEO

- **Dofollow \`?\`** — confirm on the live listing after approval
- **Conditional** — may require badge, upvotes, or post-publish verification
- **Nofollow** — still useful for referral traffic and brand discovery
- Always verify current link attributes on the published page

## Keywords

\`free backlinks\` · \`SEO backlink sources\` · \`product launch platforms\` · \`startup directories\` · \`SaaS directories\` · \`AI tool directories\` · \`indie maker launch list\` · \`GitHub awesome lists\`

## Credit

Source & live tool: **[https://www.uwarp.design/launch](https://www.uwarp.design/launch)** (LaunchHub — added by [Uwarp Design](https://www.uwarp.design)).
`;
}

function main() {
  const jsonPath = resolve(process.argv[2] ?? "launch-platforms.json");
  const platforms = loadPlatforms(jsonPath);
  const freePlatforms = filterByPricing(platforms, "free");
  const freemiumPlatforms = filterByPricing(platforms, "freemium");

  if (freePlatforms.length === 0 && freemiumPlatforms.length === 0) {
    throw new Error("No Free or Freemium platforms found in JSON");
  }

  const readme = buildReadme(freePlatforms, freemiumPlatforms);
  writeFileSync(README_PATH, readme, "utf8");
  console.log(
    `Wrote README.md (${freePlatforms.length} free, ${freemiumPlatforms.length} freemium platforms)`,
  );
}

main();
