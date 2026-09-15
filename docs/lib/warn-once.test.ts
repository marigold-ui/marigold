import { afterEach, expect, it, vi } from 'vitest';
import { createWarnOnce } from './warn-once';

afterEach(() => vi.restoreAllMocks());

const spy = () => vi.spyOn(console, 'warn').mockImplementation(() => {});

it('logs a cause once, however often it recurs', () => {
  const warn = spy();
  const warnOnce = createWarnOnce();

  warnOnce('redis', 'first');
  warnOnce('redis', 'second');

  expect(warn).toHaveBeenCalledTimes(1);
  expect(warn).toHaveBeenCalledWith('first');
});

it('logs each distinct cause, so one failure cannot mask another', () => {
  const warn = spy();
  const warnOnce = createWarnOnce();

  warnOnce('redis', 'a');
  warnOnce('no-subject', 'b');
  warnOnce('redis', 'a again');

  expect(warn.mock.calls.map(([m]) => m)).toEqual(['a', 'b']);
});

// The reason this is a factory rather than a module-level Set: two callers must
// not be able to silence each other by picking the same cause name.
it('gives each instance its own namespace', () => {
  const warn = spy();
  const one = createWarnOnce();
  const two = createWarnOnce();

  one('redis', 'from one');
  two('redis', 'from two');

  expect(warn).toHaveBeenCalledTimes(2);
});
