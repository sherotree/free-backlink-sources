import { useEffect, useState } from 'react';
import { cn } from './cn';
import { resolveFeaturedBadges } from './catalog';
import { getFeaturedBadgeKey } from './badge-key';
import type { FeaturedBadgeSelectionProps } from './types';

const DEFAULT_ROTATE_MS = 4500;

export type FeaturedBadgeRotatorProps = FeaturedBadgeSelectionProps & {
  /** Rotation interval in ms. Ignored when `prefers-reduced-motion` is set. */
  intervalMs?: number;
};

/**
 * Preferred default presentation: one compact badge at a time (footer-friendly),
 * while every partner link + img stays in the DOM so reciprocal badge crawlers
 * still find their embed.
 *
 * Defaults: `intervalMs={4500}`, muted opacity, auto-rotate unless
 * `prefers-reduced-motion: reduce`. Import from
 * `@sherotree/featured-badge-list/rotator` in Next.js App Router so the
 * `"use client"` boundary is preserved. Import `styles.css` once for layout.
 */
export function FeaturedBadgeRotator(props: FeaturedBadgeRotatorProps) {
  const { ids, badges, catalog, className, intervalMs = DEFAULT_ROTATE_MS } = props;
  const ariaLabel = props['aria-label'] ?? 'Featured on communities and platforms';
  const items = resolveFeaturedBadges({ ids, badges, catalog });
  const selectionKey = items.map(badge => badge.id ?? badge.href).join('|');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [selectionKey]);

  useEffect(() => {
    if (items.length < 2) {
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      return;
    }

    const interval = setInterval(() => {
      setIndex(current => (current + 1) % items.length);
    }, intervalMs);

    return () => {
      clearInterval(interval);
    };
  }, [items.length, intervalMs, selectionKey]);

  if (items.length === 0) {
    return null;
  }

  const activeIndex = index % items.length;

  return (
    <ul className={cn('fbl-rotator', className)} aria-label={ariaLabel}>
      {items.map((badge, badgeIndex) => {
        const isActive = badgeIndex === activeIndex;
        return (
          <li
            key={getFeaturedBadgeKey(badge, badgeIndex)}
            className={cn(
              'fbl-rotator__item',
              isActive ? 'fbl-rotator__item--active' : 'fbl-rotator__item--hidden',
            )}
            aria-hidden={isActive ? undefined : true}
          >
            <a
              href={badge.href}
              target="_blank"
              rel="noopener"
              title={badge.title ?? badge.alt}
              tabIndex={isActive ? 0 : -1}
              className="fbl-rotator__link"
            >
              <img
                src={badge.src}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                loading="lazy"
                className="fbl-rotator__img"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
