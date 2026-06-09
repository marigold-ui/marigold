#!/usr/bin/env zx
// Set available globals for eslint
/* global $, chalk, fs */

// Prepares a beta release (RELEASING.md steps 1–3): ensures we're on a synced
// `beta-release` branch, enters changeset pre mode if needed, then versions,
// builds and commits. Publishing (step 4) is manual — this script prints how to
// proceed at the end.

function fail(msg) {
  console.error(chalk.red(`✗ ${msg}`));
  process.exit(1);
}

async function isDirty() {
  const { stdout } = await $`git status --porcelain`;
  return stdout.trim().length > 0;
}

// 1. Clean working tree
if (await isDirty()) fail('Working tree is dirty. Commit or stash first.');

// 2. Be on a synced `beta-release` (create from origin/main if it doesn't exist)
await $`git fetch origin`;
const branch = (await $`git rev-parse --abbrev-ref HEAD`).stdout.trim();
const hasRemote =
  (await $`git ls-remote --heads origin beta-release`).stdout.trim().length > 0;
const hasLocal =
  (await $`git show-ref --verify --quiet refs/heads/beta-release`.nothrow())
    .exitCode === 0;

if (branch !== 'beta-release') {
  if (!hasRemote && !hasLocal) {
    console.log(chalk.cyan('Creating `beta-release` from origin/main…'));
    await $`git switch --create beta-release origin/main`;
    await $`git push --set-upstream origin beta-release`;
  } else {
    console.log(chalk.cyan('Switching to `beta-release`…'));
    await $`git switch beta-release`;
    await $`git pull --ff-only`;
  }
} else {
  await $`git pull --ff-only`;
}

// 3. Enter changeset pre mode (tag: beta) if not already active
if (!fs.existsSync('.changeset/pre.json')) {
  console.log(chalk.cyan('\n▸ Entering changeset pre mode (tag: beta)…'));
  await $`pnpm changeset pre enter beta`;
  await $`git add .changeset/pre.json`;
  await $`git commit -m ${'chore: enter changeset pre mode (beta)'}`;
}

// 4. Version + build + commit
console.log(chalk.cyan('\n▸ Installing dependencies…'));
await $`pnpm install`;

console.log(chalk.cyan('\n▸ Versioning packages (consumes changesets)…'));
await $`pnpm changeset version`;
if (!(await isDirty())) {
  fail(
    '`changeset version` produced no changes — add changesets before releasing.'
  );
}

console.log(chalk.cyan('\n▸ Syncing lockfile…'));
await $`pnpm install --lockfile-only`;

console.log(chalk.cyan('\n▸ Building packages…'));
await $`pnpm build`;

console.log(chalk.cyan('\n▸ Committing version bump…'));
await $`git add -A`;
await $`git commit -m ${'release: version packages (beta)'}`;

// 5. Hand off to the manual publish (step 4)
console.log(chalk.green('\n✓ Beta version prepared and committed.'));
console.log('\nNext — publish to npm (manual, requires your 2FA OTP):\n');
console.log(
  chalk.bold('  npm whoami') +
    '                        # if this errors, run: npm login'
);
console.log(chalk.bold('  pnpm changeset publish --otp=<code>') + '\n');
console.log(
  '  • Run in this normal shell — do NOT set CI=true (it drops --otp).'
);
console.log(
  '  • TOTP codes expire in ~30s — generate the code right before running.\n'
);
console.log('Then finish the release (push + tags) with:\n');
console.log(chalk.bold('  pnpm release:beta:finish') + '\n');
