# @sherotree/featured-badge-list

Typed React components for reciprocal / directory **featured badges**. Prefer **`FeaturedBadgeRotator`** for the usual compact single-badge footer slot; use **`FeaturedBadgeList`** only when you need several badges visible at once. Both keep every partner `<a>` + `<img>` in the DOM (so badge crawlers still find embeds).

**Author / brand:** Sherotree  
**License:** MIT  
**Status:** source package in this repo (npm releases are published separately when you choose).

## Install

```bash
npm install @sherotree/featured-badge-list
# peer: react + react-dom >= 18
```

Import the stylesheet once (plain CSS, no Tailwind required):

```ts
import '@sherotree/featured-badge-list/styles.css';
```

## Quick start (prefer `FeaturedBadgeRotator`)

Import the rotator from the **`/rotator`** entry (preserves the `"use client"` boundary in Next.js App Router). Default styles are already footer-friendly: inline width, `max-width: 12rem`, no extra margin/padding, badge height `1.75rem` (`2rem` from `640px`), muted opacity `0.5` → `0.8` on hover/focus. Rotation defaults to **`4500ms`** and stops when `prefers-reduced-motion: reduce` is set — no Tailwind `className` patches required for the common footer row.

```tsx
import { DEFAULT_FEATURED_BADGE_IDS } from '@sherotree/featured-badge-list';
import { FeaturedBadgeRotator } from '@sherotree/featured-badge-list/rotator';
import '@sherotree/featured-badge-list/styles.css';

export function FooterBadges() {
  // Generic directory badges render immediately. Listing-bound ids
  // (missing LaunchHub badge assets) stay omitted until you pass overrides.
  return <FeaturedBadgeRotator ids={DEFAULT_FEATURED_BADGE_IDS} />;
}
```

Supply **your** product listings with `overrides` (explicit fields always win). Listing helpers remain available for common URL shapes (including out-of-catalog custom embeds):

```tsx
import {
  DEFAULT_FEATURED_BADGE_IDS,
  ufindListing,
} from '@sherotree/featured-badge-list';
import { FeaturedBadgeRotator } from '@sherotree/featured-badge-list/rotator';

const ufind = ufindListing('your-slug');

export function FooterBadges() {
  return (
    <FeaturedBadgeRotator
      ids={[...DEFAULT_FEATURED_BADGE_IDS, 'dangai']}
      overrides={{
        ufind: { href: ufind.href, src: ufind.src, alt: ufind.alt },
        // Optional: replace the neutral fallback with a verified official badge asset.
        dangai: { src: 'https://example.com/your-verified-dang-badge.svg', alt: 'Featured on Dang AI' },
      }}
    />
  );
}
```

Optional: pass `intervalMs` to change the cadence (still ignored under reduced motion):

```tsx
<FeaturedBadgeRotator ids={['twelve', 'neeed', 'startupfame']} intervalMs={5000} />
```

### Next.js (App Router)

- Prefer `FeaturedBadgeRotator` from `@sherotree/featured-badge-list/rotator` in a Client Component (or a thin `'use client'` re-export).
- Import `styles.css` once (layout root or the client badge module).
- Pass `overrides` for any listing-bound provider you select by `ids`.

```tsx
'use client';

import { DEFAULT_FEATURED_BADGE_IDS, ufindListing } from '@sherotree/featured-badge-list';
import { FeaturedBadgeRotator } from '@sherotree/featured-badge-list/rotator';
import '@sherotree/featured-badge-list/styles.css';

const ufind = ufindListing('your-slug');

export function SiteBadges() {
  return (
    <FeaturedBadgeRotator
      ids={DEFAULT_FEATURED_BADGE_IDS}
      overrides={{
        ufind: { href: ufind.href, src: ufind.src, alt: ufind.alt },
      }}
    />
  );
}
```

If your bundler does not honor package `"use client"` banners:

```tsx
'use client';
export { FeaturedBadgeRotator } from '@sherotree/featured-badge-list/rotator';
```

## Important SEO / compliance notes

- Components render `<a target="_blank" rel="noopener">` (no `nofollow`). That keeps the default **dofollow** semantics many directories require on *your* site. Do not add `nofollow` if a provider requires a dofollow backlink.
- A **required dofollow backlink on your site** is not the same thing as a directory promising a **dofollow listing** on *their* page.
- Rendering a badge from this catalog does **not** mean your product is approved, verified, or listed.
- This package is **not affiliated with or approved by** any listed directory. Trademarks belong to their owners.
- Defaults use **generic** directory URLs / public badge assets only. Product listing `href` / `src` / product-named `alt` must come from **your** `overrides` (or a private `catalog` / custom `badges`). The package never silently ships another product's listing.
- Do not copy private campaign URLs from sample sites.

