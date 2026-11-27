import { useId, type CSSProperties } from 'react';
import { cn } from './cn';
import { resolveFeaturedBadges } from './catalog';
import { getFeaturedBadgeKey } from './badge-key';
import type { FeaturedBadgeSelectionProps } from './types';

export const DEFAULT_ROTATE_MS = 4500;

export type FeaturedBadgeRotatorProps = FeaturedBadgeSelectionProps & {
  /**
   * CSS rotation interval in ms. Ignored when there is only one badge or when
   * `prefers-reduced-motion: reduce` is set (see stylesheet).
   */
  intervalMs?: number;
};

function sanitizeCssIdent(value: string): string {
  const cleaned = value.replace(/[^a-zA-Z0-9_-]/g, '');
  return cleaned.length > 0 ? cleaned : 'fbl';
}

function buildRotatorKeyframes(name: string, count: number): string {
  const visibleEnd = 100 / count;
  const fade = Math.min(2, visibleEnd / 4);
  const hideAt = Math.min(100, visibleEnd + fade);
  // pointer-events must flip with opacity: absolute siblings share one hit box;
  // leaving invisible items clickable makes hover force opacity:.8 on a stacked
  // badge that was meant to stay hidden.
  return (
    `@keyframes ${name}{` +
    `0%,${visibleEnd}%{opacity:.5;pointer-events:auto}` +
    `${hideAt}%,100%{opacity:0;pointer-events:none}` +
    `}`
  );
}

/**
 * Default presentation (SSR-first): one compact badge at a time while every
 * partner link + img stays in the server HTML so reciprocal badge crawlers
 * still find their embed. Rotation is CSS-driven (no client hooks / no
 * `"use client"`). Use `FeaturedBadgeList` only when several badges must show
 * together.
 *
 * Defaults: `intervalMs={4500}`, muted opacity, CSS auto-rotate unless
 * `prefers-reduced-motion: reduce`. Import from the package root (or the
 * `/rotator` alias). Import `styles.css` once for layout.
 */
export function FeaturedBadgeRotator(props: FeaturedBadgeRotatorProps) {
  const { ids, badges, catalog, overrides, className, intervalMs = DEFAULT_ROTATE_MS } = props;
  const ariaLabel = props['aria-label'] ?? 'Featured on communities and platforms';
  const items = resolveFeaturedBadges({ ids, badges, catalog, overrides });
  const reactId = useId();
  const keyframeName = `fbl-rotator-${sanitizeCssIdent(reactId)}`;

  if (items.length === 0) {
    return null;
  }

  const animate = items.length > 1;
  const durationMs = Math.max(1, intervalMs) * items.length;

  return (
    <>
      {animate ? (
        <style
          // Scoped keyframes for this instance's badge count (SSR-safe, no JS timer).
          dangerouslySetInnerHTML={{
            __html: buildRotatorKeyframes(keyframeName, items.length),
          }}
        />
      ) : null}
      <ul
        className={cn('fbl-rotator', animate && 'fbl-rotator--animate', className)}
        aria-label={ariaLabel}
        style={
          animate
            ? ({
                ['--fbl-interval' as string]: `${Math.max(1, intervalMs)}ms`,
                ['--fbl-duration' as string]: `${durationMs}ms`,
              } satisfies CSSProperties)
            : undefined
        }
      >
        {items.map((badge, badgeIndex) => {
          const isFirst = badgeIndex === 0;
          return (
            <li
              key={getFeaturedBadgeKey(badge, badgeIndex)}
              className={cn(
                'fbl-rotator__item',
                animate ? 'fbl-rotator__item--animated' : undefined,
                !animate && isFirst ? 'fbl-rotator__item--active' : undefined,
                !animate && !isFirst ? 'fbl-rotator__item--hidden' : undefined,
              )}
              style={
                animate
                  ? {
                      animationName: keyframeName,
                      animationDuration: `var(--fbl-duration)`,
                      animationDelay: `${badgeIndex * Math.max(1, intervalMs)}ms`,
                    }
                  : undefined
              }
              aria-hidden={isFirst ? undefined : true}
            >
              <a
                href={badge.href}
                target="_blank"
                rel="noopener"
                title={badge.title ?? badge.alt}
                tabIndex={isFirst ? 0 : -1}
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
    </>
  );
}
