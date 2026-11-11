import { describe, expect, it } from 'vitest';
import {
  DEFAULT_FEATURED_BADGE_IDS,
  FEATURED_BADGE_CATALOG,
  FEATURED_BADGE_IDS,
  getFeaturedBadge,
  resolveFeaturedBadges,
} from '../catalog';
import { DEFAULT_FEATURED_BADGES } from '../curated-badges';

describe('FEATURED_BADGE_CATALOG', () => {
  it('has unique ids', () => {
    const ids = FEATURED_BADGE_CATALOG.map(badge => badge.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('exposes FEATURED_BADGE_IDS in catalog order', () => {
    expect(FEATURED_BADGE_IDS).toEqual(FEATURED_BADGE_CATALOG.map(badge => badge.id));
  });

  it('keeps DEFAULT_FEATURED_BADGE_IDS as a known subset', () => {
    for (const id of DEFAULT_FEATURED_BADGE_IDS) {
      expect(getFeaturedBadge(id)?.id).toBe(id);
    }
  });
});

describe('resolveFeaturedBadges', () => {
  it('returns the full catalog when nothing is selected', () => {
    expect(resolveFeaturedBadges()).toHaveLength(FEATURED_BADGE_CATALOG.length);
  });

  it('preserves id order and skips unknown ids', () => {
    const resolved = resolveFeaturedBadges({
      ids: ['twelve', 'missing', 'neeed'],
    });
    expect(resolved.map(badge => badge.id)).toEqual(['twelve', 'neeed']);
  });

  it('appends custom badges after catalog matches', () => {
    const custom = {
      href: 'https://example.com',
      src: 'https://example.com/badge.svg',
      alt: 'Example',
    };
    const resolved = resolveFeaturedBadges({
      ids: ['twelve'],
      badges: [custom],
    });
    expect(resolved).toHaveLength(2);
    expect(resolved[0]?.id).toBe('twelve');
    expect(resolved[1]).toEqual(custom);
  });

  it('uses a private catalog override', () => {
    const catalog = [
      {
        id: 'private',
        href: 'https://example.com/p',
        src: 'https://example.com/p.svg',
        alt: 'Private',
      },
    ] as const;
    expect(resolveFeaturedBadges({ ids: ['private'], catalog })).toEqual([...catalog]);
  });
});

describe('DEFAULT_FEATURED_BADGES', () => {
  it('matches DEFAULT_FEATURED_BADGE_IDS length', () => {
    expect(DEFAULT_FEATURED_BADGES).toHaveLength(DEFAULT_FEATURED_BADGE_IDS.length);
  });
});
