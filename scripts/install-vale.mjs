import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const VERSION = '3.19.0';
const REPO = 'https://github.com/vale-cli/vale/releases/download';

const BIN_DIR = path.join(import.meta.dirname, '..', '.vale', 'bin');
const BIN = path.join(BIN_DIR, 'vale');

const ASSETS = {
  'darwin-arm64': `vale_${VERSION}_macOS_arm64.tar.gz`,
  'darwin-x64': `vale_${VERSION}_macOS_64-bit.tar.gz`,
  'linux-arm64': `vale_${VERSION}_Linux_arm64.tar.gz`,
  'linux-x64': `vale_${VERSION}_Linux_64-bit.tar.gz`,
};

const valeVersion = () => {
  try {
    return execFileSync(BIN, ['--version'], { encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
};

const fetchOrDie = async url => {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Could not download ${url}: ${response.status}`);
  return response;
};

const expectedSha = async asset => {
  const res = await fetchOrDie(
    `${REPO}/v${VERSION}/vale_${VERSION}_checksums.txt`
  );
  const line = (await res.text())
    .split('\n')
    .find(l => l.trim().endsWith(asset));
  if (!line) throw new Error(`No checksum published for ${asset}`);
  return line.trim().split(/\s+/)[0];
};

const main = async () => {
  const key = `${process.platform}-${process.arch}`;
  const asset = ASSETS[key];
  if (!asset) {
    console.log(
      `[vale] no pinned build for ${key}; skipping. Install Vale ${VERSION} manually.`
    );
    return;
  }

  if (valeVersion()?.includes(VERSION)) return;

  console.log(`[vale] downloading ${VERSION} for ${key}`);
  const [tarball, sha] = await Promise.all([
    fetchOrDie(`${REPO}/v${VERSION}/${asset}`).then(r => r.bytes()),
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
  execFileSync('tar', ['xzf', archive, '-C', BIN_DIR, 'vale']);
  rmSync(archive);

  console.log(`[vale] ${valeVersion()}`);
};

await main();
