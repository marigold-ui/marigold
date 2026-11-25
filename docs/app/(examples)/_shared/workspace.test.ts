import { describe, expect, it } from 'vitest';
import { pushRecent } from './workspace';

describe('pushRecent', () => {
  it('puts a new id first', () => {
    expect(pushRecent(['a', 'b'], 'c')).toEqual(['c', 'a', 'b']);
  });

  it('moves an id that is already listed to the front, once', () => {
    expect(pushRecent(['a', 'b', 'c'], 'c')).toEqual(['c', 'a', 'b']);
  });

  it('keeps at most three ids and drops the oldest', () => {
    expect(pushRecent(['a', 'b', 'c'], 'd')).toEqual(['d', 'a', 'b']);
  });

  it('returns the same list when the id is already first', () => {
    const list = ['a', 'b', 'c'];
    expect(pushRecent(list, 'a')).toBe(list);
  });
});
