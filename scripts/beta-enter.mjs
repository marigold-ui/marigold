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

// Ensure `beta-release` exists locally and/or remotely, then switch to it.
await $`git fetch origin`;

const hasRemote =
  (await $`git ls-remote --heads origin beta-release`).stdout.trim().length > 0;
const hasLocal =
  (await $`git show-ref --verify --quiet refs/heads/beta-release`.nothrow())
    .exitCode === 0;

let freshBranch = false;
if (!hasRemote && !hasLocal) {
  console.log(chalk.cyan('Creating `beta-release` from origin/main…'));
  await $`git switch --create beta-release origin/main`;
  await $`git push --set-upstream origin beta-release`;
  freshBranch = true;
} else if (hasRemote && !hasLocal) {
  console.log(chalk.cyan('Checking out `beta-release` from origin…'));
  await $`git switch beta-release`;
} else {
  console.log(chalk.cyan('Switching to `beta-release`…'));
  await $`git switch beta-release`;
  await $`git pull --ff-only`;
}

if (fs.existsSync('.changeset/pre.json')) {
  fail('Already in changeset pre mode (.changeset/pre.json exists).');
}

await $`pnpm changeset pre enter beta`;

console.log(chalk.green('\n✓ Entered changeset pre mode (tag: beta).'));
console.log('\nNext steps:');
if (freshBranch) {
  console.log('  1. git add .changeset/pre.json');
  console.log('  2. git commit -m "chore: enter changeset pre mode (beta)"');
  console.log('  3. git push');
} else {
  console.log('  1. git switch -c chore/changeset-pre-enter-beta');
  console.log('  2. git add .changeset/pre.json');
  console.log('  3. git commit -m "chore: enter changeset pre mode (beta)"');
  console.log('  4. git push -u origin chore/changeset-pre-enter-beta');
  console.log('  5. Open a PR against `beta-release`');
}
