#!/usr/bin/env node
import { getPackagesSync } from '@manypkg/get-packages';

/** @type {Array<{ name: string, version: string }>} */
const published = JSON.parse(process.argv[2] || '[]');

if (!published.length) {
  console.warn('No released packages found!');
  process.exit(0);
}

const { packages } = getPackagesSync(process.cwd());

const out = published
  .map(({ name, version }) => {
    const { packageJson: pkg } = packages.find(
      ({ packageJson }) => packageJson.name === name
    );
    const changelog = `${pkg.repository.url}/blob/main/${pkg.repository.directory}/CHANGELOG.md`;
    return { name, version, changelog };
  })
  .map(({ name, version, changelog }) => {
    const anchor = version.replace(/\./g, '');
    return `• \`${name}\` (v${version}, <${changelog}#${anchor}|view changelog>)`;
  })
  .join('\n');

console.log(out);