## API

### Selection props (shared by `FeaturedBadgeList` and `FeaturedBadgeRotator`)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ids` | `readonly string[]` | — | Resolve from `catalog` in this order; unknown ids skipped |
| `badges` | `readonly FeaturedBadgeItem[]` | — | Custom items (appended after `ids` matches) |
| `catalog` | `FeaturedBadgeCatalog` | package `FEATURED_BADGE_CATALOG` | Override the built-in catalog |
| `overrides` | `FeaturedBadgeOverrides` | — | Per-id patches merged onto catalog matches; explicit fields win |
| `className` | `string` | — | Extra classes on the root `<ul>` |
| `aria-label` | `string` | `"Featured on communities and platforms"` | List accessible name |

Resolution rules:

- neither `ids` nor `badges` → renderable catalog rows (listing-bound stubs skipped unless `overrides` satisfy them)
- `ids` only → catalog matches (same listing-bound skip rule)
- `badges` only → those items
- both → catalog matches first, then custom badges
- `overrides` → shallow-merge onto catalog matches by id (explicit wins). Missing/non-image `src` values fall back to the neutral package badge image. For `requiresListing` ids both listing `href` and a real badge `src` must be present or the id is skipped

### `FeaturedBadgeItem` / catalog entry fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | catalog yes / custom optional | — | Stable key for `ids={[...]}` selection |
| `href` | `string` | yes | — | Anchor URL (usually the directory or your listing page) |
| `src` | `string` | yes | — | Badge image URL (hosted by the directory) |
| `alt` | `string` | yes | — | Image alt text |
| `width` | `number` | no | — | `<img width>` |
| `height` | `number` | no | — | `<img height>` |
| `title` | `string` | no | falls back to `alt` | Anchor `title` |
| `requiresListing` | `boolean` | catalog only | — | When true, skipped until `overrides[id]` supplies listing `href` + real badge `src` |
| `usesDefaultBadgeImage` | `boolean` | catalog only | — | When true (or `src` is not an image URL), render the neutral package fallback unless overridden |

### `FeaturedBadgeRotator` (preferred)

Client component for the usual **one-badge-at-a-time** footer embed. Import from `@sherotree/featured-badge-list/rotator`. Props: selection props +:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `intervalMs` | `number` | `4500` | Rotation interval; ignored when `prefers-reduced-motion: reduce` |

Default CSS (`.fbl-rotator`) is compact and row-safe: `width: auto`, `max-width: 12rem`, `flex-shrink: 0`, `margin: 0`, `padding: 0`, image height `1.75rem` / `2rem` from `640px`, active opacity `0.5` (hover/focus-within `0.8`). Pass `className` only when you need a site-specific override.

Inactive badges stay mounted with `aria-hidden` and `tabIndex={-1}` so crawlers still see every embed.

### `FeaturedBadgeList` (multi-badge layout)

Use when you need **several badges visible at the same time** (wrapped flex row). Server-safe; import from the package root. Renders `null` when the resolved list is empty. Props: selection props only (`FeaturedBadgeListProps`).

### Catalog helpers

```ts
import {
  FEATURED_BADGE_CATALOG,
  FEATURED_BADGE_IDS,
  DEFAULT_FEATURED_BADGE_IDS,
  DEFAULT_FEATURED_BADGES,
  DEFAULT_BADGE_IMAGE_IDS,
  DEFAULT_FEATURED_BADGE_IMAGE_SRC,
  LISTING_REQUIRED_BADGE_IDS,
  FEATURED_BADGE_PROVIDER_NOTES,
  FEATURED_BADGE_PROVIDER_NOTES_BY_ID,
  getFeaturedBadge,
  resolveFeaturedBadges,
  peerpushListing,
  scoutforgeListing,
  trylaunchListing,
  ufindListing,
} from '@sherotree/featured-badge-list';
```

| Export | Type / shape | Description |
| --- | --- | --- |
| `FEATURED_BADGE_CATALOG` | `readonly FeaturedBadgeDefinition[]` | Built-in embeds (directory-safe defaults) |
| `FEATURED_BADGE_IDS` | `readonly FeaturedBadgeId[]` | All selectable keys in catalog order |
| `DEFAULT_FEATURED_BADGE_IDS` | `readonly FeaturedBadgeId[]` | Curated reciprocal subset |
| `DEFAULT_FEATURED_BADGES` | `FeaturedBadgeItem[]` | Resolved defaults **without** overrides |
| `LISTING_REQUIRED_BADGE_IDS` | `readonly FeaturedBadgeId[]` | Product-slug-bound ids that still skip until `overrides` supply listing `href`+`src` (currently empty) |
| `DEFAULT_BADGE_IMAGE_IDS` | `readonly FeaturedBadgeId[]` | Ids that render with the neutral package fallback image |
| `DEFAULT_FEATURED_BADGE_IMAGE_SRC` | `string` (data URL) | Neutral SVG fallback — not an official provider badge |
| `FEATURED_BADGE_PROVIDER_NOTES` | notes array | Requirement / usage notes per id |
| `getFeaturedBadge(id)` | `FeaturedBadgeDefinition \| undefined` | Lookup one catalog entry |
| `resolveFeaturedBadges(options)` | `FeaturedBadgeItem[]` | Same resolution rules as the components |
| `peerpushListing` / `scoutforgeListing` / `trylaunchListing` / `ufindListing` | `(slug) => FeaturedBadgeItem` | Optional slug helpers (ufind is in-catalog; others remain as custom-badge builders) |

