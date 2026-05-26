import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(here, '..', 'src', 'harness');
const dest = path.resolve(here, '..', 'dist', 'harness');

await mkdir(dest, { recursive: true });
await cp(src, dest, { recursive: true });
console.log(`Copied harness ${src} -> ${dest}`);
