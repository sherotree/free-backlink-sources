/**
 * Single badge definition. `id` is stable for catalog selection via `ids`.
 * Custom / one-off badges may omit `id`.
 */
export type FeaturedBadgeItem = {
  id?: string;
  href: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  title?: string;
};

/** Catalog entry: `id` is required and unique within a catalog. */
export type FeaturedBadgeDefinition = FeaturedBadgeItem & {
  id: string;
};

export type FeaturedBadgeCatalog = readonly FeaturedBadgeDefinition[];

/**
 * Shared selection props for list + rotator.
 * - `ids` only → resolve from `catalog` (order preserved; unknown ids skipped)
 * - `badges` only → render those items
 * - both → catalog matches first, then custom `badges`
 * - neither → entire `catalog` (default package catalog when omitted)
 */
export type FeaturedBadgeSelectionProps = {
  ids?: readonly string[];
  badges?: readonly FeaturedBadgeItem[];
  /** Override the built-in catalog (useful for tests or a private badge set). */
  catalog?: FeaturedBadgeCatalog;
  className?: string;
  /** Accessible name for the list landmark. */
  'aria-label'?: string;
};
