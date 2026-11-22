import type {
  FeaturedBadgeCatalog,
  FeaturedBadgeDefinition,
  FeaturedBadgeItem,
  FeaturedBadgeOverrides,
} from './types';

/**
 * Built-in reciprocal / directory badges for LaunchHub `badgeRequired` platforms.
 * Regenerated from the local LaunchHub snapshot (platforms/*.ts including low-score).
 * Universe = `badgeRequired: true` (需要回链). Not limited to the score>=20 README export.
 *
 * Badge `src` URLs are included only when a previously verified public directory
 * asset is known. Rows without a source/package badge image are `requiresListing`
 * stubs — consumers must pass `overrides` rather than inventing assets here.
 */
export const FEATURED_BADGE_CATALOG = [
  {
    id: "earlyhunt",
    href: "https://earlyhunt.com/",
    src: "https://earlyhunt.com/badges/earlyhunt-badge-light.svg",
    alt: "Featured on EarlyHunt",
    width: 190,
    height: 58,
  },
  {
    id: "fazier",
    href: "https://fazier.com/",
    src: "https://fazier.com/api/v1/public/badges/launch_badges.svg?badge_type=launched&theme=light",
    alt: "Featured on Fazier",
    width: 103,
    height: 44,
  },
  {
    id: "neeed",
    href: "https://neeed.directory",
    src: "https://neeed.directory/badges/neeed-badge-light.svg",
    alt: "Featured on neeed.directory",
    width: 139,
    height: 54,
  },
  {
    id: "twelve",
    href: "https://twelve.tools",
    src: "https://twelve.tools/badge0-white.svg",
    alt: "Featured on Twelve Tools",
    width: 148,
    height: 40,
  },
  {
    id: "turbo0",
    href: "https://turbo0.com/",
    src: "https://img.turbo0.com/badge-listed-light.svg",
    alt: "Listed on Turbo0",
    width: 200,
    height: 67,
  },
  {
    id: "ufind",
    href: "https://ufind.best/",
    src: "https://ufind.best/badges/ufind-best-badge-light.svg",
    alt: "Featured on ufind.best",
    width: 150,
    height: 44,
  },
  {
    id: "indiehunt",
    href: "https://indiehunt.io/",
    src: "https://indiehunt.io/badges/indiehunt-badge-light.svg",
    alt: "Featured on IndieHunt",
    width: 200,
    height: 58,
  },
  {
    id: "launchbuff",
    href: "https://launchbuff.com/",
    src: "https://launchbuff.com/badge-featured-light.svg",
    alt: "Featured on LaunchBuff",
    width: 256,
    height: 80,
  },
  {
    id: "launchigniter",
    href: "https://launchigniter.com/",
    src: "https://launchigniter.com/badge.svg",
    alt: "Featured on LaunchIgniter",
    width: 250,
    height: 54,
  },
  {
    id: "lovableapp",
    href: "https://lovableapp.org/",
    src: "https://lovableapp.org/lovable-app-badge.svg",
    alt: "Featured on Lovable APP",
    width: 200,
    height: 60,
  },
  {
    id: "startupfame",
    href: "https://startupfa.me/",
    src: "https://startupfa.me/badges/featured-badge-small.webp",
    alt: "Featured on Startup Fame",
    width: 224,
    height: 36,
  },
  {
    id: "startupfast",
    href: "https://startupfa.st/",
    src: "https://startupfa.st/badge-light.png",
    alt: "Featured on Startup Fast",
    width: 200,
    height: 79,
  },
  {
    id: "sumodir",
    href: "https://sumodir.com/",
    src: "https://sumodir.com/badge.png",
    alt: "Featured on SumoDir",
    width: 200,
    height: 54,
  },
  {
    id: "yodirectory",
    href: "https://yo.directory/",
    src: "https://yo.directory/badges/yo-directory-featured-light.svg",
    alt: "Featured on yo.directory",
    width: 200,
    height: 72,
  },
  {
    id: "aijustbetter",
    href: "https://aijustbetter.com/",
    // LaunchHub has no badge image URL; supply via overrides.
    src: "https://aijustbetter.com/",
    alt: "Featured on AI Just Better",
    width: 200,
    height: 54,
    requiresListing: true,
  },
  {
    id: "basedtools",
    href: "https://basedtools.ai/",
    // LaunchHub has no badge image URL; supply via overrides.
    src: "https://basedtools.ai/",
    alt: "Featured on Basedtools",
    width: 200,
    height: 54,
    requiresListing: true,
  },
  {
    id: "dangai",
    href: "https://dang.ai/",
    // LaunchHub has no badge image URL; supply via overrides.
    src: "https://dang.ai/",
    alt: "Featured on Dang AI",
    width: 200,
    height: 54,
    requiresListing: true,
  },
  {
    id: "dokeyai",
    href: "https://dokeyai.com/",
    // LaunchHub has no badge image URL; supply via overrides.
    src: "https://dokeyai.com/",
    alt: "Featured on DokeyAI",
    width: 200,
    height: 54,
    requiresListing: true,
  },
  {
    id: "findalternative",
    href: "https://findalternative.to/",
    // LaunchHub has no badge image URL; supply via overrides.
    src: "https://findalternative.to/",
    alt: "Featured on FindAlternative",
    width: 200,
    height: 54,
    requiresListing: true,
  },
  {
    id: "firstlook",
    href: "https://firstlook.tools/",
    // LaunchHub has no badge image URL; supply via overrides.
    src: "https://firstlook.tools/",
    alt: "Featured on Firstlook",
    width: 200,
    height: 54,
    requiresListing: true,
  },
  {
    id: "gets",
    href: "https://gets.tools/",
    // LaunchHub has no badge image URL; supply via overrides.
    src: "https://gets.tools/",
    alt: "Featured on Gets",
    width: 200,
    height: 54,
    requiresListing: true,
  },
  {
    id: "hunt0",
    href: "https://hunt0.com/",
    // LaunchHub has no badge image URL; supply via overrides.
    src: "https://hunt0.com/",
    alt: "Featured on Hunt0",
    width: 200,
    height: 54,
    requiresListing: true,
  },
  {
    id: "mossai",
    href: "https://mossai.org/",
    // LaunchHub has no badge image URL; supply via overrides.
    src: "https://mossai.org/",
    alt: "Featured on MossAI",
    width: 200,
    height: 54,
    requiresListing: true,
  },
  {
    id: "productfame",
    href: "https://productfame.com/",
    // LaunchHub has no badge image URL; supply via overrides.
    src: "https://productfame.com/",
    alt: "Featured on ProductFame",
    width: 200,
    height: 54,
    requiresListing: true,
  },
  {
    id: "tinyhunt",
    href: "https://tinyhunt.dev/",
    // LaunchHub has no badge image URL; supply via overrides.
    src: "https://tinyhunt.dev/",
    alt: "Featured on Tinyhunt",
    width: 200,
    height: 54,
    requiresListing: true,
  },
  {
    id: "tooldirs",
    href: "https://tooldirs.com/",
    // LaunchHub has no badge image URL; supply via overrides.
    src: "https://tooldirs.com/",
    alt: "Featured on Tooldirs",
    width: 200,
    height: 54,
    requiresListing: true,
  },
  {
    id: "toolpilot",
    href: "https://toolpilot.ai/",
    // LaunchHub has no badge image URL; supply via overrides.
    src: "https://toolpilot.ai/",
    alt: "Featured on Toolpilot",
    width: 200,
    height: 54,
    requiresListing: true,
  },
  {
    id: "topaihubs",
    href: "https://topaihubs.com/",
    // LaunchHub has no badge image URL; supply via overrides.
    src: "https://topaihubs.com/",
    alt: "Featured on Topaihubs",
    width: 200,
    height: 54,
    requiresListing: true,
  },
] as const satisfies FeaturedBadgeCatalog;

