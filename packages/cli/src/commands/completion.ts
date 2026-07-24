import fs from 'node:fs';
import {
  COMPLETION_SHELLS,
  EXAMPLES_SUBCOMMANDS,
  SUBCOMMANDS,
  type SubcommandSpec,
  TELEMETRY_SUBCOMMANDS,
  TOP_LEVEL_NAMES,
  findFlag,
  findSubcommand,
} from '../lib/commands-spec.js';
import {
  BASH_SCRIPT,
  FISH_SCRIPT,
  ZSH_SCRIPT,
} from '../lib/completion-scripts.js';
import { loadExamplesManifestSync } from '../lib/examples.js';
import { loadManifestSync } from '../lib/manifest.js';

export type CompletionShell = (typeof COMPLETION_SHELLS)[number];

const SHELL_HELP = `Usage: marigold completion <bash|zsh|fish>

Print a shell completion script. Source it to enable tab completion:

  # bash — current shell
  source <(marigold completion bash)

  # bash — persistent (with bash-completion installed)
  marigold completion bash > ~/.local/share/bash-completion/completions/marigold

  # zsh — persistent (ensure $fpath includes the dir, then run compinit)
  marigold completion zsh > "\${fpath[1]}/_marigold"

  # fish
  marigold completion fish > ~/.config/fish/completions/marigold.fish
`;

const isShell = (v: string): v is CompletionShell =>
  (COMPLETION_SHELLS as readonly string[]).includes(v);

export interface RunCompletionResult {
  output: string;
  exitCode: number;
}

export const runCompletion = (
  shell: string | undefined
): RunCompletionResult => {
  if (!shell || shell === '--help' || shell === '-h') {
    return { output: SHELL_HELP, exitCode: 0 };
  }
  if (shell === 'powershell') {
    return {
      output: 'PowerShell completion is not yet supported.\n',
      exitCode: 2,
    };
  }
  if (!isShell(shell)) {
    return {
      output: `Unsupported shell: ${shell}. Try one of: ${COMPLETION_SHELLS.join(', ')}.\n`,
      exitCode: 2,
    };
  }
  const script =
    shell === 'bash' ? BASH_SCRIPT : shell === 'zsh' ? ZSH_SCRIPT : FISH_SCRIPT;
  return { output: script, exitCode: 0 };
};

// Completes a filesystem path for `validate`'s file positional. Only
// directories (suggested with a trailing slash, for further completion) and
// `.tsx` files (the only input `validate` accepts) are suggested — this
// mirrors what a shell's own filename completion would offer, for the
// headless `marigold __complete` path and for shells that don't fall back to
// their own file completion.
const completeFilePath = (partial: string): string[] => {
  // path.dirname('/a/b/') is '/a' (it treats a trailing slash as "no
  // filename to strip, go up one more level"), which is wrong here — a
  // trailing slash means "list THIS directory", not its parent. Splitting on
  // the last '/' directly avoids that.
  const lastSlash = partial.lastIndexOf('/');
  const dir = lastSlash === -1 ? '.' : partial.slice(0, lastSlash) || '/';
  const prefix = lastSlash === -1 ? partial : partial.slice(lastSlash + 1);
  const dirPrefix = lastSlash === -1 ? '' : partial.slice(0, lastSlash + 1);

  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  return entries
    .filter(e => e.name.startsWith(prefix))
    .filter(e => e.isDirectory() || e.name.endsWith('.tsx'))
    .map(e => `${dirPrefix}${e.name}${e.isDirectory() ? '/' : ''}`)
    .sort();
};

// Walk the words between the subcommand and the cursor, classifying each
// token as a flag, a flag's value, or a free positional. Returns the list of
// positional tokens entered before the cursor word.
const positionalsBefore = (sub: SubcommandSpec, words: string[]): string[] => {
  const tokens = words.slice(1, -1);
  const positionals: string[] = [];
  let i = 0;
  while (i < tokens.length) {
    const tok = tokens[i];
    if (tok.startsWith('-')) {
      const flag = findFlag(sub, tok);
      if (flag?.type === 'string') {
        i += 2; // skip flag's value
      } else {
        i += 1;
      }
    } else {
      positionals.push(tok);
      i += 1;
    }
  }
  return positionals;
};

export const computeSuggestions = (words: string[]): string[] => {
  const last = words[words.length - 1] ?? '';
  const startsWith = (s: string) => s.startsWith(last);

  if (words.length <= 1) {
    return TOP_LEVEL_NAMES.filter(startsWith);
  }

  const sub = findSubcommand(words[0]);
  if (!sub) return [];

  // If the previous word is a string flag, complete its values.
  const prev = words[words.length - 2];
  if (prev && prev.startsWith('-')) {
    const flag = findFlag(sub, prev);
    if (flag?.type === 'string') {
      if (flag.values) return flag.values.filter(startsWith);
      if (flag.valuesFrom === 'category') {
        const m = loadManifestSync();
        const componentCats = m?.categories.map(c => c.name) ?? [];
        const pageCats = [...new Set(m?.pages.map(p => p.category) ?? [])];
        return [...componentCats, ...pageCats].filter(startsWith);
      }
      return [];
    }
  }

  // Cursor word is itself a flag prefix.
  if (last.startsWith('-')) {
    return sub.flags.map(f => f.name).filter(startsWith);
  }

  const before = positionalsBefore(sub, words);

  if (sub.positionalKind === 'component') {
    if (before.length > 0) return [];
    const m = loadManifestSync();
    if (!m) return [];
    const names: string[] = [];
    for (const cat of m.categories) {
      for (const c of cat.components) names.push(c.name);
    }
    // Non-component pages are completed by slug (canonical `docs <slug>` form;
    // titles can contain spaces that would break shell word completion).
    for (const p of m.pages) names.push(p.slug);
    return names.filter(startsWith);
  }

  if (sub.positionalKind === 'telemetry-sub') {
    if (before.length > 0) return [];
    return [...TELEMETRY_SUBCOMMANDS].filter(startsWith);
  }

  if (sub.positionalKind === 'examples-sub') {
    // First positional: the action (list | get).
    if (before.length === 0)
      return [...EXAMPLES_SUBCOMMANDS].filter(startsWith);
    // Second positional after `get`: complete known example slugs from cache.
    if (before.length === 1 && before[0] === 'get') {
      const m = loadExamplesManifestSync();
      return (m?.examples.map(e => e.slug) ?? []).filter(startsWith);
    }
    return [];
  }

  if (sub.positionalKind === 'query') {
    // Free-form search query — nothing static to complete.
    return [];
  }

  if (sub.positionalKind === 'file') {
    if (before.length > 0) return [];
    return completeFilePath(last);
  }

  if (sub.name === 'completion') {
    if (before.length > 0) return [];
    return [...COMPLETION_SHELLS].filter(startsWith);
  }

  return [];
};

// Hidden helper invoked by the shell stubs on every TAB. Must NEVER throw —
// any exception would print a stack trace into the user's prompt.
export const runCompleteSuggest = (words: string[]): string => {
  try {
    const suggestions = computeSuggestions(words);
    return suggestions.length > 0 ? suggestions.join('\n') + '\n' : '';
  } catch {
    return '';
  }
};

// Re-export for tests / external callers if needed.
export { SUBCOMMANDS };
