# @sherotree/featured-badge-list

Typed React components for reciprocal / directory **featured badges**: a wrapping list and a single-slot rotator that keeps every partner `<a>` + `<img>` in the DOM (so badge crawlers still find embeds).

**Author / brand:** Sherotree  
**License:** MIT  
**Status:** published on npm as `@sherotree/featured-badge-list` (see version in `package.json`).

## Install

```bash
npm install @sherotree/featured-badge-list
# peer: react + react-dom >= 18
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

## Important SEO / compliance notes

- Components render `<a target="_blank" rel="noopener">` (no `nofollow`). That keeps the default **dofollow** semantics many directories require on *your* site. Do not add `nofollow` if a provider requires a dofollow backlink.
- A **required dofollow backlink on your site** is not the same thing as a directory promising a **dofollow listing** on *their* page.
- Rendering a badge from this catalog does **not** mean your product is approved, verified, or listed.
- This package is **not affiliated with or approved by** any listed directory. Trademarks belong to their owners.
- Examples below use **generic** directory URLs / public badge assets. Replace product-specific `href` / `src` values with **your** listing IDs before production. Do not copy private campaign URLs.

## API

### Selection props (shared by `FeaturedBadgeList` and `FeaturedBadgeRotator`)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ids` | `readonly string[]` | — | Resolve from `catalog` in this order; unknown ids skipped |
| `badges` | `readonly FeaturedBadgeItem[]` | — | Custom items (appended after `ids` matches) |
| `catalog` | `FeaturedBadgeCatalog` | package `FEATURED_BADGE_CATALOG` | Override the built-in catalog |
| `className` | `string` | — | Extra classes on the root `<ul>` |
| `aria-label` | `string` | `"Featured on communities and platforms"` | List accessible name |

Resolution rules:

- neither `ids` nor `badges` → entire catalog  
- `ids` only → catalog matches  
- `badges` only → those items  
- both → catalog matches first, then custom badges  

### `FeaturedBadgeItem` / catalog entry fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `string` | catalog yes / custom optional | — | Stable key for `ids={[...]}` selection |
| `href` | `string` | yes | — | Anchor URL (usually the directory or your listing page) |
| `src` | `string` | yes | — | Badge image URL (hosted by the directory) |
| `alt` | `string` | yes | — | Image alt text |
| `width` | `number` | no | — | `<img width>` |
| `height` | `number` | no | — | `<img height>` |
| `title` | `string` | no | falls back to `alt` | Anchor `title` |

### `FeaturedBadgeList`

Server-safe flex wrap. Renders `null` when the resolved list is empty.  
Props: selection props only (`FeaturedBadgeListProps`).

### `FeaturedBadgeRotator`

Client component. Props: selection props +:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `intervalMs` | `number` | `4500` | Rotation interval; ignored when `prefers-reduced-motion: reduce` |

Inactive badges stay mounted with `aria-hidden` and `tabIndex={-1}` so crawlers still see every embed.

### Catalog helpers

```ts
import {
  FEATURED_BADGE_CATALOG,
  FEATURED_BADGE_IDS,
  DEFAULT_FEATURED_BADGE_IDS,
  DEFAULT_FEATURED_BADGES,
  FEATURED_BADGE_PROVIDER_NOTES,
  FEATURED_BADGE_PROVIDER_NOTES_BY_ID,
  getFeaturedBadge,
  resolveFeaturedBadges,
} from '@sherotree/featured-badge-list';
```

| Export | Type / shape | Description |
| --- | --- | --- |
| `FEATURED_BADGE_CATALOG` | `readonly FeaturedBadgeDefinition[]` | Built-in embeds |
| `FEATURED_BADGE_IDS` | `readonly FeaturedBadgeId[]` | All selectable keys in catalog order |
| `DEFAULT_FEATURED_BADGE_IDS` | `readonly FeaturedBadgeId[]` | Curated reciprocal subset |
| `DEFAULT_FEATURED_BADGES` | `FeaturedBadgeItem[]` | Resolved objects for the default subset |
| `FEATURED_BADGE_PROVIDER_NOTES` | notes array | Requirement / usage notes per id |
| `getFeaturedBadge(id)` | `FeaturedBadgeDefinition \| undefined` | Lookup one catalog entry |
| `resolveFeaturedBadges(options)` | `FeaturedBadgeItem[]` | Same resolution rules as the components |

## All selectable provider keys

Total catalog options: **26** (see `FEATURED_BADGE_IDS`).  
Machine-readable markers below (`catalog-id:<id>`) are asserted by unit tests so this README cannot drift from the implementation.

### Default curated subset (`DEFAULT_FEATURED_BADGE_IDS`)

| Key | Name | Requirement | On-site / usage |
| --- | --- | --- | --- |
| <!-- catalog-id:peerpush --> `peerpush` | PeerPush | optional reciprocal | Supply your PeerPush slug in `href`/`src`. |
| <!-- catalog-id:neeed --> `neeed` | neeed.directory | optional reciprocal | Public light badge; dark variant available. |
| <!-- catalog-id:foundrlist --> `foundrlist` | FoundrList | optional reciprocal | Supply your FoundrList product slug in `href`/`src`. |
| <!-- catalog-id:trylaunch --> `trylaunch` | TryLaunch / Launch | optional reciprocal | Supply your launch slug in `href`. |
| <!-- catalog-id:ufind --> `ufind` | ufind.best | required for free launch week | Badge/backlink for free launch week. Listing may be nofollow after the week; top-3 lifetime dofollow is a listing outcome, not the on-site rule. Prefer your product URL in `href`. |
| <!-- catalog-id:twelve --> `twelve` | Twelve Tools | optional reciprocal | Official public badge; dark variant available. |
| <!-- catalog-id:scoutforge --> `scoutforge` | Scout Forge | optional reciprocal | Supply your app slug in `href`/`src`. |

