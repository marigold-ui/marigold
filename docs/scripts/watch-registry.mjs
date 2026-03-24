#!/usr/bin/env node
// Rebuilds the demo registry when *.demo.tsx files change (use alongside `next dev`).
import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildRegistry } from './build-registry.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const contentDir = path.join(rootDir, 'content');

const DEBOUNCE_MS = 250;
let timer = null;

function scheduleRebuild(reason, relPath) {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    try {
      if (relPath) {
        console.log(`\n📑 Registry rebuild (${reason}): ${relPath}`);
      }
      await buildRegistry();
    } catch (err) {
      console.error('❌ Registry rebuild failed:', err);
    }
  }, DEBOUNCE_MS);
}

// Watch the whole tree: chokidar does not reliably emit events for absolute `**/*.demo.tsx`
// globs on Windows. Optional polling helps editor saves on win32.
const watcher = chokidar.watch(contentDir, {
  ignoreInitial: true,
  awaitWriteFinish: { stabilityThreshold: 120, pollInterval: 40 },
  usePolling: process.platform === 'win32',
  // When `stats` is missing, every directory was treated as a non-demo *file* and ignored,
  // so no subtree was watched and the process exited immediately (breaking `concurrently -k`).
  ignored: (filePath, stats) => {
    const n = filePath.replace(/\\/g, '/');
    if (n.endsWith('.demo.tsx')) {
      return false;
    }
    if (stats?.isDirectory()) {
      return false;
    }
    if (stats?.isFile()) {
      return true;
    }
    try {
      return !fs.statSync(filePath).isDirectory();
    } catch {
      return true;
    }
  },
});

watcher.on('all', (event, filePath) => {
  if (!filePath) {
    return;
  }
  const normalized = filePath.replace(/\\/g, '/');
  if (!normalized.endsWith('.demo.tsx')) {
    return;
  }
  const relFromRoot = path.isAbsolute(filePath)
    ? path.relative(rootDir, filePath).replace(/\\/g, '/')
    : path.join('content', normalized);
  scheduleRebuild(event, relFromRoot);
});

console.log('👀 Watching content/**/*.demo.tsx for registry updates…\n');

function shutdown() {
  clearTimeout(timer);
  void watcher.close().then(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
