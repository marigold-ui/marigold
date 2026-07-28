import path from 'node:path';
import {
  loadMarigoldRegistry,
  setComponentResolutionRoot,
} from '../helpers/components.js';
import {
  resolveThemeDir,
  setThemeResolutionRoot,
} from '../helpers/resolve-theme.js';
import {
  type IssueSource,
  type ValidationCoverage,
  type ValidationIssue,
  emptyCoverage,
} from '../types.js';
import { validateAccessibleName } from './accessible-name.js';
import { validateCollectionId } from './collection-id.js';
import { compileFile } from './compiler.js';
import { validateComponentConventions } from './component-conventions.js';
import { validateComposition } from './composition.js';
import { validateDesignSystemUsage } from './design-system-usage.js';
import { validateLayoutUsage } from './layout-usage.js';
import { validateProps } from './props.js';
import { validateRequiredAncestor } from './required-ancestor.js';
import { validateSectionHeader } from './section-header.js';
import { validateTableUsage } from './table-usage.js';
import { validateThemeVariants } from './theme-variants.js';

export { validateAccessibleName } from './accessible-name.js';
export { validateCollectionId } from './collection-id.js';
export { validateComponentConventions } from './component-conventions.js';
export { compileFile } from './compiler.js';
export { validateComposition } from './composition.js';
export { validateDesignSystemUsage } from './design-system-usage.js';
export { validateLayoutUsage } from './layout-usage.js';
export { validateProps } from './props.js';
export { validateRequiredAncestor } from './required-ancestor.js';
export { validateSectionHeader } from './section-header.js';
export { validateTableUsage } from './table-usage.js';
export { validateThemeVariants, loadThemeVariants } from './theme-variants.js';
export type { ThemeVariantMap } from './theme-variants.js';

export type TechnicalResult = {
  issues: ValidationIssue[];
  passed: string[];
  coverage: ValidationCoverage;
};

const checkFailureIssue = (
  source: IssueSource,
  label: string,
  err: unknown
): ValidationIssue => ({
  type: 'technical',
  severity: 'warning',
  source,
  component: 'file',
  message: `${label} check failed: ${err instanceof Error ? err.message : String(err)}`,
  suggestion:
    'This check could not complete due to an internal error; other checks still ran.',
});

// Isolates a single checker so an unexpected exception (an edge-case AST
// shape a checker's author didn't anticipate) can't silently wipe out every
// other checker's findings for the file — it degrades to one warning for
// just that checker instead of collapsing the whole technical pass.
const safeCheck = (
  source: IssueSource,
  label: string,
  fn: () => ValidationIssue[]
): ValidationIssue[] => {
  try {
    return fn();
  } catch (err) {
    return [checkFailureIssue(source, label, err)];
  }
};

