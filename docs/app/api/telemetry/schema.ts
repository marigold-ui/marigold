import { z } from 'zod';
import { TELEMETRY_COMMANDS } from './commands';

// Exported because it is the only shape the public POST endpoint accepts —
// `mcp_tool_call` events are written in-process and must not be forgeable.
export const CliCommandEventSchema = z.object({
  event: z.literal('cli_command'),
  // commands.test.ts holds this to the CLI's `CommandName` union: an unknown
  // command is a 400 the fire-and-forget CLI swallows.
  command: z.enum(TELEMETRY_COMMANDS),
  cliVersion: z.string().max(32),
  nodeVersion: z.string().max(32),
  platform: z.string().max(32),
  isTTY: z.boolean(),
  isAIAgent: z.boolean(),
  durationBucket: z.enum(['0-100', '100-500', '500-2000', '2000+']),
  exitCode: z.number().int().min(-1).max(255),
  cacheHit: z.boolean().optional(),
  args: z.record(z.string(), z.string().max(64)).optional(),
  anonymousId: z.uuid(),
});

// `hashedCallerId` is a one-way HMAC-SHA256 digest of the caller's Keycloak
// `sub` — never the raw claim, which identifies a Reservix employee.
const McpToolCallEventSchema = z.object({
  event: z.literal('mcp_tool_call'),
  tool: z.literal('search_docs'),
  // Matches what `hashCallerId` produces: a lowercase hex SHA-256 digest.
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
