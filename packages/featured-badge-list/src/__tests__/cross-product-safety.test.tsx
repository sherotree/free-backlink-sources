import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import {
  DEFAULT_BADGE_IMAGE_IDS,
  DEFAULT_FEATURED_BADGE_IDS,
  FEATURED_BADGE_CATALOG,
  FEATURED_BADGE_IDS,
  LISTING_REQUIRED_BADGE_IDS,
  resolveFeaturedBadges,
} from '../catalog';
import { DEFAULT_FEATURED_BADGE_IMAGE_SRC } from '../default-badge-image';
import { FeaturedBadgeRotator } from '../featured-badge-rotator';
import {
  peerpushListing,
  scoutforgeListing,
  trylaunchListing,
  ufindListing,
} from '../listing-badges';

/** Reference-product strings that must never ship as silent defaults. */
const FOREIGN_PRODUCT_MARKERS = [
  'uwarp',
  'ui-design-tools-directory',
  'free-ui-design-tools-directory',
  'UI Design Tools Directory',
] as const;

function serializedBadgeFields(items: { href: string; src: string; alt: string }[]): string {
  return items.map(item => `${item.href}\n${item.src}\n${item.alt}`).join('\n');
}

describe('cross-product safety (no silent foreign listing leak)', () => {
  it('keeps LISTING_REQUIRED_BADGE_IDS empty while default-image ids render', () => {
    expect(LISTING_REQUIRED_BADGE_IDS).toEqual([]);
    expect(DEFAULT_BADGE_IMAGE_IDS).toHaveLength(14);
  });

  it('keeps default catalog free of reference-product listing URLs / alt text', () => {
    const blob = serializedBadgeFields([...FEATURED_BADGE_CATALOG]);
    for (const marker of FOREIGN_PRODUCT_MARKERS) {
      expect(blob.toLowerCase()).not.toContain(marker.toLowerCase());
    }
  });

  it('full catalog resolve never emits foreign product listings', () => {
    const resolved = resolveFeaturedBadges({ ids: FEATURED_BADGE_IDS });
    expect(resolved).toHaveLength(28);
    const blob = serializedBadgeFields(resolved);
    for (const marker of FOREIGN_PRODUCT_MARKERS) {
      expect(blob.toLowerCase()).not.toContain(marker.toLowerCase());
    }
  });

  it('default-image rows do not claim to be official provider artwork in src', () => {
    const resolved = resolveFeaturedBadges({ ids: DEFAULT_BADGE_IMAGE_IDS });
    for (const badge of resolved) {
      expect(badge.src).toBe(DEFAULT_FEATURED_BADGE_IMAGE_SRC);
      expect(badge.alt.toLowerCase()).toContain('generic badge');
    }
  });

  it('explicit overrides win and are not applied to an ids-only consumer', () => {
    const overridden = resolveFeaturedBadges({
      ids: ['ufind', 'twelve', 'dangai'],
      overrides: {
        dangai: {
          href: 'https://dang.ai/p/ui-design-tools-directory',
          src: 'https://dang.ai/badge-for-uwarp.svg',
          alt: 'UI Design Tools Directory on Dang AI',
        },
        ufind: {
          href: ufindListing('free-ui-design-tools-directory').href,
        },
      },
    });

    expect(overridden.find(badge => badge.id === 'dangai')).toMatchObject({
      href: 'https://dang.ai/p/ui-design-tools-directory',
      src: 'https://dang.ai/badge-for-uwarp.svg',
    });
    expect(overridden.find(badge => badge.id === 'ufind')?.href).toBe(
      'https://ufind.best/products/free-ui-design-tools-directory',
    );
    expect(overridden.find(badge => badge.id === 'twelve')?.href).toBe('https://twelve.tools');

    const plain = resolveFeaturedBadges({ ids: ['ufind', 'twelve', 'dangai'] });
    const plainBlob = serializedBadgeFields(plain);
    expect(plainBlob).not.toContain('ui-design-tools-directory');
    expect(plainBlob).not.toContain('uwarp');
    expect(plain.find(badge => badge.id === 'dangai')?.src).toBe(DEFAULT_FEATURED_BADGE_IMAGE_SRC);
  });

  it('SSR rotator markup keeps every resolved <a>+<img> for all 28 catalog ids', () => {
    const { container } = render(<FeaturedBadgeRotator ids={FEATURED_BADGE_IDS} />);

    const anchors = [...container.querySelectorAll('a.fbl-rotator__link')];
    expect(anchors).toHaveLength(28);
    expect(container.querySelectorAll('img.fbl-rotator__img')).toHaveLength(28);
    expect(container.querySelector('ul.fbl-rotator')).toBeTruthy();
  });

  it('DEFAULT_FEATURED_BADGE_IDS resolve with official assets only', () => {
    const resolved = resolveFeaturedBadges({ ids: DEFAULT_FEATURED_BADGE_IDS });
    expect(resolved.map(badge => badge.id)).toEqual([...DEFAULT_FEATURED_BADGE_IDS]);
    for (const badge of resolved) {
      expect(badge.src).not.toBe(DEFAULT_FEATURED_BADGE_IMAGE_SRC);
    }
    for (const marker of FOREIGN_PRODUCT_MARKERS) {
      expect(serializedBadgeFields(resolved).toLowerCase()).not.toContain(marker.toLowerCase());
    }
  });
});

describe('listing helpers', () => {
  it('builds slug helpers for custom embeds (catalog membership not required)', () => {
    expect(peerpushListing('boregame')).toMatchObject({
      id: 'peerpush',
      href: 'https://peerpush.com/p/boregame',
      src: 'https://peerpush.com/p/boregame/badge.png',
    });
    expect(scoutforgeListing('my-app').href).toBe('https://scoutforge.net/apps/my-app?ref=badge');
    expect(trylaunchListing('my-app').href).toBe('https://trylaunch.ai/launch/my-app');
    expect(ufindListing('my-app').href).toBe('https://ufind.best/products/my-app');
  });
});
