import { resolveThemeDir } from '../helpers/resolve-theme.js';
import {
  type ValidationCoverage,
  type ValidationIssue,
  emptyCoverage,
} from '../types.js';
import { validateAccessibleName } from './accessible-name.js';
import { compileFile } from './compiler.js';
import { validateComposition } from './composition.js';
import { validateDesignSystemUsage } from './design-system-usage.js';
import { validateProps } from './props.js';
import { validateRequiredAncestor } from './required-ancestor.js';
import { validateSectionHeader } from './section-header.js';
import { validateThemeVariants } from './theme-variants.js';

export { validateAccessibleName } from './accessible-name.js';
export { compileFile } from './compiler.js';
export { validateComposition } from './composition.js';
export { validateDesignSystemUsage } from './design-system-usage.js';
export { validateProps } from './props.js';
export { validateRequiredAncestor } from './required-ancestor.js';
export { validateSectionHeader } from './section-header.js';
export { validateThemeVariants, loadThemeVariants } from './theme-variants.js';
export type { ThemeVariantMap } from './theme-variants.js';

export type TechnicalResult = {
  issues: ValidationIssue[];
  passed: string[];
  coverage: ValidationCoverage;
};

export const runTechnicalChecks = (
  filePath: string,
  themePath?: string | false
): TechnicalResult => {
  const coverage = emptyCoverage();
  const propIssues = validateProps(filePath, coverage);

  const propPositions = new Set<string>();
  for (const issue of propIssues) {
    if (issue.location) {
      propPositions.add(`${issue.location.line}:${issue.location.column}`);
    }
  }

  const compileResult = compileFile(filePath);
  const compilerIssues =
    propPositions.size > 0
      ? compileResult.issues.filter(
          i =>
            !i.location ||
            !propPositions.has(`${i.location.line}:${i.location.column}`)
        )
      : compileResult.issues;

  const compositionIssues = validateComposition(filePath);
  const accessibleNameIssues = validateAccessibleName(filePath);
  const requiredAncestorIssues = validateRequiredAncestor(filePath);
  const sectionHeaderIssues = validateSectionHeader(filePath);
  const dsUsageIssues = validateDesignSystemUsage(filePath);

  const effectiveThemePath =
    themePath === false ? null : (themePath ?? resolveThemeDir());
  const themeIssues = effectiveThemePath
    ? validateThemeVariants(filePath, effectiveThemePath, coverage)
    : [];

  const issues: ValidationIssue[] = [
    ...compilerIssues,
    ...propIssues,
    ...compositionIssues,
    ...accessibleNameIssues,
    ...requiredAncestorIssues,
    ...sectionHeaderIssues,
    ...dsUsageIssues,
    ...themeIssues,
  ];
  const passed: string[] = [];

  if (compilerIssues.length === 0) passed.push('TypeScript compilation');
  if (propIssues.length === 0) passed.push('All Marigold props are valid');
  if (compositionIssues.length === 0) passed.push('Component composition');
  if (accessibleNameIssues.length === 0)
    passed.push('Overlay accessible names');
  if (requiredAncestorIssues.length === 0)
    passed.push('Compound component placement');
  if (sectionHeaderIssues.length === 0) passed.push('Section headers');
  if (dsUsageIssues.length === 0) passed.push('Design system usage');
  if (effectiveThemePath && themeIssues.length === 0)
    passed.push('Theme variant compliance');

  return { issues, passed, coverage };
};
