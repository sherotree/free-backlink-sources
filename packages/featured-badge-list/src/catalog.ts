import type {
  FeaturedBadgeCatalog,
  FeaturedBadgeDefinition,
  FeaturedBadgeItem,
  FeaturedBadgeOverrides,
} from './types';

/**
 * Built-in reciprocal / directory badges.
 * Add new partners here; consumers select with `ids={[...]}`.
 *
 * Includes LaunchHub-style `badgeRequired` directory embeds (official badge assets
 * from each site) plus a curated reciprocal set useful as defaults/examples.
 *
 * Provenance: badge `src` URLs are publicly hosted by each directory.
 * Product-listing fields never ship another app’s slug — see `requiresListing`
 * and the `overrides` prop. See README § Dataset.
 */
export const FEATURED_BADGE_CATALOG = [
  // --- Curated reciprocal embeds ---
  {
    id: 'peerpush',
    href: 'https://peerpush.com/',
    // No public product-agnostic badge image; supply via overrides / listing helper.
    src: 'https://peerpush.com/',
    alt: 'Featured on PeerPush',
    width: 230,
    height: 54,
    requiresListing: true,
  },
  {
    id: 'neeed',
    href: 'https://neeed.directory',
    src: 'https://neeed.directory/badges/neeed-badge-light.svg',
    alt: 'Featured on neeed.directory',
    width: 139,
    height: 54,
  },
  {
    id: 'trylaunch',
    href: 'https://trylaunch.ai/',
    src: 'https://trylaunch.ai/badges/badge-white.png',
    alt: 'Featured on Launch',
    width: 180,
    height: 53,
  },
  {
    id: 'ufind',
    href: 'https://ufind.best/',
    src: 'https://ufind.best/badges/ufind-best-badge-light.svg',
    alt: 'Featured on ufind.best',
    width: 150,
    height: 44,
  },
  {
    id: 'twelve',
    href: 'https://twelve.tools',
    src: 'https://twelve.tools/badge0-white.svg',
    alt: 'Featured on Twelve Tools',
    width: 148,
    height: 40,
  },
  {
    id: 'scoutforge',
    href: 'https://scoutforge.net/',
    // Badge image API is app-slug specific; supply via overrides / listing helper.
    src: 'https://scoutforge.net/',
    alt: 'Featured on Scout Forge',
    width: 240,
    height: 58,
    requiresListing: true,
  },

  // --- LaunchHub badgeRequired directories (official site badges) ---
  {
    id: 'startupfame',
    href: 'https://startupfa.me/',
    src: 'https://startupfa.me/badges/featured-badge-small.webp',
    alt: 'Featured on Startup Fame',
    width: 224,
    height: 36,
  },
  {
    id: 'fazier',
    href: 'https://fazier.com/',
    src: 'https://fazier.com/api/v1/public/badges/launch_badges.svg?badge_type=launched&theme=light',
    alt: 'Featured on Fazier',
    width: 103,
    height: 44,
  },
  {
    id: 'lovableapp',
    href: 'https://lovableapp.org/',
    src: 'https://lovableapp.org/lovable-app-badge.svg',
    alt: 'Featured on Lovable APP',
    width: 200,
    height: 60,
  },
  {
    id: 'launchigniter',
    href: 'https://launchigniter.com/',
    src: 'https://launchigniter.com/badge.svg',
    alt: 'Featured on LaunchIgniter',
    width: 250,
    height: 54,
  },
  {
    id: 'launchbuff',
    href: 'https://launchbuff.com/',
    src: 'https://launchbuff.com/badge-featured-light.svg',
    alt: 'Featured on LaunchBuff',
    width: 256,
    height: 80,
  },
  {
    id: 'startupfast',
    href: 'https://startupfa.st/',
    src: 'https://startupfa.st/badge-light.png',
    alt: 'Featured on Startup Fast',
    width: 200,
    height: 79,
  },
  {
    id: 'turbo0',
    href: 'https://turbo0.com/',
    src: 'https://img.turbo0.com/badge-listed-light.svg',
    alt: 'Listed on Turbo0',
    width: 200,
    height: 67,
  },
  {
    id: 'earlyhunt',
    href: 'https://earlyhunt.com/',
    src: 'https://earlyhunt.com/badges/earlyhunt-badge-light.svg',
    alt: 'Featured on EarlyHunt',
    width: 190,
    height: 58,
  },
  {
    id: 'indiehunt',
    href: 'https://indiehunt.io/',
    src: 'https://indiehunt.io/badges/indiehunt-badge-light.svg',
    alt: 'Featured on IndieHunt',
    width: 200,
    height: 58,
  },
  {
    id: 'sumodir',
    href: 'https://sumodir.com/',
    src: 'https://sumodir.com/badge.png',
    alt: 'Featured on SumoDir',
    width: 200,
    height: 54,
  },
  {
    id: 'yodirectory',
    href: 'https://yo.directory/',
    src: 'https://yo.directory/badges/yo-directory-featured-light.svg',
    alt: 'Featured on yo.directory',
    width: 200,
    height: 72,
  },
  {
    id: 'startupbase',
    href: 'https://startupbase.io/',
    src: 'https://statics.startupbase.io/site/badges/launched-on-sb.svg',
    alt: 'Launched on StartupBase',
    width: 206,
    height: 55,
  },
] as const satisfies FeaturedBadgeCatalog;

export type FeaturedBadgeId = (typeof FEATURED_BADGE_CATALOG)[number]['id'];

export const FEATURED_BADGE_IDS: readonly FeaturedBadgeId[] = FEATURED_BADGE_CATALOG.map(
  badge => badge.id,
);

/**
 * Default curated reciprocal set (subset of `FEATURED_BADGE_CATALOG`).
 * Prefer passing these via the `ids` prop so listing URLs stay easy to override.
 * Listing-bound ids (`requiresListing`) are skipped until you pass `overrides`.
 */
export const DEFAULT_FEATURED_BADGE_IDS = [
  'peerpush',
  'neeed',
  'trylaunch',
  'ufind',
  'twelve',
  'scoutforge',
] as const satisfies readonly FeaturedBadgeId[];

/** Catalog ids that need a consumer product listing before they render. */
export const LISTING_REQUIRED_BADGE_IDS = [
  'peerpush',
  'scoutforge',
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
