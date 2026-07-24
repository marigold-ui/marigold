import { findThemeComponents } from '../anchor.js';
import { parseOr } from '../engine.js';
import type { Codemod, CodemodOutcome, MigrationManifest } from '../types.js';

const analyze = (
  source: string,
  collect: (component: string, warnings: string[]) => void
): CodemodOutcome => {
  if (!source.includes('ThemeComponent')) {
    return { kind: 'unchanged', warnings: [] };
  }
  return parseOr(source, file => {
    const warnings: string[] = [];
    for (const { component } of findThemeComponents(file)) {
      collect(component, warnings);
    }
    return { kind: 'unchanged', warnings };
  });
};

/**
 * Theme keys for components the target version no longer knows: they
 * silently no-op at runtime and are dead weight in the consumer theme.
 */
export const reportDeadKeys = (manifest: MigrationManifest): Codemod => ({
  name: 'report-dead-keys',
  apply: source =>
    analyze(source, (component, warnings) => {
      if (component in manifest.slots) return;
      const removed = manifest.removedComponents.includes(component);
      warnings.push(
        removed
          ? `${component}: component was removed in ${manifest.version} — these styles are dead`
          : `${component}: not a themeable component in ${manifest.version} — these styles are silently unused`
      );
    }),
});

/**
 * HTML-structure changes are not auto-fixable from here (the consumer may
 * target the old DOM with their own CSS, e.g. generated BEM selectors), so
 * they surface as structured warnings on the components actually themed.
 */
export const reportStructure = (manifest: MigrationManifest): Codemod => ({
  name: 'report-structure',
  apply: source =>
    analyze(source, (component, warnings) => {
      for (const entry of manifest.structureWarnings) {
        if (entry.component === component) warnings.push(entry.text);
      }
    }),
});
