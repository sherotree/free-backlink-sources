import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import {
  DEFAULT_FEATURED_BADGE_IDS,
  FEATURED_BADGE_CATALOG,
  LISTING_REQUIRED_BADGE_IDS,
  getFeaturedBadge,
  resolveFeaturedBadges,
} from '../catalog';
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

/** BoreGame-shaped consumer: ids only, no listing overrides. */
const BOREGAME_IDS = [
  'ufind',
  'twelve',
  'lovableapp',
  'turbo0',
  'dangai',
  'productfame',
] as const;

function serializedBadgeFields(items: { href: string; src: string; alt: string }[]): string {
  return items.map(item => `${item.href}\n${item.src}\n${item.alt}`).join('\n');
}

describe('cross-product safety (no silent foreign listing leak)', () => {
  it('marks listing-bound providers that lack a verified public badge image', () => {
    expect(LISTING_REQUIRED_BADGE_IDS.length).toBeGreaterThan(0);
    for (const id of LISTING_REQUIRED_BADGE_IDS) {
      expect(getFeaturedBadge(id)?.requiresListing).toBe(true);
    }
  });

  it('keeps default catalog free of reference-product listing URLs / alt text', () => {
    const blob = serializedBadgeFields([...FEATURED_BADGE_CATALOG]);
    for (const marker of FOREIGN_PRODUCT_MARKERS) {
      expect(blob.toLowerCase()).not.toContain(marker.toLowerCase());
    }
  });

  it('ids-only BoreGame-shaped selection never emits foreign product listings', () => {
    const resolved = resolveFeaturedBadges({ ids: BOREGAME_IDS });
    const blob = serializedBadgeFields(resolved);

    for (const marker of FOREIGN_PRODUCT_MARKERS) {
      expect(blob.toLowerCase()).not.toContain(marker.toLowerCase());
    }

    // Listing-bound stubs are skipped without overrides (safe + explainable).
    expect(resolved.map(badge => badge.id)).not.toContain('dangai');
    expect(resolved.map(badge => badge.id)).not.toContain('productfame');

    // Generic directory embeds still resolve.
    expect(resolved.map(badge => badge.id)).toEqual(
      expect.arrayContaining(['ufind', 'twelve', 'lovableapp', 'turbo0']),
    );

    const ufind = resolved.find(badge => badge.id === 'ufind');
    expect(ufind?.href).toBe('https://ufind.best/');
    expect(ufind?.src).toBe('https://ufind.best/badges/ufind-best-badge-light.svg');
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

    const boregameResolved = resolveFeaturedBadges({ ids: BOREGAME_IDS });
    const boregameBlob = serializedBadgeFields(boregameResolved);
    expect(boregameBlob).not.toContain('ui-design-tools-directory');
    expect(boregameBlob).not.toContain('uwarp');
  });

  it('SSR rotator markup keeps every resolved <a>+<img> for crawlers', () => {
    const { container } = render(
      <FeaturedBadgeRotator
        ids={['twelve', 'ufind', 'dangai']}
        overrides={{
          dangai: {
            href: 'https://dang.ai/my-app',
            src: 'https://dang.ai/badge.svg',
            alt: 'My App on Dang AI',
          },
        }}
      />,
    );

    const anchors = [...container.querySelectorAll('a.fbl-rotator__link')];
    expect(anchors).toHaveLength(3);
    expect(anchors.map(anchor => anchor.getAttribute('href'))).toEqual([
      'https://twelve.tools',
      'https://ufind.best/',
      'https://dang.ai/my-app',
    ]);
    expect(container.querySelectorAll('img.fbl-rotator__img')).toHaveLength(3);
    expect(container.querySelector('ul.fbl-rotator')).toBeTruthy();
  });

  it('DEFAULT_FEATURED_BADGE_IDS without overrides omits listing-bound stubs only', () => {
    const resolved = resolveFeaturedBadges({ ids: DEFAULT_FEATURED_BADGE_IDS });
    expect(resolved.map(badge => badge.id)).toEqual([...DEFAULT_FEATURED_BADGE_IDS]);
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
