// Single source of truth for the CLI's command surface, used by the tab
// completion suggester. Keep in sync with the parseArgs blocks in
// bin/marigold.ts and the help template.

export type PositionalKind =
  | 'component'
  | 'category'
  | 'query'
  | 'file'
  | 'telemetry-sub'
  | 'examples-sub';

export interface FlagSpec {
  name: string;
  type: 'string' | 'boolean';
  values?: readonly string[];
  // For string flags whose values are sourced from the manifest at runtime.
  valuesFrom?: 'category';
}

export interface SubcommandSpec {
  name: string;
  flags: readonly FlagSpec[];
  positionalKind?: PositionalKind;
}

const formatValues = ['markdown', 'json', 'plain'] as const;
const validateFormatValues = ['text', 'json'] as const;
const validateChecksValues = ['technical', 'spatial', 'a11y', 'all'] as const;
const sectionValues = ['props', 'usage', 'examples', 'all'] as const;
const telemetrySubValues = ['status', 'enable', 'disable'] as const;
const examplesSubValues = ['list', 'get'] as const;
const completionShellValues = ['bash', 'zsh', 'fish'] as const;

export const TELEMETRY_SUBCOMMANDS = telemetrySubValues;
export const EXAMPLES_SUBCOMMANDS = examplesSubValues;
export const COMPLETION_SHELLS = completionShellValues;

export type SubcommandName =
  | 'docs'
  | 'list'
  | 'search'
  | 'examples'
  | 'validate'
  | 'init'
  | 'telemetry'
  | 'completion';

export const SUBCOMMANDS: readonly SubcommandSpec[] = [
  {
    name: 'docs',
    positionalKind: 'component',
    flags: [
      { name: '--section', type: 'string', values: sectionValues },
      { name: '--format', type: 'string', values: formatValues },
      { name: '--fresh', type: 'boolean' },
      { name: '--offline', type: 'boolean' },
    ],
  },
  {
    name: 'list',
    flags: [
      { name: '--category', type: 'string', valuesFrom: 'category' },
      { name: '--search', type: 'string' },
      { name: '--format', type: 'string', values: formatValues },
      { name: '--fresh', type: 'boolean' },
      { name: '--offline', type: 'boolean' },
    ],
  },
  {
    name: 'search',
    positionalKind: 'query',
    flags: [
      { name: '--limit', type: 'string' },
      { name: '--format', type: 'string', values: formatValues },
      { name: '--fresh', type: 'boolean' },
      { name: '--offline', type: 'boolean' },
    ],
  },
  {
    name: 'examples',
    positionalKind: 'examples-sub',
    flags: [
      { name: '--format', type: 'string', values: formatValues },
      { name: '--fresh', type: 'boolean' },
      { name: '--offline', type: 'boolean' },
    ],
  },
  {
    name: 'validate',
    positionalKind: 'file',
    flags: [
      { name: '--checks', type: 'string', values: validateChecksValues },
      { name: '--format', type: 'string', values: validateFormatValues },
    ],
  },
  {
    name: 'init',
    flags: [
      { name: '--yes', type: 'boolean' },
      { name: '--skip-install', type: 'boolean' },
    ],
  },
  {
    name: 'telemetry',
    positionalKind: 'telemetry-sub',
    flags: [],
  },
  {
    name: 'completion',
    flags: [],
  },
];

export const TOP_LEVEL_NAMES = SUBCOMMANDS.map(s => s.name) as SubcommandName[];

export const findSubcommand = (name: string): SubcommandSpec | undefined =>
  SUBCOMMANDS.find(s => s.name === name);

export const findFlag = (
  sub: SubcommandSpec,
  name: string
): FlagSpec | undefined => sub.flags.find(f => f.name === name);
