import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const from = resolve(root, 'src/styles.css');
const to = resolve(root, 'dist/styles.css');

mkdirSync(dirname(to), { recursive: true });
copyFileSync(from, to);
console.log('copied styles.css → dist/styles.css');

const clientBanner = '"use client";\n';
for (const file of ['rotator.js', 'rotator.cjs']) {
  const path = resolve(root, 'dist', file);
  const source = readFileSync(path, 'utf8');
  if (!source.startsWith('"use client"') && !source.startsWith("'use client'")) {
    writeFileSync(path, clientBanner + source);
  }
  console.log(`ensured "use client" on dist/${file}`);
}
