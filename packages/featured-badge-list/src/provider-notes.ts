import type { FeaturedBadgeId } from './catalog';
import { FEATURED_BADGE_IDS } from './catalog';

/**
 * Human-facing notes for every selectable catalog id.
 * Kept in sync with `FEATURED_BADGE_CATALOG` via unit tests.
 * Regenerated from LaunchHub `badgeRequired` rows (+ `badgeNote` when present).
 *
 * Distinctions used below:
 * - **Required on your site** — what the free/conditional path asks you to place.
 * - **Directory listing rel** — what the directory promises on *their* outbound links
 *   (separate from the backlink/badge they ask you to add).
 * - Rendering a badge does **not** mean your product is approved or listed.
 */
export type FeaturedBadgeRequirement =
  | 'required-for-free'
  | 'conditional'
  | 'optional-reciprocal'
  | 'unknown';

export type FeaturedBadgeProviderNote = {
  id: FeaturedBadgeId;
  name: string;
  site: string;
  requirement: FeaturedBadgeRequirement;
  /** What free / badge paths expect on *your* site. */
  onSite: string;
  /** Values consumers typically override (product slug, listing URL, theme). */
  supplyYourself?: string;
  variants?: string;
  listingNote?: string;
};

export const FEATURED_BADGE_PROVIDER_NOTES = [
  {
    id: "earlyhunt",
    name: "EarlyHunt",
    site: "https://earlyhunt.com/",
    requirement: "required-for-free",
    onSite: "Free path requires an on-site badge/backlink (LaunchHub `badgeRequired`).",
    variants: "Dark badge: `https://earlyhunt.com/badges/earlyhunt-badge-dark.svg`.",
  },
  {
    id: "fazier",
    name: "Fazier",
    site: "https://fazier.com/",
    requirement: "required-for-free",
    onSite:
      "badge_required: yes — Fazier badge / footer backlink on homepage. Free submit also requires your site DR > 0.",
    variants: "`badge_type` / `theme` query params on the SVG endpoint (default catalog uses `launched` + `light`).",
    listingNote:
      "LaunchHub marks `homepageBadgeRequired: true` for the free path.",
  },
  {
    id: "neeed",
    name: "Neeed Directory",
    site: "https://neeed.directory",
    requirement: "required-for-free",
    onSite: "badge_required: yes — Neeed Directory badge / footer link",
    variants: "Official dark asset also exists at `/badges/neeed-badge-dark.svg` (override `src`).",
  },
  {
    id: "twelve",
    name: "Twelve Tools",
    site: "https://twelve.tools",
    requirement: "required-for-free",
    onSite:
      "Free listing with badge can go live the same day. Live Visit outbound observed as rel=noopener (no nofollow/ugc) on 2026-11-15 BoreGame listing.",
    variants: "Dark badge: `https://twelve.tools/badge0-dark.svg`.",
  },
  {
    id: "turbo0",
    name: "Turbo0",
    site: "https://turbo0.com/",
    requirement: "required-for-free",
    onSite: "Free path requires an on-site badge/backlink (LaunchHub `badgeRequired`).",
    variants: "Dark badge: `https://img.turbo0.com/badge-listed-dark.svg`.",
  },
  {
    id: "ufind",
    name: "Ufind.best",
    site: "https://ufind.best/",
    requirement: "required-for-free",
    onSite:
      "Free launches require a ufind.best badge/backlink for the launch week (badge verified 2026-11-15). Queued listing outbound was rel=nofollow noopener noreferrer. Official terms: stays nofollow unless top 3 for lifetime dofollow; Premium $19 skips badge and guarantees lifetime dofollow. Confirmed 2026-11-15.",
    variants: "Dark badge: `https://ufind.best/badges/ufind-best-badge-dark.svg`.",
  },
  {
    id: "indiehunt",
    name: "IndieHunt",
    site: "https://indiehunt.io/",
    requirement: "required-for-free",
    onSite: "Free path requires an on-site badge/backlink (LaunchHub `badgeRequired`).",
    variants: "Dark badge: `https://indiehunt.io/badges/indiehunt-badge-dark.svg`.",
  },
  {
    id: "launchbuff",
    name: "LaunchBuff",
    site: "https://launchbuff.com/",
    requirement: "required-for-free",
    onSite: "Free path requires an on-site badge/backlink (LaunchHub `badgeRequired`).",
  },
  {
    id: "launchigniter",
    name: "LaunchIgniter",
    site: "https://launchigniter.com/",
    requirement: "required-for-free",
    onSite: "Free path requires an on-site badge/backlink (LaunchHub `badgeRequired`).",
  },
  {
    id: "lovableapp",
    name: "Lovable APP",
    site: "https://lovableapp.org/",
    requirement: "required-for-free",
    onSite:
      "Free listing requires a homepage Lovable App badge plus Verify Link (DR must be > 2). This is a hard pre-submit gate, not an optional post-submit dofollow badge; listing dofollow is unconfirmed. Login is required after choosing Free. Paid Fast Pass from $29.9 can skip the badge. As of 2026-11-12; sources: bestfor-kids-14d/evidence/lovableapp-2026-11-10-note.txt, uwarp-31-14d/evidence/lovableapp-date-time-stamp-drop.txt.",
    listingNote:
      "LaunchHub marks `homepageBadgeRequired: true` for the free path.",
  },
  {
    id: "startupfame",
    name: "Startup Fame",
    site: "https://startupfa.me/",
    requirement: "required-for-free",
    onSite: "Free path requires a homepage verification badge",
    listingNote:
      "LaunchHub marks `homepageBadgeRequired: true` for the free path.",
  },
  {
    id: "startupfast",
    name: "Startupfa",
    site: "https://startupfa.st/",
    requirement: "required-for-free",
    onSite: "Free path requires an on-site badge/backlink (LaunchHub `badgeRequired`).",
  },
  {
    id: "sumodir",
    name: "SumoDir",
    site: "https://sumodir.com/",
    requirement: "required-for-free",
    onSite:
      "Two different links: (1) Free listing requires you to place a site badge and a dofollow backlink to SumoDir on your homepage or footer, verified before the form. (2) Official Free plan copy promises 1 dofollow listing link from SumoDir to your product — that is the directory outbound listing attribute, not the required on-site backlink. Premium $15 skips the on-site badge. As of 2026-11-10; source: boregame-14d/evidence/sumodir-note.txt.",
  },
  {
    id: "yodirectory",
    name: "yo.directory",
    site: "https://yo.directory/",
    requirement: "required-for-free",
    onSite:
      "Free plan requires a live website backlink to yo.directory (the listing stays live while the link stays live). Dofollow of that backlink and of the listing link is unconfirmed. Basic $19 / Pro $19/mo skip the backlink. As of 2026-11-10; source: hackeryoutube-14d/evidence/yo-directory-note.txt.",
    variants: "Light: `/badges/yo-directory-featured-light.svg` (also aliased at `/badge.svg`). Dark: `/badges/yo-directory-featured-dark.svg`.",
  },
  {
    id: "aijustbetter",
    name: "AI Just Better",
    site: "https://aijustbetter.com/",
    requirement: "required-for-free",
    onSite:
      "LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`.",
    supplyYourself:
      "`overrides.aijustbetter` → supply verified badge `src` and preferred listing `href` (package does not invent badge assets).",
  },
  {
    id: "basedtools",
    name: "Basedtools",
    site: "https://basedtools.ai/",
    requirement: "required-for-free",
    onSite:
      "LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`.",
    supplyYourself:
      "`overrides.basedtools` → supply verified badge `src` and preferred listing `href` (package does not invent badge assets).",
  },
  {
    id: "dangai",
    name: "Dang AI",
    site: "https://dang.ai/",
    requirement: "required-for-free",
    onSite:
      "LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`.",
    supplyYourself:
      "`overrides.dangai` → supply verified badge `src` and preferred listing `href` (package does not invent badge assets).",
  },
  {
    id: "dokeyai",
    name: "DokeyAI",
    site: "https://dokeyai.com/",
    requirement: "required-for-free",
    onSite:
      "Free pack: add the partner footer link, then the site can be approved. Review is described as about 48 hours.",
    supplyYourself:
      "`overrides.dokeyai` → supply verified badge `src` and preferred listing `href` (package does not invent badge assets).",
  },
  {
    id: "findalternative",
    name: "FindAlternative",
    site: "https://findalternative.to/",
    requirement: "required-for-free",
    onSite:
      "LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`.",
    supplyYourself:
      "`overrides.findalternative` → supply verified badge `src` and preferred listing `href` (package does not invent badge assets).",
  },
  {
    id: "firstlook",
    name: "Firstlook",
    site: "https://firstlook.tools/",
    requirement: "required-for-free",
    onSite:
      "LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`.",
    supplyYourself:
      "`overrides.firstlook` → supply verified badge `src` and preferred listing `href` (package does not invent badge assets).",
  },
  {
    id: "gets",
    name: "Gets",
    site: "https://gets.tools/",
    requirement: "required-for-free",
    onSite:
      "LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`.",
    supplyYourself:
      "`overrides.gets` → supply verified badge `src` and preferred listing `href` (package does not invent badge assets).",
  },
  {
    id: "hunt0",
    name: "Hunt0",
    site: "https://hunt0.com/",
    requirement: "required-for-free",
    onSite:
      "LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`.",
    supplyYourself:
      "`overrides.hunt0` → supply verified badge `src` and preferred listing `href` (package does not invent badge assets).",
  },
  {
    id: "mossai",
    name: "MossAI",
    site: "https://mossai.org/",
    requirement: "required-for-free",
    onSite:
      "LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`.",
    supplyYourself:
      "`overrides.mossai` → supply verified badge `src` and preferred listing `href` (package does not invent badge assets).",
  },
  {
    id: "productfame",
    name: "ProductFame",
    site: "https://productfame.com/",
    requirement: "required-for-free",
    onSite:
      "LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`.",
    supplyYourself:
      "`overrides.productfame` → supply verified badge `src` and preferred listing `href` (package does not invent badge assets).",
    listingNote:
      "Present in LaunchHub low-score skip list; still badge-required for its free path.",
  },
  {
    id: "tinyhunt",
    name: "Tinyhunt",
    site: "https://tinyhunt.dev/",
    requirement: "required-for-free",
    onSite:
      "LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`.",
    supplyYourself:
      "`overrides.tinyhunt` → supply verified badge `src` and preferred listing `href` (package does not invent badge assets).",
  },
  {
    id: "tooldirs",
    name: "Tooldirs",
    site: "https://tooldirs.com/",
    requirement: "required-for-free",
    onSite:
      "LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`.",
    supplyYourself:
      "`overrides.tooldirs` → supply verified badge `src` and preferred listing `href` (package does not invent badge assets).",
  },
  {
    id: "toolpilot",
    name: "Toolpilot",
    site: "https://toolpilot.ai/",
    requirement: "required-for-free",
    onSite:
      "LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`.",
    supplyYourself:
      "`overrides.toolpilot` → supply verified badge `src` and preferred listing `href` (package does not invent badge assets).",
  },
  {
    id: "topaihubs",
    name: "Topaihubs",
    site: "https://topaihubs.com/",
    requirement: "required-for-free",
    onSite:
      "LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`.",
    supplyYourself:
      "`overrides.topaihubs` → supply verified badge `src` and preferred listing `href` (package does not invent badge assets).",
  },
] as const satisfies readonly FeaturedBadgeProviderNote[];

