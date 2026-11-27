import { describe, expect, it } from 'vitest';
import {
  DEFAULT_BADGE_IMAGE_IDS,
  DEFAULT_FEATURED_BADGE_IDS,
  FEATURED_BADGE_CATALOG,
  FEATURED_BADGE_IDS,
  LISTING_REQUIRED_BADGE_IDS,
  getFeaturedBadge,
  resolveFeaturedBadges,
} from '../catalog';
import { DEFAULT_FEATURED_BADGES } from '../curated-badges';
import {
  DEFAULT_FEATURED_BADGE_IMAGE_SRC,
  needsDefaultBadgeImage,
} from '../default-badge-image';

describe('FEATURED_BADGE_CATALOG', () => {
  it('has unique ids', () => {
    const ids = FEATURED_BADGE_CATALOG.map(badge => badge.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('exposes FEATURED_BADGE_IDS in catalog order', () => {
    expect(FEATURED_BADGE_IDS).toEqual(FEATURED_BADGE_CATALOG.map(badge => badge.id));
  });

  it('keeps all 28 LaunchHub badgeRequired catalog members', () => {
    expect(FEATURED_BADGE_CATALOG).toHaveLength(28);
  });

  it('includes LaunchHub badgeRequired providers with known public assets', () => {
    for (const id of ['sumodir', 'yodirectory', 'twelve', 'ufind'] as const) {
      expect(getFeaturedBadge(id)?.id).toBe(id);
      expect(getFeaturedBadge(id)?.usesDefaultBadgeImage).not.toBe(true);
      expect(needsDefaultBadgeImage(getFeaturedBadge(id)?.src)).toBe(false);
    }
  });

  it('marks missing-official-asset rows with usesDefaultBadgeImage', () => {
    expect(DEFAULT_BADGE_IMAGE_IDS).toHaveLength(14);
    for (const id of DEFAULT_BADGE_IMAGE_IDS) {
      expect(getFeaturedBadge(id)?.usesDefaultBadgeImage).toBe(true);
    }
  });

  it('keeps DEFAULT_FEATURED_BADGE_IDS as a known subset with official assets', () => {
    for (const id of DEFAULT_FEATURED_BADGE_IDS) {
      expect(getFeaturedBadge(id)?.id).toBe(id);
      expect(getFeaturedBadge(id)?.usesDefaultBadgeImage).not.toBe(true);
    }
  });

  it('keeps LISTING_REQUIRED_BADGE_IDS empty after default-image fallback', () => {
    expect(LISTING_REQUIRED_BADGE_IDS).toEqual([]);
  });
});

describe('resolveFeaturedBadges', () => {
  it('renders the full catalog when nothing is selected (all 28)', () => {
    const resolved = resolveFeaturedBadges();
    expect(resolved).toHaveLength(28);
    expect(resolved.map(badge => badge.id)).toEqual([...FEATURED_BADGE_IDS]);
  });

  it('supplies the neutral fallback image for DEFAULT_BADGE_IMAGE_IDS', () => {
    const resolved = resolveFeaturedBadges({ ids: DEFAULT_BADGE_IMAGE_IDS });
    expect(resolved).toHaveLength(14);
    for (const badge of resolved) {
      expect(badge.src).toBe(DEFAULT_FEATURED_BADGE_IMAGE_SRC);
      expect(badge.src.startsWith('data:image/svg+xml')).toBe(true);
      expect(badge.src.toLowerCase()).not.toContain('official');
    }
  });

  it('preserves genuine official badge images', () => {
    const twelve = resolveFeaturedBadges({ ids: ['twelve'] })[0];
    expect(twelve?.src).toBe('https://twelve.tools/badge0-white.svg');
    expect(twelve?.src).not.toBe(DEFAULT_FEATURED_BADGE_IMAGE_SRC);
  });

  it('preserves id order and skips unknown ids', () => {
    const resolved = resolveFeaturedBadges({
      ids: ['twelve', 'missing', 'neeed', 'dangai'],
    });
    expect(resolved.map(badge => badge.id)).toEqual(['twelve', 'neeed', 'dangai']);
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

  it('lets overrides replace the fallback with a verified badge image', () => {
    const resolved = resolveFeaturedBadges({
      ids: ['dangai'],
      overrides: {
        dangai: {
          href: 'https://dang.ai/my-app',
          src: 'https://cdn.example.com/dang-official-badge.svg',
          alt: 'My App on Dang AI',
        },
      },
    });
    expect(resolved).toEqual([
      {
        id: 'dangai',
        href: 'https://dang.ai/my-app',
        src: 'https://cdn.example.com/dang-official-badge.svg',
        alt: 'My App on Dang AI',
        width: 200,
        height: 54,
      },
    ]);
  });

  it('keeps the fallback when an override only patches href', () => {
    const resolved = resolveFeaturedBadges({
      ids: ['dangai'],
      overrides: { dangai: { href: 'https://dang.ai/products/my-app' } },
    });
    expect(resolved).toHaveLength(1);
    expect(resolved[0]?.href).toBe('https://dang.ai/products/my-app');
    expect(resolved[0]?.src).toBe(DEFAULT_FEATURED_BADGE_IMAGE_SRC);
  });

  it('restores the fallback when an override sets a non-image src', () => {
    const resolved = resolveFeaturedBadges({
      ids: ['dangai'],
      overrides: { dangai: { src: 'https://dang.ai/' } },
    });
    expect(resolved[0]?.src).toBe(DEFAULT_FEATURED_BADGE_IMAGE_SRC);
  });

  it('still skips requiresListing rows without listing overrides', () => {
    const catalog = [
      {
        id: 'bound',
        href: 'https://example.com/',
        src: 'https://example.com/',
        alt: 'Bound',
        requiresListing: true,
      },
    ] as const;
    expect(resolveFeaturedBadges({ ids: ['bound'], catalog })).toEqual([]);
    expect(
      resolveFeaturedBadges({
        ids: ['bound'],
        catalog,
        overrides: {
          bound: {
            href: 'https://example.com/p/app',
            src: 'https://example.com/p/app/badge.png',
          },
        },
      }),
    ).toMatchObject([
      {
        id: 'bound',
        href: 'https://example.com/p/app',
        src: 'https://example.com/p/app/badge.png',
      },
    ]);
  });
});

describe('DEFAULT_FEATURED_BADGES', () => {
  it('resolves default ids without overrides', () => {
    expect(DEFAULT_FEATURED_BADGES.map(badge => badge.id)).toEqual([...DEFAULT_FEATURED_BADGE_IDS]);
  });
});

describe('needsDefaultBadgeImage', () => {
  it('detects missing and homepage stub srcs', () => {
    expect(needsDefaultBadgeImage(undefined)).toBe(true);
    expect(needsDefaultBadgeImage('')).toBe(true);
    expect(needsDefaultBadgeImage('https://dang.ai/')).toBe(true);
    expect(needsDefaultBadgeImage('https://twelve.tools/badge0-white.svg')).toBe(false);
    expect(
      needsDefaultBadgeImage(
        'https://fazier.com/api/v1/public/badges/launch_badges.svg?badge_type=launched&theme=light',
      ),
    ).toBe(false);
  });
});
