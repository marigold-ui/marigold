#!/usr/bin/env node
/**
 * Post-edit typecheck (DST-1525).
 *
 * Runs the repo's own typecheck after the model edits a .ts/.tsx file, and once more at the end
 * of a turn that changed something, so a type regression reaches the model while it still has
 * the context to fix it instead of surfacing in CI.
 *
 * Registered on two events, and behaves differently on each:
 * - PostToolUse (Edit|Write): filters on the edited path, and skips silently if another run
 *   already holds the lock.
 * - Stop: no path filter, but gated on whether anything in the program, or the git index, is
 *   newer than the last completed check, and waits for the lock. This is the backstop that covers files written
 *   through Bash (sed, heredocs, redirects), which never fire Edit or Write, and the last edit
 *   of a burst whose own run was skipped. The gate costs ~13ms and is what stops it re-verifying
 *   an unchanged tree at the end of every turn.
 *
 * Why the whole program instead of the changed package: measured against tsconfig.check.json,
 * a cold run is ~11s and a warm --incremental run is ~2.6s, so there is nothing to gain by
 * narrowing. There is also nothing to narrow to. The only per-package configs are
 * tsconfig.build.json emit configs, which resolve @marigold/* through node_modules to dist, and
 * turbo.json defines no typecheck task.
 *
 * Scope and known limits:
 * - Everything that decides what is checked lives in tsconfig.check.json, so this runs the same
 *   program as `pnpm typecheck` and the CI job with nothing to keep in sync. The flags below are
 *   only about how this hook runs it: reuse a warm cache, and report plainly.
 * - A pre-existing error anywhere in the program is reported after every edit. Errors in the
 *   edited file are listed first and the output is capped, which makes that tolerable rather
 *   than solving it.
 * - Bash-written files are invisible to the PostToolUse registration by design. The Stop
 *   registration is what covers them.
 *
 * Opt out with MARIGOLD_SKIP_TYPECHECK_HOOK=1. To turn off every hook in this repo, set
 * "disableAllHooks": true in your personal settings instead.
 *
 * Run locally:
 *   echo '{"hook_event_name":"Stop"}' | .claude/hooks/typecheck-changed.mjs
 */