export type FeaturedBadgeId = (typeof FEATURED_BADGE_CATALOG)[number]['id'];

export const FEATURED_BADGE_IDS: readonly FeaturedBadgeId[] = FEATURED_BADGE_CATALOG.map(
  badge => badge.id,
);

/**
 * Default curated reciprocal set (subset of renderable `FEATURED_BADGE_CATALOG` rows).
 * Listing-bound ids (`requiresListing`) are skipped until you pass `overrides`.
 */
export const DEFAULT_FEATURED_BADGE_IDS = [
  "earlyhunt",
  "fazier",
  "neeed",
  "twelve",
  "turbo0",
  "ufind",
] as const satisfies readonly FeaturedBadgeId[];

/** Catalog ids that need a consumer-supplied badge image before they render. */
export const LISTING_REQUIRED_BADGE_IDS = [
  "aijustbetter",
  "basedtools",
  "dangai",
  "dokeyai",
  "findalternative",
  "firstlook",
  "gets",
  "hunt0",
  "mossai",
  "productfame",
  "tinyhunt",
  "tooldirs",
  "toolpilot",
  "topaihubs",
] as const satisfies readonly FeaturedBadgeId[];

export type ResolveFeaturedBadgesOptions = {
  ids?: readonly string[];
  badges?: readonly FeaturedBadgeItem[];
  catalog?: FeaturedBadgeCatalog;
  overrides?: FeaturedBadgeOverrides;
};

