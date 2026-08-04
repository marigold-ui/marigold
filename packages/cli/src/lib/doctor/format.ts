import pc from 'picocolors';
import { highlightCode } from '../format.js';

export interface RenderRow {
  title: string;
  status: 'ok' | 'error' | 'warning';
  message?: string;
  /** Individual findings, rendered as a bulleted list. When present these drive
   * the human output directly; the joined `message` is kept only for the JSON
   * report, so there is no string round-trip to parse back. */
  findings?: string[];
  /** Optional lead-in printed above the findings bullets. */
  headline?: string;
  suggestion?: string;
}

const INDENT = '  ';

const glyph = (status: RenderRow['status']): string => {
  if (status === 'ok') return pc.green('✓');
  if (status === 'error') return pc.red('✗');
  return pc.yellow('!');
};

// A single check can carry several findings (e.g. the Tailwind, freshness, and
// React-peer checks). For humans we render them as a bulleted list under an
// optional "headline:" lead-in, working from the structured `findings` array
// rather than re-parsing the joined `message` string. A check with no explicit
// findings renders its `message` as a single line.
const renderIssue = (row: RenderRow, lines: string[]): void => {
  lines.push(`${glyph(row.status)} ${pc.bold(row.title)}`);

  const items = row.findings ?? (row.message ? [row.message] : []);
  if (items.length > 0) {
    if (row.headline) lines.push(`${INDENT}${highlightCode(row.headline)}`);
    if (items.length === 1 && !row.headline) {
      lines.push(`${INDENT}${highlightCode(items[0])}`);
    } else {
      for (const item of items) {
        lines.push(`${INDENT}${pc.dim('•')} ${highlightCode(item)}`);
      }
    }
  }

  if (row.suggestion) {
    lines.push(`${INDENT}${pc.dim('Fix:')} ${highlightCode(row.suggestion)}`);
  }
};

// Renders the human-readable report embedded in DoctorReport.text. Checks are
// grouped by severity — errors, then warnings, then a de-emphasized list of the
// checks that passed — so problems (and their fixes) surface at a glance.
export const renderText = (rows: RenderRow[]): string => {
  const errors = rows.filter(r => r.status === 'error');
  const warnings = rows.filter(r => r.status === 'warning');
  const passed = rows.filter(r => r.status === 'ok');

  const heading = 'Marigold Doctor';
  const lines: string[] = [
    pc.bold(heading),
    pc.dim('─'.repeat(heading.length)),
  ];

  const section = (
    label: string,
    color: (s: string) => string,
    group: RenderRow[]
  ): void => {
    if (group.length === 0) return;
    lines.push('', color(pc.bold(`${label} (${group.length})`)));
    for (const row of group) {
      lines.push('');
      renderIssue(row, lines);
    }
  };

  section('Errors', pc.red, errors);
  section('Warnings', pc.yellow, warnings);

  if (passed.length > 0) {
    lines.push('', pc.green(pc.bold(`Passed (${passed.length})`)));
    for (const row of passed) {
      lines.push(`${pc.green('✓')} ${pc.dim(row.title)}`);
    }
  }

  lines.push('');
  if (errors.length === 0 && warnings.length === 0) {
    lines.push(pc.green('No issues found. Your Marigold setup is healthy.'));
  } else {
    const parts: string[] = [];
    if (errors.length > 0)
      parts.push(`${errors.length} error${errors.length === 1 ? '' : 's'}`);
    if (warnings.length > 0)
      parts.push(
        `${warnings.length} warning${warnings.length === 1 ? '' : 's'}`
      );
    const summaryGlyph = errors.length > 0 ? pc.red('✗') : pc.yellow('!');
    lines.push(`${summaryGlyph} ${parts.join(', ')}.`);
  }

  return lines.join('\n');
};
