import type {
  FeaturedBadgeCatalog,
  FeaturedBadgeDefinition,
  FeaturedBadgeItem,
  FeaturedBadgeOverrides,
} from './types';
import {
  DEFAULT_FEATURED_BADGE_IMAGE_HEIGHT,
  DEFAULT_FEATURED_BADGE_IMAGE_SRC,
  DEFAULT_FEATURED_BADGE_IMAGE_WIDTH,
  needsDefaultBadgeImage,
} from './default-badge-image';


/**
 * Built-in reciprocal / directory badges for LaunchHub `badgeRequired` platforms.
 * Regenerated from the local LaunchHub snapshot (platforms/*.ts including low-score).
 * Universe = `badgeRequired: true` (需要回链). Not limited to the score>=20 README export.
 *
 * Badge `src` URLs are included only when a previously verified public directory
 * asset is known. Rows without an official badge image use
 * `usesDefaultBadgeImage` + the neutral package fallback (`DEFAULT_FEATURED_BADGE_IMAGE_SRC`).
 * Override `src` with a verified directory asset when you have one.
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
    // No official badge image in LaunchHub — neutral package fallback (not a provider badge).
    src: DEFAULT_FEATURED_BADGE_IMAGE_SRC,
    alt: "Directory link: AI Just Better (generic badge)",
    width: DEFAULT_FEATURED_BADGE_IMAGE_WIDTH,
    height: DEFAULT_FEATURED_BADGE_IMAGE_HEIGHT,
    usesDefaultBadgeImage: true,
  },
  {
    id: "basedtools",
    href: "https://basedtools.ai/",
    // No official badge image in LaunchHub — neutral package fallback (not a provider badge).
    src: DEFAULT_FEATURED_BADGE_IMAGE_SRC,
    alt: "Directory link: Basedtools (generic badge)",
    width: DEFAULT_FEATURED_BADGE_IMAGE_WIDTH,
    height: DEFAULT_FEATURED_BADGE_IMAGE_HEIGHT,
    usesDefaultBadgeImage: true,
  },
  {
    id: "dangai",
    href: "https://dang.ai/",
    // No official badge image in LaunchHub — neutral package fallback (not a provider badge).
    src: DEFAULT_FEATURED_BADGE_IMAGE_SRC,
    alt: "Directory link: Dang AI (generic badge)",
    width: DEFAULT_FEATURED_BADGE_IMAGE_WIDTH,
    height: DEFAULT_FEATURED_BADGE_IMAGE_HEIGHT,
    usesDefaultBadgeImage: true,
  },
  {
    id: "dokeyai",
    href: "https://dokeyai.com/",
    // No official badge image in LaunchHub — neutral package fallback (not a provider badge).
    src: DEFAULT_FEATURED_BADGE_IMAGE_SRC,
    alt: "Directory link: DokeyAI (generic badge)",
    width: DEFAULT_FEATURED_BADGE_IMAGE_WIDTH,
    height: DEFAULT_FEATURED_BADGE_IMAGE_HEIGHT,
    usesDefaultBadgeImage: true,
  },
  {
    id: "findalternative",
    href: "https://findalternative.to/",
    // No official badge image in LaunchHub — neutral package fallback (not a provider badge).
    src: DEFAULT_FEATURED_BADGE_IMAGE_SRC,
    alt: "Directory link: FindAlternative (generic badge)",
    width: DEFAULT_FEATURED_BADGE_IMAGE_WIDTH,
    height: DEFAULT_FEATURED_BADGE_IMAGE_HEIGHT,
    usesDefaultBadgeImage: true,
  },
  {
    id: "firstlook",
    href: "https://firstlook.tools/",
    // No official badge image in LaunchHub — neutral package fallback (not a provider badge).
    src: DEFAULT_FEATURED_BADGE_IMAGE_SRC,
    alt: "Directory link: Firstlook (generic badge)",
    width: DEFAULT_FEATURED_BADGE_IMAGE_WIDTH,
    height: DEFAULT_FEATURED_BADGE_IMAGE_HEIGHT,
    usesDefaultBadgeImage: true,
  },
  {
    id: "gets",
    href: "https://gets.tools/",
    // No official badge image in LaunchHub — neutral package fallback (not a provider badge).
    src: DEFAULT_FEATURED_BADGE_IMAGE_SRC,
    alt: "Directory link: Gets (generic badge)",
    width: DEFAULT_FEATURED_BADGE_IMAGE_WIDTH,
    height: DEFAULT_FEATURED_BADGE_IMAGE_HEIGHT,
    usesDefaultBadgeImage: true,
  },
  {
    id: "hunt0",
    href: "https://hunt0.com/",
    // No official badge image in LaunchHub — neutral package fallback (not a provider badge).
    src: DEFAULT_FEATURED_BADGE_IMAGE_SRC,
    alt: "Directory link: Hunt0 (generic badge)",
    width: DEFAULT_FEATURED_BADGE_IMAGE_WIDTH,
    height: DEFAULT_FEATURED_BADGE_IMAGE_HEIGHT,
    usesDefaultBadgeImage: true,
  },
  {
    id: "mossai",
    href: "https://mossai.org/",
    // No official badge image in LaunchHub — neutral package fallback (not a provider badge).
    src: DEFAULT_FEATURED_BADGE_IMAGE_SRC,
    alt: "Directory link: MossAI (generic badge)",
    width: DEFAULT_FEATURED_BADGE_IMAGE_WIDTH,
    height: DEFAULT_FEATURED_BADGE_IMAGE_HEIGHT,
    usesDefaultBadgeImage: true,
  },
  {
    id: "productfame",
    href: "https://productfame.com/",
    // No official badge image in LaunchHub — neutral package fallback (not a provider badge).
    src: DEFAULT_FEATURED_BADGE_IMAGE_SRC,
    alt: "Directory link: ProductFame (generic badge)",
    width: DEFAULT_FEATURED_BADGE_IMAGE_WIDTH,
    height: DEFAULT_FEATURED_BADGE_IMAGE_HEIGHT,
    usesDefaultBadgeImage: true,
  },
  {
    id: "tinyhunt",
    href: "https://tinyhunt.dev/",
    // No official badge image in LaunchHub — neutral package fallback (not a provider badge).
    src: DEFAULT_FEATURED_BADGE_IMAGE_SRC,
    alt: "Directory link: Tinyhunt (generic badge)",
    width: DEFAULT_FEATURED_BADGE_IMAGE_WIDTH,
    height: DEFAULT_FEATURED_BADGE_IMAGE_HEIGHT,
    usesDefaultBadgeImage: true,
  },
  {
    id: "tooldirs",
    href: "https://tooldirs.com/",
    // No official badge image in LaunchHub — neutral package fallback (not a provider badge).
    src: DEFAULT_FEATURED_BADGE_IMAGE_SRC,
    alt: "Directory link: Tooldirs (generic badge)",
    width: DEFAULT_FEATURED_BADGE_IMAGE_WIDTH,
    height: DEFAULT_FEATURED_BADGE_IMAGE_HEIGHT,
    usesDefaultBadgeImage: true,
  },
  {
    id: "toolpilot",
    href: "https://toolpilot.ai/",
    // No official badge image in LaunchHub — neutral package fallback (not a provider badge).
    src: DEFAULT_FEATURED_BADGE_IMAGE_SRC,
    alt: "Directory link: Toolpilot (generic badge)",
    width: DEFAULT_FEATURED_BADGE_IMAGE_WIDTH,
    height: DEFAULT_FEATURED_BADGE_IMAGE_HEIGHT,
    usesDefaultBadgeImage: true,
  },
  {
    id: "topaihubs",
    href: "https://topaihubs.com/",
    // No official badge image in LaunchHub — neutral package fallback (not a provider badge).
    src: DEFAULT_FEATURED_BADGE_IMAGE_SRC,
    alt: "Directory link: Topaihubs (generic badge)",
    width: DEFAULT_FEATURED_BADGE_IMAGE_WIDTH,
    height: DEFAULT_FEATURED_BADGE_IMAGE_HEIGHT,
    usesDefaultBadgeImage: true,
  },
] as const satisfies FeaturedBadgeCatalog;

export type FeaturedBadgeId = (typeof FEATURED_BADGE_CATALOG)[number]['id'];

export const FEATURED_BADGE_IDS: readonly FeaturedBadgeId[] = FEATURED_BADGE_CATALOG.map(
  badge => badge.id,
);

/**
 * Default curated reciprocal set (subset of `FEATURED_BADGE_CATALOG`).
 * Prefer ids with verified official badge assets for the common footer set.
 */
