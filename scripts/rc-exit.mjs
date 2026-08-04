#!/usr/bin/env zx
// Set available globals for eslint
/* global $, argv, chalk, fs */
import { TAG, currentBranch, fail, resolveBranch } from './lib/prerelease.mjs';

async function isDirty() {
  const { stdout } = await $`git status --porcelain`;
  return stdout.trim().length > 0;
}

if (await isDirty()) fail('Working tree is dirty. Commit or stash first.');
if (!fs.existsSync('.changeset/pre.json')) {
  fail('Not in changeset pre mode — nothing to exit.');
}

// `changeset pre exit` rewrites pre.json on whatever branch is checked out, so
// name it explicitly: `--branch <name>` or the prompt (Enter picks the current).
const branch = await resolveBranch(argv.branch, 'exit pre mode on');
const current = await currentBranch();
if (current !== branch) {
  fail(
    `You are on \`${current}\` but requested \`${branch}\`. Switch branches first.`
  );
}

await $`pnpm changeset pre exit`;

console.log(chalk.green(`\n✓ Exited changeset pre mode on \`${branch}\`.`));
console.log('\nNext steps:');
console.log('  1. git add -A');
console.log('  2. git commit -m "chore: exit changeset pre mode"');
if (branch === 'main') {
  console.log(
    `  3. Push (or open a PR) so the exit lands on \`main\` — the next release rolls all -${TAG} changesets into the real X.0.0`
  );
} else {
  console.log(
    `  3. Open a PR from \`${branch}\` → \`main\` to roll all -${TAG} changesets into the real X.0.0`
  );
  console.log(
    chalk.yellow(
      `\n⚠️  Do not merge ${branch} → main until this exit commit lands on ${branch}.`
    )
  );
}
