import { TELEMETRY_COMMANDS } from './commands';
import type { CliCommandEvent, McpToolCallEvent } from './schema';

/**
 * Known-good events, one field varied at a time. Fully typed: build a
 * deliberately invalid shape by spreading and overriding at the call site
 * (`{ ...makeCliEvent(), command: 'bogus' }`) rather than by loosening these.
 */
export const makeCliEvent = (
  overrides: Partial<CliCommandEvent> = {}
): CliCommandEvent => ({
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

export const makeMcpEvent = (
  overrides: Partial<McpToolCallEvent> = {}
): McpToolCallEvent => ({
  event: 'mcp_tool_call',
  tool: 'search_docs',
  hashedCallerId: 'a'.repeat(64),
  hashPeriod: '2026-Q1',
  latencyMs: 120,
  success: true,
  topMatchFile: 'Button.mdx',
  topMatchHeading: 'Usage',
  ...overrides,
});
