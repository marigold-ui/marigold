import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { cachePathFor } from '../lib/cache.js';
import { docsUrl } from '../lib/config.js';
import {
  computeSuggestions,
  runCompleteSuggest,
  runCompletion,
} from './completion.js';

let tmpDir: string;
const originalCacheDir = process.env.MARIGOLD_CACHE_DIR;

const RAW_MANIFEST = JSON.stringify({
  baseUrl: 'https://www.marigold-ui.io',
  pages: [
    {
      name: 'Button',
      slug: 'components/actions/button',
      category: 'actions',
      description: null,
      badge: null,
      url: '/components/actions/button',
    },
    {
      name: 'ButtonGroup',
      slug: 'components/actions/button-group',
      category: 'actions',
      description: null,
      badge: null,
      url: '/components/actions/buttongroup',
    },
    {
      name: 'TextField',
      slug: 'components/form/text-field',
      category: 'form',
      description: null,
      badge: null,
      url: '/components/form/textfield',
    },
    {
      name: 'Accessibility',
      slug: 'foundations/accessibility',
      category: 'foundations',
      description: null,
      badge: null,
      url: '/foundations/accessibility',
    },
    {
      name: 'Forms',
      slug: 'patterns/user-input/forms',
      category: 'patterns/user-input',
      description: null,
      badge: null,
      url: '/patterns/user-input/forms',
    },
  ],
});

const seedManifestCache = () => {
  const file = cachePathFor(`${docsUrl()}/manifest.json`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, RAW_MANIFEST);
};

const RAW_EXAMPLES = JSON.stringify({
  baseUrl: 'https://www.marigold-ui.io',
  examples: [
    { slug: 'filter', title: 'Filter', brief: 'b', patterns: [] },
    { slug: 'form', title: 'Form', brief: 'b', patterns: [] },
  ],
});

const seedExamplesCache = () => {
  const file = cachePathFor(`${docsUrl()}/mcp/examples.json`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, RAW_EXAMPLES);
};

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-complete-test-'));
  process.env.MARIGOLD_CACHE_DIR = tmpDir;
});

