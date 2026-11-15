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
  /**
   * When true, this row is a directory stub: product listing `href` / `src` /
   * (usually) `alt` must come from consumer `overrides`, a private `catalog`,
   * or a custom `badges` entry. Without that, `resolveFeaturedBadges` skips the
   * id instead of shipping another product’s listing URLs.
   */
  requiresListing?: boolean;
};

export type FeaturedBadgeCatalog = readonly FeaturedBadgeDefinition[];

/**
 * Per-id patches applied on top of catalog matches. Explicit consumer fields
 * always win over catalog defaults.
 */
export type FeaturedBadgeOverrides = Readonly<
  Partial<Record<string, Partial<FeaturedBadgeItem>>>
>;

/**
 * Shared selection props for list + rotator.
 * - `ids` only → resolve from `catalog` (order preserved; unknown ids skipped)
 * - `badges` only → render those items
 * - both → catalog matches first, then custom `badges`
 * - neither → entire `catalog` (default package catalog when omitted)
 * - `overrides` → shallow-merge onto catalog matches by id (explicit wins)
 */
export type FeaturedBadgeSelectionProps = {
  ids?: readonly string[];
  badges?: readonly FeaturedBadgeItem[];
  /** Override the built-in catalog (useful for tests or a private badge set). */
  catalog?: FeaturedBadgeCatalog;
  /**
   * Per-id field patches for catalog matches. Use this to supply your product
   * listing URL / badge image / alt without replacing the whole catalog.
   */
  overrides?: FeaturedBadgeOverrides;
  className?: string;
  /** Accessible name for the list landmark. */
  'aria-label'?: string;
};
