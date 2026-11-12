# @sherotree/featured-badge-list

Typed React components for reciprocal / directory **featured badges**: a wrapping list and a single-slot rotator that keeps every partner `<a>` + `<img>` in the DOM (so badge crawlers still find embeds).

**Author / brand:** Sherotree  
**License:** MIT  
**npm:** published as [`@sherotree/featured-badge-list`](https://www.npmjs.com/package/@sherotree/featured-badge-list) (current source version `0.1.1`; homepage https://www.uwarp.design/launch).

## Install

```bash
npm install @sherotree/featured-badge-list
# peer: react + react-dom >= 18
# pin a release if needed: npm install @sherotree/featured-badge-list@0.1.1
```

Import the stylesheet once (plain CSS, no Tailwind required):

```ts
import '@sherotree/featured-badge-list/styles.css';
```

## Quick start (plain React)

```tsx
import {
  FeaturedBadgeList,
  DEFAULT_FEATURED_BADGE_IDS,
} from '@sherotree/featured-badge-list';
import { FeaturedBadgeRotator } from '@sherotree/featured-badge-list/rotator';
import '@sherotree/featured-badge-list/styles.css';

export function FooterBadges() {
  return (
    <>
      <FeaturedBadgeList ids={DEFAULT_FEATURED_BADGE_IDS} />
      <FeaturedBadgeRotator ids={['twelve', 'neeed', 'startupfame']} intervalMs={5000} />
    </>
  );
}
```

## Next.js (App Router)

- `FeaturedBadgeList` is server-safe — import from the package root in a Server or Client Component.
- `FeaturedBadgeRotator` uses hooks — import from the **`/rotator`** entry so the published `"use client"` boundary is preserved.

```tsx
// app/components/site-badges.tsx  (Server Component OK for the list)
import { FeaturedBadgeList, DEFAULT_FEATURED_BADGE_IDS } from '@sherotree/featured-badge-list';
import { FeaturedBadgeRotator } from '@sherotree/featured-badge-list/rotator';
import '@sherotree/featured-badge-list/styles.css';

export function SiteBadges() {
  return (
    <>
      <FeaturedBadgeList ids={DEFAULT_FEATURED_BADGE_IDS} />
      {/* Rotator is a Client Component via the /rotator entry */}
      <FeaturedBadgeRotator ids={DEFAULT_FEATURED_BADGE_IDS} />
    </>
  );
}
```

If your bundler does not honor package `"use client"` banners, wrap the rotator in your own client file:

```tsx
'use client';
export { FeaturedBadgeRotator } from '@sherotree/featured-badge-list/rotator';
```

## API

### Selection props (shared)

| Prop | Type | Description |
| --- | --- | --- |
| `ids` | `readonly string[]` | Resolve from `catalog` in this order; unknown ids skipped |
| `badges` | `FeaturedBadgeItem[]` | Custom items (appended after `ids` matches) |
| `catalog` | `FeaturedBadgeCatalog` | Override the built-in catalog |
| `className` | `string` | Extra classes on the root `<ul>` |
| `aria-label` | `string` | List accessible name (default: “Featured on communities and platforms”) |

Resolution rules:

- neither `ids` nor `badges` → entire catalog  
- `ids` only → catalog matches  
- `badges` only → those items  
- both → catalog matches first, then custom badges  

### `FeaturedBadgeList`

Server-safe flex wrap. Renders `null` when the resolved list is empty.

### `FeaturedBadgeRotator`

Client component. Props: selection props + `intervalMs` (default `4500`). Respects `prefers-reduced-motion` (no timer). Inactive badges stay mounted with `aria-hidden` and `tabIndex={-1}`.

### Catalog helpers

```ts
import {
  FEATURED_BADGE_CATALOG,
  FEATURED_BADGE_IDS,
  DEFAULT_FEATURED_BADGE_IDS,
  DEFAULT_FEATURED_BADGES,
  getFeaturedBadge,
  resolveFeaturedBadges,
} from '@sherotree/featured-badge-list';
```

## Styling

Default layout ships in `styles.css` under `.fbl-list` / `.fbl-rotator` selectors. Pass `className` to extend or replace spacing. No Tailwind peer dependency — the original utility-class look is inlined as plain CSS for reuse outside Next.js workspaces.

## Dataset & asset provenance

`FEATURED_BADGE_CATALOG` is a convenience default:

- **LaunchHub-style directory badges** — generic official badge images hosted by each directory (`startupfame`, `fazier`, `twelve`, …).
- **Curated reciprocal subset** — `DEFAULT_FEATURED_BADGE_IDS` points at listing URLs / badge endpoints that may still reference a **reference product** page. Treat them as working examples; override with your own `badges` or a private `catalog` before production.

Badge **images are not vendored** in this package; `src` points at each directory’s public CDN/API. Directory trademarks remain with their owners. This package only redistributes link metadata and React rendering code (MIT).

## Package layout

| Export | Contents |
| --- | --- |
| `@sherotree/featured-badge-list` | `FeaturedBadgeList` + catalog helpers (SSR-safe) |
| `@sherotree/featured-badge-list/rotator` | `FeaturedBadgeRotator` (`"use client"`) |
| `@sherotree/featured-badge-list/styles.css` | Default styles |

Published files (npm pack allowlist): `dist/`, `LICENSE`, `README.md` only.

## Scripts

```bash
npm test
npm run typecheck
npm run build
npm run pack:dry
npm run pack:smoke
```

## Source

Extracted from a private app component (`featured-badge-list`) into this public package under Sherotree. Private app aliases, personal filesystem paths, and unrelated application code are not included.
