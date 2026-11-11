import { execFile } from 'node:child_process';
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
} from 'node:fs';
import { type Server, createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
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

  // Output larger than the OS pipe buffer (64 KB) was cut off when stdout was
  // a pipe to a slow reader, because the process exited before the pipe had
  // drained. An agent capturing `marigold docs Table --format json` then got
  // truncated, unparseable JSON.
  describe('piped output larger than the pipe buffer', () => {
    let server: Server;
    let docsUrl: string;

    const pages = Array.from({ length: 1500 }, (_, i) => ({
      name: `Component${i}`,
      slug: `components/form/component-${i}`,
      category: 'components/form',
      description: `Description of component ${i}, long enough to add up.`,
      badge: null,
      url: `/components/form/component-${i}.md`,
    }));

    beforeAll(async () => {
      server = createServer((_req, res) => {
        res.setHeader('content-type', 'application/json');
        res.end(
          JSON.stringify({
            version: '0.0.0',
            baseUrl: 'http://localhost',
            pages,
          })
        );
      });
      await new Promise<void>(resolve => server.listen(0, resolve));
      docsUrl = `http://localhost:${(server.address() as AddressInfo).port}`;
    });

    afterAll(async () => {
      await new Promise(resolve => server.close(resolve));
    });

    test.skipIf(process.platform === 'win32')(
      'writes the whole output before exiting',
      async () => {
        const { stdout } = await run(
          'sh',
          // The reader starts late, so the writer has to wait for it.
          ['-c', '"$NODE" "$ENTRY" list --format json | (sleep 1; cat)'],
          {
            maxBuffer: 16 * 1024 * 1024,
            env: {
              ...process.env,
              NODE: process.execPath,
              ENTRY: distEntry,
              MARIGOLD_DOCS_URL: docsUrl,
              MARIGOLD_CACHE_DIR: path.join(tempDir, 'cache'),
              MARIGOLD_TELEMETRY_DISABLED: '1',
            },
          }
        );

        expect(stdout.length).toBeGreaterThan(64 * 1024);
        const parsed = JSON.parse(stdout) as {
          categories: { components: unknown[] }[];
        };
        expect(parsed.categories[0].components).toHaveLength(pages.length);
      }
    );
  });
});
