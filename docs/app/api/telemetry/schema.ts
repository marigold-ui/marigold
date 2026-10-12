import { z } from 'zod';
import { TELEMETRY_COMMANDS } from './commands';

// Strict, unlike the MCP half below: an unknown key fails the parse instead of
// being stripped. The CLI carries no identifier by design, and zod's default
// stripping would let a stale one arrive and be dropped in silence. A 400 is
// visible. `anonymousId` is the specific key this guards against: it used to be
// required here, and packages/cli/src/lib/config.ts explains why it went.
export const CliCommandEventSchema = z.strictObject({
  event: z.literal('cli_command'),
  // commands.test.ts holds this to the CLI's `CommandName` union.
  command: z.enum(TELEMETRY_COMMANDS),
  cliVersion: z.string().max(32),
  nodeVersion: z.string().max(32),
  platform: z.string().max(32),
  isTTY: z.boolean(),
  isAIAgent: z.boolean(),
  durationBucket: z.enum(['0-100', '100-500', '500-2000', '2000+']),
  exitCode: z.number().int().min(-1).max(255),
  cacheHit: z.boolean().optional(),
  // Strictness above covers top-level keys only; `args` is a record, so its
  // keys are bounded here instead. This limits how much an arbitrary sender
  // can smuggle in, not what it says: a UUID is slug-shaped and fits in a
  // legitimate key. The guarantee that no identifier is sent is client-side,
  // in packages/cli/src/lib/telemetry.ts.
  args: z
    .record(z.string().max(32), z.string().max(64))
    .refine(a => Object.keys(a).length <= 16)
    .optional(),
});

// hashedCallerId is a SHA-256 of the Keycloak `sub` — never the raw claim.
export const McpToolCallEventSchema = z.object({
  event: z.literal('mcp_tool_call'),
  tool: z.literal('search_docs'),
  hashedCallerId: z.string().regex(/^[0-9a-f]{64}$/),
  latencyMs: z.number().int().min(0),
  success: z.boolean(),
  topMatchFile: z.string().max(512).optional(),
  topMatchHeading: z.string().max(512).optional(),
});

export const EventSchema = z.discriminatedUnion('event', [
  CliCommandEventSchema,
  McpToolCallEventSchema,
]);

export type TelemetryEvent = z.infer<typeof EventSchema>;
export type CliCommandEvent = z.infer<typeof CliCommandEventSchema>;
export type McpToolCallEvent = z.infer<typeof McpToolCallEventSchema>;
