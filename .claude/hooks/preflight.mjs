#!/usr/bin/env node
/**
 * SessionStart pre-flight (DST-1525): probes the repo state a session would otherwise guess at,
 * because written-down environment facts drift. CLAUDE.md claimed "Node.js 22.x required" for
 * months while .node-version said 24.
 *
 * Every probe degrades to a missing line and the process always exits 0, because SessionStart
 * discards the output of a hook that exits non-zero.
 *
 * Opt out with MARIGOLD_SKIP_PREFLIGHT_HOOK=1.
 * Run locally: echo '{}' | .claude/hooks/preflight.mjs
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

if (process.env.MARIGOLD_SKIP_PREFLIGHT_HOOK === '1') process.exit(0);

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
/** The one release trunk. Prereleases run in changesets pre mode on main, not a release branch. */
const TRUNK = 'main';
const lines = [];

let flushed = false;
/** Print what we managed to gather. Exiting non-zero would make SessionStart discard all of it. */
const flush = () => {
  if (flushed) return;
  flushed = true;
  if (lines.length > 0) {
    // No process.exit() here: pipe writes are async on macOS and would truncate the block.
    console.log(`Marigold pre-flight:\n${lines.map(l => `  ${l}`).join('\n')}`);
  }
};

// Every probe below is individually guarded, but an unforeseen throw would still cost the
// session its whole context block. Report the partial answer instead.
process.on('uncaughtException', flush);

const run = (cmd, args, timeout = 2000) => {
  try {
    return execFileSync(cmd, args, {
      cwd: root,
      timeout,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return null;
  }
};

const git = (...args) => run('git', args);

const readText = path => {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    return null;
  }
};

const readJson = path => {
  try {
    return JSON.parse(readText(path));
  } catch {
    return null;
  }
};

/** Commits either side of the fork point. `...` counts from the merge base. */
const countsAgainst = ref => {
  const out = git('rev-list', '--left-right', '--count', `HEAD...${ref}`);
  if (!out) return null;
  const [ahead, behind] = out.split(/\s+/).map(Number);
  return { ahead, behind };
};

const describe = ({ ahead, behind }) => {
  const parts = [];
  if (ahead) parts.push(`${ahead} ahead`);
  if (behind) parts.push(`${behind} behind`);
  return parts.join(', ') || 'up to date';
};

// 1. Branch, and where it sits against the trunk. Never fetches, so this is only as fresh as the
// last `git fetch`, which is why probe 3 reports the ref age instead of quietly refreshing.
const branch = git('rev-parse', '--abbrev-ref', 'HEAD');
const onTrunk = branch === TRUNK;
const counts =
  branch && branch !== 'HEAD' ? countsAgainst(`origin/${TRUNK}`) : null;

if (branch === 'HEAD') {
  lines.push(`branch: detached HEAD at ${git('rev-parse', '--short', 'HEAD')}`);
} else if (onTrunk) {
  const state = counts ? ` (origin/${branch}: ${describe(counts)})` : '';
  lines.push(`branch: ${branch}${state}`);
} else if (counts) {
  lines.push(
    `branch: ${branch} (forked from origin/${TRUNK}, ${describe(counts)})`
  );
} else if (branch) {
  lines.push(
    `branch: ${branch} (base not derivable from local refs, they may be stale)`
  );
}

// 2. Prerelease channel. From the checked-out branch only: a pre.json on some other branch is not
// evidence of an open channel, since `changeset pre exit` is easy to forget there.
const pre = readJson(join(root, '.changeset', 'pre.json'));

if (pre?.mode === 'pre') {
  lines.push(
    `prerelease: changesets is in "pre" mode, npm dist-tag "${pre.tag}". Publishes go to that tag, not latest.`
  );
}

// 3. Freshness of the origin refs every conclusion above rests on.
try {
  // Not `<root>/.git`: that is a file in a worktree, and FETCH_HEAD is shared across worktrees.
  const gitDir = resolve(root, git('rev-parse', '--git-common-dir') ?? '.git');
  const days =
    (Date.now() - statSync(join(gitDir, 'FETCH_HEAD')).mtimeMs) / 86_400_000;
  if (days >= 1) {
    lines.push(
      `origin refs last fetched ${Math.round(days)} day(s) ago. Run \`git fetch\` before trusting the branch lines above.`
    );
  }
} catch {
  lines.push('origin refs have never been fetched in this checkout.');
}

// 4. Probed toolchain facts, plus a warning wherever a probe disagrees with a pin. The pins
// themselves are already in context via CLAUDE.md's @package.json, so they are not restated.
const pkg = readJson(join(root, 'package.json')) ?? {};
const pinnedNode = readText(join(root, '.node-version'))?.trim() ?? null;
const enginesNode = pkg.engines?.node ?? null;
const declaredTailwind = pkg.dependencies?.tailwindcss ?? null;
const tailwind = readJson(
  join(root, 'node_modules', 'tailwindcss', 'package.json')
)?.version;
const major = v =>
  String(v ?? '')
    .replace(/^\D*/, '')
    .split('.')[0];

lines.push(
  `installed: node ${process.versions.node}, tailwind ${tailwind ?? '(missing, run `pnpm install`)'}`
);

if (pinnedNode && major(process.versions.node) !== major(pinnedNode)) {
  lines.push(
    `toolchain mismatch: node is ${process.versions.node} but .node-version wants ${pinnedNode}`
  );
}
// engines.node is a second hand-copied pin, and hand-copied version numbers are what this hook
// exists to catch.
if (pinnedNode && enginesNode && major(enginesNode) !== major(pinnedNode)) {
  lines.push(
    `toolchain mismatch: package.json engines.node says ${enginesNode} but .node-version says ${pinnedNode}`
  );
}
if (tailwind && declaredTailwind && major(tailwind) !== major(declaredTailwind)) {
  lines.push(
    `toolchain mismatch: tailwind ${tailwind} is installed but package.json declares ${declaredTailwind}`
  );
}

// 5. Working tree. Worth its own spawn because Claude Code's built-in git block is captured once
// at session start and is already stale on a resume, which this hook matches.
const porcelain = git('status', '--porcelain');
if (porcelain !== null) {
  const changed = porcelain ? porcelain.split('\n').length : 0;
  lines.push(`tree: ${changed ? `${changed} file(s) changed` : 'clean'}`);
}

flush();
