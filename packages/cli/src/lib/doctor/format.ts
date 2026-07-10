import pc from 'picocolors';

export interface RenderRow {
  title: string;
  status: 'ok' | 'error' | 'warning';
  message?: string;
  suggestion?: string;
}

const INDENT = '  ';

const glyph = (status: RenderRow['status']): string => {
  if (status === 'ok') return pc.green('✓');
  if (status === 'error') return pc.red('✗');
  return pc.yellow('!');
};

// Colorize `inline code` spans while keeping the surrounding backticks, so
// piped / non-TTY output (tests, AI agents, files) stays byte-for-byte the same
// and only interactive terminals gain color. picocolors is TTY-aware, so every
// helper below degrades to plain text automatically when color is unsupported.
const highlightCode = (text: string): string =>
  text.replace(/`[^`]+`/g, match => pc.cyan(match));

// A single check can pack several findings into one message joined by "; "
// (e.g. the Tailwind and React-peer checks). For humans we break those into a
// bulleted list with an optional "headline:" lead-in. The raw, unsplit message
// is still preserved verbatim in the JSON report, so this is presentation only.
const splitFindings = (
  message: string
): { headline?: string; items: string[] } => {
  if (!message.includes('; ')) return { items: [message] };
  const body = message.replace(/\.\s*$/, ''); // drop a single trailing period
  const colon = body.indexOf(': ');
  if (colon !== -1) {
    return {
      headline: body.slice(0, colon + 1),
      items: body.slice(colon + 2).split('; '),
    };
  }
  return { items: body.split('; ') };
};

const renderIssue = (row: RenderRow, lines: string[]): void => {
  lines.push(`${glyph(row.status)} ${pc.bold(row.title)}`);

  if (row.message) {
    const { headline, items } = splitFindings(row.message);
    if (headline) lines.push(`${INDENT}${highlightCode(headline)}`);
    if (items.length === 1 && !headline) {
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
