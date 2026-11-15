import type { FeaturedBadgeItem } from './types';

/**
 * Build a PeerPush product badge embed from your PeerPush slug.
 * Example: `peerpushListing('boregame')` → `/p/boregame` + `/badge.png`.
 */
export function peerpushListing(
  slug: string,
  options: { alt?: string; width?: number; height?: number } = {},
): FeaturedBadgeItem {
  const trimmed = slug.trim().replace(/^\/+|\/+$/g, '');
  return {
    id: 'peerpush',
    href: `https://peerpush.com/p/${trimmed}`,
    src: `https://peerpush.com/p/${trimmed}/badge.png`,
    alt: options.alt ?? 'Featured on PeerPush',
    width: options.width ?? 230,
    height: options.height ?? 54,
  };
}

/**
 * Build a FoundrList product badge embed from your FoundrList product slug.
 */
export function foundrlistListing(
  slug: string,
  options: { alt?: string; width?: number; height?: number } = {},
): FeaturedBadgeItem {
  const trimmed = slug.trim().replace(/^\/+|\/+$/g, '');
  return {
    id: 'foundrlist',
    href: `https://www.foundrlist.com/product/${trimmed}?utm_source=badge&utm_medium=embed`,
    src: `https://www.foundrlist.com/api/badge/${trimmed}`,
    alt: options.alt ?? 'Featured on FoundrList',
    width: options.width ?? 150,
    height: options.height ?? 48,
  };
}

/**
 * Build a Scout Forge app badge embed from your Scout Forge app slug.
 */
export function scoutforgeListing(
  slug: string,
  options: { alt?: string; width?: number; height?: number } = {},
): FeaturedBadgeItem {
  const trimmed = slug.trim().replace(/^\/+|\/+$/g, '');
  return {
    id: 'scoutforge',
    href: `https://scoutforge.net/apps/${trimmed}?ref=badge`,
    src: `https://scoutforge.net/badge/${trimmed}/image?theme=light&size=default`,
    alt: options.alt ?? 'Featured on Scout Forge',
    width: options.width ?? 240,
    height: options.height ?? 58,
  };
}

/**
 * Build a TryLaunch / Launch listing href override (badge image is generic).
 */
export function trylaunchListing(
  slug: string,
  options: { alt?: string; width?: number; height?: number } = {},
): FeaturedBadgeItem {
  const trimmed = slug.trim().replace(/^\/+|\/+$/g, '');
  return {
    id: 'trylaunch',
    href: `https://trylaunch.ai/launch/${trimmed}`,
    src: 'https://trylaunch.ai/badges/badge-white.png',
    alt: options.alt ?? 'Featured on Launch',
    width: options.width ?? 180,
    height: options.height ?? 53,
  };
}

/**
 * Build a ufind.best product listing href override (badge image is generic).
 */
export function ufindListing(
  slug: string,
  options: { alt?: string; width?: number; height?: number } = {},
): FeaturedBadgeItem {
  const trimmed = slug.trim().replace(/^\/+|\/+$/g, '');
  return {
    id: 'ufind',
    href: `https://ufind.best/products/${trimmed}`,
    src: 'https://ufind.best/badges/ufind-best-badge-light.svg',
    alt: options.alt ?? 'Featured on ufind.best',
    width: options.width ?? 150,
    height: options.height ?? 44,
  };
}
