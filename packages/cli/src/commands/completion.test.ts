import { afterEach, beforeEach, describe, expect, it } from 'vitest';
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
  ],
});

const seedManifestCache = () => {
  const file = cachePathFor(`${docsUrl()}/manifest.json`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, RAW_MANIFEST);
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
  it('completes top-level subcommands on empty input', () => {
    const out = computeSuggestions(['']);
    expect(out).toEqual(
      expect.arrayContaining([
        'docs',
        'list',
        'init',
        'telemetry',
        'completion',
      ])
    );
  });

  it('filters subcommands by prefix', () => {
    expect(computeSuggestions(['d'])).toEqual(['docs']);
    expect(computeSuggestions(['t'])).toEqual(['telemetry']);
  });

  it('completes flag names when cursor word starts with --', () => {
    expect(computeSuggestions(['docs', '--'])).toEqual(
      expect.arrayContaining(['--section', '--format', '--fresh', '--offline'])
    );
  });

  it('filters flags by prefix', () => {
    expect(computeSuggestions(['list', '--cat'])).toEqual(['--category']);
    expect(computeSuggestions(['docs', '--form'])).toEqual(['--format']);
  });

  it('completes enum values for --format', () => {
    expect(computeSuggestions(['docs', '--format', ''])).toEqual([
      'markdown',
      'json',
      'plain',
    ]);
  });

  it('completes enum values for --section', () => {
    expect(computeSuggestions(['docs', '--section', ''])).toEqual([
      'props',
      'usage',
      'examples',
      'all',
    ]);
  });

  it('completes telemetry subcommands', () => {
    expect(computeSuggestions(['telemetry', ''])).toEqual([
      'status',
      'enable',
      'disable',
    ]);
    expect(computeSuggestions(['telemetry', 'en'])).toEqual(['enable']);
  });

  it('completes shell names for completion subcommand', () => {
    expect(computeSuggestions(['completion', ''])).toEqual([
      'bash',
      'zsh',
      'fish',
    ]);
  });

  it('returns empty for unknown subcommand', () => {
    expect(computeSuggestions(['nonsense', ''])).toEqual([]);
  });
});

describe('computeSuggestions — manifest-driven', () => {
  it('returns empty when manifest cache is missing (no error)', () => {
    expect(computeSuggestions(['docs', 'Bu'])).toEqual([]);
  });

  it('completes component names from cached manifest', () => {
    seedManifestCache();
    const out = computeSuggestions(['docs', 'Bu']);
    expect(out).toEqual(['Button', 'ButtonGroup']);
  });

  it('returns all components on empty positional', () => {
    seedManifestCache();
    const out = computeSuggestions(['docs', '']);
    expect(out).toEqual(
      expect.arrayContaining(['Button', 'ButtonGroup', 'TextField'])
    );
  });

  it('does not suggest a second component once one is given', () => {
    seedManifestCache();
    expect(computeSuggestions(['docs', 'Button', ''])).toEqual([]);
  });

  it('skips the value of a string flag when counting positionals', () => {
    seedManifestCache();
    // `marigold docs --format json B` — "json" is the value of --format,
    // not a positional, so the cursor word is still the first positional.
    const out = computeSuggestions(['docs', '--format', 'json', 'B']);
    expect(out).toEqual(['Button', 'ButtonGroup']);
  });

  it('completes categories for list --category', () => {
    seedManifestCache();
    const out = computeSuggestions(['list', '--category', '']);
    expect(out).toEqual(expect.arrayContaining(['actions', 'form']));
  });

  it('returns empty for malformed manifest cache (no throw)', () => {
    const file = cachePathFor(`${docsUrl()}/manifest.json`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, '<!DOCTYPE html><html>not json</html>');
    expect(computeSuggestions(['docs', 'Bu'])).toEqual([]);
  });
});

describe('runCompleteSuggest', () => {
  it('formats output as newline-delimited with trailing newline', () => {
    seedManifestCache();
    expect(runCompleteSuggest(['docs', 'Bu'])).toBe('Button\nButtonGroup\n');
  });

  it('returns empty string (no newline) when there are no suggestions', () => {
    expect(runCompleteSuggest(['docs', 'XYZ'])).toBe('');
  });
});

describe('runCompletion', () => {
  it('prints the bash script', () => {
    const r = runCompletion('bash');
    expect(r.exitCode).toBe(0);
    expect(r.output).toContain('complete -F _marigold_complete marigold');
  });

  it('prints the zsh script', () => {
    const r = runCompletion('zsh');
    expect(r.exitCode).toBe(0);
    expect(r.output).toContain('compdef _marigold marigold');
  });

  it('zsh script does not shadow the completion-provided `words` array', () => {
    // Regression guard: an earlier version did `local -a words` inside the
    // function, which shadowed zsh's outer `words` and made every TAB press
    // suggest top-level subcommands instead of component names.
    const r = runCompletion('zsh');
    expect(r.output).not.toMatch(/local\s+-a\s+words\b/);
  });

  it('prints the fish script', () => {
    const r = runCompletion('fish');
    expect(r.exitCode).toBe(0);
    expect(r.output).toContain(
      "complete -c marigold -f -a '(__marigold_complete)'"
    );
  });

  it('shows install help when no shell is given', () => {
    const r = runCompletion(undefined);
    expect(r.exitCode).toBe(0);
    expect(r.output).toContain('source <(marigold completion bash)');
  });

  it('exits 2 for unsupported shells', () => {
    expect(runCompletion('powershell').exitCode).toBe(2);
    expect(runCompletion('cmd').exitCode).toBe(2);
  });
});
