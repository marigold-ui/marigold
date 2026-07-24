// Mirrors the CLI's CommandName union in packages/cli/src/lib/telemetry.ts.
// Single source for the command enum so the route's schema and its test
// coverage can't silently drift apart when a command is added or removed.
export const TELEMETRY_COMMANDS = [
  'docs',
  'list',
  'search',
  'examples',
  'validate',
  'init',
  'doctor',
  'telemetry',
] as const;
