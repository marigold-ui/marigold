import { z } from 'zod';
import { TELEMETRY_COMMANDS } from './commands';

export const CliCommandEventSchema = z.object({
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
  args: z.record(z.string(), z.string().max(64)).optional(),
  anonymousId: z.uuid(),
});

// hashedCallerId is an HMAC of the Keycloak `sub` — never the raw claim.
export const McpToolCallEventSchema = z.object({
  event: z.literal('mcp_tool_call'),
  tool: z.literal('search_docs'),
  hashedCallerId: z.string().regex(/^[0-9a-f]{64}$/),
  // The period the digest is salted with. Stored rather than derived from
  // `receivedAt`, which is stamped later and can land on the far side of a
  // boundary.
  hashPeriod: z.string().regex(/^\d{4}-Q[1-4]$/),
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
