import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeaturedBadgeList } from '../featured-badge-list';
import { FeaturedBadgeRotator } from '../featured-badge-rotator';

const sampleBadges = [
  {
    id: 'a',
    href: 'https://example.com/a',
    src: 'https://example.com/a.svg',
    alt: 'Badge A',
    width: 100,
    height: 40,
  },
  {
    id: 'b',
    href: 'https://example.com/b',
    src: 'https://example.com/b.svg',
    alt: 'Badge B',
    width: 120,
    height: 40,
  },
] as const;

describe('FeaturedBadgeList', () => {
  it('renders nothing for an empty selection', () => {
    const { container } = render(<FeaturedBadgeList ids={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders links and images for provided badges', () => {
    render(<FeaturedBadgeList badges={[...sampleBadges]} aria-label="Partners" />);
    expect(screen.getByRole('list', { name: 'Partners' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Badge A' })).toHaveProperty(
      'href',
      'https://example.com/a',
    );
    expect(screen.getByAltText('Badge A')).toBeTruthy();
    expect(screen.getByAltText('Badge B')).toBeTruthy();
  });
});

describe('FeaturedBadgeRotator', () => {
  it('keeps every badge link in the DOM', () => {
    const { container } = render(<FeaturedBadgeRotator badges={[...sampleBadges]} />);
    const anchors = container.querySelectorAll('a[href]');
    expect(anchors).toHaveLength(2);
    expect(screen.getByAltText('Badge A')).toBeTruthy();
    expect(screen.getByAltText('Badge B')).toBeTruthy();
  });

  it('hides inactive badges from the accessibility tree', () => {
    const { container } = render(<FeaturedBadgeRotator badges={[...sampleBadges]} />);
    const hidden = container.querySelectorAll('[aria-hidden="true"]');
    expect(hidden.length).toBe(1);
  });
});