## All selectable provider keys

Total catalog options: **28** (see `FEATURED_BADGE_IDS`).  
Universe: LaunchHub platforms with `badgeRequired: true` (需要回链), including low-score.  
Machine-readable markers below (`catalog-id:<id>`) are asserted by unit tests so this README cannot drift from the implementation.

### Default curated subset (`DEFAULT_FEATURED_BADGE_IDS`)

| Key | Name | Requirement | On-site / usage |
| --- | --- | --- | --- |
| <!-- catalog-id:earlyhunt --> `earlyhunt` | EarlyHunt | required for free | Free path requires an on-site badge/backlink (LaunchHub `badgeRequired`). |
| <!-- catalog-id:fazier --> `fazier` | Fazier | required for free | badge_required: yes — Fazier badge / footer backlink on homepage. Free submit also requires your site DR > 0. |
| <!-- catalog-id:neeed --> `neeed` | Neeed Directory | required for free | badge_required: yes — Neeed Directory badge / footer link |
| <!-- catalog-id:twelve --> `twelve` | Twelve Tools | required for free | Free listing with badge can go live the same day. Live Visit outbound observed as rel=noopener (no nofollow/ugc) on 2026-11-15 BoreGame listing. |
| <!-- catalog-id:turbo0 --> `turbo0` | Turbo0 | required for free | Free path requires an on-site badge/backlink (LaunchHub `badgeRequired`). |
| <!-- catalog-id:ufind --> `ufind` | Ufind.best | required for free | Free launches require a ufind.best badge/backlink for the launch week (badge verified 2026-11-15). Queued listing outbound was rel=nofollow noopener noreferrer. Official terms: … |

### Directory / launch embeds

| Key | Name | Requirement | On-site / usage |
| --- | --- | --- | --- |
| <!-- catalog-id:indiehunt --> `indiehunt` | IndieHunt | required for free | Free path requires an on-site badge/backlink (LaunchHub `badgeRequired`). |
| <!-- catalog-id:launchbuff --> `launchbuff` | LaunchBuff | required for free | Free path requires an on-site badge/backlink (LaunchHub `badgeRequired`). |
| <!-- catalog-id:launchigniter --> `launchigniter` | LaunchIgniter | required for free | Free path requires an on-site badge/backlink (LaunchHub `badgeRequired`). |
| <!-- catalog-id:lovableapp --> `lovableapp` | Lovable APP | required for free | Free listing requires a homepage Lovable App badge plus Verify Link (DR must be > 2). This is a hard pre-submit gate, not an optional post-submit dofollow badge; listing dofollo… |
| <!-- catalog-id:startupfame --> `startupfame` | Startup Fame | required for free | Free path requires a homepage verification badge |
| <!-- catalog-id:startupfast --> `startupfast` | Startupfa | required for free | Free path requires an on-site badge/backlink (LaunchHub `badgeRequired`). |
| <!-- catalog-id:sumodir --> `sumodir` | SumoDir | required for free | Two different links: (1) Free listing requires you to place a site badge and a dofollow backlink to SumoDir on your homepage or footer, verified before the form. (2) Official Fr… |
| <!-- catalog-id:yodirectory --> `yodirectory` | yo.directory | required for free | Free plan requires a live website backlink to yo.directory (the listing stays live while the link stays live). Dofollow of that backlink and of the listing link is unconfirmed. … |
| <!-- catalog-id:aijustbetter --> `aijustbetter` | AI Just Better | required for free | LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`. Uses neutral package fallback image (not official); override `src` when you have a verified asset. |
| <!-- catalog-id:basedtools --> `basedtools` | Basedtools | required for free | LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`. Uses neutral package fallback image (not official); override `src` when you have a verified asset. |
| <!-- catalog-id:dangai --> `dangai` | Dang AI | required for free | LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`. Uses neutral package fallback image (not official); override `src` when you have a verified asset. |
| <!-- catalog-id:dokeyai --> `dokeyai` | DokeyAI | required for free | Free pack: add the partner footer link, then the site can be approved. Review is described as about 48 hours. Uses neutral package fallback image (not official); override `src` when you have a verified asset. |
| <!-- catalog-id:findalternative --> `findalternative` | FindAlternative | required for free | LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`. Uses neutral package fallback image (not official); override `src` when you have a verified asset. |
| <!-- catalog-id:firstlook --> `firstlook` | Firstlook | required for free | LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`. Uses neutral package fallback image (not official); override `src` when you have a verified asset. |
| <!-- catalog-id:gets --> `gets` | Gets | required for free | LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`. Uses neutral package fallback image (not official); override `src` when you have a verified asset. |
| <!-- catalog-id:hunt0 --> `hunt0` | Hunt0 | required for free | LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`. Uses neutral package fallback image (not official); override `src` when you have a verified asset. |
| <!-- catalog-id:mossai --> `mossai` | MossAI | required for free | LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`. Uses neutral package fallback image (not official); override `src` when you have a verified asset. |
| <!-- catalog-id:productfame --> `productfame` | ProductFame | required for free | LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`. Uses neutral package fallback image (not official); override `src` when you have a verified asset. |
| <!-- catalog-id:tinyhunt --> `tinyhunt` | Tinyhunt | required for free | LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`. Uses neutral package fallback image (not official); override `src` when you have a verified asset. |
| <!-- catalog-id:tooldirs --> `tooldirs` | Tooldirs | required for free | LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`. Uses neutral package fallback image (not official); override `src` when you have a verified asset. |
| <!-- catalog-id:toolpilot --> `toolpilot` | Toolpilot | required for free | LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`. Uses neutral package fallback image (not official); override `src` when you have a verified asset. |
| <!-- catalog-id:topaihubs --> `topaihubs` | Topaihubs | required for free | LaunchHub marks `badgeRequired: true`, but this snapshot has no official badge image URL. Catalog row is a listing stub until you pass `overrides` with a verified `href` + `src`. Uses neutral package fallback image (not official); override `src` when you have a verified asset. |

