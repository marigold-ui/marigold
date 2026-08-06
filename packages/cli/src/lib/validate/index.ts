import fs from 'node:fs';
import path from 'node:path';
import { runTechnicalChecks } from './checkers/index.js';
import { formatForLLM } from './format.js';
import {
  buildComponentLocationMap,
  buildTextFingerprintMap,
} from './helpers/component-locations.js';
import { setComponentResolutionRoot } from './helpers/components.js';
import { setThemeResolutionRoot } from './helpers/design-tokens.js';
import type { RenderTimingError, SharedRenderer } from './spatial/renderer.js';
import {
  DYNAMIC_ISSUE_SOURCES,
  type ValidateOptions,
  type ValidationCheck,
  type ValidationIssue,
  type ValidationReport,
  emptyCoverage,
} from './types.js';

export type {
  ValidateOptions,
  ValidationCheck,
  ValidationIssue,
  ValidationReport,
  ValidationCoverage,
} from './types.js';
export { isValidationCheck } from './types.js';

// Thrown by the stub renderer when the toolchain (Playwright/Vite/Chromium)
// could not be loaded or launched — an environment precondition, not a defect
// in the validated file. runWithRenderer reports it as a `warning` so a missing
// Chromium can't read, by exit code, as "this component is broken".
class RenderToolchainUnavailableError extends Error {}

// Outer backstop around the combined render+check call. The inner phases carry
// their own budgets (RENDER_BUDGET_MS, INSPECTION_BUDGET_MS), so this must
// exceed their sum (45s + 60s) with margin — sized below that it would fire
// mid-render on a slow-but-healthy component before either inner budget could.
// A literal rather than an import, so a bare `import '@marigold/cli'` never
// pulls in the render toolchain; keep in sync with those two by hand.
const CHECK_BUDGET_MS = 110_000;

// Dynamic checks run on the rendered DOM and carry no source location; these
// sources get joined back via the component-location map. Derived from the
// single list in types.ts — the hand-kept copy it replaces missed two of nine.
const DYNAMIC_SOURCES: ReadonlySet<string> = new Set(DYNAMIC_ISSUE_SOURCES);

// Attach source locations to dynamic findings by joining their component name
// against the JSX usages. One usage pinpoints the line; several are listed as
// candidates. Best-effort: never throws into the validation result.
const fingerprintOf = (issue: ValidationIssue): string | undefined => {
  const fp = issue.details?.fingerprint;
  return typeof fp === 'string' && fp.length > 0 ? fp : undefined;
};

const enrichDynamicLocations = (
  issues: ValidationIssue[],
  filePath: string
): void => {
  const dynamicUnlocated = issues.filter(
    i => !i.location && DYNAMIC_SOURCES.has(i.source)
  );
  if (dynamicUnlocated.length === 0) return;

  let locMap;
  try {
    locMap = buildComponentLocationMap(filePath);
  } catch {
    return;
  }

  // Marigold emits no name-bearing attributes, so the name join often resolves
  // nothing and the content fingerprint is the reliable key. Built lazily, only
  // once a finding still lacks a location and carries one.
  let fpMap: ReturnType<typeof buildTextFingerprintMap> | null = null;
  const getFpMap = (): ReturnType<typeof buildTextFingerprintMap> | null => {
    if (fpMap === null) {
      try {
        fpMap = buildTextFingerprintMap(filePath);
      } catch {
        fpMap = new Map();
      }
    }
    return fpMap;
  };

  for (const issue of dynamicUnlocated) {
    // 1) Name-keyed join (still works for the rare named case and JSX tags).
    const byName = /^[A-Z]/.test(issue.component)
      ? locMap.get(issue.component)
      : undefined;
    if (byName && byName.length === 1) {
      issue.location = byName[0];
      continue;
    }
    if (byName && byName.length > 1) {
      // Multiple same-named usages: try to disambiguate by fingerprint first.
      const fp = fingerprintOf(issue);
      const byFp = fp ? getFpMap()?.get(fp) : undefined;
      if (byFp && byFp.length === 1) {
        issue.location = byFp[0];
        continue;
      }
      issue.location = byName[0];
      issue.details = {
        ...issue.details,
        candidateLocations: byName.map(l => `${l.line}:${l.column}`),
      };
      continue;
    }

    // 2) Fingerprint-only join (the common case for bare-tag components).
    const fp = fingerprintOf(issue);
    const byFp = fp ? getFpMap()?.get(fp) : undefined;
    if (byFp && byFp.length === 1) {
      issue.location = byFp[0];
      continue;
    }
    if (byFp && byFp.length > 1) {
      issue.details = {
        ...issue.details,
        candidateLocations: byFp.map(l => `${l.line}:${l.column}`),
        scope: 'page',
      };
      continue;
    }

    // 3) Nothing resolved: mark it page-level so nothing downstream fabricates
    // a precise line that does not exist.
    issue.details = { ...issue.details, scope: 'page' };
  }
};

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

// A cwd-relative path reads better than an absolute one — except outside cwd,
// where `path.relative` yields a `../../../..` chain that reads worse.
const displayPath = (filePath: string): string => {
  const rel = path.relative(process.cwd(), filePath);
  return rel.startsWith('..') ? filePath : rel;
};

const buildReport = (
  filePath: string,
  issues: ValidationIssue[],
  passed: string[],
  metadata: ValidationReport['metadata']
): ValidationReport => {
  const { errors, warnings } = partition(issues);
  const stub: Omit<ValidationReport, 'text'> = {
    file: displayPath(filePath),
    errors,
    warnings,
    passed,
    metadata,
  };
  return { ...stub, text: formatForLLM(stub) };
};