export const DEFAULT_FEATURED_BADGE_IDS = [
  "earlyhunt",
  "fazier",
  "neeed",
  "twelve",
  "turbo0",
  "ufind",
] as const satisfies readonly FeaturedBadgeId[];

/**
 * Catalog ids that still require consumer listing `href`+`src` before render
 * (product-slug-bound embeds). Empty after the badgeRequired sync — kept for API stability.
 */
export const LISTING_REQUIRED_BADGE_IDS = [] as const satisfies readonly FeaturedBadgeId[];

/**
 * Catalog ids that ship the neutral package fallback image (not an official
 * provider badge). Derived from `usesDefaultBadgeImage` so future regenerations
 * stay accurate without hand-maintaining this list.
 */
export const DEFAULT_BADGE_IMAGE_IDS: readonly FeaturedBadgeId[] = FEATURED_BADGE_CATALOG.filter(
  (badge): boolean =>
    (badge as FeaturedBadgeDefinition).usesDefaultBadgeImage === true,
).map(badge => badge.id);

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

function resolveImageFields(badge: FeaturedBadgeDefinition): Pick<FeaturedBadgeItem, 'src' | 'width' | 'height'> {
  const useDefault =
    badge.usesDefaultBadgeImage === true || needsDefaultBadgeImage(badge.src);
  if (!useDefault) {
    return {
      src: badge.src,
      width: badge.width,
      height: badge.height,
    };
  }
  return {
    src: DEFAULT_FEATURED_BADGE_IMAGE_SRC,
    width: badge.width ?? DEFAULT_FEATURED_BADGE_IMAGE_WIDTH,
    height: badge.height ?? DEFAULT_FEATURED_BADGE_IMAGE_HEIGHT,
  };
}

