import { type AnyNode } from '../../tsx-ast.js';
import {
  isCvaCall,
  marigoldLocalName,
  objectProperties,
  propertyName,
} from '../anchor.js';
import {
  classStringsIn,
  classTokens,
  lineIndentAt,
  parseExpression,
  reindent,
  themeCodemod,
} from '../engine.js';
import type { Codemod, MigrationManifest, SwapEntry } from '../types.js';

const sameList = (a: string[], b: string[]): boolean =>
  a.length === b.length && a.every((v, i) => v === b[i]);

/**
 * Replaces load-bearing baseline styles with the target version's baseline —
 * but ONLY when the consumer's class strings equal the old baseline
 * byte-for-byte, which proves the slot was never customized. Any deviation
 * means customized: warn, never touch. Runs per slot, not per file.
 *
 * Every applied swap emits a -/+ token diff warning: the v18 strings may
 * reference design tokens a standalone theme does not define, so the
 * utilities that changed relative to the old baseline are listed for manual
 * verification.
 */
export const swapExactClasses = (manifest: MigrationManifest): Codemod => {
  // manifest data is constant for the run: resolve each entry's target
  // classes and token diff once, not per visited file
  const resolved = new Map<
    string,
    (SwapEntry & { target: string[]; removed: string[]; added: string[] })[]
  >();
  for (const entry of manifest.swaps) {
    const parsed = parseExpression(entry.newSource);
    const target = parsed ? classStringsIn(parsed) : [];
    const oldTokens = classTokens(entry.oldClasses);
    const newTokens = classTokens(target);
    const removed = [...oldTokens].filter(t => !newTokens.has(t)).sort();
    const added = [...newTokens].filter(t => !oldTokens.has(t)).sort();
    const list = resolved.get(entry.component) ?? [];
    list.push({ ...entry, target, removed, added });
    resolved.set(entry.component, list);
  }

  return themeCodemod(
    'swap-exact-classes',
    ({ component, init, file, source, s, unit, changes, warnings }) => {
      const entries = resolved.get(component);
      if (!entries || init.type !== 'ObjectExpression') return;
      const cvaLocal = marigoldLocalName(file, 'cva');

      for (const entry of entries) {
        const prop = objectProperties(init).find(
          p => propertyName(p) === entry.slot
        );
        // absent slot: stub-missing-slots covers it; the consumer never had
        // the baseline, so there is nothing to swap or warn about here.
        if (!prop) continue;

        const value = prop.value as AnyNode | undefined;
        const arg = (value?.arguments as AnyNode[] | undefined)?.[0];

        const customized = () =>
          warnings.push(
            `${component}.${entry.slot}: does not match the old Marigold baseline (customized) — migrate manually. ${manifest.version} baseline: ${entry.newSource.replace(/\s+/g, ' ')}`
          );

        if (!value || !isCvaCall(value, cvaLocal) || !arg) {
          customized();
          continue;
        }
        const actual = classStringsIn(arg);

        // already on the target baseline (e.g. a re-run): nothing to do
        if (sameList(actual, entry.target)) continue;

        if (!sameList(actual, entry.oldClasses)) {
          customized();
          continue;
        }

        const base = lineIndentAt(source, prop.start as number);
        s.overwrite(
          arg.start as number,
          arg.end as number,
          reindent(entry.newSource, unit, base)
        );
        changes.push(
          `${component}.${entry.slot}: swapped baseline styles to the ${manifest.version} baseline`
        );

        // Render the change as a token diff (the report colorizes -/+ lines)
        // so renamed tokens and new layout utilities are visible at a glance.
        // ponytail: added utilities are flagged for manual verification; the
        // upgrade path is resolving them against the consumer's actual CSS.
        if (entry.added.length > 0 || entry.removed.length > 0) {
          warnings.push(
            [
              `${component}.${entry.slot}: classes changed vs the old baseline — verify the added utilities resolve in your CSS:`,
              ...(entry.removed.length > 0
                ? [`- ${entry.removed.join(' ')}`]
                : []),
              ...(entry.added.length > 0 ? [`+ ${entry.added.join(' ')}`] : []),
            ].join('\n')
          );
        }
      }
    }
  );
};
