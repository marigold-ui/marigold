#!/usr/bin/env node
/**
 * Post-edit typecheck (DST-1525): runs the repo's own typecheck after the model edits a .ts/.tsx
 * file, and once more at the end of a turn that changed something, so a type regression reaches
 * the model while it still has the context to fix it instead of surfacing in CI.
 *
 * PostToolUse (Edit|Write) filters on the edited path, reports the whole program with that file's
 * errors first, and skips if another run already holds the lock.
 *
 * Stop is the backstop for files written through Bash, which fire neither event. It is gated on
 * whether the tree moved since the last answer (~13ms, against ~2.4s for a run), and blocks only
 * on errors in files that moved, so a branch switch mid-session cannot hand the model a program
 * full of errors it did not cause.
 *
 * Opt out with MARIGOLD_SKIP_TYPECHECK_HOOK=1. To turn off every hook in this repo, set
 * "disableAllHooks": true in your personal settings instead.
 *
 * Run locally: echo '{"hook_event_name":"Stop"}' | .claude/hooks/typecheck-changed.mjs
 */
import { execFileSync, spawnSync } from 'node:child_process';
import {
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  readFileSync,
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
/** mtime: when the last completed check started reading. Content: the listing it read. */
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

/** Sorted source files in the program, or null when git cannot answer. */
const listSources = () => {
  const listed = git([
    'ls-files',
    '--cached',
    '--others',
    '--modified',
    '--exclude-standard',
    '*.ts',
    '*.tsx',
  ]);
  if (listed === null) return null;

  return [...new Set(listed.split('\n').filter(rel => rel && isCovered(rel)))].sort();
};

// The last answer we had about this tree, so a PostToolUse run seconds earlier makes the
// end-of-turn run a no-op. The mtime is when that run *started*: tsc reads the program up front,
// so stamping the end would hide an edit that landed mid-run.
const previous = (() => {
  try {
    return {
      at: statSync(stampPath).mtimeMs,
      listing: readFileSync(stampPath, 'utf8'),
    };
  } catch {
    return null;
  }
})();

const sources = listSources();

/**
 * Files that moved since that answer, or null when the change is not attributable to any of them
 * and every error has to be assumed relevant. A file moved if its mtime is newer, or it is new.
 */
const moved = (() => {
  if (!previous || sources === null) return null;

  const before = new Set(previous.listing.split('\n').filter(Boolean));
  const current = new Set(sources);
  // A file this session created and then deleted through Bash leaves no other trace: `ls-files
  // --others` stops listing it, and `mv` carries the old mtime over. The stored listing is the
  // only record it was there, and what a disappearance breaks is its importers, which did not move.
  for (const rel of before) if (!current.has(rel)) return null;

  const out = [];
  for (const rel of sources) {
    if (!before.has(rel)) {
      out.push(rel);
      continue;
    }
    try {
      if (statSync(join(root, rel)).mtimeMs > previous.at) out.push(rel);
    } catch {
      // Listed but unstattable means deleted, which is a change.
      out.push(rel);
    }
  }
  return out;
})();

/** Rename, branch switch, stash and revert move the index without touching a source mtime. */
const indexMovedSince = at => {
  // resolve(), not join(): --git-dir is absolute inside a worktree.
  const gitDir = git(['rev-parse', '--git-dir'])?.trim();
  if (!gitDir) return true;
  try {
    return statSync(resolve(root, gitDir, 'index')).mtimeMs > at;
  } catch {
    // No index to compare against. The scans above still apply.
    return false;
  }
};

const treeMoved =
  moved === null || moved.length > 0 || indexMovedSince(previous.at);

if (isStop && !treeMoved) process.exit(0);

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
  // What gets checked lives in tsconfig.check.json, so this is the same program as `pnpm
  // typecheck` and CI. The flags only say how this hook runs it. --noEmit is already in the
  // config; repeating it here is the guard that keeps a config change from making this hook
  // write 1700 files into everyone's working tree.
  result = spawnSync(
    tscPath,
    [
      '--project',
      'tsconfig.check.json',
      '--incremental',
      '--tsBuildInfoFile',
      buildInfoPath,
      '--noEmit',
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

if (sources !== null) {
  try {
    writeFileSync(stampPath, sources.join('\n'));
    utimesSync(stampPath, new Date(), new Date(startedMs));
  } catch {
    // No stamp means the next Stop run re-checks. Wasteful, never wrong.
  }
}

if (result.status === 0) process.exit(0);

/** `packages/x/src/A.ts(12,5): error TS2322: ...` -> `packages/x/src/A.ts` */
const fileOf = l => l.match(/^(.+?)\(\d+,\d+\): error TS/)?.[1] ?? null;

const errorLines = `${result.stdout ?? ''}\n${result.stderr ?? ''}`
  .split('\n')
  .map(l => l.trimEnd())
  .filter(l => /error TS\d+:/.test(l));

// tsc failed without producing parseable diagnostics: a bad flag, a missing config, an OOM.
// That is a problem with this hook, not with the edit, so stay out of the model's way.
if (errorLines.length === 0) process.exit(0);

// Errors this session is answerable for. Everything else may well be pre-existing, so it is
// reported after them and, on Stop, does not block on its own.
const attributed = editedFile
  ? new Set([editedFile])
  : moved === null
    ? null
    : new Set(moved);

const isOwn = l => Boolean(attributed) && attributed.has(fileOf(l));
const own = errorLines.filter(isOwn);

// Blocking the end of a turn on an error in a file nobody touched would spend the next turn
// fixing something nobody asked about. Trade-off: an edit to A.ts that only breaks the unchanged
// B.ts passes this gate. The PostToolUse run reports the whole program, which is what catches it.
if (isStop && attributed && own.length === 0) process.exit(0);

const shown = [...own, ...errorLines.filter(l => !isOwn(l))].slice(
  0,
  MAX_REPORTED_LINES
);

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
// model. Exit 2 on Stop prevents the turn from ending on broken types. Set rather than called:
// process.exit() would truncate the write above, since pipe writes are async on macOS.
process.exitCode = 2;
