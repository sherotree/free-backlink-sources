#!/usr/bin/env node
/**
 * Regenerate README.md platform tables from the Uwarp LaunchHub export.
 * Usage: node scripts/sync-from-launch.mjs [path-to-launch-platforms.json]
 *
 * Column layout and sort live here so the weekly workflow stays in sync.
 * Score matches LaunchHub:
 *   round((0.5 × DR/100 × follow + 0.5 × clamp(log10(visits+1)/7)) × 100)
 * Follow weights the DR half only: dofollow 1, conditional/unknown/nofollow 0.3.
 * Sort is quality tier (only if the export still sends qualityTier), then score, then DR.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const TIER_ORDER = { A: 0, B: 1, C: 2, D: 3 };
const FOLLOW_WEIGHT = { yes: 1, conditional: 0.3, unknown: 0.3, no: 0.3 };
const LOW_SCORE = 20;
const CATEGORY_ACRONYMS = { ai: "AI", saas: "SaaS", seo: "SEO", ux: "UX", ui: "UI" };

const README_PATH = resolve(process.cwd(), "README.md");
const EXPORT_URL = "https://www.uwarp.design/launch-platforms.json";
const LAUNCH_URL = "https://www.uwarp.design/launch";

function loadExport(jsonPath) {
  const raw = readFileSync(jsonPath, "utf8");
  if (!raw.trim()) {
    throw new Error("JSON file is empty");
  }
  const data = JSON.parse(raw);
  if (Array.isArray(data)) {
    return { platforms: data, generatedAt: null, platformCount: data.length };
  }
  if (Array.isArray(data.platforms)) {
    return {
      platforms: data.platforms,
      generatedAt: data.generatedAt ?? null,
      platformCount: data.platformCount ?? data.platforms.length,
    };
  }
  if (data.data && Array.isArray(data.data.platforms)) {
    return {
      platforms: data.data.platforms,
      generatedAt: data.generatedAt ?? data.data.generatedAt ?? null,
      platformCount: data.platformCount ?? data.data.platforms.length,
    };
  }
  throw new Error("Unrecognized JSON shape: expected array or { platforms: [] }");
}

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function qualityScore(platform) {
  const dr = clamp01((Number(platform.dr) || 0) / 100);
  const visits = Number(platform.monthlyPv) || 0;
  const traffic = clamp01(Math.log10(visits + 1) / 7);
  const status = String(platform.dofollowStatus ?? "unknown").toLowerCase();
  const follow = FOLLOW_WEIGHT[status] ?? FOLLOW_WEIGHT.unknown;
  return Math.round(100 * clamp01(0.5 * dr * follow + 0.5 * traffic));
}

function formatMonthlyPv(value) {
  if (value == null || value === "") return "—";
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return "—";
  if (n >= 1e6) {
    const millions = n / 1e6;
    return n >= 1e7 ? `${Math.round(millions)}M` : `${millions.toFixed(1)}M`;
  }
  if (n >= 1e3) return `${Math.round(n / 1e3)}K`;
  return Math.round(n).toLocaleString("en-US");
}

function formatDr(value) {
  if (value == null || value === "") return "—";
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  return String(Math.round(n));
}

function formatBadge(value) {
  if (value == null || value === "") return "—";
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

function formatCategory(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "—";
  const slugLike = raw.includes("-") || raw.includes("_") || raw === raw.toLowerCase();
  if (!slugLike) return raw;
  return raw
    .split("/")
    .map((part) =>
      part
        .trim()
        .split(/[-_\s]+/)
        .filter(Boolean)
        .map((word) => {
          const acronym = CATEGORY_ACRONYMS[word.toLowerCase()];
          if (acronym) return acronym;
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" "),
    )
    .join(" / ");
}

function normalizePricing(value) {
  const p = String(value ?? "").trim().toLowerCase();
  if (p === "free") return "Free";
  if (p === "freemium") return "Freemium";
  return String(value ?? "").trim();
}

function splitUrl(raw) {
  const text = String(raw ?? "").trim();
  if (!text) return { href: "#", note: "" };
  const match = text.match(/^(https?:\/\/\S+|mailto:\S+)(?:\s+([\s\S]+))?$/);
  if (!match) {
    return { href: text.replace(/\s+/g, ""), note: "" };
  }
  let note = (match[2] ?? "").trim().replace(/^\*+|\*+$/g, "").trim();
  const wrapped = note.match(/^\((.*)\)$/);
  if (wrapped) note = wrapped[1].trim();
  return { href: match[1], note };
}

function escapeCell(text) {
  return String(text).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function markdownHref(href) {
  return href.replaceAll("(", "%28").replaceAll(")", "%29").replaceAll(" ", "%20");
}

function markdownLabel(text) {
  return String(text).replaceAll("[", "\\[").replaceAll("]", "\\]");
}

function markdownLink(label, rawUrl) {
  const { href, note } = splitUrl(rawUrl);
  const link = `[${markdownLabel(label)}](${markdownHref(href)})`;
  return note ? `${link} (${note})` : link;
}

function platformRow(platform) {
  const name = platform.name ?? "Unknown";
  const siteUrl = platform.siteUrl || platform.submitUrl || "#";
  const submitUrl = platform.submitUrl || platform.siteUrl || "#";
  const cells = [
    markdownLink(name, siteUrl),
    formatCategory(platform.category),
    formatDr(platform.dr),
    formatMonthlyPv(platform.monthlyPv),
    String(qualityScore(platform)),
    normalizePricing(platform.pricing) || "—",
    formatDofollow(platform),
    formatBadge(platform.badgeRequired),
    markdownLink("Submit", submitUrl),
  ].map(escapeCell);
  return `| ${cells.join(" | ")} |`;
}

function sortPlatforms(list) {
  const hasTier = list.some((platform) => String(platform.qualityTier ?? "").trim() !== "");
  return [...list].sort((a, b) => {
    if (hasTier) {
      const tierA = TIER_ORDER[String(a.qualityTier ?? "").toUpperCase()] ?? 99;
      const tierB = TIER_ORDER[String(b.qualityTier ?? "").toUpperCase()] ?? 99;
      if (tierA !== tierB) return tierA - tierB;
    }
    const scoreA = qualityScore(a);
    const scoreB = qualityScore(b);
    if (scoreA !== scoreB) return scoreB - scoreA;
    const drA = Number(a.dr) || 0;
    const drB = Number(b.dr) || 0;
    if (drA !== drB) return drB - drA;
    const pvA = Number(a.monthlyPv) || 0;
    const pvB = Number(b.monthlyPv) || 0;
    if (pvA !== pvB) return pvB - pvA;
    return String(a.name ?? "").localeCompare(String(b.name ?? ""));
  });
}

function filterByPricing(platforms, pricing) {
  return platforms.filter(
    (platform) => normalizePricing(platform.pricing).toLowerCase() === pricing.toLowerCase(),
  );
}

function renderTable(platforms) {
  const header =
    "| Platform | Category | DR | Est. Monthly PV | Score | Pricing | Dofollow | Badge | Submit |";
  const separator = "| --- | --- | ---: | ---: | ---: | --- | --- | --- | --- |";
  const rows = sortPlatforms(platforms).map(platformRow);
  return [header, separator, ...rows].join("\n");
}

function renderPricedSection(platforms) {
  const sorted = sortPlatforms(platforms);
  const main = sorted.filter((platform) => qualityScore(platform) >= LOW_SCORE);
  const low = sorted.filter((platform) => qualityScore(platform) < LOW_SCORE);
  const parts = [];
  if (main.length > 0) {
    parts.push(`### Score ${LOW_SCORE}+ (${main.length})`, "", renderTable(main));
  }
  if (low.length > 0) {
    if (parts.length > 0) parts.push("");
    parts.push(
      `### Score under ${LOW_SCORE} (${low.length})`,
      "",
      `LaunchHub leaves scores under ${LOW_SCORE} off the main grid. They stay in this list so the export count stays complete.`,
      "",
      renderTable(low),
    );
  }
  return parts.join("\n");
}

function syncDate(meta, platforms) {
  const dates = platforms
    .map((platform) => String(platform.updatedAt ?? "").slice(0, 10))
    .filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date))
    .sort();
  if (dates.length > 0) return dates[dates.length - 1];
  if (meta.generatedAt) return String(meta.generatedAt).slice(0, 10);
  return "unknown";
}

function buildReadme(freePlatforms, freemiumPlatforms, meta, platforms) {
  const freeCount = freePlatforms.length;
  const freemiumCount = freemiumPlatforms.length;
  const synced = syncDate(meta, platforms);

  return `# Free Backlink Sources

Free and freemium places to submit a product: launch directories, tool directories, and a few high-traffic communities. ${freeCount + freemiumCount} rows, regenerated from the LaunchHub export.

**Live directory: [${LAUNCH_URL}](${LAUNCH_URL})**

Last synced ${synced} · ${freeCount} free · ${freemiumCount} freemium · [launch-platforms.json](${EXPORT_URL})

## Quick start

1. Open [LaunchHub](${LAUNCH_URL}) if you want filters and a submission tracker. This README is the same free/freemium set.
2. Start at the top of **Free**. Rows are ordered by score, then DR.
3. Prepare a tagline, short description, logo, and screenshots.
4. Read **Dofollow** and **Badge** before you submit. Conditional often means the link stays nofollow unless you add a badge or pass a review.
5. Use **Submit**. On freemium sites, the free path is enough unless you choose to pay.

## How to read a row

| Column | What it means |
| --- | --- |
| DR | Domain rating, 0–100. |
| Est. Monthly PV | Estimated organic visits. \`8.2M\` under 10 million, \`472M\` above that, \`120K\` for thousands. \`—\` means the export has no traffic figure. |
| Score | LaunchHub rank from 0 to 100. Bands are below. |
| Pricing | \`Free\` or \`Freemium\`. |
| Dofollow | \`Yes\`, \`Conditional\`, \`Nofollow\`, or \`?\`. Details under Dofollow. |
| Badge | \`Yes\` when the free path asks for a homepage or footer badge before approval. |
| Submit | Submission URL. Text in parentheses after the link is a constraint (for example, sign in first). |

Score is the LaunchHub rank. Dofollow only scales the DR half: dofollow 1.0, conditional / unknown / nofollow 0.3. Traffic is not discounted, and that half caps once visits pass about 10 million. A high DR with no recorded traffic therefore ranks low. Rows are sorted by score, then DR.

\`score = round((0.5 × DR/100 × follow + 0.5 × clamp(log10(visits + 1) / 7, 0, 1)) × 100)\`

| Score | How to use it |
| --- | --- |
| 50+ | Start here. |
| 20–49 | Submit when the category fits. |
| Under 20 | Thin listing. LaunchHub leaves these off the main grid. |

### Dofollow

- **Yes** — the listing link is dofollow.
- **Conditional** — dofollow only after a badge, upvote, or review step. Confirm on the live page.
- **Nofollow** — still useful for referral traffic.
- **?** — not verified yet. Check the published page.

## Free (${freeCount})

Submit without paying.

${renderPricedSection(freePlatforms)}

## Freemium (${freemiumCount})

A free submit path exists. Paid skip-the-queue or featured placement is optional.

${renderPricedSection(freemiumPlatforms)}

## Sync

\`.github/workflows/sync-from-launch.yml\` rebuilds this file weekly from [${EXPORT_URL}](${EXPORT_URL}). Regenerate locally with \`node scripts/sync-from-launch.mjs launch-platforms.json\`.

GitHub awesome-lists are a separate list on LaunchHub and are not in this export, so they are not in the tables.

## Credit

[LaunchHub](${LAUNCH_URL}) by [Uwarp Design](https://www.uwarp.design) / Sherotree.
`;
}

function main() {
  const jsonPath = resolve(process.argv[2] ?? "launch-platforms.json");
  const meta = loadExport(jsonPath);
  const { platforms } = meta;
  const freePlatforms = filterByPricing(platforms, "free");
  const freemiumPlatforms = filterByPricing(platforms, "freemium");
  const other = platforms.filter((platform) => {
    const pricing = normalizePricing(platform.pricing).toLowerCase();
    return pricing !== "free" && pricing !== "freemium";
  });

  if (other.length > 0) {
    const sample = other
      .slice(0, 5)
      .map((platform) => `${platform.name ?? "?"} (${platform.pricing})`)
      .join(", ");
    throw new Error(`Unexpected pricing outside Free/Freemium (${other.length}): ${sample}`);
  }
  if (freePlatforms.length === 0 && freemiumPlatforms.length === 0) {
    throw new Error("No Free or Freemium platforms found in JSON");
  }
  if (meta.platformCount != null && meta.platformCount !== platforms.length) {
    throw new Error(
      `platformCount ${meta.platformCount} does not match platforms array (${platforms.length})`,
    );
  }

  const readme = buildReadme(freePlatforms, freemiumPlatforms, meta, platforms);
  writeFileSync(README_PATH, readme, "utf8");
  console.log(
    `Wrote README.md (${freePlatforms.length} free, ${freemiumPlatforms.length} freemium, synced ${syncDate(meta, platforms)})`,
  );
}

main();
