import { TELEMETRY_COMMANDS } from './commands';
import type { TelemetryEvent } from './schema';

type CliEvent = Extract<TelemetryEvent, { event: 'cli_command' }>;
type McpEvent = Extract<TelemetryEvent, { event: 'mcp_tool_call' }>;

/**
 * Known-good events, one field varied at a time. Typed loosely on the way in so
 * a test can post a deliberately invalid shape (`{ command: 'bogus' }`) through
 * the same factory the valid cases use — the schema, not the factory, is what
 * decides what is acceptable.
 */
export const makeCliEvent = (overrides: Partial<CliEvent> = {}) => ({
  event: 'cli_command',
  command: TELEMETRY_COMMANDS[0],
  cliVersion: '1.0.0',
  nodeVersion: '24.0.0',
  platform: 'darwin',
  isTTY: true,
  isAIAgent: false,
  durationBucket: '0-100',
  exitCode: 0,
  anonymousId: '00000000-0000-4000-8000-000000000000',
  ...overrides,
});

export const makeMcpEvent = (overrides: Partial<McpEvent> = {}) => ({
  event: 'mcp_tool_call',
  tool: 'search_docs',
  hashedCallerId: 'a'.repeat(64),
  latencyMs: 120,
  success: true,
  topMatchFile: 'Button.mdx',
  topMatchHeading: 'Usage',
  ...overrides,
});
