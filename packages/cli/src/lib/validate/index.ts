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

// Thrown by the stub renderer's render() when the render toolchain (Playwright/
// Vite/Chromium) itself could not be loaded or launched — an environment/setup
// precondition, not a defect in the file being validated. `runWithRenderer`'s
// catch checks for this specifically so it can report a `warning` instead of
// an `error`: a missing Chromium on this machine must not read, by exit code,
// as "the validated file is broken" to an automated correction loop.
class RenderToolchainUnavailableError extends Error {}

// Outer backstop around the whole render+check call below (runSpatialChecks:
// renderer.render() then the inspection phase). It is NOT the check phase's
// own budget — that's INSPECTION_BUDGET_MS in spatial/index.ts, which starts
// its own clock only after render() has already returned, same as
// RENDER_BUDGET_MS in renderer.ts bounds only render() itself. Both of those
// are already correctly scoped and carry their own timeout errors. This one
// wraps the combined call, so it must exceed their sum (45s + 60s) with
// margin — sized below that, it could fire mid-render on a legitimately
// slow-but-healthy component (e.g. a heavy import graph under load), well
// before either inner budget gets a chance to do its job, and report a false
// runtime error against valid code. Kept as a literal (not imported from
// renderer.ts/spatial/index.ts) so this module — and by extension a bare
// `import '@marigold/cli'` — never eagerly pulls in the render toolchain;
// keep in sync with those two constants by hand if either changes.
const CHECK_BUDGET_MS = 110_000;

// Dynamic checks run on the rendered DOM and have no inherent source location.
// These sources get joined back to the source via the component-location map.
// Derived from the single list in types.ts rather than spelled out again here —
// the hand-kept copy this replaces was missing two of the nine.
const DYNAMIC_SOURCES: ReadonlySet<string> = new Set(DYNAMIC_ISSUE_SOURCES);

// Attach source locations to dynamic findings by joining their component name
// against the JSX usages in the source. A single usage pinpoints the line;
// multiple usages are listed as candidates (to be narrowed by the finding's
// content fingerprint). Best-effort: never throws into the validation result.
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

  // Marigold emits no name-bearing attributes, so the component-name join often
  // resolves nothing; the content fingerprint is the reliable key. Build it
  // lazily and only if at least one finding still lacks a location after the
  // name join AND carries a fingerprint. Best-effort: never throws.
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

    // 3) Nothing resolved: make the page-level nature explicit so nothing
    // downstream fabricates a precise line that does not exist.
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

// A path relative to cwd reads better than an absolute one — except when the
// file is outside cwd, where `path.relative` produces a `../../../../..`
// chain that is harder to read than the absolute path it's relative to.
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
  // Set unconditionally, before any check dispatch below — not just inside
  // the `technical` branch. resolveThemeCss() (helpers/design-tokens.ts) is
  // consumed by the spatial checks too, so a `--checks spatial`/`--checks
  // a11y` run with no `technical` in the set still needs the target
  // project's own `@marigold/theme-rui`/`@marigold/components`, not the
  // CLI's. Correctness must not depend on `technical` happening to run first
  // under `--checks all`.
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
      // Loaded lazily so the technical-only path and a bare `import
      // '@marigold/cli'` never pull in the render toolchain (playwright/vite/
      // axe), which is an optional dependency. A missing toolchain therefore
      // surfaces here as a caught runtime error, not an import-time crash.
      const { runSpatialChecks } = await import('./spatial/index.js');
      const renderPhaseStart = Date.now();
      // The renderer's own budget only bounds setup+mount. The check phase runs
      // page.evaluate bodies, which Playwright does not time-bound, so a
      // component that only enters an infinite loop AFTER mount could hang here.
      // Cap the whole check phase; on timeout this rejects into the catch below
      // and surfaces as a runtime error (the context is torn down in validate()).
      let checkTimer: ReturnType<typeof setTimeout> | undefined;
      const checkBudget = new Promise<never>((_, reject) => {
        checkTimer = setTimeout(() => {
          // This backstop firing means neither renderer.ts's nor
          // spatial/index.ts's own (better-informed) budget error got a
          // chance to — attach wall-clock elapsed time so the report still
          // reflects real duration instead of the 0 initializer.
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
      // If the budget wins the race below, spatialPromise is not cancelled —
      // it keeps running and may reject later (e.g. once the page/context is
      // torn down) with no local awaiter. Mark it handled up front so that
      // eventual rejection never surfaces as an unhandled promise rejection.
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
      // A render that failed partway still ran for real wall-clock time —
      // report it instead of leaving the metadata stuck at its 0 initializer.
      if (
        err instanceof Error &&
        typeof (err as RenderTimingError).renderTimeMs === 'number'
      ) {
        renderTimeMs = (err as RenderTimingError).renderTimeMs as number;
      }
      // A missing/unlaunchable toolchain is an environment precondition, not
      // a defect in the validated file — report it as a warning so it can't
      // be mistaken for "this component is broken" by exit code alone. Any
      // other render failure (a genuine crash, the CHECK_BUDGET_MS timeout)
      // stays an error: that IS a real signal about the file under test.
      const isToolchainUnavailable =
        err instanceof RenderToolchainUnavailableError;
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

  // The render toolchain (playwright/vite/react/etc.) is an optional peer
  // dependency (see packages/cli/package.json) and Chromium may be absent.
  // Load and launch it here; on any failure fall back to a renderer whose
  // render() throws, so runWithRenderer records a structured `runtime`
  // finding (and still returns the technical findings) instead of throwing
  // out of validate() — the programmatic entry point a correction loop calls.
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
