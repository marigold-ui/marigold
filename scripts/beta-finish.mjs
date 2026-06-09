#!/usr/bin/env zx
// Set available globals for eslint
/* global $, argv, chalk, fs */

// Finishes a beta release (RELEASING.md steps 5–6): pushes the version-bump
// commit and tags to origin. With `--finalize`, also exits changeset pre mode
// and prepares the roll-up into the stable X.0.0.
//
//   pnpm release:beta:finish              # step 5 — push this beta version
//   pnpm release:beta:finish --finalize   # step 6 — end the beta cycle

const finalize = !!argv.finalize;

function fail(msg) {
  console.error(chalk.red(`✗ ${msg}`));
  process.exit(1);
}

async function isDirty() {
  const { stdout } = await $`git status --porcelain`;
  return stdout.trim().length > 0;
}

// Safety: on `beta-release`, clean tree
const branch = (await $`git rev-parse --abbrev-ref HEAD`).stdout.trim();
if (branch !== 'beta-release') {
  fail(`Expected to be on \`beta-release\`, but on \`${branch}\`.`);
}
if (await isDirty()) fail('Working tree is dirty. Commit or stash first.');

// 5. Push commit + tags
console.log(chalk.cyan('\n▸ Pushing commit + tags to origin…'));
await $`git push --follow-tags`;
console.log(chalk.green('✓ Pushed to origin/beta-release.'));

// 6. Optionally finalize the beta cycle
if (!finalize) {
  console.log('\nBeta version published & pushed.');
  console.log(
    '\nWhen the beta cycle is complete and you want to ship the stable X.0.0,'
  );
  console.log('re-run with the finalize flag:\n');
  console.log(chalk.bold('  pnpm release:beta:finish --finalize') + '\n');
  process.exit(0);
}

if (!fs.existsSync('.changeset/pre.json')) {
  fail('Not in changeset pre mode — nothing to finalize.');
}

console.log(chalk.cyan('\n▸ Exiting changeset pre mode…'));
await $`pnpm changeset pre exit`;
await $`git add -A`;
await $`git commit -m ${'chore: exit changeset pre mode'}`;
await $`git push`;

console.log(chalk.green('\n✓ Exited pre mode and pushed.'));
console.log('\nNext steps:');
console.log('  1. Open a PR from `beta-release` → `main`.');
console.log(
  '  2. Merging it lets CI roll all -beta changesets into the stable X.0.0.'
);
console.log(
  chalk.yellow(
    '\n⚠️  The pre-exit commit must be on `beta-release` before merging to `main`.'
  )
);