function toBadgeItem(badge: FeaturedBadgeDefinition): FeaturedBadgeItem {
  const image = resolveImageFields(badge);
  return {
    id: badge.id,
    href: badge.href,
    src: image.src,
    alt: badge.alt,
    width: image.width,
    height: image.height,
    title: badge.title,
  };
}

function applyOverride(
  badge: FeaturedBadgeDefinition,
  overrides: FeaturedBadgeOverrides | undefined,
): FeaturedBadgeItem {
  const base = toBadgeItem(badge);
  const patch = overrides?.[badge.id];
  if (!patch) {
    return base;
  }
  const merged: FeaturedBadgeItem = {
    ...base,
    ...patch,
    id: badge.id,
  };
  // If the consumer did not supply a real image, keep/restore the package fallback.
  if (needsDefaultBadgeImage(merged.src)) {
    merged.src = DEFAULT_FEATURED_BADGE_IMAGE_SRC;
    merged.width = merged.width ?? DEFAULT_FEATURED_BADGE_IMAGE_WIDTH;
    merged.height = merged.height ?? DEFAULT_FEATURED_BADGE_IMAGE_HEIGHT;
  }
  return merged;
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
  // Product-slug-bound stubs still need an explicit listing href and badge image.
  return typeof patch.href === 'string' && typeof patch.src === 'string' && !needsDefaultBadgeImage(patch.src);
}

/**
 * Resolve display list from `ids` and/or custom `badges`.
 * Unknown ids are skipped (safe for forward-compatible embeds).
 * Rows with `usesDefaultBadgeImage` (or a non-image `src`) render with the
 * neutral package fallback unless `overrides` supply a real badge image.
 * Rows with `requiresListing` are skipped unless `overrides[id]` supplies
 * both listing `href` and a real badge `src`.
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
