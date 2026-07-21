#!/usr/bin/env zx
// Set available globals for eslint
/* global $, chalk, fs */

function fail(msg) {
  console.error(chalk.red(`✗ ${msg}`));
  process.exit(1);
}

async function isDirty() {
  const { stdout } = await $`git status --porcelain`;
  return stdout.trim().length > 0;
}

if (await isDirty()) fail('Working tree is dirty. Commit or stash first.');
if (!fs.existsSync('.changeset/pre.json')) {
  fail('Not in changeset pre mode — nothing to exit.');
}

await $`pnpm changeset pre exit`;

console.log(chalk.green('\n✓ Exited changeset pre mode.'));
console.log('\nNext steps:');
console.log('  1. git add -A');
console.log('  2. git commit -m "chore: exit changeset pre mode"');
console.log(
  '  3. Open a PR from `beta-release` → `main` to roll all -beta changesets into the real X.0.0'
);
console.log(
  chalk.yellow(
    '\n⚠️  Do not merge beta-release → main until this exit commit lands on beta-release.'
  )
);
