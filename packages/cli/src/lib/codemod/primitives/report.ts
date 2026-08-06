import { themeCodemod } from '../engine.js';
import type { Codemod, MigrationManifest } from '../types.js';

/**
 * Theme keys for components the target version no longer knows: they
 * silently no-op at runtime and are dead weight in the consumer theme.
 */
export const reportDeadKeys = (manifest: MigrationManifest): Codemod =>
  themeCodemod(
    'report-dead-keys',
    'report theme keys the target version no longer knows',
    ({ component, warnings }) => {
      if (component in manifest.slots) return;
      const removed = manifest.removedComponents.includes(component);
      warnings.push(
        removed
          ? `${component}: component was removed in ${manifest.version} — these styles are dead`
          : `${component}: not a themeable component in ${manifest.version} — these styles are silently unused`
      );
    }
  );

/**
 * HTML-structure changes are not auto-fixable from here (the consumer may
 * target the old DOM with their own CSS, e.g. generated BEM selectors), so
 * they surface as structured warnings on the components actually themed.
 */
export const reportStructure = (manifest: MigrationManifest): Codemod =>
  themeCodemod(
    'report-structure',
    'report HTML-structure changes that may break your own CSS',
    ({ component, warnings }) => {
      for (const entry of manifest.structureWarnings) {
        if (entry.component === component) warnings.push(entry.text);
      }
    }
  );
