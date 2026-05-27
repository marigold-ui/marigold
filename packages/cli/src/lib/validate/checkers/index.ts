import { resolveThemeDir } from '../helpers/resolve-theme.js';
import type { ValidationIssue } from '../types.js';
import { compileFile } from './compiler.js';
import { validateComposition } from './composition.js';
import { validateDesignSystemUsage } from './design-system-usage.js';
import { validateProps } from './props.js';
import { validateThemeVariants } from './theme-variants.js';

export { compileFile } from './compiler.js';
export { validateComposition } from './composition.js';
export { validateDesignSystemUsage } from './design-system-usage.js';
export { validateProps } from './props.js';
export { validateThemeVariants, loadThemeVariants } from './theme-variants.js';
export type { ThemeVariantMap } from './theme-variants.js';

export type TechnicalResult = {
  issues: ValidationIssue[];
  passed: string[];
};

export const runTechnicalChecks = (
  filePath: string,
  themePath?: string | false
): TechnicalResult => {
  const propIssues = validateProps(filePath);

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
  const dsUsageIssues = validateDesignSystemUsage(filePath);

  const effectiveThemePath =
    themePath === false ? null : (themePath ?? resolveThemeDir());
  const themeIssues = effectiveThemePath
    ? validateThemeVariants(filePath, effectiveThemePath)
    : [];

  const issues: ValidationIssue[] = [
    ...compilerIssues,
    ...propIssues,
    ...compositionIssues,
    ...dsUsageIssues,
    ...themeIssues,
  ];
  const passed: string[] = [];

  if (compilerIssues.length === 0) passed.push('TypeScript compilation');
  if (propIssues.length === 0) passed.push('All Marigold props are valid');
  if (compositionIssues.length === 0) passed.push('Component composition');
  if (dsUsageIssues.length === 0) passed.push('Design system usage');
  if (effectiveThemePath && themeIssues.length === 0)
    passed.push('Theme variant compliance');

  return { issues, passed };
};
