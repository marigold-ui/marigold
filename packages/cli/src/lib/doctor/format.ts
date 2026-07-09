import pc from 'picocolors';

export interface RenderRow {
  title: string;
  status: 'ok' | 'error' | 'warning';
  message?: string;
  suggestion?: string;
}

const glyph = (status: RenderRow['status']): string => {
  if (status === 'ok') return pc.green('✓');
  if (status === 'error') return pc.red('✗');
  return pc.yellow('!');
};

// Renders the human-readable checklist embedded in DoctorReport.text. Only the
// status glyph is colorized, so downstream assertions/pipes can match on the
// plain message text.
export const renderText = (rows: RenderRow[]): string => {
  const lines: string[] = [pc.bold('Marigold Doctor'), '==============='];
  lines.push('');

  for (const row of rows) {
    lines.push(`${glyph(row.status)} ${row.title}`);
    if (row.message) lines.push(`  ${row.message}`);
    if (row.suggestion) lines.push(`  ${pc.dim('→')} ${row.suggestion}`);
  }

  const errors = rows.filter(r => r.status === 'error').length;
  const warnings = rows.filter(r => r.status === 'warning').length;

  lines.push('');
  if (errors === 0 && warnings === 0) {
    lines.push(pc.green('No issues found. Your Marigold setup is healthy.'));
  } else {
    const parts: string[] = [];
    if (errors > 0) parts.push(`${errors} error${errors === 1 ? '' : 's'}`);
    if (warnings > 0)
      parts.push(`${warnings} warning${warnings === 1 ? '' : 's'}`);
    lines.push(parts.join(', ') + '.');
  }

  return lines.join('\n');
};