export type FeaturedBadgeProviderNoteId = (typeof FEATURED_BADGE_PROVIDER_NOTES)[number]['id'];

/** Stable map for lookups; keys are exactly `FEATURED_BADGE_IDS`. */
export const FEATURED_BADGE_PROVIDER_NOTES_BY_ID: Readonly<
  Record<FeaturedBadgeId, FeaturedBadgeProviderNote>
> = Object.fromEntries(FEATURED_BADGE_PROVIDER_NOTES.map(note => [note.id, note])) as Record<
  FeaturedBadgeId,
  FeaturedBadgeProviderNote
>;

/** Exhaustive id list derived from notes (must match catalog order independently via tests). */
export const FEATURED_BADGE_PROVIDER_NOTE_IDS: readonly FeaturedBadgeId[] =
  FEATURED_BADGE_PROVIDER_NOTES.map(note => note.id);

/** Runtime guard helper used by tests. */
export function assertProviderNotesCoverCatalog(): void {
  const noteIds = new Set<string>(FEATURED_BADGE_PROVIDER_NOTE_IDS);
  const catalogIds = new Set<string>(FEATURED_BADGE_IDS);
  if (noteIds.size !== catalogIds.size) {
    throw new Error(
      `provider notes size ${noteIds.size} != catalog size ${catalogIds.size}`,
    );
  }
  for (const id of catalogIds) {
    if (!noteIds.has(id)) {
      throw new Error(`missing provider note for catalog id: ${id}`);
    }
  }
}