### Directory / launch embeds

| Key | Name | Requirement | On-site / usage |
| --- | --- | --- | --- |
| <!-- catalog-id:startupfame --> `startupfame` | Startup Fame | required for free | Free path commonly expects their featured badge. |
| <!-- catalog-id:fazier --> `fazier` | Fazier | required for free | Launch badge SVG; `badge_type` / `theme` query params configurable via `src` override. |
| <!-- catalog-id:lovableapp --> `lovableapp` | Lovable APP | required for free | Homepage badge + Verify Link for free submission. Observed DR guidance is directory policy — confirm live. Dofollow on your badge link not confirmed here. |
| <!-- catalog-id:toolfame --> `toolfame` | ToolFame | required for free | Free path commonly expects their badge (dark variant available). |
| <!-- catalog-id:launchigniter --> `launchigniter` | LaunchIgniter | required for free | Override with product-specific badge API URLs when provided. |
| <!-- catalog-id:launchllama --> `launchllama` | Launch Llama | required for free | Free path commonly expects their featured badge. |
| <!-- catalog-id:sidehunt --> `sidehunt` | SideHunt | **conditional** | **Free Launch** needs a SideHunt link/badge. Separate free **Nofollow Launch** needs no badge. Free slots may be full. Listing nofollow-by-default / top-3 dofollow is separate from on-site verification. |
| <!-- catalog-id:launchbuff --> `launchbuff` | LaunchBuff | required for free | Free path commonly expects their featured badge. |
| <!-- catalog-id:startupfast --> `startupfast` | Startup Fast | required for free | Free path commonly expects their badge. |
| <!-- catalog-id:saasfame --> `saasfame` | SaaSFame | required for free | Free path commonly expects their badge (dark variant available). |
| <!-- catalog-id:findly --> `findly` | findly.tools | **conditional** | Their own free listing expects a footer badge. Other paid SKUs (directory packs / badge-free paid listings) are separate — not globally paid-only. |
| <!-- catalog-id:toolfio --> `toolfio` | ToolFio | required for free | Permanent on-site badge/backlink; confirm live DR threshold (often described as DR 20+). Dofollow on that required backlink not treated as officially evidenced here. |
| <!-- catalog-id:turbo0 --> `turbo0` | Turbo0 | required for free | Free path commonly expects their listed badge. |
| <!-- catalog-id:earlyhunt --> `earlyhunt` | EarlyHunt | required for free | Free path commonly expects their badge. |
| <!-- catalog-id:indiehunt --> `indiehunt` | IndieHunt | required for free | Free path commonly expects their badge. |
| <!-- catalog-id:sumodir --> `sumodir` | SumoDir | required for free | Free Launch: homepage/footer badge + **dofollow** backlink to SumoDir + verification. Their promised dofollow *listing* is a different fact. Official asset: `https://sumodir.com/badge.png`. |
| <!-- catalog-id:yodirectory --> `yodirectory` | yo.directory | required for free | Free path needs a crawlable live link to yo.directory. Catalog ships their public Featured badge image; a plain text link also works. Dofollow of that required backlink unconfirmed. Free listings get no Verified badge *on* yo.directory (that’s paid). |
| <!-- catalog-id:listbulb --> `listbulb` | ListBulb | required for free | Free path: badge verification (or qualifying dofollow ListBulb backlink) **and** 3 weekly upvotes (not automated here). Override `href` to `https://www.listbulb.com/tools/{slug}`. Dark: `featured-on-listbulb-dark.svg`. Paid QuickPass/Featured can skip badge. |
| <!-- catalog-id:startupbase --> `startupbase` | Startup Base | **conditional** | Standard free queue needs **no** badge (~10+ weeks). Free priority queue needs badge (~4–5 weeks). One free launch per account; ~$39 paid Launch skips the free queue (account choice, not global must-pay). Override `href` to `/products/{permalink}` when known. |

### Requirement legend

| Value | Meaning |
| --- | --- |
| required for free | Free listing/launch path expects this badge or an equivalent qualifying backlink |
| conditional | Only some free options require a badge (see row notes) |
| optional reciprocal | Useful reciprocal embed; not asserted here as a universal free-path gate |

## Styling

Default layout ships in `styles.css` under `.fbl-list` / `.fbl-rotator` selectors. Pass `className` to extend or replace spacing. No Tailwind peer dependency — the original utility-class look is inlined as plain CSS for reuse outside Next.js workspaces.

## Dataset & asset provenance

`FEATURED_BADGE_CATALOG` is a convenience default:

- **Directory badges** — generic official badge images hosted by each directory.
- **Curated reciprocal subset** — `DEFAULT_FEATURED_BADGE_IDS` may still reference a **reference product** listing URL. Treat as working examples; override with your own `badges` or a private `catalog` before production.
- **Parameterized IDs** — providers such as PeerPush, FoundrList, Scout Forge, ListBulb, and Startup Base need **your** product slug / permalink in `href` (and sometimes `src`). Defaults point at the directory root or a public static badge so the package never invents private verification tokens.

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