afterEach(() => {
  if (originalCacheDir === undefined) delete process.env.MARIGOLD_CACHE_DIR;
  else process.env.MARIGOLD_CACHE_DIR = originalCacheDir;
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe('computeSuggestions — static surface', () => {
  test('completes top-level subcommands on empty input', () => {
    const out = computeSuggestions(['']);

    expect(out).toEqual(
      expect.arrayContaining([
        'docs',
        'list',
        'examples',
        'init',
        'telemetry',
        'completion',
      ])
    );
  });

  test('filters subcommands by prefix `d`', () => {
    expect(computeSuggestions(['d'])).toEqual(['docs']);
  });

  test('filters subcommands by prefix `t`', () => {
    expect(computeSuggestions(['t'])).toEqual(['telemetry']);
  });

  test('completes flag names when cursor word starts with --', () => {
    expect(computeSuggestions(['docs', '--'])).toEqual(
      expect.arrayContaining(['--section', '--format', '--fresh', '--offline'])
    );
  });

  test('filters list flags by `--cat` prefix', () => {
    expect(computeSuggestions(['list', '--cat'])).toEqual(['--category']);
  });

  test('filters docs flags by `--form` prefix', () => {
    expect(computeSuggestions(['docs', '--form'])).toEqual(['--format']);
  });

  test('completes enum values for --format', () => {
    expect(computeSuggestions(['docs', '--format', ''])).toEqual([
      'markdown',
      'json',
      'plain',
    ]);
  });

  test('completes enum values for --section', () => {
    expect(computeSuggestions(['docs', '--section', ''])).toEqual([
      'props',
      'usage',
      'examples',
      'all',
    ]);
  });

  test('completes telemetry subcommands on empty input', () => {
    expect(computeSuggestions(['telemetry', ''])).toEqual([
      'status',
      'enable',
      'disable',
    ]);
  });

  test('filters telemetry subcommands by prefix', () => {
    expect(computeSuggestions(['telemetry', 'en'])).toEqual(['enable']);
  });

  test('completes shell names for completion subcommand', () => {
    expect(computeSuggestions(['completion', ''])).toEqual([
      'bash',
      'zsh',
      'fish',
    ]);
  });

  test('completes examples subcommands on empty input', () => {
    expect(computeSuggestions(['examples', ''])).toEqual(['list', 'get']);
  });

  test('filters examples subcommands by prefix', () => {
    expect(computeSuggestions(['examples', 'l'])).toEqual(['list']);
  });

  test('does not suggest a slug for `examples list`', () => {
    expect(computeSuggestions(['examples', 'list', ''])).toEqual([]);
  });

  test('returns empty for unknown subcommand', () => {
    expect(computeSuggestions(['nonsense', ''])).toEqual([]);
  });
});

describe('computeSuggestions — file positional (validate)', () => {
  // Regression: `validate`'s file positional had no completion case at all —
  // it fell through to the catch-all `return []`, so `marigold validate
  // <TAB>` suggested nothing.
  test('lists .tsx files and directories, ignoring other file types', () => {
    fs.writeFileSync(path.join(tmpDir, 'Button.tsx'), '');
    fs.writeFileSync(path.join(tmpDir, 'README.md'), '');
    fs.mkdirSync(path.join(tmpDir, 'src'));

    const out = computeSuggestions(['validate', `${tmpDir}/`]);

    expect(out).toEqual([`${tmpDir}/Button.tsx`, `${tmpDir}/src/`]);
  });

  test('filters by the partial filename prefix', () => {
    fs.writeFileSync(path.join(tmpDir, 'Button.tsx'), '');
    fs.writeFileSync(path.join(tmpDir, 'Badge.tsx'), '');

    const out = computeSuggestions(['validate', `${tmpDir}/But`]);

    expect(out).toEqual([`${tmpDir}/Button.tsx`]);
  });

  test('returns empty for a nonexistent directory (no throw)', () => {
    expect(() =>
      computeSuggestions(['validate', `${tmpDir}/does-not-exist/`])
    ).not.toThrow();
    expect(
      computeSuggestions(['validate', `${tmpDir}/does-not-exist/`])
    ).toEqual([]);
  });

  test('does not suggest a second positional once a file is given', () => {
    expect(
      computeSuggestions(['validate', `${tmpDir}/Button.tsx`, ''])
    ).toEqual([]);
  });
});

describe('computeSuggestions — manifest-driven', () => {
  test('returns empty when manifest cache is missing (no error)', () => {
    expect(computeSuggestions(['docs', 'Bu'])).toEqual([]);
  });

  test('completes component names from cached manifest', () => {
    seedManifestCache();

    const out = computeSuggestions(['docs', 'Bu']);

    expect(out).toEqual(['Button', 'ButtonGroup']);
  });

  test('returns all components on empty positional', () => {
    seedManifestCache();

    const out = computeSuggestions(['docs', '']);

    expect(out).toEqual(
      expect.arrayContaining(['Button', 'ButtonGroup', 'TextField'])
    );
  });

  test('does not suggest a second component once one is given', () => {
    seedManifestCache();

    expect(computeSuggestions(['docs', 'Button', ''])).toEqual([]);
  });

  test('skips the value of a string flag when counting positionals', () => {
    seedManifestCache();

    // `marigold docs --format json B` — "json" is the value of --format,
    // not a positional, so the cursor word is still the first positional.
    const out = computeSuggestions(['docs', '--format', 'json', 'B']);

    expect(out).toEqual(['Button', 'ButtonGroup']);
  });

  test('completes categories for list --category', () => {
    seedManifestCache();

    const out = computeSuggestions(['list', '--category', '']);

    expect(out).toEqual(expect.arrayContaining(['actions', 'form']));
  });

  test('completes page categories for list --category', () => {
    seedManifestCache();

    const out = computeSuggestions(['list', '--category', '']);

    expect(out).toEqual(expect.arrayContaining(['foundations', 'patterns']));
  });

  test('completes a page slug for the docs positional', () => {
    seedManifestCache();

    const out = computeSuggestions(['docs', 'found']);

    expect(out).toEqual(['foundations/accessibility']);
  });

  test('includes page slugs alongside component names on empty positional', () => {
    seedManifestCache();

    const out = computeSuggestions(['docs', '']);

    expect(out).toEqual(
      expect.arrayContaining([
        'Button',
        'foundations/accessibility',
        'patterns/user-input/forms',
      ])
    );
  });

  test('returns empty for malformed manifest cache (no throw)', () => {
    const file = cachePathFor(`${docsUrl()}/manifest.json`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, '<!DOCTYPE html><html>not json</html>');

    expect(computeSuggestions(['docs', 'Bu'])).toEqual([]);
  });

  test('completes example slugs for `examples get` from cache', () => {
    seedExamplesCache();

    expect(computeSuggestions(['examples', 'get', ''])).toEqual([
      'filter',
      'form',
    ]);
    expect(computeSuggestions(['examples', 'get', 'fi'])).toEqual(['filter']);
  });

  test('returns empty example slugs when cache is missing (no error)', () => {
    expect(computeSuggestions(['examples', 'get', ''])).toEqual([]);
  });
});

describe('runCompleteSuggest', () => {
  test('formats output as newline-delimited with trailing newline', () => {
    seedManifestCache();

    expect(runCompleteSuggest(['docs', 'Bu'])).toBe('Button\nButtonGroup\n');
  });

  test('returns empty string (no newline) when there are no suggestions', () => {
    expect(runCompleteSuggest(['docs', 'XYZ'])).toBe('');
  });
});

describe('runCompletion', () => {
  test('prints the bash script', () => {
    const r = runCompletion('bash');

    expect(r.exitCode).toBe(0);
    expect(r.output).toContain(
      'complete -o default -F _marigold_complete marigold'
    );
  });

  test('prints the zsh script', () => {
    const r = runCompletion('zsh');

    expect(r.exitCode).toBe(0);
    expect(r.output).toContain('compdef _marigold marigold');
  });

  test('zsh script does not shadow the completion-provided `words` array', () => {
    // Regression guard: an earlier version did `local -a words` inside the
    // function, which shadowed zsh's outer `words` and made every TAB press
    // suggest top-level subcommands instead of component names.
    const r = runCompletion('zsh');

    expect(r.output).not.toMatch(/local\s+-a\s+words\b/);
  });

  test('prints the fish script', () => {
    const r = runCompletion('fish');

    expect(r.exitCode).toBe(0);
    expect(r.output).toContain(
      "complete -c marigold -n 'not __fish_seen_subcommand_from validate' -f -a '(__marigold_complete)'"
    );
    // Regression: `validate`'s file positional needs fish's native filename
    // completion to still apply, which the blanket `-f` (no-files) flag on
    // the line above would otherwise suppress entirely.
    expect(r.output).toContain(
      "complete -c marigold -n '__fish_seen_subcommand_from validate' -a '(__marigold_complete)'"
    );
  });

  test('shows install help when no shell is given', () => {
    const r = runCompletion(undefined);

    expect(r.exitCode).toBe(0);
    expect(r.output).toContain('source <(marigold completion bash)');
  });

  test('exits 2 for powershell', () => {
    expect(runCompletion('powershell').exitCode).toBe(2);
  });

  test('exits 2 for cmd', () => {
    expect(runCompletion('cmd').exitCode).toBe(2);
  });
});
