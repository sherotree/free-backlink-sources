import type { FeaturedBadgeId } from './catalog';
import { FEATURED_BADGE_IDS } from './catalog';

/**
 * Human-facing notes for every selectable catalog id.
 * Kept in sync with `FEATURED_BADGE_CATALOG` via unit tests.
 *
 * Distinctions used below:
 * - **Required on your site** — what the free/conditional path asks you to place.
 * - **Directory listing rel** — what the directory promises on *their* outbound links
 *   (separate from the backlink/badge they ask you to add).
 * - Rendering a badge does **not** mean your product is approved or listed.
 */
export type FeaturedBadgeRequirement =
  | 'required-for-free'
  | 'conditional'
  | 'optional-reciprocal'
  | 'unknown';

export type FeaturedBadgeProviderNote = {
  id: FeaturedBadgeId;
  name: string;
  site: string;
  requirement: FeaturedBadgeRequirement;
  /** What free / badge paths expect on *your* site. */
  onSite: string;
  /** Values consumers typically override (product slug, listing URL, theme). */
  supplyYourself?: string;
  variants?: string;
  listingNote?: string;
};

export const FEATURED_BADGE_PROVIDER_NOTES = [
  {
    id: 'peerpush',
    name: 'PeerPush',
    site: 'https://peerpush.com/',
    requirement: 'optional-reciprocal',
    onSite: 'Curated reciprocal badge; replace listing URL / badge image with your PeerPush product paths.',
    supplyYourself: '`href` → `https://peerpush.com/p/{slug}`; `src` → `https://peerpush.com/p/{slug}/badge.png`',
  },
  {
    id: 'neeed',
    name: 'neeed.directory',
    site: 'https://neeed.directory/',
    requirement: 'optional-reciprocal',
    onSite: 'Curated reciprocal badge using the directory’s public light badge asset.',
    variants: 'Official dark asset also exists at `/badges/neeed-badge-dark.svg` (override `src`).',
  },
  {
    id: 'foundrlist',
    name: 'FoundrList',
    site: 'https://www.foundrlist.com/',
    requirement: 'optional-reciprocal',
    onSite: 'Curated reciprocal badge; replace product slug in both `href` and `src`.',
    supplyYourself:
      '`href` → `https://www.foundrlist.com/product/{slug}?utm_source=badge&utm_medium=embed`; `src` → `https://www.foundrlist.com/api/badge/{slug}`',
  },
  {
    id: 'trylaunch',
    name: 'TryLaunch / Launch',
    site: 'https://trylaunch.ai/',
    requirement: 'optional-reciprocal',
    onSite: 'Curated reciprocal badge; replace launch slug in `href` as needed.',
    supplyYourself: '`href` → `https://trylaunch.ai/launch/{slug}`',
  },
  {
    id: 'ufind',
    name: 'ufind.best',
    site: 'https://ufind.best/',
    requirement: 'required-for-free',
    onSite:
      'Free launch-week path requires an on-site badge/backlink. Do not confuse that with the directory’s own listing `rel` after launch week.',
    listingNote:
      'Directory listing is typically nofollow after the free launch week; top-3 lifetime dofollow is a separate listing outcome.',
    supplyYourself: 'Prefer your product page in `href` (e.g. `https://ufind.best/products/{slug}`).',
    variants: 'Dark badge: `https://ufind.best/badges/ufind-best-badge-dark.svg`.',
  },
  {
    id: 'twelve',
    name: 'Twelve Tools',
    site: 'https://twelve.tools/',
    requirement: 'optional-reciprocal',
    onSite: 'Official public badge asset; override `href` if you have a product deep link.',
    variants: 'Dark badge: `https://twelve.tools/badge0-dark.svg`.',
  },
  {
    id: 'scoutforge',
    name: 'Scout Forge',
    site: 'https://scoutforge.net/',
    requirement: 'optional-reciprocal',
    onSite: 'Curated reciprocal badge; replace app slug in `href` / `src`.',
    supplyYourself:
      '`href` → `https://scoutforge.net/apps/{slug}?ref=badge`; `src` → `https://scoutforge.net/badge/{slug}/image?theme=light&size=default`',
  },
  {
    id: 'startupfame',
    name: 'Startup Fame',
    site: 'https://startupfa.me/',
    requirement: 'required-for-free',
    onSite: 'Free path commonly expects their featured badge on your site.',
  },
  {
    id: 'fazier',
    name: 'Fazier',
    site: 'https://fazier.com/',
    requirement: 'required-for-free',
    onSite: 'Free launch path commonly expects their launch badge embed.',
    variants: '`badge_type` / `theme` query params on the SVG endpoint (default catalog uses `launched` + `light`).',
  },
  {
    id: 'lovableapp',
    name: 'Lovable APP',
    site: 'https://lovableapp.org/',
    requirement: 'required-for-free',
    onSite:
      'Free submission requires a homepage badge plus Verify Link. Observed DR guidance (e.g. DR > 2) is directory policy — confirm on their submit page. Dofollow requirement on your badge link is not confirmed here.',
  },
  {
    id: 'toolfame',
    name: 'ToolFame',
    site: 'https://toolfame.com/',
    requirement: 'required-for-free',
    onSite: 'Free path commonly expects their badge.',
    variants: 'Dark badge: `https://toolfame.com/badge-dark.svg`.',
  },
  {
    id: 'launchigniter',
    name: 'LaunchIgniter',
    site: 'https://launchigniter.com/',
    requirement: 'required-for-free',
    onSite: 'Free path commonly expects their badge; override `href`/`src` with product-specific badge API URLs when provided.',
  },
  {
    id: 'launchllama',
    name: 'Launch Llama',
    site: 'https://tools.launchllama.co/',
    requirement: 'required-for-free',
    onSite: 'Free path commonly expects their featured badge.',
  },
  {
    id: 'sidehunt',
    name: 'SideHunt',
    site: 'https://sidehunt.io/',
    requirement: 'conditional',
    onSite:
      'Only the **Free Launch** option requires a SideHunt link/badge for verification. A separate free **Nofollow Launch** needs no badge. Free weekly slots may be full — check pricing.',
    listingNote:
      'Free Launch listings are nofollow by default; top-3 can earn dofollow. Nofollow Launch stays nofollow even if you win. That listing `rel` is separate from the on-site verification link.',
    variants: 'Dark badge: `https://sidehunt.io/badges/sidehunt-badge-dark.svg`. Text links to sidehunt.io also satisfy Free Launch verification.',
  },
  {
    id: 'launchbuff',
    name: 'LaunchBuff',
    site: 'https://launchbuff.com/',
    requirement: 'required-for-free',
    onSite: 'Free path commonly expects their featured badge.',
  },
  {
    id: 'startupfast',
    name: 'Startup Fast',
    site: 'https://startupfa.st/',
    requirement: 'required-for-free',
    onSite: 'Free path commonly expects their badge.',
  },
  {
    id: 'saasfame',
    name: 'SaaSFame',
    site: 'https://saasfame.com/',
    requirement: 'required-for-free',
    onSite: 'Free path commonly expects their badge.',
    variants: 'Dark badge: `https://saasfame.com/badge-dark.svg`.',
  },
  {
    id: 'findly',
    name: 'findly.tools',
    site: 'https://findly.tools/',
    requirement: 'conditional',
    onSite:
      'Their own free listing path expects a footer badge. Paid packs (e.g. directories submit pack) and other paid listing SKUs are separate; do not treat the directory as globally paid-only or globally badge-free.',
    variants: 'Dark badge: `https://findly.tools/badges/findly-tools-badge-dark.svg`.',
  },
  {
    id: 'toolfio',
    name: 'ToolFio',
    site: 'https://toolfio.com/',
    requirement: 'required-for-free',
    onSite:
      'Free path requires a permanent on-site badge/backlink and meets their DR threshold (commonly described as DR 20+ — confirm live). Dofollow on your required backlink is not treated as officially evidenced here.',
    variants: 'Dark badge: `https://toolfio.com/toolfio-dark-badge.png`.',
  },
  {
    id: 'turbo0',
    name: 'Turbo0',
    site: 'https://turbo0.com/',
    requirement: 'required-for-free',
    onSite: 'Free path commonly expects their listed badge.',
    variants: 'Dark badge: `https://img.turbo0.com/badge-listed-dark.svg`.',
  },
  {
    id: 'earlyhunt',
    name: 'EarlyHunt',
    site: 'https://earlyhunt.com/',
    requirement: 'required-for-free',
    onSite: 'Free path commonly expects their badge.',
    variants: 'Dark badge: `https://earlyhunt.com/badges/earlyhunt-badge-dark.svg`.',
  },
  {
    id: 'indiehunt',
    name: 'IndieHunt',
    site: 'https://indiehunt.io/',
    requirement: 'required-for-free',
    onSite: 'Free path commonly expects their badge.',
    variants: 'Dark badge: `https://indiehunt.io/badges/indiehunt-badge-dark.svg`.',
  },
  {
    id: 'sumodir',
    name: 'SumoDir',
    site: 'https://sumodir.com/',
    requirement: 'required-for-free',
    onSite:
      'Free Launch requires a homepage/footer badge plus a dofollow backlink to SumoDir and verification. Paid plans can skip the on-site badge.',
    listingNote:
      'SumoDir’s promise of a dofollow listing link from *their* directory is a different fact from the dofollow backlink they require on *your* site.',
  },
  {
    id: 'yodirectory',
    name: 'yo.directory',
    site: 'https://yo.directory/',
    requirement: 'required-for-free',
    onSite:
      'Free listing requires a crawlable live-website link back to yo.directory (stays live while listed). The catalog ships their public “Featured On” badge asset as a convenient image embed; a plain crawlable text link also satisfies the free path. Dofollow on that required backlink is unconfirmed.',
    listingNote:
      'Free listings receive no Verified/Pro badge on yo.directory itself — those are paid listing badges, not the on-site backlink.',
    variants:
      'Light: `/badges/yo-directory-featured-light.svg` (also aliased at `/badge.svg`). Dark: `/badges/yo-directory-featured-dark.svg`.',
  },
  {
    id: 'listbulb',
    name: 'ListBulb',
    site: 'https://www.listbulb.com/',
    requirement: 'required-for-free',
    onSite:
      'Free listing requires badge verification (or a qualifying dofollow ListBulb backlink) plus a 3-upvote weekly streak before submit. This package does **not** automate votes. QuickPass/Featured paid plans can skip the badge.',
    supplyYourself:
      'Override `href` to your pending/live tool URL: `https://www.listbulb.com/tools/{slug}` (slug comes from ListBulb after you create the listing).',
    variants: 'Dark badge: `https://www.listbulb.com/featured-on-listbulb-dark.svg`.',
    listingNote:
      'Free listings get one dofollow link from ListBulb after badge verification and go-live. Until live, their outbound links use nofollow.',
  },
  {
    id: 'startupbase',
    name: 'Startup Base',
    site: 'https://startupbase.io/',
    requirement: 'conditional',
    onSite:
      'STANDARD free community queue does **not** require a badge (~10+ weeks). Only the free **priority / badge-verified** queue requires the StartupBase badge (~4–5 weeks). One free launch queued per account; paid Launch (~$39) is an account choice to skip the free queue, not a global must-pay rule.',
    supplyYourself:
      'Override `href` to `https://startupbase.io/products/{permalink}` when you have a product page. Catalog default image is the public static “Launched on StartupBase” asset.',
    variants: 'Dark static asset: `https://statics.startupbase.io/site/badges/launched-on-sb-dark.svg`.',
    listingNote:
      'Permanent dofollow from StartupBase is described for paid launches; free badge-verified launches instead ask you to link to StartupBase.',
  },
] as const satisfies readonly FeaturedBadgeProviderNote[];

