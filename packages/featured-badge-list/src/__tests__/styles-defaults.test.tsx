import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { FeaturedBadgeRotator } from '../featured-badge-rotator';
import { FeaturedBadgeList } from '../featured-badge-list';

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '../..');
const styles = readFileSync(join(packageRoot, 'src/styles.css'), 'utf8');
const readme = readFileSync(join(packageRoot, 'README.md'), 'utf8');

describe('FeaturedBadgeRotator default CSS (footer-compact)', () => {
  it('ships inline width, no extra margin/padding, and shrink-0 behavior', () => {
    expect(styles).toMatch(/\.fbl-rotator\s*\{[^}]*width:\s*auto;/s);
    expect(styles).toMatch(/\.fbl-rotator\s*\{[^}]*max-width:\s*12rem;/s);
    expect(styles).toMatch(/\.fbl-rotator\s*\{[^}]*flex-shrink:\s*0;/s);
    expect(styles).toMatch(/\.fbl-rotator\s*\{[^}]*margin:\s*0;/s);
    expect(styles).toMatch(/\.fbl-rotator\s*\{[^}]*padding:\s*0;/s);
    expect(styles).not.toMatch(/\.fbl-rotator\s*\{[^}]*width:\s*100%;/s);
    expect(styles).not.toMatch(/\.fbl-rotator\s*\{[^}]*margin-inline:\s*auto;/s);
    expect(styles).not.toMatch(/\.fbl-rotator\s*\{[^}]*padding-top:\s*0\.5rem;/s);
  });

  it('keeps compact badge sizing and muted opacity (not grayscale)', () => {
    expect(styles).toMatch(/\.fbl-rotator__img\s*\{[^}]*height:\s*1\.75rem;/s);
    expect(styles).toMatch(/@media \(min-width:\s*640px\)\s*\{\s*\.fbl-rotator__img\s*\{[^}]*height:\s*2rem;/s);
    expect(styles).toMatch(/\.fbl-rotator__img\s*\{[^}]*max-width:\s*12rem;/s);
    expect(styles).toMatch(/\.fbl-rotator__item--active\s*\{[^}]*opacity:\s*0\.5;/s);
    expect(styles).toMatch(
      /\.fbl-rotator__item--active:hover,\s*\.fbl-rotator__item--active:focus-within\s*\{[^}]*opacity:\s*0\.8;/s,
    );
    expect(styles).not.toMatch(/grayscale/i);
  });

  it('renders the default rotator class for host overrides', () => {
    const { container } = render(
      <FeaturedBadgeRotator
        badges={[
          {
            href: 'https://example.com/a',
            src: 'https://example.com/a.svg',
            alt: 'Badge A',
          },
        ]}
      />,
    );
    expect(container.querySelector('ul.fbl-rotator')).toBeTruthy();
  });
});

describe('docs prefer FeaturedBadgeRotator', () => {
  it('recommends the /rotator import and default 4500ms path before the list', () => {
    const rotatorHeading = readme.indexOf('## Quick start (prefer `FeaturedBadgeRotator`)');
    const listApi = readme.indexOf('### `FeaturedBadgeList` (multi-badge layout)');
    const rotatorApi = readme.indexOf('### `FeaturedBadgeRotator` (preferred)');
    expect(rotatorHeading).toBeGreaterThan(-1);
    expect(rotatorApi).toBeGreaterThan(-1);
    expect(listApi).toBeGreaterThan(rotatorApi);
    expect(readme).toContain('@sherotree/featured-badge-list/rotator');
    expect(readme).toContain('`4500`');
    expect(readme).toContain('prefers-reduced-motion');
    expect(readme).not.toContain('!m-0 !w-auto max-w-[12rem] shrink-0 !pt-0');
  });

  it('keeps FeaturedBadgeList as the multi-badge option without renaming', () => {
    expect(readme).toContain('several badges visible at the same time');
    const { container } = render(
      <FeaturedBadgeList
        badges={[
          {
            href: 'https://example.com/a',
            src: 'https://example.com/a.svg',
            alt: 'Badge A',
          },
        ]}
      />,
    );
    expect(container.querySelector('ul.fbl-list')).toBeTruthy();
  });
});
