// Single source of truth for the prerelease flow, shared by the `rc-*` scripts.
//
// `TAG` is both the changesets pre-mode tag and the npm dist-tag: versions come
// out as `18.0.0-rc.5` and `changeset publish` puts them on `rc` instead of
// `latest`.
//
// The branch is deliberately *not* hardcoded. Pre mode has lived on a dedicated
// `rc-release` branch and (as of v18) on `main`, so every script asks for it
// instead of assuming one.
import { $, chalk, question } from 'zx';

export const TAG = 'rc';

export function fail(msg) {
  console.error(chalk.red(`✗ ${msg}`));
  process.exit(1);
}

export async function currentBranch() {
  return (await $`git rev-parse --abbrev-ref HEAD`).stdout.trim();
}

/**
 * Resolve the branch to operate on. Always an explicit input: either
 * `--branch <name>` or an answer to the prompt, where pressing Enter picks the
 * branch you are currently on. Never falls back to a hardcoded branch.
 *
 * @param {unknown} flag - the raw `argv.branch` value
 * @param {string} purpose - verb phrase for the prompt, e.g. "release from"
 * @returns {Promise<string>}
 */
export async function resolveBranch(flag, purpose) {
  if (typeof flag === 'string' && flag.trim()) return flag.trim();

  const current = await currentBranch();

  if (!process.stdin.isTTY) {
    fail(
      `No branch given. Pass \`--branch <name>\` (you are on \`${current}\`) — the prompt needs an interactive terminal.`
    );
  }

  const answer = (
    await question(
      chalk.cyan(`? Branch to ${purpose} `) +
        chalk.dim(`(Enter for \`${current}\`): `)
    )
  ).trim();

  return answer || current;
}
