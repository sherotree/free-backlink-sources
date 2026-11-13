/**
 * Pack the package, install the tarball into a temp consumer app, and verify
 * ESM imports resolve for both the server-safe entry and the rotator entry.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function run(command, args, cwd) {
  execFileSync(command, args, { cwd, stdio: 'inherit' });
}

const packDir = mkdtempSync(join(tmpdir(), 'fbl-pack-'));
const consumerDir = mkdtempSync(join(tmpdir(), 'fbl-consumer-'));

try {
  console.log('→ npm pack');
  run('npm', ['pack', '--pack-destination', packDir], root);

  const tarball = readdirSync(packDir).find(name => name.endsWith('.tgz'));
  if (!tarball) {
    throw new Error('npm pack did not produce a tarball');
  }
  const tarballPath = join(packDir, tarball);
  console.log(`→ tarball: ${tarball}`);

  writeFileSync(
    join(consumerDir, 'package.json'),
    JSON.stringify(
      {
        name: 'fbl-smoke-consumer',
        private: true,
        type: 'module',
        dependencies: {
          react: '^19.1.0',
          'react-dom': '^19.1.0',
          '@sherotree/featured-badge-list': `file:${tarballPath}`,
        },
      },
      null,
      2,
    ),
  );

  console.log('→ npm install (consumer)');
  run('npm', ['install', '--ignore-scripts'], consumerDir);

  mkdirSync(join(consumerDir, 'src'), { recursive: true });
  writeFileSync(
    join(consumerDir, 'src/smoke.mjs'),
    `
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  FeaturedBadgeList,
  FEATURED_BADGE_CATALOG,
  DEFAULT_FEATURED_BADGE_IDS,
  resolveFeaturedBadges,
} from '@sherotree/featured-badge-list';
import { FeaturedBadgeRotator } from '@sherotree/featured-badge-list/rotator';

const require = createRequire(import.meta.url);
const pkgPath = require.resolve('@sherotree/featured-badge-list/package.json');
const cssPath = require.resolve('@sherotree/featured-badge-list/styles.css');
const css = readFileSync(cssPath, 'utf8');
assert.ok(css.includes('.fbl-list'));
assert.ok(css.includes('.fbl-rotator'));
const rotatorBlock = css.slice(css.indexOf('.fbl-rotator {'), css.indexOf('.fbl-rotator__item'));
assert.ok(rotatorBlock.includes('width: auto;'));
assert.ok(rotatorBlock.includes('flex-shrink: 0;'));
assert.ok(rotatorBlock.includes('margin: 0;'));
assert.ok(rotatorBlock.includes('padding: 0;'));
assert.ok(rotatorBlock.includes('max-width: 12rem;'));
assert.ok(!rotatorBlock.includes('width: 100%;'));
assert.ok(!rotatorBlock.includes('margin-inline: auto;'));
assert.ok(!rotatorBlock.includes('padding-top: 0.5rem;'));

assert.ok(FEATURED_BADGE_CATALOG.length > 0);
const items = resolveFeaturedBadges({ ids: DEFAULT_FEATURED_BADGE_IDS });
assert.equal(items.length, DEFAULT_FEATURED_BADGE_IDS.length);

const listHtml = renderToStaticMarkup(
  createElement(FeaturedBadgeList, { ids: DEFAULT_FEATURED_BADGE_IDS }),
);
assert.match(listHtml, /fbl-list/);
assert.match(listHtml, /peerpush|neeed|twelve/);

assert.equal(typeof FeaturedBadgeRotator, 'function');

const rotatorSource = readFileSync(
  require.resolve('@sherotree/featured-badge-list/rotator'),
  'utf8',
);
assert.match(rotatorSource, /["']use client["']/);
assert.match(rotatorSource, /4500/);

console.log('smoke ok', { catalog: FEATURED_BADGE_CATALOG.length, pkgPath });
`,
  );

  console.log('→ node src/smoke.mjs');
  run('node', ['src/smoke.mjs'], consumerDir);
  console.log('✓ pack smoke passed');
} finally {
  rmSync(packDir, { recursive: true, force: true });
  rmSync(consumerDir, { recursive: true, force: true });
}
