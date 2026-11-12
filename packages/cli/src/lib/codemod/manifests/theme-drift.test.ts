import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { type AnyNode, parseTsx, walk } from '../../tsx-ast.js';
import { v19 } from './v19.js';

// The manifest's `slots` mirror the `Theme` type in @marigold/system, and the
// two have drifted apart once already: components merged into `beta-release`
// after the manifest was hand-written (Sidebar's rail slots, ErrorState) left
// consumers without stubs and produced a false "not themeable" warning.
// Until DST-1650 generates the manifests, this test is the re-check trigger.
//
// It pins the manifest of the CURRENT major against the live type. Now that
// v19 exists, v18's slots are frozen history, not a mirror of the type. When
// v20 lands, point it at the v20 manifest.
const THEME_TYPES = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../../../system/src/types/theme.ts'
);

// Babel 8 stores type arguments as `typeArguments`, Babel 7 as
// `typeParameters` (same accommodation as anchor.ts).
const typeArgs = (ref: AnyNode): AnyNode[] =>
  (
    (ref.typeArguments ?? ref.typeParameters) as
      { params?: AnyNode[] } | undefined
  )?.params ?? [];

/** string-literal members of `'a' | 'b'` (or of a lone `'a'`) */
const literalNames = (node: AnyNode | undefined): string[] => {
  if (!node) return [];
  const types =
    node.type === 'TSUnionType' ? (node.types as AnyNode[]) : [node];
  return types
    .filter(t => t.type === 'TSLiteralType')
    .map(t => (t.literal as { value?: string } | undefined)?.value)
    .filter((value): value is string => typeof value === 'string');
};

/**
 * Slots of one component's type: a `Record<'a' | 'b', …>`, optionally
 * intersected with `{ c?: … }` for optional slots. `null` for anything else.
 */
const slotsOf = (node: AnyNode | undefined): string[] | null => {
  if (!node) return null;
  if (node.type === 'TSIntersectionType') {
    const parts = (node.types as AnyNode[]).map(slotsOf);
    return parts.some(p => p !== null) ? parts.flatMap(p => p ?? []) : null;
  }
  if (node.type === 'TSTypeLiteral') {
    return ((node.members as AnyNode[] | undefined) ?? [])
      .map(m => (m.key as { name?: string } | undefined)?.name)
      .filter((name): name is string => typeof name === 'string');
  }
  const isRecord =
    node.type === 'TSTypeReference' &&
    (node.typeName as { name?: string } | undefined)?.name === 'Record';
  return isRecord ? literalNames(typeArgs(node)[0]) : null;
};

/**
 * Slot sets of `Theme['components']`, keyed by component. `null` marks a
 * single style function — the same shape the manifest uses.
 */
const themeSlots = (source: string): Record<string, string[] | null> => {
  const out: Record<string, string[] | null> = {};
  walk(parseTsx(source) as unknown as AnyNode, n => {
    if (n.type !== 'TSPropertySignature') return;
    if ((n.key as { name?: string } | undefined)?.name !== 'components') return;
    const literal = (n.typeAnnotation as AnyNode | undefined)
      ?.typeAnnotation as AnyNode | undefined;
    for (const member of (literal?.members as AnyNode[] | undefined) ?? []) {
      const name = (member.key as { name?: string } | undefined)?.name;
      if (!name) continue;
      out[name] = slotsOf(
        (member.typeAnnotation as AnyNode | undefined)?.typeAnnotation as
          AnyNode | undefined
      );
    }
    return false;
  });
  return out;
};

describe('v19 manifest vs the @marigold/system Theme type', () => {
  const theme = themeSlots(readFileSync(THEME_TYPES, 'utf8'));

  test('reads the component map out of the Theme type', () => {
    const components = Object.keys(theme);

    // guards the assertions below against passing vacuously on a parse miss
    expect(components.length).toBeGreaterThan(50);
  });

  test('knows every themeable component', () => {
    const missing = Object.keys(theme).filter(name => !(name in v19.slots));

    expect(missing).toEqual([]);
  });

  test('knows no component the Theme type does not have', () => {
    const extra = Object.keys(v19.slots).filter(name => !(name in theme));

    expect(extra).toEqual([]);
  });

  test('mirrors every slot set', () => {
    const drifted: string[] = [];
    for (const [name, slots] of Object.entries(theme)) {
      const known = v19.slots[name];
      if (known === undefined) continue; // reported by the test above
      if (slots === null || known === null) {
        if ((slots === null) !== (known === null)) {
          drifted.push(
            `${name}: ${slots === null ? 'single style function' : 'slotted'} in the Theme type, the other in the manifest`
          );
        }
        continue;
      }
      const missing = slots.filter(slot => !known.includes(slot));
      const extra = known.filter(slot => !slots.includes(slot));
      if (missing.length > 0 || extra.length > 0) {
        drifted.push(`${name}: missing [${missing}], extra [${extra}]`);
      }
    }

    expect(drifted).toEqual([]);
  });
});
