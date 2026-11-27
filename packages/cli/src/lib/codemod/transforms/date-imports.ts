import MagicString from 'magic-string';
import type { AnyNode } from '../../tsx-ast.js';
import { MARIGOLD_COMPONENTS } from '../anchor.js';
import { parseOr } from '../engine.js';
import type { Codemod } from '../types.js';

// v19 (DST-1994): `@marigold/components` re-exports the date values, helpers
// and types an app needs for the date components. Named imports of those
// from `@internationalized/date` move to `@marigold/components`. Optional:
// the old imports keep working, they only need a package the app no longer
// has to install. Names Marigold does not re-export stay where they are.

const INTERNATIONALIZED_DATE = '@internationalized/date';

/** what `packages/components/src/index.ts` re-exports, pinned by the test */
export const RE_EXPORTED = new Set([
  'CalendarDate',
  'CalendarDateTime',
  'Time',
  'ZonedDateTime',
  'fromDate',
  'getLocalTimeZone',
  'isSameDay',
  'isWeekend',
  'maxDate',
  'minDate',
  'now',
  'parseAbsoluteToLocal',
  'parseDate',
  'parseDateTime',
  'parseTime',
  'parseZonedDateTime',
  'toCalendarDate',
  'toCalendarDateTime',
  'toTime',
  'today',
  'DateDuration',
  'DateValue',
  'TimeValue',
]);

const sourceOf = (n: AnyNode) => (n.source as AnyNode).value as string;
const nameOf = (n: unknown) => (n as { name?: string } | undefined)?.name;

/** `name`, `name as alias`, with `type ` in front when only a type is imported */
const specText = (spec: AnyNode, typeOnly: boolean) => {
  const imported = nameOf(spec.imported) as string;
  const local = nameOf(spec.local) as string;
  const name = imported === local ? imported : `${imported} as ${local}`;
  return typeOnly || spec.importKind === 'type' ? `type ${name}` : name;
};

export const dateImports: Codemod = {
  name: 'date-imports',
  description:
    'import date values and helpers from @marigold/components instead of @internationalized/date',
  apply: source => {
    if (!source.includes(INTERNATIONALIZED_DATE)) {
      return { kind: 'unchanged', warnings: [] };
    }
    return parseOr(source, file => {
      const body = (file.program as AnyNode).body as AnyNode[];
      const imports = body.filter(n => n.type === 'ImportDeclaration');
      const s = new MagicString(source);
      const moved: string[] = [];
      const movedNames: string[] = [];
      let insertAt: number | null = null;

      for (const decl of imports) {
        if (sourceOf(decl) !== INTERNATIONALIZED_DATE) continue;
        const specs = decl.specifiers as AnyNode[];
        if (specs.some(spec => spec.type !== 'ImportSpecifier')) continue;
        const typeOnly = decl.importKind === 'type';
        const move = specs.filter(spec =>
          RE_EXPORTED.has(nameOf(spec.imported) as string)
        );
        if (move.length === 0) continue;

        moved.push(...move.map(spec => specText(spec, typeOnly)));
        movedNames.push(...move.map(spec => nameOf(spec.imported) as string));
        insertAt ??= decl.start as number;

        const keep = specs.filter(spec => !move.includes(spec));
        const end = decl.end as number;
        if (keep.length === 0) {
          s.remove(decl.start as number, source[end] === '\n' ? end + 1 : end);
        } else {
          const raw = (decl.source as AnyNode).extra as { raw: string };
          const kind = typeOnly ? 'type ' : '';
          const names = keep.map(spec => specText(spec, false)).join(', ');
          s.overwrite(
            decl.start as number,
            end,
            `import ${kind}{ ${names} } from ${raw.raw};`
          );
        }
      }

      if (moved.length === 0) return { kind: 'unchanged', warnings: [] };

      // Merge into an existing value import from @marigold/components, so the
      // file keeps one import per package.
      const target = imports.find(
        decl =>
          sourceOf(decl) === MARIGOLD_COMPONENTS &&
          decl.importKind !== 'type' &&
          (decl.specifiers as AnyNode[]).length > 0 &&
          (decl.specifiers as AnyNode[]).every(
            spec => spec.type === 'ImportSpecifier'
          )
      );
      if (target) {
        const specs = target.specifiers as AnyNode[];
        const last = specs[specs.length - 1];
        s.appendLeft(last.end as number, `, ${moved.join(', ')}`);
      } else {
        s.appendLeft(
          insertAt as number,
          `import { ${moved.join(', ')} } from '${MARIGOLD_COMPONENTS}';\n`
        );
      }

      return {
        kind: 'edited',
        output: s.toString(),
        changes: [
          `moved ${movedNames.map(n => `\`${n}\``).join(', ')} from ${INTERNATIONALIZED_DATE} to ${MARIGOLD_COMPONENTS}`,
        ],
        warnings: [],
      };
    });
  },
};
