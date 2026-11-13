import type { CodemodOutcome } from './types.js';

/** test-only: narrow an outcome to `edited` or fail loudly */
export function assertEdited(
  result: CodemodOutcome
): asserts result is Extract<CodemodOutcome, { kind: 'edited' }> {
  if (result.kind !== 'edited') {
    throw new Error(`expected edited, got ${result.kind}`);
  }
}

/** test-only: the warnings of an outcome, none for a skipped file */
export const warningsOf = (result: CodemodOutcome): string[] =>
  result.kind === 'skipped' ? [] : result.warnings;