import { execFileSync, spawnSync } from 'node:child_process';
import {
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  rmSync,
  statSync,
  utimesSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

/**
 * Paths that plainly cannot be in the program. A cheap superset filter, deliberately not a
 * mirror of tsconfig.check.json's exclude list: hand-copying JSONC globs is what rots, and a
 * miss here only costs a wasted run, never a wrong answer. It does carry the paths that cost
 * real time, notably the 23 deliberately-broken fixtures under validate/examples.
 */
const NOT_IN_PROGRAM =
  /^(?:docs|\.claude|node_modules|coverage)\/|\/(?:dist|node_modules)\/|\/validate\/examples\//;
/** Kill the check past this, so a pathological run degrades to no answer rather than a stall. */
const SOFT_DEADLINE_MS = 30_000;
/** A lock older than this belonged to a process that died. */
const LOCK_TTL_MS = 120_000;
/** How long the Stop backstop waits for a running check before giving up. */
const LOCK_WAIT_MS = 15_000;
/** Error lines fed back to the model, so a broken branch cannot flood the context. */
const MAX_REPORTED_LINES = 25;

const cacheDir = join(root, 'node_modules', '.cache', 'marigold-hooks');
const lockPath = join(cacheDir, 'typecheck.lock');
const buildInfoPath = join(cacheDir, 'check.tsbuildinfo');
/** Its mtime is the moment the last completed check started reading. See `lastCheckedMs`. */
const stampPath = join(cacheDir, 'last-check-start');
const tscPath = join(root, 'node_modules', '.bin', 'tsc');

// An unforeseen throw is a bug in this hook, not in the edit. Release the lock so the next run
// is not blocked by it, and stay out of the model's way.
process.on('uncaughtException', () => {
  rmSync(lockPath, { force: true });
  process.exit(0);
});

if (process.env.MARIGOLD_SKIP_TYPECHECK_HOOK === '1') process.exit(0);

// A fresh clone before `pnpm install` has no compiler. Nothing to say about that here.
if (!existsSync(tscPath)) process.exit(0);

let payload = {};
try {
  // Claude Code always pipes the payload. Run by hand in a terminal there is nothing to read,
  // and waiting for an end event that never comes would hang until the hook timeout.
  const raw = process.stdin.isTTY
    ? ''
    : await new Promise(res => {
        let buf = '';
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', d => (buf += d));
        process.stdin.on('end', () => res(buf));
        process.stdin.on('error', () => res(''));
      });
  payload = raw.trim() ? JSON.parse(raw) : {};
} catch {
  payload = {};
}

const isStop = payload.hook_event_name === 'Stop';

// Claude Code sets this once a Stop hook has blocked repeatedly. The change gate below is the
// real loop guard (an unchanged tree ends the turn), this is the belt to its braces.
if (isStop && payload.stop_hook_active) process.exit(0);

const toPosix = p => p.split(sep).join('/');
const isCovered = rel => /\.tsx?$/.test(rel) && !NOT_IN_PROGRAM.test(rel);

const git = args => {
  try {
    return execFileSync('git', args, {
      cwd: root,
      timeout: 5000,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return null;
  }
};

/** Repo-relative path of the edited file, or null when there is nothing worth checking. */
const editedFile = (() => {
  const filePath = payload.tool_input?.file_path;
  if (!filePath) return null;

  const rel = toPosix(relative(root, resolve(root, filePath)));
  if (!rel || rel.startsWith('..') || !isCovered(rel)) return null;

  return rel;
})();

// On PostToolUse the path is the whole reason to run. No usable path means nothing to check.
if (!isStop && !editedFile) process.exit(0);

/** True when any file in the program, or the git index, is newer than `stampMs`. Fails open. */
const changedSince = stampMs => {
  const listed = git([
    'ls-files',
    '--cached',
    '--others',
    '--modified',
    '--exclude-standard',
    '*.ts',
    '*.tsx',
  ]);
  if (listed === null) return true;

  // The index moves on rename, branch switch, stash and revert, none of which need touch a
  // single source mtime. `git mv` is the sharp case: it carries the old mtime to the new path
  // *and* drops the old path from the index, so the scan below sees nothing at all.
  // resolve(), not join(): --git-dir answers with an absolute path inside a worktree.
  const gitDir = git(['rev-parse', '--git-dir'])?.trim();
  if (!gitDir) return true;
  try {
    if (statSync(resolve(root, gitDir, 'index')).mtimeMs > stampMs) return true;
  } catch {
    // No index to compare against. The file scan below still applies.
  }

  for (const rel of listed.split('\n')) {
    if (!rel || !isCovered(rel)) continue;
    try {
      if (statSync(join(root, rel)).mtimeMs > stampMs) return true;
    } catch {
      // Listed but unstattable means deleted, which is a change.
      return true;
    }
  }
  return false;
};

// "When did we last have an answer about this tree", so a PostToolUse run seconds earlier makes
// the end-of-turn run a no-op, for ~13ms instead of ~2.6s.
//
// The stamp is when the last completed run *started*, not when it finished, and that difference
// is load-bearing. tsc reads the program in its first moments, so an edit landing mid-run was
// never in it. Stamping the end would make that edit look already-checked and gate it out of
// this backstop, which is the one registration that covers it. Stamping the start can only
// re-check something already covered.
const lastCheckedMs = (() => {
  try {
    return statSync(stampPath).mtimeMs;
  } catch {
    return null;
  }
})();

if (isStop && lastCheckedMs !== null && !changedSince(lastCheckedMs)) process.exit(0);

mkdirSync(cacheDir, { recursive: true });

/** Take the lock, or return false. Two tsc processes writing one buildinfo would corrupt it. */
const tryLock = () => {
  try {
    closeSync(openSync(lockPath, 'wx'));
    return true;
  } catch {
    try {
      if (Date.now() - statSync(lockPath).mtimeMs > LOCK_TTL_MS) {
        rmSync(lockPath, { force: true });
        closeSync(openSync(lockPath, 'wx'));
        return true;
      }
    } catch {
      // Lost the race to another waiter, or the lock vanished mid-check. Treat as contended.
    }
    return false;
  }
};

/** Retry until the budget expires. Only the Stop backstop passes a budget. */
const lock = async budgetMs => {
  const until = Date.now() + budgetMs;
  while (!tryLock()) {
    if (Date.now() > until) return false;
    await new Promise(res => setTimeout(res, 250));
  }
  return true;
};

if (!(await lock(isStop ? LOCK_WAIT_MS : 0))) {
  // A check is already covering the tree. On PostToolUse the Stop registration is the backstop.
  process.exit(0);
}

const startedMs = Date.now();
let result;
try {
  result = spawnSync(
    tscPath,
    [
      '--project',
      'tsconfig.check.json',
      '--incremental',
      '--tsBuildInfoFile',
      buildInfoPath,
      '--pretty',
      'false',
    ],
    { cwd: root, encoding: 'utf8', timeout: SOFT_DEADLINE_MS }
  );
} finally {
  rmSync(lockPath, { force: true });
}

// A killed tsc may have left a half-written buildinfo. Drop it so the next run starts cold
// rather than reading a truncated cache.
if (result.error?.code === 'ETIMEDOUT' || result.signal) {
  rmSync(buildInfoPath, { force: true });
  process.exit(0);
}

try {
  writeFileSync(stampPath, '');
  utimesSync(stampPath, new Date(), new Date(startedMs));
} catch {
  // No stamp means the next Stop run re-checks. Wasteful, never wrong.
}

if (result.status === 0) process.exit(0);

const errorLines = `${result.stdout ?? ''}\n${result.stderr ?? ''}`
  .split('\n')
  .map(l => l.trimEnd())
  .filter(l => /error TS\d+:/.test(l));

// tsc failed without producing parseable diagnostics: a bad flag, a missing config, an OOM.
// That is a problem with this hook, not with the edit, so stay out of the model's way.
if (errorLines.length === 0) process.exit(0);

// Errors in the file just edited come first. Everything else may well be pre-existing.
const isOwn = l => Boolean(editedFile) && l.startsWith(editedFile);
const own = errorLines.filter(isOwn);
const shown = [...own, ...errorLines.filter(l => !isOwn(l))].slice(0, MAX_REPORTED_LINES);

const header = editedFile
  ? `Typecheck failed after editing ${editedFile} (${errorLines.length} error(s)):`
  : `Typecheck failed (${errorLines.length} error(s)):`;

const footer = [
  errorLines.length > shown.length
    ? `  ... and ${errorLines.length - shown.length} more error(s).`
    : null,
  own.length === 0 && editedFile
    ? 'None of these are in the file you just edited.'
    : null,
  'Reproduce with `pnpm typecheck:only`.',
].filter(Boolean);

console.error([header, ...shown.map(l => `  ${l}`), ...footer].join('\n'));

// PostToolUse cannot block, and exit 2 is the documented way to put stderr in front of the
// model. Exit 2 on Stop prevents the turn from ending on broken types.
process.exit(2);
