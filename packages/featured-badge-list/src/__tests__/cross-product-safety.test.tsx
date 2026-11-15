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

/** BoreGame-shaped consumer: ids only, no listing overrides (matches live SSR props). */
const BOREGAME_IDS = [
  'peerpush',
  'trylaunch',
  'ufind',
  'twelve',
  'scoutforge',
  'lovableapp',
  'turbo0',
  'startupbase',
] as const;

/** Second consumer: Uwarp-shaped, with explicit listing overrides. */
const UWAR_OVERRIDES = {
  peerpush: peerpushListing('ui-design-tools-directory', {
    alt: 'UI Design Tools Directory on PeerPush',
  }),
  scoutforge: scoutforgeListing('uwarp'),
  trylaunch: trylaunchListing('uwarp'),
  ufind: ufindListing('free-ui-design-tools-directory'),
} as const;

function serializedBadgeFields(items: { href: string; src: string; alt: string }[]): string {
  return items.map(item => `${item.href}\n${item.src}\n${item.alt}`).join('\n');
}

describe('cross-product safety (no silent foreign listing leak)', () => {
  it('marks listing-bound providers that lack a public product-agnostic badge image', () => {
    expect(LISTING_REQUIRED_BADGE_IDS).toEqual(['peerpush', 'scoutforge']);
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
    expect(resolved.map(badge => badge.id)).not.toContain('peerpush');
    expect(resolved.map(badge => badge.id)).not.toContain('scoutforge');

    // Generic directory embeds still resolve.
    expect(resolved.map(badge => badge.id)).toEqual(
      expect.arrayContaining([
        'trylaunch',
        'ufind',
        'twelve',
        'lovableapp',
        'startupbase',
      ]),
    );

    const trylaunch = resolved.find(badge => badge.id === 'trylaunch');
    expect(trylaunch?.href).toBe('https://trylaunch.ai/');
    expect(trylaunch?.src).toBe('https://trylaunch.ai/badges/badge-white.png');

    const ufind = resolved.find(badge => badge.id === 'ufind');
    expect(ufind?.href).toBe('https://ufind.best/');
    expect(ufind?.src).toBe('https://ufind.best/badges/ufind-best-badge-light.svg');
  });

  it('explicit Uwarp overrides win and are not applied to an ids-only consumer', () => {
    const uwarpResolved = resolveFeaturedBadges({
      ids: ['peerpush', 'trylaunch', 'ufind', 'scoutforge', 'twelve'],
      overrides: {
        peerpush: {
          href: UWAR_OVERRIDES.peerpush.href,
          src: UWAR_OVERRIDES.peerpush.src,
          alt: UWAR_OVERRIDES.peerpush.alt,
        },
        scoutforge: {
          href: UWAR_OVERRIDES.scoutforge.href,
          src: UWAR_OVERRIDES.scoutforge.src,
          alt: UWAR_OVERRIDES.scoutforge.alt,
        },
        trylaunch: {
          href: UWAR_OVERRIDES.trylaunch.href,
        },
        ufind: {
          href: UWAR_OVERRIDES.ufind.href,
        },
      },
    });

    expect(uwarpResolved.find(badge => badge.id === 'peerpush')).toMatchObject({
      href: 'https://peerpush.com/p/ui-design-tools-directory',
      src: 'https://peerpush.com/p/ui-design-tools-directory/badge.png',
      alt: 'UI Design Tools Directory on PeerPush',
    });
    expect(uwarpResolved.find(badge => badge.id === 'trylaunch')?.href).toBe(
      'https://trylaunch.ai/launch/uwarp',
    );
    expect(uwarpResolved.find(badge => badge.id === 'twelve')?.href).toBe('https://twelve.tools');

    const boregameResolved = resolveFeaturedBadges({ ids: BOREGAME_IDS });
    const boregameBlob = serializedBadgeFields(boregameResolved);
    expect(boregameBlob).not.toContain('ui-design-tools-directory');
    expect(boregameBlob).not.toContain('uwarp');
  });

  it('SSR rotator markup keeps every resolved <a>+<img> for crawlers', () => {
    const { container } = render(
      <FeaturedBadgeRotator
        ids={['twelve', 'trylaunch', 'peerpush']}
        overrides={{
          peerpush: {
            href: 'https://peerpush.com/p/boregame',
            src: 'https://peerpush.com/p/boregame/badge.png',
            alt: 'BoreGame on PeerPush',
          },
        }}
      />,
    );

    const anchors = [...container.querySelectorAll('a.fbl-rotator__link')];
    expect(anchors).toHaveLength(3);
    expect(anchors.map(anchor => anchor.getAttribute('href'))).toEqual([
      'https://twelve.tools',
      'https://trylaunch.ai/',
      'https://peerpush.com/p/boregame',
    ]);
    expect(container.querySelectorAll('img.fbl-rotator__img')).toHaveLength(3);
    expect(container.querySelector('ul.fbl-rotator')).toBeTruthy();
  });

  it('DEFAULT_FEATURED_BADGE_IDS without overrides omits listing-bound stubs only', () => {
    const resolved = resolveFeaturedBadges({ ids: DEFAULT_FEATURED_BADGE_IDS });
    expect(resolved.map(badge => badge.id)).toEqual(['neeed', 'trylaunch', 'ufind', 'twelve']);
    for (const marker of FOREIGN_PRODUCT_MARKERS) {
      expect(serializedBadgeFields(resolved).toLowerCase()).not.toContain(marker.toLowerCase());
    }
  });
});

describe('listing helpers', () => {
  it('builds PeerPush / ScoutForge embeds from consumer slugs', () => {
    expect(peerpushListing('boregame')).toMatchObject({
      id: 'peerpush',
      href: 'https://peerpush.com/p/boregame',
      src: 'https://peerpush.com/p/boregame/badge.png',
    });
    expect(scoutforgeListing('my-app').href).toBe('https://scoutforge.net/apps/my-app?ref=badge');
  });
});
