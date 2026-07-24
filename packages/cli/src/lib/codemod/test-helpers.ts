import type { CodemodOutcome } from './types.js';

/** test-only: narrow an outcome to `edited` or fail loudly */
export function assertEdited(
  result: CodemodOutcome
): asserts result is Extract<CodemodOutcome, { kind: 'edited' }> {
  if (result.kind !== 'edited') {
    throw new Error(`expected edited, got ${result.kind}`);
  }
}
