#!/usr/bin/env node
/**
 * SessionStart pre-flight (DST-1525).
 *
 * Reports the repo state a session needs before it starts guessing: which branch this is and
 * what it forked from, whether a prerelease channel is open, how stale the local origin refs
 * are, and whether the installed toolchain matches what the repo pins.
 *
 * Why a hook and not CLAUDE.md: written-down environment facts drift. CLAUDE.md claimed
 * "Node.js 22.x required" for months while .node-version said 24. This probes instead.
 *
 * Contract: SessionStart adds stdout to the model's context on exit 0, and ignores output
 * entirely on any other exit. Every probe degrades to a missing line, and the process always
 * exits 0.
 *
 * Scope and known limits:
 * - TRUNKS is the only record in this repo of which branches are release trunks. No config
 *   knows: .changeset/config.json says baseBranch "main" on both trunks, no workflow mentions
 *   beta-release, and origin/HEAD is a single ref. Rename or add a trunk and this list must
 *   change with it, or a branch forked from the new trunk gets confidently misreported.
 * - Never fetches. Every branch conclusion is only as fresh as the last `git fetch`, which is
 *   why the ref age is reported instead of quietly refreshed.
 * - Reads .changeset/pre.json from the checked-out branch only. Its presence on some other
 *   branch is not evidence of an open channel: beta-release still carries mode "pre" from the
 *   v18 beta that shipped in August, because `changeset pre exit` was never run there.
 * - Reports only probed facts. The pins in package.json are already in the session's context,
 *   because CLAUDE.md pulls the file in with @package.json.
 *
 * Opt out with MARIGOLD_SKIP_PREFLIGHT_HOOK=1.
 *
 * Run locally: echo '{}' | .claude/hooks/preflight.mjs
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

if (process.env.MARIGOLD_SKIP_PREFLIGHT_HOOK === '1') process.exit(0);

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
/** Release trunks, most specific first, so the nearest fork point wins a tie. */
const TRUNKS = ['beta-release', 'main'];
const lines = [];

let flushed = false;
/** Print what we managed to gather. Exiting non-zero would make SessionStart discard all of it. */
const flush = () => {
  if (flushed) return;
  flushed = true;
  if (lines.length > 0) {
    console.log(`Marigold pre-flight:\n${lines.map(l => `  ${l}`).join('\n')}`);
  }
  process.exit(0);
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

/**
 * Commits either side of the fork point with a ref. `behind === 0` also answers ancestry:
 * nothing on the ref is missing from HEAD, so HEAD descends from it.
 */
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

// 1. Branch, and the trunk it descends from.
const branch = git('rev-parse', '--abbrev-ref', 'HEAD');
const onTrunk = Boolean(branch) && TRUNKS.includes(branch);

const fork = (() => {
  if (!branch || branch === 'HEAD') return null;
  if (onTrunk) return { trunk: branch, counts: countsAgainst(`origin/${branch}`) };
  // A branch descending from both trunks merged them, so prefer the nearer fork point.
  return (
    TRUNKS.map(trunk => ({ trunk, counts: countsAgainst(`origin/${trunk}`) }))
      .filter(f => f.counts?.behind === 0)
      .sort((a, b) => a.counts.ahead - b.counts.ahead)[0] ?? null
  );
})();

const trunk = fork?.trunk ?? null;

if (branch === 'HEAD') {
  lines.push(`branch: detached HEAD at ${git('rev-parse', '--short', 'HEAD')}`);
} else if (onTrunk) {
  const state = fork?.counts ? ` (origin/${branch}: ${describe(fork.counts)})` : '';
  lines.push(`branch: ${branch}${state}`);
} else if (fork) {
  lines.push(
    `branch: ${branch} (forked from origin/${fork.trunk}, ${describe(fork.counts)})`
  );
} else if (branch) {
  lines.push(`branch: ${branch} (base not derivable from local refs, they may be stale)`);
}

// 2. Prerelease channel, from the checked-out branch only.
const pre = readJson(join(root, '.changeset', 'pre.json'));

if (pre?.mode === 'pre') {
  lines.push(
    `prerelease: changesets is in "pre" mode, npm dist-tag "${pre.tag}". Publishes go to that tag, not latest.`
  );
  // Keyed on "a trunk that is not main" rather than the branch name, so renaming a trunk does
  // not leave this line silently dead.
  if (trunk && trunk !== 'main') {
    lines.push(`VRT is not required for PRs into ${trunk}.`);
  }
}

// 3. Freshness of the origin refs every conclusion above rests on.
try {
  const days = (Date.now() - statSync(join(root, '.git', 'FETCH_HEAD')).mtimeMs) / 86_400_000;
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
const tailwind = readJson(join(root, 'node_modules', 'tailwindcss', 'package.json'))?.version;
const major = v => String(v ?? '').replace(/^\D*/, '').split('.')[0];

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
