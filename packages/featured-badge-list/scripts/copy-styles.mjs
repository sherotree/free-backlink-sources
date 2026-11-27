import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const from = resolve(root, 'src/styles.css');
const to = resolve(root, 'dist/styles.css');

mkdirSync(dirname(to), { recursive: true });
copyFileSync(from, to);
console.log('copied styles.css → dist/styles.css');
