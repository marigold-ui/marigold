import { asPropertyKey } from '../anchor.js';
import { reindent } from '../engine.js';
import type {
  Codemod,
  CodemodOutcome,
  MigrationManifest,
  ScaffoldEntry,
} from '../types.js';

/**
 * Generates the content of a theme style file for a component the target
 * version added (the runner names the file `<name>.styles.ts`). Content is
 * fully derived from the manifest slot list: `cva({})` per slot, except
 * slots whose layout is load-bearing, which carry the extracted baseline
 * classes. Visual styling stays the consumer's job.
 */
export const generateScaffold = (
  entry: ScaffoldEntry,
  manifest: MigrationManifest,
  indentUnit: string
): string => {
  const slots = manifest.slots[entry.name];
  const header = `import { cva, ThemeComponent } from '@marigold/system';\n\n`;

  if (!Array.isArray(slots)) {
    return `${header}export const ${entry.name}: ThemeComponent<'${entry.name}'> = cva({});\n`;
  }

  const body = slots
    .map(slot => {
      const loadBearing = entry.loadBearing?.[slot];
      const arg = loadBearing
        ? reindent(loadBearing, indentUnit, indentUnit)
        : '{}';
      return `${indentUnit}${asPropertyKey(slot)}: cva(${arg}),`;
    })
    .join('\n');

  return `${header}export const ${entry.name}: ThemeComponent<'${entry.name}'> = {\n${body}\n};\n`;
};

/**
 * Adds `export * from './X.styles';` to a barrel file, idempotently.
 * `context` explains the why in the report (e.g. which scaffold this
 * registers).
 */
export const addIndexExport = (
  moduleBase: string,
  context?: string
): Codemod => ({
  name: 'add-index-export',
  apply: (source): CodemodOutcome => {
    const exportLine = `export * from './${moduleBase}';`;
    if (source.includes(`'./${moduleBase}'`)) {
      return { kind: 'unchanged', warnings: [] };
    }
    const matches = [...source.matchAll(/^export \* from .*$/gm)];
    const last = matches.at(-1);
    const output = last
      ? source.slice(0, last.index + last[0].length) +
        '\n' +
        exportLine +
        source.slice(last.index + last[0].length)
      : source.trimEnd() + '\n' + exportLine + '\n';
    return {
      kind: 'edited',
      output,
      changes: [`added \`${exportLine}\`${context ? ` — ${context}` : ''}`],
      warnings: [],
    };
  },
});