export const runTechnicalChecks = (
  filePath: string,
  themePath?: string | false
): TechnicalResult => {
  const coverage = emptyCoverage();
  const projectDir = path.dirname(filePath);
  setComponentResolutionRoot(projectDir);
  setThemeResolutionRoot(projectDir);

  const compileResult = (() => {
    try {
      return compileFile(filePath);
    } catch (err) {
      return {
        ok: false,
        issues: [checkFailureIssue('compiler', 'TypeScript compilation', err)],
      };
    }
  })();

  // Every checker below (and theme-variant resolution) reads the
  // @marigold/components registry. If it can't load, each would fail
  // identically and safeCheck would downgrade every one of those failures to
  // its own warning — N warnings adding up to a report that still shows
  // "0 error(s)" even though nothing was actually checked against the design
  // system. Load it once up front instead: on failure, report ONE error for
  // the real cause and skip the checks that can't produce a meaningful
  // result without it, rather than let a missing/unbuilt dependency read as
  // a clean file.
  let registryIssue: ValidationIssue | undefined;
  try {
    loadMarigoldRegistry();
  } catch (err) {
    registryIssue = {
      type: 'technical',
      severity: 'error',
      source: 'runtime',
      component: 'Validator',
      message: `Design-system checks could not run: ${err instanceof Error ? err.message : String(err)}`,
      suggestion:
        'The component schema is derived from the @marigold/components type declarations. Ensure the package is installed and built (`pnpm --filter @marigold/components build` inside the monorepo, or `pnpm add @marigold/components` in a consuming project), then re-run.',
    };
  }

  const propIssues = registryIssue
    ? []
    : safeCheck('prop-validator', 'Prop validation', () =>
        validateProps(filePath, coverage)
      );

  const propPositions = new Set<string>();
  for (const issue of propIssues) {
    if (issue.location) {
      propPositions.add(`${issue.location.line}:${issue.location.column}`);
    }
  }

  const compilerIssues =
    propPositions.size > 0
      ? compileResult.issues.filter(
          i =>
            !i.location ||
            !propPositions.has(`${i.location.line}:${i.location.column}`)
        )
      : compileResult.issues;

  const compositionIssues = registryIssue
    ? []
    : safeCheck('composition-validator', 'Composition', () =>
        validateComposition(filePath)
      );
  const accessibleNameIssues = registryIssue
    ? []
    : safeCheck('accessible-name', 'Accessible name', () =>
        validateAccessibleName(filePath)
      );
  const requiredAncestorIssues = registryIssue
    ? []
    : safeCheck('required-ancestor', 'Required ancestor', () =>
        validateRequiredAncestor(filePath)
      );
  const sectionHeaderIssues = registryIssue
    ? []
    : safeCheck('section-header', 'Section header', () =>
        validateSectionHeader(filePath)
      );
  const collectionIdIssues = registryIssue
    ? []
    : safeCheck('collection-id', 'Collection id', () =>
        validateCollectionId(filePath)
      );
  const dsUsageIssues = registryIssue
    ? []
    : safeCheck('design-system-usage', 'Design system usage', () =>
        validateDesignSystemUsage(filePath)
      );
  const layoutUsageIssues = registryIssue
    ? []
    : safeCheck('layout-usage', 'Layout usage', () =>
        validateLayoutUsage(filePath)
      );
  const tableUsageIssues = registryIssue
    ? []
    : safeCheck('table-usage', 'Table usage', () =>
        validateTableUsage(filePath)
      );
  const componentConventionIssues = registryIssue
    ? []
    : safeCheck('component-conventions', 'Component conventions', () =>
        validateComponentConventions(filePath)
      );

  const effectiveThemePath =
    themePath === false ? null : (themePath ?? resolveThemeDir());
  const themeIssues =
    effectiveThemePath && !registryIssue
      ? safeCheck('theme-variant-validator', 'Theme variant compliance', () =>
          validateThemeVariants(filePath, effectiveThemePath, coverage)
        )
      : [];

  const issues: ValidationIssue[] = [
    ...compilerIssues,
    ...(registryIssue ? [registryIssue] : []),
    ...propIssues,
    ...compositionIssues,
    ...accessibleNameIssues,
    ...requiredAncestorIssues,
    ...sectionHeaderIssues,
    ...collectionIdIssues,
    ...dsUsageIssues,
    ...layoutUsageIssues,
    ...tableUsageIssues,
    ...componentConventionIssues,
    ...themeIssues,
  ];
  const passed: string[] = [];

  if (compilerIssues.length === 0) passed.push('TypeScript compilation');
  if (!registryIssue) {
    if (propIssues.length === 0) passed.push('All Marigold props are valid');
    if (compositionIssues.length === 0) passed.push('Component composition');
    if (accessibleNameIssues.length === 0)
      passed.push('Overlay accessible names');
    if (requiredAncestorIssues.length === 0)
      passed.push('Compound component placement');
    if (sectionHeaderIssues.length === 0) passed.push('Section headers');
    if (collectionIdIssues.length === 0) passed.push('Collection item ids');
    if (dsUsageIssues.length === 0) passed.push('Design system usage');
    if (layoutUsageIssues.length === 0) passed.push('Layout usage');
    if (tableUsageIssues.length === 0) passed.push('Table usage');
    if (componentConventionIssues.length === 0)
      passed.push('Component conventions');
    if (effectiveThemePath && themeIssues.length === 0)
      passed.push('Theme variant compliance');
  }

  return { issues, passed, coverage };
};
