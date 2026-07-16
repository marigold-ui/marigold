import path from 'node:path';
import { detectProject } from '../detect-project.js';
import { ALL_CHECKS } from './checks.js';
import { type RenderRow, renderText } from './format.js';
import { readPackageJson } from './package-json.js';
import { detectProvider } from './provider.js';
import type { DoctorContext, DoctorIssue, DoctorReport } from './types.js';

export type { DoctorReport, DoctorIssue } from './types.js';

/** Thrown when doctor can't run at all (e.g. no package.json at cwd), as opposed
 * to a health-check finding. The bin layer treats it like any other thrown error
 * (prints the message, exits 1); the distinct type is a semantic marker for
 * callers that embed doctor. */
export class DoctorUsageError extends Error {}

const buildContext = (cwd: string): DoctorContext => {
  const pkg = readPackageJson(path.join(cwd, 'package.json'));
  if (!pkg) {
    throw new DoctorUsageError(
      `No package.json found in ${cwd}. Run \`marigold doctor\` from your project root.`
    );
  }
  return {
    cwd,
    pkg,
    project: detectProject(cwd),
    provider: detectProvider(cwd),
  };
};

export const runDoctorChecks = (cwd: string): DoctorReport => {
  const ctx = buildContext(cwd);

  const errors: DoctorIssue[] = [];
  const warnings: DoctorIssue[] = [];
  const passed: string[] = [];
  const rows: RenderRow[] = [];

  for (const check of ALL_CHECKS) {
    const outcome = check(ctx);
    if (outcome.status === 'skip') continue;
    if (outcome.status === 'ok') {
      passed.push(outcome.title);
      rows.push({ title: outcome.title, status: 'ok' });
      continue;
    }
    // status === 'issue'
    const issue: DoctorIssue = {
      check: outcome.check,
      severity: outcome.severity,
      message: outcome.message,
      suggestion: outcome.suggestion,
      details: outcome.details,
    };
    if (issue.severity === 'error') errors.push(issue);
    else warnings.push(issue);
    rows.push({
      title: outcome.title,
      status: issue.severity,
      message: issue.message,
      suggestion: issue.suggestion,
    });
  }

  return { errors, warnings, passed, text: renderText(rows) };
};
