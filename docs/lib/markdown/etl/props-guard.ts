/**
 * Fails the docs search build when no chunk carries a props table. That is
 * what the index looked like from #5373 until DST-2004: `build:types` exits 0
 * even when every table fails, and nothing downstream noticed.
 */

// The header row `remarkResolvePropsTable` gives every props table.
const PROPS_TABLE_HEADER =
  /^\| *Prop *\| *Type *\| *Default *\| *Description *\|/m;

export const hasPropsTable = (text: string): boolean =>
  PROPS_TABLE_HEADER.test(text);

export function assertPropsTables(chunks: { originalText: string }[]): number {
  const count = chunks.filter(c => hasPropsTable(c.originalText)).length;
  if (count === 0) {
    throw new Error(
      'No chunk contains a props table. Run `pnpm --filter @marigold/docs build:types` before chunking, and check its output for failed tables.'
    );
  }
  return count;
}
