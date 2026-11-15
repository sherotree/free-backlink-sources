export { FeaturedBadgeList } from './featured-badge-list';
export type { FeaturedBadgeListProps } from './featured-badge-list';

export {
  FEATURED_BADGE_CATALOG,
  FEATURED_BADGE_IDS,
  DEFAULT_FEATURED_BADGE_IDS,
  LISTING_REQUIRED_BADGE_IDS,
  getFeaturedBadge,
  resolveFeaturedBadges,
} from './catalog';
export type { FeaturedBadgeId, ResolveFeaturedBadgesOptions } from './catalog';

export { DEFAULT_FEATURED_BADGES } from './curated-badges';
export {
  peerpushListing,
  scoutforgeListing,
  trylaunchListing,
  ufindListing,
} from './listing-badges';
export {
  FEATURED_BADGE_PROVIDER_NOTES,
  FEATURED_BADGE_PROVIDER_NOTES_BY_ID,
  FEATURED_BADGE_PROVIDER_NOTE_IDS,
  assertProviderNotesCoverCatalog,
} from './provider-notes';
export type {
  FeaturedBadgeProviderNote,
  FeaturedBadgeProviderNoteId,
  FeaturedBadgeRequirement,
} from './provider-notes';
export type {
  FeaturedBadgeCatalog,
  FeaturedBadgeDefinition,
  FeaturedBadgeItem,
  FeaturedBadgeOverrides,
  FeaturedBadgeSelectionProps,
} from './types';
