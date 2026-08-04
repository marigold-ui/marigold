// Mirrors the CLI's CommandName union in packages/cli/src/lib/telemetry.ts.
// Single source for the command enum so the route's schema and its test
// coverage can't silently drift apart when a command is added or removed.
//
// Because route.test.ts derives its coverage from this same list, no test in
// this file's own suite can catch it drifting from the CLI union it mirrors —
// a command missing here is a 400 the CLI silently swallows. commands.test.ts
// closes that by asserting set equality against the CLI source directly; keep
// the order in sync with the union there so the two read as one list.
export const TELEMETRY_COMMANDS = [
  'docs',
  'list',
  'search',
  'examples',
  'validate',
  'init',
  'doctor',
  'migrate',
  'telemetry',
] as const;
