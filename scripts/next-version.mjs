#!/usr/bin/env zx

// Set available globals for eslint
/* global $, question, chalk */

await $`pnpm changeset status --output version.json`;
const { releases } = require(`${process.cwd()}/version.json`);

const pkg = releases.find(release => release.name === '@marigold/tokens');
// Hm .. what if there is no new version for this ...
console.log(pkg);
