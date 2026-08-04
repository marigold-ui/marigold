#!/usr/bin/env zx
// Set available globals for eslint
/* global $, argv, chalk, fs, os, path */
import { TAG, currentBranch, fail, resolveBranch } from './lib/prerelease.mjs';

const force = !!argv.force;

async function isDirty() {
  const { stdout } = await $`git status --porcelain`;
  return stdout.trim().length > 0;
}

// 1. Branch check — the release branch is always stated explicitly, via
// `--branch <name>` or the prompt (Enter picks the branch you are on).
const branch = await resolveBranch(argv.branch, 'release from');
const current = await currentBranch();
if (current !== branch && !force) {
  fail(
    `Refusing to release from \`${current}\` while \`${branch}\` was requested. Switch branches (or pass --force).`
  );
}
console.log(chalk.dim(`  Releasing from \`${branch}\`.`));

// 2. Clean working tree
if (await isDirty()) fail('Working tree is dirty. Commit or stash first.');

// 3. Pre mode active
if (!fs.existsSync('.changeset/pre.json')) {
  fail('Not in changeset pre mode. Run `pnpm release:rc:enter` first.');
}

// 3b. Pre mode tag matches what this script publishes
const preState = JSON.parse(fs.readFileSync('.changeset/pre.json', 'utf8'));
if (preState.tag !== TAG) {
  fail(
    `Pre mode tag is \`${preState.tag}\`, but this script releases \`${TAG}\`. Update .changeset/pre.json or scripts/lib/prerelease.mjs.`
  );
}

// 4. Pending changesets to release
const pending = fs
  .readdirSync('.changeset')
  .filter(f => f.endsWith('.md') && f.toLowerCase() !== 'readme.md');
if (pending.length === 0) {
  fail('No pending changesets — nothing to release.');
}

// 5. npm auth token present
// `npm whoami` 403s with granular access tokens (no account-endpoint access),
// so check for an auth token directly instead. The token must be a granular
// access token with bypass-2FA enabled, since the @marigold/* packages require
// either an interactive OTP or a bypass-2FA token for writes.
//
// npm >= 11 protects `_authToken` and refuses to return it via `npm config get`
// ("the option is protected, and cannot be retrieved in this way"), so read the
// npmrc files directly instead.
function readAuthToken() {
  const files = [
    path.join(process.cwd(), '.npmrc'),
    path.join(os.homedir(), '.npmrc'),
  ];
  const re = /^\/\/registry\.npmjs\.org\/:_authToken\s*=\s*(.+)$/m;
  for (const file of files) {
    if (!fs.existsSync(file)) continue;
    const match = fs.readFileSync(file, 'utf8').match(re);
    if (match) return match[1].trim().replace(/^["']|["']$/g, '');
  }
  return '';
}
const token = readAuthToken();
if (!token || token === 'undefined') {
  fail(
    'No npm auth token in npmrc. Add a granular token with bypass-2FA enabled to ~/.npmrc.'
  );
}

// 6. Local in sync with origin
await $`git fetch origin ${branch}`;
const localSha = (await $`git rev-parse @`).stdout.trim();
const remoteSha = (await $`git rev-parse origin/${branch}`).stdout.trim();
if (localSha !== remoteSha && !force) {
  fail(
    `Local \`${branch}\` is not in sync with origin. Pull/push first (or pass --force).`
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
await $`git commit -m ${`release: version packages (${TAG})`}`;

console.log(chalk.cyan(`\n▸ Publishing to npm (tag: ${TAG})…`));
// `CI=true` makes changesets skip its `npm profile get` pre-flight check,
// which 403s with granular access tokens (account-endpoint access is denied).
// The publish itself works because the granular token has bypass-2FA enabled.
await $({
  stdio: 'inherit',
  env: { ...process.env, CI: 'true' },
})`pnpm changeset publish`;

console.log(chalk.cyan('\n▸ Pushing commit + tags to origin…'));
await $`git push --follow-tags`;

console.log(chalk.green(`\n✓ ${TAG} release complete on \`${branch}\`.`));
