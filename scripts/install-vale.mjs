/**
 * Downloads the pinned Vale binary into `.vale/bin/` (gitignored).
 *
 * We own this rather than depending on the `@vvago/vale` npm wrapper, because that wrapper
 * derives its download URL from its *own* package version and is stalled at 3.17.1 — and
 * 3.17.1 is materially wrong for us on two counts:
 *
 *   1. It ignores the `table.cell` scope exclusion, so it flags the em dash in
 *      `| — (no class) |`, which is a legitimate "not applicable" marker.
 *   2. It reports only the first match per paragraph, missing every later em dash in a
 *      wrapped paragraph. That under-reported this repo by 10 findings.
 *
 * Native MDX parsing arrived in 3.18.0 and JSX-children scoping in 3.19.0, so pinning 3.19.0
 * also means no `mdx2vast` bridge and no `Packages = MDX` key.
 *
 * Idempotent: exits immediately when the pinned version is already in place, so it is cheap
 * to run from `postinstall` on every install.
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const VERSION = '3.19.0';
const REPO = 'https://github.com/vale-cli/vale/releases/download';

const BIN_DIR = path.join(import.meta.dirname, '..', '.vale', 'bin');
const BIN = path.join(BIN_DIR, 'vale');

/** Release assets are named by Vale's own platform labels, not Node's. */
const ASSETS = {
  'darwin-arm64': `vale_${VERSION}_macOS_arm64.tar.gz`,
  'darwin-x64': `vale_${VERSION}_macOS_64-bit.tar.gz`,
  'linux-arm64': `vale_${VERSION}_Linux_arm64.tar.gz`,
  'linux-x64': `vale_${VERSION}_Linux_64-bit.tar.gz`,
};

const alreadyInstalled = () => {
  if (!existsSync(BIN)) return false;
  try {
    return execFileSync(BIN, ['--version'], { encoding: 'utf8' }).includes(
      VERSION
    );
  } catch {
    return false;
  }
};

const fetchOrDie = async (url, what) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not download ${what}: ${response.status} ${url}`);
  }
  return response;
};

/** The release publishes one checksums file for every asset; find our line in it. */
const expectedSha = async asset => {
  const list = await (
    await fetchOrDie(
      `${REPO}/v${VERSION}/vale_${VERSION}_checksums.txt`,
      'checksums'
    )
  ).text();
  const line = list.split('\n').find(l => l.trim().endsWith(asset));
  if (!line) throw new Error(`No checksum published for ${asset}`);
  return line.trim().split(/\s+/)[0];
};

const main = async () => {
  const key = `${process.platform}-${process.arch}`;
  const asset = ASSETS[key];
  if (!asset) {
    // Windows ships a .zip and needs a different extract path. Nobody on the team is on
    // Windows; skip rather than fail, so `pnpm install` still succeeds there.
    console.log(
      `[vale] no pinned build for ${key}; skipping. Install Vale ${VERSION} manually.`
    );
    return;
  }

  if (alreadyInstalled()) return;

  console.log(`[vale] downloading ${VERSION} for ${key}`);
  const [tarball, sha] = await Promise.all([
    fetchOrDie(`${REPO}/v${VERSION}/${asset}`, asset).then(r => r.bytes()),
    expectedSha(asset),
  ]);

  const actual = createHash('sha256').update(tarball).digest('hex');
  if (actual !== sha) {
    throw new Error(
      `Checksum mismatch for ${asset}\n  expected ${sha}\n  actual   ${actual}`
    );
  }

  mkdirSync(BIN_DIR, { recursive: true });
  const archive = path.join(BIN_DIR, asset);
  writeFileSync(archive, tarball);
  // `vale` sits at the archive root, alongside LICENSE and README.
  execFileSync('tar', ['xzf', archive, '-C', BIN_DIR, 'vale']);
  rmSync(archive);

  console.log(
    `[vale] ${execFileSync(BIN, ['--version'], { encoding: 'utf8' }).trim()}`
  );
};

await main();
