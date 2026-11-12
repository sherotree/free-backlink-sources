import {
  DEFAULT_FEATURED_BADGE_IDS,
  FEATURED_BADGE_CATALOG,
  resolveFeaturedBadges,
} from './catalog';

/**
 * Resolved badge objects for `DEFAULT_FEATURED_BADGE_IDS`.
 * Prefer selecting with `ids={DEFAULT_FEATURED_BADGE_IDS}` so consumers can
 * still override via `catalog` / `badges`.
 */
export const DEFAULT_FEATURED_BADGES = resolveFeaturedBadges({
  ids: DEFAULT_FEATURED_BADGE_IDS,
  catalog: FEATURED_BADGE_CATALOG,
});
