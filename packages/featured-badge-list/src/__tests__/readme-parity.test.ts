import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  DEFAULT_FEATURED_BADGE_IDS,
  FEATURED_BADGE_CATALOG,
  FEATURED_BADGE_IDS,
} from '../catalog';
import {
  FEATURED_BADGE_PROVIDER_NOTE_IDS,
  FEATURED_BADGE_PROVIDER_NOTES,
  FEATURED_BADGE_PROVIDER_NOTES_BY_ID,
  assertProviderNotesCoverCatalog,
} from '../provider-notes';

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '../..');
const readme = readFileSync(join(packageRoot, 'README.md'), 'utf8');

describe('provider notes ↔ catalog parity', () => {
  it('covers every catalog id exactly once', () => {
    assertProviderNotesCoverCatalog();
    expect(FEATURED_BADGE_PROVIDER_NOTE_IDS).toHaveLength(FEATURED_BADGE_IDS.length);
    expect(new Set(FEATURED_BADGE_PROVIDER_NOTE_IDS).size).toBe(
      FEATURED_BADGE_PROVIDER_NOTE_IDS.length,
    );
  });

  it('exposes a note map for every FEATURED_BADGE_IDS entry', () => {
    for (const id of FEATURED_BADGE_IDS) {
      expect(FEATURED_BADGE_PROVIDER_NOTES_BY_ID[id]?.id).toBe(id);
    }
  });
});

describe('README ↔ catalog parity', () => {
  it('states the total selectable option count', () => {
    expect(readme).toContain(`Total catalog options: **${FEATURED_BADGE_IDS.length}**`);
  });

  it('marks every selectable catalog id', () => {
    for (const id of FEATURED_BADGE_IDS) {
      expect(readme).toContain(`<!-- catalog-id:${id} -->`);
      expect(readme).toContain(`\`${id}\``);
    }
  });

  it('documents shared selection props and rotator intervalMs', () => {
    for (const prop of ['ids', 'badges', 'catalog', 'className', 'aria-label', 'intervalMs']) {
      expect(readme).toContain(`\`${prop}\``);
    }
    expect(readme).toContain('`4500`');
    expect(readme).toContain('Featured on communities and platforms');
  });

  it('documents FeaturedBadgeItem fields', () => {
    for (const field of ['id', 'href', 'src', 'alt', 'width', 'height', 'title']) {
      expect(readme).toContain(`\`${field}\``);
    }
  });

  it('lists DEFAULT_FEATURED_BADGE_IDS members', () => {
    for (const id of DEFAULT_FEATURED_BADGE_IDS) {
      expect(readme).toContain(`<!-- catalog-id:${id} -->`);
    }
  });

  it('keeps catalog length aligned with notes and README markers', () => {
    const markers = [...readme.matchAll(/<!-- catalog-id:([a-z0-9-]+) -->/g)].map(match => match[1]);
    expect(markers).toEqual([...FEATURED_BADGE_IDS]);
    expect(FEATURED_BADGE_CATALOG).toHaveLength(FEATURED_BADGE_PROVIDER_NOTES.length);
  });
});