### Requirement legend

| Value | Meaning |
| --- | --- |
| required for free | Free listing/launch path expects this badge or an equivalent qualifying backlink (`badgeRequired`) |
| conditional | Only some free options require a badge (see row notes) |
| optional reciprocal | Useful reciprocal embed; not asserted here as a universal free-path gate |

## Styling

Default layout ships in `styles.css` under `.fbl-list` / `.fbl-rotator` selectors. No Tailwind peer dependency.

- **`.fbl-rotator`** — preferred compact single-badge footer defaults (see above). Designed so footer rows do not need Tailwind margin/padding/width/shrink patches.
- **`.fbl-list`** — multi-badge wrap for when several embeds should show together.

Pass `className` or write more specific CSS when a host site needs a different density. The package does not ship site-specific design tokens (for example brand paper colors).

## Dataset & asset provenance

`FEATURED_BADGE_CATALOG` is regenerated from the local LaunchHub snapshot:

- **Universe** — every platform with `badgeRequired: true` (需要回链), including `platforms/low-score.ts`. This is independent of the README score>=20 Free/Freemium export.
- **Directory badges with known public assets** — generic official badge images hosted by each directory, with directory-root `href` values (reused only when previously verified; not invented from missing source fields).
- **Missing official badge images** — LaunchHub has no badge-image URL field. Those rows set `usesDefaultBadgeImage` and render a **neutral package fallback** (`DEFAULT_FEATURED_BADGE_IMAGE_SRC`, labeled "LISTED / generic badge"). That graphic is **not** an official provider badge. Override `src` (and optionally `href`) when you have a verified directory asset or product listing URL.
- **Removed from prior catalog** — providers that are not `badgeRequired` in the snapshot (for example PeerPush, Scout Forge, TryLaunch, Startup Base standard free queue) are no longer catalog defaults. Slug helpers for some of those providers remain exported for custom embeds.
- The package never invents private verification tokens and never ships a sample product's listing as a silent default.

Badge **images are not vendored** in this package; `src` points at each directory's public CDN/API when known. Directory trademarks remain with their owners. This package only redistributes link metadata and React rendering code (MIT).

### Upgrading notes

1. Catalog universe is now LaunchHub `badgeRequired` only. Ids that are not badge-required in the snapshot (for example `peerpush`, `scoutforge`, `trylaunch`, `startupbase`) were removed from `FEATURED_BADGE_CATALOG`. Slug helpers for some of those providers remain for custom `badges` embeds.
2. Catalog ids without a verified public badge image render a neutral package fallback image by default. Pass `overrides.src` with a verified official asset when you have one; optionally override `href` for a product listing URL.
3. Republish / redeploy the consumer site after you choose to cut a package release. This sync does not publish npm.

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
