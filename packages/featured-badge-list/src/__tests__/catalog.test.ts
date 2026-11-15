import { describe, expect, it } from 'vitest';
import {
  DEFAULT_FEATURED_BADGE_IDS,
  FEATURED_BADGE_CATALOG,
  FEATURED_BADGE_IDS,
  LISTING_REQUIRED_BADGE_IDS,
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

  it('includes the newly confirmed badge providers', () => {
    for (const id of ['sumodir', 'yodirectory', 'startupbase'] as const) {
      expect(getFeaturedBadge(id)?.id).toBe(id);
    }
  });

  it('keeps DEFAULT_FEATURED_BADGE_IDS as a known subset', () => {
    for (const id of DEFAULT_FEATURED_BADGE_IDS) {
      expect(getFeaturedBadge(id)?.id).toBe(id);
    }
  });
});

describe('resolveFeaturedBadges', () => {
  it('returns renderable catalog rows when nothing is selected (skips listing stubs)', () => {
    const resolved = resolveFeaturedBadges();
    expect(resolved).toHaveLength(
      FEATURED_BADGE_CATALOG.length - LISTING_REQUIRED_BADGE_IDS.length,
    );
    expect(resolved.every(badge => !LISTING_REQUIRED_BADGE_IDS.includes(badge.id as never))).toBe(
      true,
    );
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

  it('merges overrides onto catalog matches with explicit fields winning', () => {
    const resolved = resolveFeaturedBadges({
      ids: ['twelve', 'peerpush'],
      overrides: {
        twelve: { href: 'https://twelve.tools/my-tool' },
        peerpush: {
          href: 'https://peerpush.com/p/my-app',
          src: 'https://peerpush.com/p/my-app/badge.png',
          alt: 'My App on PeerPush',
        },
      },
    });
    expect(resolved).toHaveLength(2);
    expect(resolved[0]).toMatchObject({
      id: 'twelve',
      href: 'https://twelve.tools/my-tool',
      src: 'https://twelve.tools/badge0-white.svg',
      alt: 'Featured on Twelve Tools',
    });
    expect(resolved[1]).toMatchObject({
      id: 'peerpush',
      href: 'https://peerpush.com/p/my-app',
      src: 'https://peerpush.com/p/my-app/badge.png',
      alt: 'My App on PeerPush',
    });
  });

  it('does not treat a partial listing override as enough for requiresListing ids', () => {
    const resolved = resolveFeaturedBadges({
      ids: ['peerpush'],
      overrides: { peerpush: { href: 'https://peerpush.com/p/my-app' } },
    });
    expect(resolved).toEqual([]);
  });
});

describe('DEFAULT_FEATURED_BADGES', () => {
  it('resolves only non-listing-bound default ids without overrides', () => {
    expect(DEFAULT_FEATURED_BADGES.map(badge => badge.id)).toEqual([
      'neeed',
      'trylaunch',
      'ufind',
      'twelve',
    ]);
  });
});
