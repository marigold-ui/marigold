import { asPropertyKey } from '../anchor.js';
import {
  codeList,
  lineIndentAt,
  stubSlotLine,
  themeCodemod,
} from '../engine.js';
import type { Codemod, MigrationManifest } from '../types.js';

/**
 * Wraps a single-style-function theme component into the slot object the
 * target version requires: the consumer's existing expression moves verbatim
 * into the primary slot, every other slot is stubbed as `cva({})`.
 * (v18 example: Card single-cva becomes `{ container: <their cva>, ... }`.)
 */
export const restructureToSlots = (manifest: MigrationManifest): Codemod =>
  themeCodemod(
    'restructure-to-slots',
    ({ component, init, source, s, unit, changes, warnings }) => {
      const slots = manifest.slots[component];
      if (!Array.isArray(slots)) return;
      if (init.type === 'ObjectExpression') return; // already slotted
      const start = init.start as number;
      const end = init.end as number;

      const primary =
        manifest.restructures.find(r => r.component === component)
          ?.primarySlot ?? 'container';
      if (!slots.includes(primary)) {
        warnings.push(
          `${component}: manifest primary slot '${primary}' is not a valid slot — restructure skipped`
        );
        return;
      }

      const base = lineIndentAt(source, start);
      const inner = base + unit;
      const stubs = slots
        .filter(slot => slot !== primary)
        .map(slot => stubSlotLine(slot, inner))
        .join('\n');
      const original = source.slice(start, end);
      s.overwrite(
        start,
        end,
        `{\n${inner}${asPropertyKey(primary)}: ${original},\n${stubs}\n${base}}`
      );
      changes.push(
        `${component}: moved existing styles into \`${primary}\`, stubbed ${codeList(
          slots.filter(slot => slot !== primary)
        )}`
      );
    },
    { ensureCva: true }
  );
