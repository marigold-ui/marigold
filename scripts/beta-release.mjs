#!/usr/bin/env zx
// Set available globals for eslint
/* global $, argv, chalk, fs */

const force = !!argv.force;

function fail(msg) {
  console.error(chalk.red(`✗ ${msg}`));
  process.exit(1);
}

async function isDirty() {
  const { stdout } = await $`git status --porcelain`;
  return stdout.trim().length > 0;
}

// 1. Branch check
const branch = (await $`git rev-parse --abbrev-ref HEAD`).stdout.trim();
if (branch !== 'beta-release' && !force) {
  fail(
    `Refusing to release from \`${branch}\`. Switch to \`beta-release\` (or pass --force).`
  );
}

// 2. Clean working tree
if (await isDirty()) fail('Working tree is dirty. Commit or stash first.');

// 3. Pre mode active
if (!fs.existsSync('.changeset/pre.json')) {
  fail('Not in changeset pre mode. Run `pnpm release:beta:enter` first.');
}

// 4. Pending changesets to release
const pending = fs
  .readdirSync('.changeset')
  .filter(f => f.endsWith('.md') && f.toLowerCase() !== 'readme.md');
if (pending.length === 0) {
  fail('No pending changesets — nothing to release.');
}

// 5. npm auth
try {
  await $`npm whoami`;
} catch {
  fail('Not logged in to npm. Run `npm login` first.');
}

// 6. Local in sync with origin/beta-release
await $`git fetch origin beta-release`;
const localSha = (await $`git rev-parse @`).stdout.trim();
const remoteSha = (await $`git rev-parse origin/beta-release`).stdout.trim();
if (localSha !== remoteSha && !force) {
  fail(
    'Local `beta-release` is not in sync with origin. Pull/push first (or pass --force).'
  );
}

// 7. Run the release
console.log(chalk.cyan('\n▸ Installing dependencies…'));
await $`pnpm install`;

console.log(chalk.cyan('\n▸ Versioning packages (consumes changesets)…'));
await $`pnpm changeset version`;

console.log(chalk.cyan('\n▸ Syncing lockfile…'));
await $`pnpm install --lockfile-only`;

console.log(chalk.cyan('\n▸ Building packages…'));
await $`pnpm build`;

console.log(chalk.cyan('\n▸ Committing version bump…'));
await $`git add -A`;
await $`git commit -m ${'release: version packages (beta)'}`;

console.log(chalk.cyan('\n▸ Publishing to npm (tag: beta)…'));
// `stdio: 'inherit'` so changesets' interactive 2FA OTP prompt
// (`Enter one-time password:`) reaches the terminal — without it, zx pipes
// stdin and the prompt never appears, making the script look hung.
await $({ stdio: 'inherit' })`pnpm changeset publish`;

console.log(chalk.cyan('\n▸ Pushing commit + tags to origin…'));
await $`git push --follow-tags`;

console.log(chalk.green('\n✓ Beta release complete.'));
