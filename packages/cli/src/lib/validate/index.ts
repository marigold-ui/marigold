import fs from 'node:fs';
import path from 'node:path';
import { runTechnicalChecks } from './checkers/index.js';
import { formatForLLM } from './format.js';
import { runSpatialChecks } from './spatial/index.js';
import { type SharedRenderer, createRenderer } from './spatial/renderer.js';
import type {
  ValidateOptions,
  ValidationCheck,
  ValidationIssue,
  ValidationReport,
} from './types.js';

export type {
  ValidateOptions,
  ValidationCheck,
  ValidationIssue,
  ValidationReport,
} from './types.js';
export { isValidationCheck } from './types.js';

const partition = (
  issues: ValidationIssue[]
): { errors: ValidationIssue[]; warnings: ValidationIssue[] } => {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];
  for (const issue of issues) {
    if (issue.severity === 'error') errors.push(issue);
    else warnings.push(issue);
  }
  return { errors, warnings };
};

const buildReport = (
  filePath: string,
  issues: ValidationIssue[],
  passed: string[],
  metadata: ValidationReport['metadata']
): ValidationReport => {
  const { errors, warnings } = partition(issues);
  const stub: Omit<ValidationReport, 'markdown'> = {
    file: path.relative(process.cwd(), filePath),
    errors,
    warnings,
    passed,
    metadata,
  };
  return { ...stub, markdown: formatForLLM(stub) };
};

const runWithRenderer = async (
  filePath: string,
  options: ValidateOptions,
  renderer: SharedRenderer
): Promise<ValidationReport> => {
  const absolute = path.resolve(filePath);
  const checks = new Set<ValidationCheck>(options.checks);
  const issues: ValidationIssue[] = [];
  const passed: string[] = [];
  let renderTimeMs = 0;
  let componentsFound: string[] = [];

  if (checks.has('technical')) {
    const themeArg = options.skipTheme ? false : options.themePath;
    const technical = runTechnicalChecks(absolute, themeArg);
    issues.push(...technical.issues);
    passed.push(...technical.passed);
  }

  const fatalTechnical = issues.some(
    i => i.source === 'compiler' && i.severity === 'error'
  );

  const wantsRender = checks.has('spatial') || checks.has('a11y');
  if (wantsRender && !fatalTechnical) {
    try {
      const result = await runSpatialChecks(
        absolute,
        {
          enableSpatial: checks.has('spatial'),
          enableA11y: checks.has('a11y'),
          viewport: options.viewport,
        },
        renderer
      );

      if (checks.has('spatial')) {
        issues.push(
          ...result.spatialIssues,
          ...result.styleIssues,
          ...result.responsiveIssues
        );
        if (result.spatialIssues.length === 0) {
          passed.push('No overlapping components detected');
        }
        if (result.responsiveIssues.length === 0) {
          passed.push('Responsive layout');
        }
      }
      if (checks.has('a11y')) {
        issues.push(...result.a11yIssues, ...result.keyboardIssues);
        if (
          result.a11yIssues.length === 0 &&
          result.keyboardIssues.length === 0
        ) {
          passed.push('Accessibility checks');
        }
      }

      renderTimeMs = result.renderTimeMs;
      componentsFound = result.componentsFound;

      for (const message of result.pageErrors) {
        issues.push({
          type: 'technical',
          severity: 'error',
          source: 'runtime',
          component: 'Runtime',
          message: `Render error: ${message}`,
          suggestion:
            'A React error was thrown while rendering. Inspect required props and component imports.',
        });
      }
      for (const message of result.consoleErrors) {
        issues.push({
          type: 'technical',
          severity: 'warning',
          source: 'runtime',
          component: 'Console',
          message: `Console error during render: ${message}`,
          suggestion:
            'Console errors often indicate misuse of an API. Address them or downgrade them to warnings explicitly.',
        });
      }
      for (const renderError of result.renderErrors) {
        issues.push({
          type: 'technical',
          severity: 'error',
          source: 'runtime',
          component: 'Runtime',
          message: `Component threw during render: ${renderError.message}`,
          suggestion:
            'Fix the error in the component body or its effects. This was caught by the error boundary — the rendered output is a fallback, not the intended UI.',
          details: {
            stack: renderError.stack,
            componentStack: renderError.componentStack,
          },
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      issues.push({
        type: 'technical',
        severity: 'error',
        source: 'runtime',
        component: 'Renderer',
        message: `Headless render failed: ${message}`,
        suggestion:
          'Ensure Playwright Chromium is installed (`npx playwright install chromium`) and that the file exports a default React component.',
      });
    }
  }

  return buildReport(absolute, issues, passed, {
    renderTimeMs,
    componentsFound,
    checksRun: Array.from(checks),
  });
};

export const validate = async (
  filePath: string,
  options: ValidateOptions
): Promise<ValidationReport> => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const wantsRender =
    options.checks.includes('spatial') || options.checks.includes('a11y');
  if (!wantsRender) {
    // No browser needed; build a stub renderer that throws if used.
    const stub: SharedRenderer = {
      render: () => {
        throw new Error('Renderer not available for technical-only run.');
      },
      close: async () => undefined,
    };
    return runWithRenderer(filePath, options, stub);
  }

  const renderer = await createRenderer();
  try {
    return await runWithRenderer(filePath, options, renderer);
  } finally {
    await renderer.close();
  }
};