const runWithRenderer = async (
  filePath: string,
  options: ValidateOptions,
  renderer: SharedRenderer
): Promise<ValidationReport> => {
  const absolute = path.resolve(filePath);
  // Set before any check dispatch, not just in the `technical` branch: the
  // spatial checks consume resolveThemeCss() too, so `--checks spatial` alone
  // still needs the target project's theme rather than the CLI's. Correctness
  // must not depend on `technical` happening to run first.
  setComponentResolutionRoot(path.dirname(absolute));
  setThemeResolutionRoot(path.dirname(absolute));
  const checks = new Set<ValidationCheck>(options.checks);
  const issues: ValidationIssue[] = [];
  const passed: string[] = [];
  let renderTimeMs = 0;
  let componentsFound: string[] = [];
  let widthUtilization: number | null = null;
  let coverage = emptyCoverage();

  if (checks.has('technical')) {
    const themeArg = options.skipTheme ? false : options.themePath;
    try {
      const technical = runTechnicalChecks(absolute, themeArg);
      issues.push(...technical.issues);
      passed.push(...technical.passed);
      coverage = technical.coverage;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      issues.push({
        type: 'technical',
        severity: 'error',
        source: 'runtime',
        component: 'Validator',
        message: `Static analysis could not run: ${message}`,
        suggestion:
          'The component schema is derived from the @marigold/components type declarations. Ensure the package is installed and built.',
      });
    }
  }

  const fatalTechnical = issues.some(
    i =>
      (i.source === 'compiler' || i.source === 'runtime') &&
      i.severity === 'error'
  );

  const wantsRender = checks.has('spatial') || checks.has('a11y');
  if (wantsRender && !fatalTechnical) {
    try {
      // Lazy so the technical-only path and a bare `import '@marigold/cli'`
      // never pull in the optional render toolchain. A missing one surfaces
      // here as a caught runtime error, not an import-time crash.
      const { runSpatialChecks } = await import('./spatial/index.js');
      const renderPhaseStart = Date.now();
      // The renderer's budget only bounds setup+mount. The check phase runs
      // page.evaluate bodies, which Playwright does not time-bound, so a
      // component looping only AFTER mount could hang here.
      let checkTimer: ReturnType<typeof setTimeout> | undefined;
      const checkBudget = new Promise<never>((_, reject) => {
        checkTimer = setTimeout(() => {
          // This firing means neither inner budget got the chance to — attach
          // elapsed time so the report isn't stuck at its 0 initializer.
          const err: RenderTimingError = new Error(
            `Render checks exceeded ${CHECK_BUDGET_MS}ms budget`
          );
          err.renderTimeMs = Date.now() - renderPhaseStart;
          reject(err);
        }, CHECK_BUDGET_MS);
      });
      const spatialPromise = runSpatialChecks(
        absolute,
        {
          enableSpatial: checks.has('spatial'),
          enableA11y: checks.has('a11y'),
          viewport: options.viewport,
        },
        renderer
      );
      // If the budget wins below, spatialPromise keeps running and may reject
      // later with no awaiter. Mark it handled up front.
      spatialPromise.catch(() => {});

      let result;
      try {
        result = await Promise.race([spatialPromise, checkBudget]);
      } finally {
        clearTimeout(checkTimer);
      }

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
      widthUtilization = result.widthUtilization;

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
      // A render that failed partway still took real time — report it.
      if (
        err instanceof Error &&
        typeof (err as RenderTimingError).renderTimeMs === 'number'
      ) {
        renderTimeMs = (err as RenderTimingError).renderTimeMs as number;
      }
      // A missing toolchain is an environment precondition, so it degrades to
      // a warning; any other render failure stays an error, since that is real
      // signal about the file. Matched by name, not instanceof: the class
      // lives in a module that is only ever imported dynamically.
      const isToolchainUnavailable =
        err instanceof RenderToolchainUnavailableError ||
        (err instanceof Error &&
          err.name === 'RenderEnvironmentUnavailableError');
      issues.push({
        type: 'technical',
        severity: isToolchainUnavailable ? 'warning' : 'error',
        source: 'runtime',
        component: 'Renderer',
        message: `Headless render failed: ${message}`,
        suggestion:
          'The render checks need the optional render toolchain plus a browser: `npm i playwright vite @vitejs/plugin-react @axe-core/playwright && npx playwright install chromium`. Or run with `--checks technical` to skip rendering. Also ensure the file exports a default React component.',
      });
    }
  }

  enrichDynamicLocations(issues, absolute);

  return buildReport(absolute, issues, passed, {
    renderTimeMs,
    componentsFound,
    checksRun: Array.from(checks),
    coverage,
    widthUtilization,
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
        throw new RenderToolchainUnavailableError(
          'Renderer not available for technical-only run.'
        );
      },
      close: async () => undefined,
    };
    return runWithRenderer(filePath, options, stub);
  }

  // The render toolchain is an optional peer dependency and Chromium may be
  // absent. On failure, fall back to a renderer whose render() throws, so
  // runWithRenderer records a structured `runtime` finding and still returns
  // the technical ones instead of throwing out of validate().
  let renderer: SharedRenderer;
  try {
    const { createRenderer } = await import('./spatial/renderer.js');
    renderer = await createRenderer();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    renderer = {
      render: () => {
        throw new RenderToolchainUnavailableError(message);
      },
      close: async () => undefined,
    };
  }
  try {
    return await runWithRenderer(filePath, options, renderer);
  } finally {
    await renderer.close();
  }
};
