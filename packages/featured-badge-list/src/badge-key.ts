import type { FeaturedBadgeItem } from './types';

/** Stable React key: prefer catalog id, else href. */
export function getFeaturedBadgeKey(badge: FeaturedBadgeItem, index: number): string {
  if (badge.id) {
    return badge.id;
  }
  return `${badge.href}::${index}`;
}
