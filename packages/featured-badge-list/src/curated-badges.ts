import {
  DEFAULT_FEATURED_BADGE_IDS,
  FEATURED_BADGE_CATALOG,
  resolveFeaturedBadges,
} from './catalog';

/**
 * Resolved badge objects for `DEFAULT_FEATURED_BADGE_IDS` with no overrides.
 * Listing-bound ids (`requiresListing`) are omitted here — pass `overrides`
 * (or listing helpers) when rendering those providers.
 */
export const DEFAULT_FEATURED_BADGES = resolveFeaturedBadges({
  ids: DEFAULT_FEATURED_BADGE_IDS,
  catalog: FEATURED_BADGE_CATALOG,
});
