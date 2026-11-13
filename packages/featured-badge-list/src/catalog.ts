import type { FeaturedBadgeCatalog, FeaturedBadgeDefinition, FeaturedBadgeItem } from './types';

/**
 * Built-in reciprocal / directory badges.
 * Add new partners here; consumers select with `ids={[...]}`.
 *
 * Includes LaunchHub-style `badgeRequired` directory embeds (official badge assets
 * from each site) plus a curated reciprocal set useful as defaults/examples.
 *
 * Provenance: badge `src` URLs are publicly hosted by each directory. Some curated
 * `href`/`src` values still point at a reference product listing — replace them with
 * your own listing URLs before shipping to production. See README § Dataset.
 */
export const FEATURED_BADGE_CATALOG = [
  // --- Curated reciprocal embeds ---
  {
    id: 'peerpush',
    href: 'https://peerpush.com/p/ui-design-tools-directory',
    src: 'https://peerpush.com/p/ui-design-tools-directory/badge.png',
    alt: 'UI Design Tools Directory on PeerPush',
    width: 230,
    height: 54,
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
    id: 'foundrlist',
    href: 'https://www.foundrlist.com/product/uwarp-2?utm_source=badge&utm_medium=embed',
    src: 'https://www.foundrlist.com/api/badge/uwarp-2',
    alt: 'Featured on FoundrList',
    width: 150,
    height: 48,
  },
  {
    id: 'trylaunch',
    href: 'https://trylaunch.ai/launch/uwarp',
    src: 'https://trylaunch.ai/badges/badge-white.png',
    alt: 'Featured on Launch',
    width: 180,
    height: 53,
  },
  {
    id: 'ufind',
    href: 'https://ufind.best/products/free-ui-design-tools-directory',
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
    href: 'https://scoutforge.net/apps/uwarp?ref=badge',
    src: 'https://scoutforge.net/badge/uwarp/image?theme=light&size=default',
    alt: 'Featured on Scout Forge',
    width: 240,
    height: 58,
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
    id: 'toolfame',
    href: 'https://toolfame.com/',
    src: 'https://toolfame.com/badge-light.svg',
    alt: 'Featured on ToolFame',
    width: 160,
    height: 54,
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
    id: 'launchllama',
    href: 'https://tools.launchllama.co/',
    src: 'https://tools.launchllama.co/featured-badge.png?v=2',
    alt: 'Featured on Launch Llama',
    width: 200,
    height: 53,
  },
  {
    id: 'sidehunt',
    href: 'https://sidehunt.io/',
    src: 'https://sidehunt.io/badges/sidehunt-badge-light.svg',
    alt: 'Featured on SideHunt',
    width: 200,
    height: 60,
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
    id: 'saasfame',
    href: 'https://saasfame.com/',
    src: 'https://saasfame.com/badge-light.svg',
    alt: 'Featured on SaaSFame',
    width: 170,
    height: 54,
  },
  {
    id: 'findly',
    href: 'https://findly.tools/',
    src: 'https://findly.tools/badges/findly-tools-badge-light.svg',
    alt: 'Featured on findly.tools',
    width: 139,
    height: 44,
  },
  {
    id: 'toolfio',
    href: 'https://toolfio.com/',
    src: 'https://toolfio.com/toolfio-light-badge.png',
    alt: 'Featured on Toolfio',
    width: 200,
    height: 54,
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
    id: 'listbulb',
    href: 'https://www.listbulb.com/',
    src: 'https://www.listbulb.com/featured-on-listbulb-light.svg',
    alt: 'Featured on ListBulb',
    width: 162,
    height: 54,
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
 */
export const DEFAULT_FEATURED_BADGE_IDS = [
  'peerpush',
  'neeed',
  'foundrlist',
  'trylaunch',
  'ufind',
  'twelve',
  'scoutforge',
] as const satisfies readonly FeaturedBadgeId[];

export type ResolveFeaturedBadgesOptions = {
  ids?: readonly string[];
  badges?: readonly FeaturedBadgeItem[];
  catalog?: FeaturedBadgeCatalog;
};

function catalogById(catalog: FeaturedBadgeCatalog): Map<string, FeaturedBadgeDefinition> {
  const map = new Map<string, FeaturedBadgeDefinition>();
  for (const badge of catalog) {
    map.set(badge.id, badge);
  }
  return map;
}

/**
 * Resolve display list from `ids` and/or custom `badges`.
 * Unknown ids are skipped (safe for forward-compatible embeds).
 */
export function resolveFeaturedBadges(
  options: ResolveFeaturedBadgesOptions = {},
): FeaturedBadgeItem[] {
  const catalog = options.catalog ?? FEATURED_BADGE_CATALOG;
  const custom = options.badges ?? [];
  const ids = options.ids;

  if (ids === undefined && custom.length === 0) {
    return [...catalog];
  }

  const resolved: FeaturedBadgeItem[] = [];

  if (ids !== undefined) {
    const byId = catalogById(catalog);
    for (const id of ids) {
      const badge = byId.get(id);
      if (badge) {
        resolved.push(badge);
      }
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
