import { TOP_LEVEL_NAMES } from './commands-spec.js';
import { nearest } from './suggest.js';

describe('nearest', () => {
  test('matches a single-character typo', () => {
    expect(nearest('lst', TOP_LEVEL_NAMES)).toBe('list');
  });

  test('matches a transposition', () => {
    expect(nearest('serach', TOP_LEVEL_NAMES)).toBe('search');
  });

  test('matches a missing character', () => {
    expect(nearest('doc', TOP_LEVEL_NAMES)).toBe('docs');
  });

  test('returns the exact match when input is already valid', () => {
    expect(nearest('telemetry', TOP_LEVEL_NAMES)).toBe('telemetry');
  });

  test('returns undefined for input too far from any candidate', () => {
    expect(nearest('xyzzy', TOP_LEVEL_NAMES)).toBeUndefined();
  });

  test('returns undefined against an empty candidate list', () => {
    expect(nearest('docs', [])).toBeUndefined();
  });
});
