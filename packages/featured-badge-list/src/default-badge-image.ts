/**
 * Neutral package fallback badge image.
 *
 * Used when LaunchHub marks `badgeRequired` but supplies no official badge
 * asset URL. This is intentionally generic — it is NOT an official provider
 * badge and must not be presented as one. Consumers should override `src`
 * with a verified directory asset when they have one.
 */

/** Intrinsic size of {@link DEFAULT_FEATURED_BADGE_IMAGE_SRC}. */
export const DEFAULT_FEATURED_BADGE_IMAGE_WIDTH = 200;
export const DEFAULT_FEATURED_BADGE_IMAGE_HEIGHT = 54;

/**
 * Compact SVG (data URL) so the fallback ships inside JS with no extra npm
 * asset packaging. Safe for `<img src>` in SSR and browsers.
 */
const DEFAULT_BADGE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="54" viewBox="0 0 200 54" role="img" aria-label="Generic listed badge">
  <rect x="0.5" y="0.5" width="199" height="53" rx="8" fill="#f4f4f5" stroke="#d4d4d8"/>
  <text x="100" y="24" text-anchor="middle" font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif" font-size="11" font-weight="600" letter-spacing="0.08em" fill="#71717a">LISTED</text>
  <text x="100" y="40" text-anchor="middle" font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif" font-size="10" fill="#a1a1aa">generic badge</text>
</svg>`;

export const DEFAULT_FEATURED_BADGE_IMAGE_SRC = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(DEFAULT_BADGE_SVG)}`;

/** True when `src` is missing, blank, or clearly not an image URL. */
export function needsDefaultBadgeImage(src: string | undefined | null): boolean {
  if (src == null) return true;
  const trimmed = String(src).trim();
  if (!trimmed) return true;
  // Former stub pattern: catalog used the directory homepage as a fake `src`.
  if (/^https?:\/\//i.test(trimmed) && !/\.(svg|png|webp|gif|jpe?g)(\?|#|$)/i.test(trimmed)) {
    // Allow known image CDN/API paths without a file extension (e.g. query SVG APIs).
    if (/\/badges?\//i.test(trimmed) || /[?&]badge/i.test(trimmed) || /\/badge(\/|$|\?)/i.test(trimmed)) {
      return false;
    }
    // Bare site roots / HTML pages are not badge images.
    try {
      const url = new URL(trimmed);
      const path = url.pathname.replace(/\/+$/, '') || '/';
      if (path === '/' && !url.search) return true;
    } catch {
      return true;
    }
  }
  return false;
}
