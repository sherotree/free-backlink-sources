import { cn } from './cn';
import { resolveFeaturedBadges } from './catalog';
import { getFeaturedBadgeKey } from './badge-key';
import type { FeaturedBadgeSelectionProps } from './types';

export type FeaturedBadgeListProps = FeaturedBadgeSelectionProps;

/**
 * Optional multi-badge flex wrap when you need several embeds visible at once.
 * Prefer `FeaturedBadgeRotator` (`@sherotree/featured-badge-list/rotator`) for
 * the usual compact single-badge footer slot.
 *
 * Server-safe. Import `@sherotree/featured-badge-list/styles.css` once for layout.
 */
export function FeaturedBadgeList(props: FeaturedBadgeListProps) {
  const { ids, badges, catalog, className } = props;
  const ariaLabel = props['aria-label'] ?? 'Featured on communities and platforms';
  const items = resolveFeaturedBadges({ ids, badges, catalog });

  if (items.length === 0) {
    return null;
  }

  return (
    <ul className={cn('fbl-list', className)} aria-label={ariaLabel}>
      {items.map((badge, index) => (
        <li key={getFeaturedBadgeKey(badge, index)} className="fbl-list__item">
          <a
            href={badge.href}
            target="_blank"
            rel="noopener"
            title={badge.title ?? badge.alt}
            className="fbl-list__link"
          >
            <img
              src={badge.src}
              alt={badge.alt}
              width={badge.width}
              height={badge.height}
              loading="lazy"
              className="fbl-list__img"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
