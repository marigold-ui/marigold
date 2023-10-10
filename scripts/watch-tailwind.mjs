#!/usr/bin/env zx
// Set available globals for eslint

/* global $, cd, chalk */
import { getPackagesSync } from '@manypkg/get-packages';
import watcher from '@parcel/watcher';
import path from 'node:path';

process.env.FORCE_COLOR = 3;

const root = path.resolve(__dirname, '..');
const ignore = ['!{themes,packages}/**/src/**/*.{ts,tsx}'];

const log = msg => console.log(`\n${chalk.bold(msg)}\n`);

const repo = getPackagesSync(root);
const getPackageDir = file => {
  const { dir, relativeDir } = repo.packages.find(pkg =>
    file.includes(pkg.dir)
  );
  return { name: relativeDir, dir };
};
const getAllThemes = () =>
  repo.packages.filter(pkg => pkg.relativeDir.includes('themes'));

const subscription = await watcher.subscribe(
  root,
  (err, events) => {
    events.forEach(async ev => {
      // Case: Rebuild tailwind themes when files in the package change
      if (ev.path.includes('themes')) {
        const { name, dir } = getPackageDir(ev.path);
        log(`👀 Change detected in "${name}". Building...`);
        cd(dir);
        await $`pnpm build`;
        log(`✅ Build done!`);
      }

      // Case: Rebuild all themes when components change
      if (
        ev.path.includes('packages/components') ||
        ev.path.includes('packages/system')
      ) {
        log(`👀 Change detected in "components" or "system". Building...`);
        await Promise.all(
          getAllThemes().map(pkg => {
            cd(pkg.dir);
            console.log(pkg.dir);
            return $`pnpm build`;
          })
        );
        log(`✅ Done building all themes!`);
      }
    });
  },
  { ignore }
);

process.on('SIGINT', async () => {
  await subscription.unsubscribe();
  process.exit();
});
