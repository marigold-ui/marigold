import { objectProperties, propertyName } from '../anchor.js';
import {
  codeList,
  lineIndentAt,
  stubSlotLine,
  stylesReference,
  themeCodemod,
} from '../engine.js';
import type { Codemod, MigrationManifest } from '../types.js';

/**
 * Adds slot keys the target version requires but the consumer theme lacks,
 * as `cva({})` stubs — never touching existing slots. Slot keys the target
 * version dropped are reported as warnings (they fail the exhaustive-Record
 * typecheck and are dead weight).
 */
export const stubMissingSlots = (manifest: MigrationManifest): Codemod =>
  themeCodemod(
    'stub-missing-slots',
    ({ component, init, source, s, unit, changes, warnings }) => {
      const slots = manifest.slots[component];
      if (!Array.isArray(slots) || init.type !== 'ObjectExpression') return;

      const props = objectProperties(init);
      const present = props
        .map(propertyName)
        .filter((n): n is string => n !== null);

      if (props.some(p => p.type === 'SpreadElement')) {
        // Stubbing here would be unsafe: a stub inserted after the spread
        // silently overrides any slot the spread already provides (later key
        // wins). Name exactly what could not be seen instead.
        const unverified = slots.filter(slot => !present.includes(slot));
        if (unverified.length > 0) {
          const reference = stylesReference(manifest, component);
          warnings.push(
            `${component}: a spread hides slot definitions — not visible in this file: ${codeList(
              unverified
            )}. Verify they exist in the spread source and add missing ones there (never in both places).${
              reference ? ` Reference styles: ${reference}` : ''
            }`
          );
        }
        return;
      }

      const missing = slots.filter(slot => !present.includes(slot));
      const dead = present.filter(name => !slots.includes(name));
      for (const name of dead) {
        warnings.push(
          `${component}: slot \`${name}\` no longer exists in ${manifest.version} — its styles are unused and will fail the typecheck`
        );
      }
      if (missing.length === 0) return;

      const base = lineIndentAt(source, init.start as number);
      const inner = base + unit;
      const stubs = missing.map(slot => stubSlotLine(slot, inner)).join('\n');

      if (props.length === 0) {
        s.overwrite(
          init.start as number,
          init.end as number,
          `{\n${stubs}\n${base}}`
        );
      } else {
        const last = props[props.length - 1];
        const lastEnd = last.end as number;
        const tail = source.slice(lastEnd, init.end as number);
        const comma = tail.includes(',') ? '' : ',';
        s.appendLeft(lastEnd, comma);
        const closeBrace = (init.end as number) - 1;
        if (tail.includes('\n')) {
          // multiline object: insert before the closing brace's line
          const lineStart = source.lastIndexOf('\n', closeBrace - 1) + 1;
          s.appendLeft(lineStart, `${stubs}\n`);
        } else {
          // single-line object: break it open before the closing brace
          s.appendLeft(closeBrace, `\n${stubs}\n${base}`);
        }
      }
      changes.push(
        `${component}: stubbed missing slot(s) ${codeList(missing)}`
      );
    },
    { ensureCva: true }
  );