function catalogById(catalog: FeaturedBadgeCatalog): Map<string, FeaturedBadgeDefinition> {
  const map = new Map<string, FeaturedBadgeDefinition>();
  for (const badge of catalog) {
    map.set(badge.id, badge);
  }
  return map;
}

function toBadgeItem(badge: FeaturedBadgeDefinition): FeaturedBadgeItem {
  return {
    id: badge.id,
    href: badge.href,
    src: badge.src,
    alt: badge.alt,
    width: badge.width,
    height: badge.height,
    title: badge.title,
  };
}

function applyOverride(
  badge: FeaturedBadgeDefinition,
  overrides: FeaturedBadgeOverrides | undefined,
): FeaturedBadgeItem {
  const patch = overrides?.[badge.id];
  if (!patch) {
    return toBadgeItem(badge);
  }
  return {
    ...toBadgeItem(badge),
    ...patch,
    id: badge.id,
  };
}

function isListingSatisfied(
  badge: FeaturedBadgeDefinition,
  overrides: FeaturedBadgeOverrides | undefined,
): boolean {
  if (badge.requiresListing !== true) {
    return true;
  }
  const patch = overrides?.[badge.id];
  if (!patch) {
    return false;
  }
  // A listing-bound stub needs an explicit product href and badge image.
  return typeof patch.href === 'string' && typeof patch.src === 'string';
}

/**
 * Resolve display list from `ids` and/or custom `badges`.
 * Unknown ids are skipped (safe for forward-compatible embeds).
 * Catalog rows with `requiresListing` are skipped unless `overrides[id]`
 * supplies both `href` and `src` (explicit consumer listing wins).
 */
export function resolveFeaturedBadges(
  options: ResolveFeaturedBadgesOptions = {},
): FeaturedBadgeItem[] {
  const catalog: FeaturedBadgeCatalog = options.catalog ?? FEATURED_BADGE_CATALOG;
  const custom = options.badges ?? [];
  const ids = options.ids;
  const overrides = options.overrides;

  if (ids === undefined && custom.length === 0) {
    return catalog
      .filter(badge => isListingSatisfied(badge, overrides))
      .map(badge => applyOverride(badge, overrides));
  }

  const resolved: FeaturedBadgeItem[] = [];

  if (ids !== undefined) {
    const byId = catalogById(catalog);
    for (const id of ids) {
      const badge = byId.get(id);
      if (!badge) {
        continue;
      }
      if (!isListingSatisfied(badge, overrides)) {
        continue;
      }
      resolved.push(applyOverride(badge, overrides));
    }
  }

  for (const badge of custom) {
    resolved.push(badge);
  }

  return resolved;
}

export function getFeaturedBadge(
  id: string,
  catalog: FeaturedBadgeCatalog = FEATURED_BADGE_CATALOG,
): FeaturedBadgeDefinition | undefined {
  return catalog.find(badge => badge.id === id);
}
