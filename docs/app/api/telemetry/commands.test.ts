import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TELEMETRY_COMMANDS } from './commands';

// The CLI is not a dependency of the docs app, so its CommandName union cannot
// be imported — it is read out of the source instead. That is deliberate: this
// is the only place the two halves of the telemetry contract are genuinely
// cross-checked. route.test.ts derives its cases from TELEMETRY_COMMANDS, so a
// command present in the CLI but absent from the enum passes every other test
// while the route answers 400 and the CLI's `catch {}` discards the event.
const CLI_TELEMETRY_SOURCE = path.join(
  fileURLToPath(new URL('../../../../', import.meta.url)),
  'packages/cli/src/lib/telemetry.ts'
);

const readCliCommandNames = (): string[] => {
  const source = fs.readFileSync(CLI_TELEMETRY_SOURCE, 'utf8');
  const union = /export type CommandName =([\s\S]*?);/.exec(source);
  if (!union) {
    throw new Error(
      `Could not find the CommandName union in ${CLI_TELEMETRY_SOURCE}. ` +
        'If it was renamed or reshaped, update this test — do not delete it.'
    );
  }
  return [...union[1].matchAll(/'([^']+)'/g)].map(m => m[1]);
};

describe('TELEMETRY_COMMANDS', () => {
  it("covers exactly the CLI's CommandName union", () => {
    const cliCommands = readCliCommandNames();

    // Guards the regex itself: an empty match would make the assertion below
    // vacuously pass against an empty enum.
    expect(cliCommands.length).toBeGreaterThan(1);
    expect([...TELEMETRY_COMMANDS].sort()).toEqual([...cliCommands].sort());
  });
});
