#!/usr/bin/env zx
// Set available globals for eslint
/* global $, argv, chalk, fs */
import { TAG, currentBranch, fail, resolveBranch } from './lib/prerelease.mjs';

async function isDirty() {
  const { stdout } = await $`git status --porcelain`;
  return stdout.trim().length > 0;
}

if (await isDirty()) fail('Working tree is dirty. Commit or stash first.');

// The branch pre mode is entered on is always stated explicitly, via
// `--branch <name>` or the prompt (Enter picks the branch you are on).
const branch = await resolveBranch(argv.branch, 'enter pre mode on');

// Ensure the branch exists locally and/or remotely, then switch to it.
await $`git fetch origin`;

const hasRemote =
  (await $`git ls-remote --heads origin ${branch}`).stdout.trim().length > 0;
const hasLocal =
  (await $`git show-ref --verify --quiet refs/heads/${branch}`.nothrow())
    .exitCode === 0;

let freshBranch = false;
if (!hasRemote && !hasLocal) {
  console.log(chalk.cyan(`Creating \`${branch}\` from origin/main…`));
  await $`git switch --create ${branch} origin/main`;
  await $`git push --set-upstream origin ${branch}`;
  freshBranch = true;
} else if (hasRemote && !hasLocal) {
  console.log(chalk.cyan(`Checking out \`${branch}\` from origin…`));
  await $`git switch ${branch}`;
} else {
  if ((await currentBranch()) !== branch) {
    console.log(chalk.cyan(`Switching to \`${branch}\`…`));
    await $`git switch ${branch}`;
  }
  await $`git pull --ff-only`;
}

if (fs.existsSync('.changeset/pre.json')) {
  fail('Already in changeset pre mode (.changeset/pre.json exists).');
}

await $`pnpm changeset pre enter ${TAG}`;

console.log(
  chalk.green(`\n✓ Entered changeset pre mode on \`${branch}\` (tag: ${TAG}).`)
);
console.log('\nNext steps:');
if (freshBranch) {
  console.log('  1. git add .changeset/pre.json');
  console.log(`  2. git commit -m "chore: enter changeset pre mode (${TAG})"`);
  console.log('  3. git push');
} else {
  console.log(`  1. git switch -c chore/changeset-pre-enter-${TAG}`);
  console.log('  2. git add .changeset/pre.json');
  console.log(`  3. git commit -m "chore: enter changeset pre mode (${TAG})"`);
  console.log(`  4. git push -u origin chore/changeset-pre-enter-${TAG}`);
  console.log(`  5. Open a PR against \`${branch}\``);
}
