import { execFile } from 'node:child_process';
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

// Regression tests for DST-1649: `marigold` invoked through a symlinked bin
// (npm -g installs, manual links) exited silently with code 0 because the
// entry-point guard compared the realpath (import.meta.url) against the
// unresolved symlink path (argv[1]). These run the built CLI as a subprocess —
// the guard at the module bottom is unreachable from in-process imports.

const run = promisify(execFile);

const distEntry = path.resolve(__dirname, '../../dist/bin/marigold.mjs');
const version = (
  JSON.parse(
    readFileSync(path.resolve(__dirname, '../../package.json'), 'utf8')
  ) as { version: string }
).version;

// dist/ is produced by the root postinstall, so it exists in any normal
// checkout; skip instead of failing on source-only environments.
describe.skipIf(!existsSync(distEntry))('bin entry point', () => {
  let tempDir: string;
  let symlink: string;

  beforeAll(() => {
    tempDir = mkdtempSync(path.join(tmpdir(), 'marigold-cli-'));
    symlink = path.join(tempDir, 'marigold');
    symlinkSync(distEntry, symlink);
  });

  afterAll(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  test('runs main() when invoked via a symlink', async () => {
    const { stdout } = await run(process.execPath, [symlink, '--version']);

    expect(stdout).toBe(version + '\n');
  });

  test('runs main() when invoked via the real path', async () => {
    const { stdout } = await run(process.execPath, [distEntry, '--version']);

    expect(stdout).toBe(version + '\n');
  });
});
