import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { BuildError, buildExamples } from './build-examples.mjs';

// These tests are the build-time guard described in DST-1421: a malformed or
// schema-invalid sidecar must fail the build (and therefore CI) rather than
// silently shipping a broken example payload. Each test scaffolds a throwaway
// docs tree and points buildExamples() at it.

let root;

const VALID_SIDECAR = `title: Filterable table
brief: A searchable, filterable table.
patterns:
  - user-input/filter
mock_data:
  - alias: '@/lib/data/venues'
    shape: |
      export const venues: [];
key_files:
  - utils.tsx
scaffolding_files:
  - page.tsx
peer_deps:
  - nuqs
`;

const opts = () => ({
  rootDir: root,
  examplesDir: path.join(root, 'app', '(examples)', 'examples'),
  patternsDir: path.join(root, 'content', 'patterns'),
  outDir: path.join(root, 'public', 'mcp'),
  componentsPkgPath: path.join(root, 'package.json'),
  generatedAt: '2026-06-15T00:00:00.000Z',
  log: () => {},
});

const writeExample = (slug, { sidecar, files = {} }) => {
  const dir = path.join(root, 'app', '(examples)', 'examples', slug);
  fs.mkdirSync(dir, { recursive: true });
  if (sidecar !== undefined) {
    fs.writeFileSync(path.join(dir, `${slug}.marigold-pattern.yaml`), sidecar);
  }
  for (const [name, source] of Object.entries(files)) {
    // `name` may be a nested path (e.g. 'hooks/useFilter.ts').
    const file = path.join(dir, name);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, source);
  }
};

const writePattern = slug => {
  const dir = path.join(root, 'content', 'patterns', slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.mdx'), '# pattern\n');
};

const readJson = relPath =>
  JSON.parse(
    fs.readFileSync(path.join(root, 'public', 'mcp', relPath), 'utf8')
  );

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'build-examples-test-'));
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify({ version: '1.2.3' })
  );
  fs.mkdirSync(path.join(root, 'app', '(examples)', 'examples'), {
    recursive: true,
  });
  writePattern('user-input/filter');
});

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

describe('buildExamples — happy path', () => {
  test('emits a manifest and per-example payload for a valid sidecar', () => {
    writeExample('filter', {
      sidecar: VALID_SIDECAR,
      files: {
        'utils.tsx': 'export const x = 1;',
        'page.tsx': 'export default () => null;',
        'README.md': '# ignore me',
      },
    });

    const { manifest, skipped } = buildExamples(opts());

    expect(skipped).toEqual([]);
    expect(manifest.version).toBe('1.2.3');
    expect(manifest.examples).toEqual([
      {
        slug: 'filter',
        title: 'Filterable table',
        brief: 'A searchable, filterable table.',
        patterns: ['user-input/filter'],
      },
    ]);
    expect(readJson('examples.json').examples).toHaveLength(1);
  });

  test('maps sidecar fields and collects .ts/.tsx source', () => {
    writeExample('filter', {
      sidecar: VALID_SIDECAR,
      files: {
        'utils.tsx': 'export const x = 1;',
        'page.tsx': 'export default () => null;',
        'README.md': '# ignore me',
      },
    });

    buildExamples(opts());
    const payload = readJson('examples/filter.json');

    expect(payload.keyFiles).toEqual(['utils.tsx']);
    expect(payload.scaffoldingFiles).toEqual(['page.tsx']);
    expect(payload.peerDeps).toEqual(['nuqs']);
    expect(payload.mockData[0].alias).toBe('@/lib/data/venues');
    // sorted, .md and the sidecar itself excluded
    expect(payload.files.map(f => f.path)).toEqual(['page.tsx', 'utils.tsx']);
  });

  test('collects nested source so the payload can actually be built', () => {
    // The filter example keeps its hooks in `hooks/` and every key file imports
    // from `./hooks/…`. A top-level-only walk shipped those importers without
    // their imports, which no consumer could compile.
    writeExample('filter', {
      sidecar: VALID_SIDECAR,
      files: {
        'utils.tsx': "export { useFilter } from './hooks/useFilter';",
        'page.tsx': 'export default () => null;',
        'hooks/useFilter.ts': 'export const useFilter = () => null;',
        'hooks/nested/deep.ts': 'export const deep = 1;',
        'hooks/notes.md': '# ignore me',
      },
    });

    buildExamples(opts());
    const payload = readJson('examples/filter.json');

    // POSIX separators regardless of platform, so the paths match the import
    // specifiers in the sources above.
    expect(payload.files.map(f => f.path)).toEqual([
      'hooks/nested/deep.ts',
      'hooks/useFilter.ts',
      'page.tsx',
      'utils.tsx',
    ]);
    expect(
      payload.files.find(f => f.path === 'hooks/useFilter.ts').source
    ).toBe('export const useFilter = () => null;');
  });

  test('accepts a key_files entry pointing into a subdirectory', () => {
    writeExample('filter', {
      sidecar: VALID_SIDECAR.replace('  - utils.tsx', '  - hooks/useFilter.ts'),
      files: {
        'page.tsx': 'export default () => null;',
        'hooks/useFilter.ts': 'export const useFilter = () => null;',
      },
    });

    expect(() => buildExamples(opts())).not.toThrow();
    expect(readJson('examples/filter.json').keyFiles).toEqual([
      'hooks/useFilter.ts',
    ]);
  });

  test('skips folders without a sidecar instead of failing', () => {
    writeExample('filter', {
      sidecar: VALID_SIDECAR,
      files: { 'utils.tsx': 'x', 'page.tsx': 'x' },
    });
    writeExample('placeholder', { files: { 'page.tsx': 'x' } });

    const { manifest, skipped } = buildExamples(opts());

    expect(skipped).toEqual(['placeholder']);
    expect(manifest.examples.map(e => e.slug)).toEqual(['filter']);
  });
});

describe('buildExamples — validation failures', () => {
  test('throws on an unknown key (strict schema catches typos)', () => {
    writeExample('filter', {
      sidecar: VALID_SIDECAR.replace('key_files:', 'keyfiles:'),
      files: { 'utils.tsx': 'x', 'page.tsx': 'x' },
    });

    expect(() => buildExamples(opts())).toThrow(BuildError);
    expect(() => buildExamples(opts())).toThrow(/Invalid sidecar/);
  });

  test('throws when a required field is missing', () => {
    writeExample('filter', {
      sidecar: 'brief: No title here.\n',
      files: { 'page.tsx': 'x' },
    });

    expect(() => buildExamples(opts())).toThrow(/Invalid sidecar/);
  });

  test('throws when key_files references a file that does not exist', () => {
    writeExample('filter', {
      sidecar: VALID_SIDECAR,
      files: { 'page.tsx': 'x' }, // utils.tsx referenced but absent
    });

    expect(() => buildExamples(opts())).toThrow(
      /references files that do not exist/
    );
  });

  test('throws when a patterns ref has no matching pattern doc', () => {
    writeExample('filter', {
      sidecar: VALID_SIDECAR.replace('user-input/filter', 'user-input/nope'),
      files: { 'utils.tsx': 'x', 'page.tsx': 'x' },
    });

    expect(() => buildExamples(opts())).toThrow(/references pattern docs/);
  });

  test('throws on malformed YAML', () => {
    writeExample('filter', {
      sidecar: 'title: "unterminated\n',
      files: { 'page.tsx': 'x' },
    });

    expect(() => buildExamples(opts())).toThrow(/Could not parse YAML/);
  });
});
