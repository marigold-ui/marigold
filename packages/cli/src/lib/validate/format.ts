import type { ValidationIssue, ValidationReport } from './types.js';

const TYPE_ORDER: Record<ValidationIssue['type'], number> = {
  technical: 0,
  spatial: 1,
  style: 2,
  a11y: 3,
};

const sortIssues = (issues: ValidationIssue[]): ValidationIssue[] =>
  [...issues].sort((a, b) => {
    const t = TYPE_ORDER[a.type] - TYPE_ORDER[b.type];
    if (t !== 0) return t;
    if (a.severity !== b.severity) return a.severity === 'error' ? -1 : 1;
    return a.component.localeCompare(b.component);
  });

const MAX_DETAIL_LENGTH = 120;

const formatValue = (v: unknown): string => {
  if (typeof v === 'string') {
    return v.length > 80 ? v.slice(0, 77) + '...' : v;
  }
  if (Array.isArray(v) && v.length > 8) {
    const truncated = JSON.stringify(v.slice(0, 8));
    return truncated.slice(0, -1) + ', …]';
  }
  // The formatter must never crash on a detail value, whatever it is.
  // JSON.stringify returns the value `undefined` (not a string) for undefined,
  // functions and symbols, and it THROWS on a bigint or a circular object.
  // Render/a11y findings carry optional detail fields (e.g. an axe violation
  // with no `impact`), so fall back to String(v) in either case.
  let s: string | undefined;
  try {
    s = JSON.stringify(v);
  } catch {
    return String(v);
  }
  if (s === undefined) return String(v);
  return s.length > MAX_DETAIL_LENGTH
    ? s.slice(0, MAX_DETAIL_LENGTH - 1) + '…'
    : s;
};

const formatDetails = (details: Record<string, unknown>): string =>
  Object.entries(details)
    .map(([k, v]) => `${k}=${formatValue(v)}`)
    .join(', ');

const formatIssue = (issue: ValidationIssue): string => {
  const loc = issue.location
    ? ` (${issue.location.file}:${issue.location.line}:${issue.location.column})`
    : '';
  const tag = `[${issue.severity}/${issue.type}]`;
  const details =
    issue.details && Object.keys(issue.details).length > 0
      ? `\n  data: {${formatDetails(issue.details)}}`
      : '';
  return `${tag} <${issue.component}>: ${issue.message}${loc}\n  → ${issue.suggestion}${details}`;
};

export const formatForLLM = (
  report: Omit<ValidationReport, 'text'>
): string => {
  const all = sortIssues([...report.errors, ...report.warnings]);
  const lines: string[] = [];

  const summary =
    all.length === 0
      ? 'ok'
      : `${report.errors.length} error(s), ${report.warnings.length} warning(s)`;

  lines.push(`marigold-validate: ${report.file} — ${summary}`);

  if (all.length > 0) {
    lines.push('');
    for (const issue of all) lines.push(formatIssue(issue));
  }

  if (report.passed.length > 0) {
    lines.push('');
    lines.push(`passed: ${report.passed.join(', ')}`);
  }

  if (report.metadata.checksRun.length > 0) {
    lines.push('');
    lines.push(`checks run: ${report.metadata.checksRun.join(', ')}`);
  }

  return lines.join('\n');
};