export type FeaturedBadgeProviderNoteId = (typeof FEATURED_BADGE_PROVIDER_NOTES)[number]['id'];

/** Stable map for lookups; keys are exactly `FEATURED_BADGE_IDS`. */
export const FEATURED_BADGE_PROVIDER_NOTES_BY_ID: Readonly<
  Record<FeaturedBadgeId, FeaturedBadgeProviderNote>
> = Object.fromEntries(FEATURED_BADGE_PROVIDER_NOTES.map(note => [note.id, note])) as Record<
  FeaturedBadgeId,
  FeaturedBadgeProviderNote
>;

/** Exhaustive id list derived from notes (must match catalog order independently via tests). */
export const FEATURED_BADGE_PROVIDER_NOTE_IDS: readonly FeaturedBadgeId[] =
  FEATURED_BADGE_PROVIDER_NOTES.map(note => note.id);

/** Runtime guard helper used by tests. */
export function assertProviderNotesCoverCatalog(): void {
  const noteIds = new Set<string>(FEATURED_BADGE_PROVIDER_NOTE_IDS);
  const catalogIds = new Set<string>(FEATURED_BADGE_IDS);
  if (noteIds.size !== catalogIds.size) {
    throw new Error(
      `provider notes size ${noteIds.size} != catalog size ${catalogIds.size}`,
    );
  }
  for (const id of catalogIds) {
    if (!noteIds.has(id)) {
      throw new Error(`missing provider note for catalog id: ${id}`);
    }
  }
}
